import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { compare } from "bcrypt";
import prisma from "./prisma";


export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const user = await prisma.user.findUnique({
                    where: { email: credentials?.email },
                });

                if (!user || !user.password) return null;

                const isValid = await compare(
                    credentials!.password,
                    user.password
                );

                if (!isValid) return null;
                return user;
            },
        }),
    ],
    callbacks: {
        async session({ session, user }: any) {
            if (session.user) {
                session.user.id = user.id;
                session.user.role = user.role;
            }
            return session;
        },
    },
    session: {
        strategy: "jwt" as const,
    },

    secret: process.env.NEXTAUTH_SECRET,
};
