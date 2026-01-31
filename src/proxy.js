import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// 1. Bungkus withAuth ke dalam variabel
const authMiddleware = withAuth({
    pages: {
        signIn: "/sign-in",
    },
    callbacks: {
        authorized: ({ token }) => !!token,
    },
});

// 2. Ekspor dengan nama 'proxy' (Wajib untuk Next.js 16)
export async function proxy(req, event) {
    return authMiddleware(req, event);
}

// 3. Tetap ekspor config seperti biasa
export const config = {
    matcher: ["/dashboard/:path*"]
};