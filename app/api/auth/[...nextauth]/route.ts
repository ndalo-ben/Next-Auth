import CredentialsProvider from 'next-auth/providers/credentials';
import { AuthOptions } from 'next-auth';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';
import NextAuth from 'next-auth/next';



export const authOptions: AuthOptions = {
    providers: [

        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "User Name",
                    type: "text",
                    placeholder: "johndoe@gmail.com"
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "*********"
                }
            },

            async authorize(credentials) {
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials?.username
                    }
                });

                if (!user) throw new Error("Username or password is incorrect");

                if (!credentials?.password) throw new Error("Please Provide a password");
                const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);

                if (!isPasswordCorrect) throw new Error("Username or password is incorrect");

                const { password, ...userWithoutPass } = user;
                return userWithoutPass;

            }
        })
    ]
}


const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
