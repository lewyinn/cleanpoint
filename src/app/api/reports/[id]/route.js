import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import cloudinary from "@/lib/cloudinary";

export async function GET(req, { params }) {
    try {
        const { id } = await params; 

        const client = await clientPromise;
        const db = client.db("lewyin");

        if (!ObjectId.isValid(id)) {
            return NextResponse.json(
                { message: "Invalid Report ID format" },
                { status: 400 }
            );
        }

        const report = await db
            .collection("reports")
            .findOne({ _id: new ObjectId(id) });

        if (!report) {
            return NextResponse.json(
                { message: "Report not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(report);
    } catch (error) {
        console.error("GET REPORT ERROR:", error);
        return NextResponse.json(
            { message: "Failed to fetch report" },
            { status: 500 }
        );
    }
}

export async function PATCH(req, { params }) {
    try {
        const { id } = await params;
        const { status } = await req.json();

        const client = await clientPromise;
        const db = client.db("lewyin");

        const result = await db.collection("reports").updateOne(
            { _id: new ObjectId(id) },
            { $set: { status: status } }
        );

        if (result.matchedCount === 0) {
            return NextResponse.json({ message: "Report not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ message: "Update failed" }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    try {
        const { id } = await params;
        const client = await clientPromise;
        const db = client.db("lewyin");

        // 1. Cari laporan untuk mendapatkan URL gambar
        const report = await db.collection("reports").findOne({ _id: new ObjectId(id) });

        if (!report) {
            return NextResponse.json({ message: "Report not found" }, { status: 404 });
        }

        // 2. Hapus Gambar di Cloudinary (jika ada)
        if (report.imageUrl) {
            try {
                // Ekstrak public_id dari URL (contoh: folder/filename)
                // URL: .../upload/v1234/laporan/abcd.jpg -> public_id: laporan/abcd
                const splitUrl = report.imageUrl.split('/');
                const fileNameWithExtension = splitUrl[splitUrl.length - 1]; // abcd.jpg
                const folderName = splitUrl[splitUrl.length - 2]; // laporan
                const publicId = `${folderName}/${fileNameWithExtension.split('.')[0]}`;

                await cloudinary.uploader.destroy(publicId);
            } catch (clodinaryError) {
                console.error("Cloudinary Delete Error:", clodinaryError);
                // Kita lanjutkan proses hapus DB walau hapus foto gagal agar tidak nyangkut
            }
        }

        // 3. Hapus data di MongoDB
        const result = await db.collection("reports").deleteOne({ _id: new ObjectId(id) });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Delete Error:", error);
        return NextResponse.json({ message: "Delete failed" }, { status: 500 });
    }
}