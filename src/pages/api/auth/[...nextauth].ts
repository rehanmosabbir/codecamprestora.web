import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import router from "next/router"
import CredentialsProvider from "next-auth/providers/credentials";
import { users } from "@/DB/constants";

export const authOption: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "cred",
            credentials: {
                email: { label: "Email", placeholder: "Enter Email" },
                password: { label: "Password", placeholder: "Enter Password" },
            },
            async authorize(credentials) {
                if (!credentials || !credentials.email || !credentials.password)
                    return null;
                const user = users.find((item) => item.email === credentials.email);
                console.log("User is ", user);
                if (user?.password === credentials.password) {
                    return user;
                }
                return null;
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
}
export default NextAuth(authOption);

