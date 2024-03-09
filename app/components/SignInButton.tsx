"use client";

import { Button, Link } from "@nextui-org/react";
import { useSession } from "next-auth/react";


const SignInButton = () => {
    const { data: session } = useSession();
    return (
        <div className="flex items-center gap-2">
            {session && session.user ? (
                <>
                    <p>{session.user.email}</p>
                    <Link href="/api/auth/signout" className="text-sky-500 hover:text-sky-600 transition-colors">Sign Out</Link>
                </>
            ) : (
                <Button as={Link} href={"/api/auth/signin"}>Sign In</Button>
            )
    }
        </div>
    )
}

export default SignInButton