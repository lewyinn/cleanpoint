import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import cloudinary from "@/lib/cloudinary";

export async function POST(req) {
    try {
        const client = await clientPromise;
        const db = client.db("lewyin");
        const formData = await req.formData();

        // 1. Image Processing
        let imageUrl = "";
        const image = formData.get("image");
        
        if (image && image.size > 0) {
            const bytes = await image.arrayBuffer();
            const buffer = Buffer.from(bytes);

            const uploadResult = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    {
                        folder: "laporan_lingkungan",
                        transformation: [{ width: 1000, quality: "auto", fetch_format: "webp" }],
                    },
                    (error, result) => (error ? reject(error) : resolve(result))
                ).end(buffer);
            });
            imageUrl = uploadResult.secure_url;
        }

        // 2. Construct Data
        const report = {
            reporter: {
                name: formData.get("name"),
                email: formData.get("email"),
                phone: formData.get("phone"),
            },
            category: formData.get("category"),
            title: formData.get("title"),
            description: formData.get("description"),
            location: { address: formData.get("address") },
            imageUrl,
            status: "Ditinjau",
            createdAt: new Date(),
        };

        const result = await db.collection("reports").insertOne(report);

        return NextResponse.json({ success: true, reportId: result.insertedId }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: error.message || "Server Error" }, { status: 500 });
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
