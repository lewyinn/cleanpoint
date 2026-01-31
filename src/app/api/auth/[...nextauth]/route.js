import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export const authOptions = {
    // HAPUS BARIS INI:
    // adapter: MongoDBAdapter(clientPromise), 
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},
            async authorize(credentials) {
                const { email, password } = credentials;

                const client = await clientPromise;
                const db = client.db("lewyin");

                const user = await db.collection("users").findOne({ email });
                if (!user) throw new Error("Email tidak terdaftar");

                const isPasswordCorrect = await bcrypt.compare(password, user.password);
                if (!isPasswordCorrect) throw new Error("Password salah");

                return {
                    id: user._id.toString(),
                    name: user.username,
                    email: user.email,
                };
            },
        }),
    ],
    session: {
        strategy: "jwt", // Tetap gunakan JWT
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/sign-in",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) token.id = user.id;
            return token;
        },
        async session({ session, token }) {
            if (session.user) session.user.id = token.id;
            return session;
        },
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };