import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { users } from "@/DB/constants";

const authOption: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "cred",
            credentials: {
                username: { label: "Username or Email", placeholder: "Enter Username or Email" },
                password: { label: "Password", placeholder: "Enter Password" },
            },
            async authorize(credentials) {
                if (!credentials || !credentials.username || !credentials.password)
                    return null;
                const user = users.find((item) => {
                    return (
                        (item.username === credentials.username || item.email === credentials.username) &&
                        item.password === credentials.password
                    );
                });
                if (user) {
                    return user;
                }
                return null;
            }
        })
    ],
    pages: {
        signIn: "/login",
    },
    secret: process.env.NEXTAUTH_SECRET,
}
export default NextAuth(authOption);