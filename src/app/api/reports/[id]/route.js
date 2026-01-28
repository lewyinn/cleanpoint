import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(req, { params }) {
    try {
        const client = await clientPromise;
        const db = client.db("lewyin");

        const report = await db
            .collection("reports")
            .findOne({ _id: new ObjectId(params.id) });

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
