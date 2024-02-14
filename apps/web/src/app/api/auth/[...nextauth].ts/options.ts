import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import {Provider} from "next-auth/providers";
import { db } from '@repo/database/dbconnect';

import GoogleProvider from "next-auth/providers/google"

export const options = {
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_GOOGLE_CLIENT_ID,
            clientSecret: process.env.NEXT_GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            type: "credentials",
            credentials: {
                name: { label: "name", type: "text", placeholder: "jsmith" },
                email:{label:"Email",type:"email",placeholder:"email"},
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                await db.$connect()
                if (!credentials) {
                    return null;
                }
                const name = credentials.name;
                const email=credentials.email;
                const password = credentials.password;
                // Add logic here to look up the user from the credentials supplied
                const user = await db.user.findFirst({ 
                    where:{
                        email:email
                    }
                 });
                if (!user) {
                    const obj = { name: name, password: password };
                    const newuser = new user(obj);
                    let userDb = await newuser.save();
                    console.log(userDb);
                    return {
                        id: userDb._id,
                        email: userDb.name,
                    }
                } else {
                    
                    //make sfty emcription
                    if (user.password !== password) {
                        return null
                    }
                    // User is authenticated
                    return {
                        id: user._id,
                        email: user.name,
                    }
                }
            }
        }),
    ] as Provider[],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    jwt: {
        encryption: true
    },
}

