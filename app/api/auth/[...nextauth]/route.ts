import CredentialsProvider from 'next-auth/providers/credentials';
import { AuthOptions } from 'next-auth';
import prisma from '@/lib/prisma';



export const authOptions: AuthOptions = {
    providers: [

        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "User Name",
                    type: "text",
                    placeholder: "jsmith"
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "Password"
                }
            },

            async authorize(credentials){
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials?.username
                    }
                });

                if(!user) throw new Error("Username or password is incorrect");
                
            }
        })
    ]
}