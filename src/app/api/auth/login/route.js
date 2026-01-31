import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try {
        const { email, password } = await req.json();

        const client = await clientPromise;
        const db = client.db("lewyin");

        // 1. Cari User
        const user = await db.collection("users").findOne({ email });
        if (!user) {
            return NextResponse.json({ message: "Email tidak ditemukan" }, { status: 401 });
        }

        // 2. Cek Password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return NextResponse.json({ message: "Password salah" }, { status: 401 });
        }

        // 3. Login Berhasil
        // Note: Idealnya di sini kamu mengirim JWT atau menggunakan NextAuth session
        return NextResponse.json({
            success: true,
            user: { id: user._id, username: user.username, email: user.email }
        });

    } catch (error) {
        return NextResponse.json({ message: "Gagal login" }, { status: 500 });
    }
}