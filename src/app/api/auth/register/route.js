import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try {
        const { username, email, password } = await req.json();

        // 1. Koneksi DB
        const client = await clientPromise;
        const db = client.db("lewyin");

        // 2. Validasi: Cek apakah email sudah ada
        const existingUser = await db.collection("users").findOne({ email });
        if (existingUser) {
            return NextResponse.json({ message: "Email sudah terdaftar" }, { status: 400 });
        }

        // 3. Hash Password (Keamanan)
        const hashedPassword = await bcrypt.hash(password, 12);

        // 4. Simpan User Baru
        const newUser = {
            username,
            email,
            password: hashedPassword,
            role: "user", // Default role
            createdAt: new Date(),
        };

        await db.collection("users").insertOne(newUser);

        return NextResponse.json({ success: true, message: "User berhasil dibuat" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Terjadi kesalahan server" }, { status: 500 });
    }
}