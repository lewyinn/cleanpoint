import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req) {
    try {
        const client = await clientPromise;
        const db = client.db("lewyin");

        const formData = await req.formData();

        const report = {
            reporter: {
                name: formData.get("name"),
                email: formData.get("email"),
                phone: formData.get("phone"),
            },
            category: formData.get("category"),
            title: formData.get("title"),
            description: formData.get("description"),
            location: {
                address: formData.get("address"),
            },
            status: "Sedang Ditinjau",
            createdAt: new Date(),
        };

        // ===== IMAGE =====
        const image = formData.get("image");
        if (image) {
            const bytes = await image.arrayBuffer();
            const buffer = Buffer.from(bytes);

            const filename = `${Date.now()}-${image.name.replace(/\s/g, "")}`;
            const uploadPath = path.join(process.cwd(), "public/uploads", filename);

            await writeFile(uploadPath, buffer);
            report.imageUrl = `/uploads/${filename}`;
        }

        const result = await db.collection("reports").insertOne(report);

        return NextResponse.json({
            success: true,
            reportId: result.insertedId,
        });
    } catch (error) {
        console.error("API ERROR:", error);
        return NextResponse.json(
            { message: "Failed to submit report" },
            { status: 500 }
        );
    }
}

export async function GET() {
    const client = await clientPromise;
    const db = client.db("lewyin");

    const reports = await db
        .collection("reports")
        .find({})
        .sort({ createdAt: -1 })
        .toArray();

    return NextResponse.json(reports);
}
