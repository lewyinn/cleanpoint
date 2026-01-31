import { withAuth } from "next-auth/middleware";

export default withAuth({
    pages: {
        signIn: "/sign-in",
    },
    callbacks: {
        authorized: ({ token }) => !!token,
    },
});

export const config = {
    // Memastikan proteksi mencakup root dashboard dan semua isinya
    matcher: ["/dashboard/:path*"]
};