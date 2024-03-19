import Link from "next/link"
import SignInForm from "@/app/components/SignInForm"


interface Props {
    searchParams: {
        callbackUrl?: string;
    };
}


const SignIn = ({ searchParams}: Props) => {
    console.log({searchParams})
    return (
        <div className="flex flex-col items-center justify-center ">
            <SignInForm callbackUrl={"/"}/>
            <Link href={"/auth/forgotPass"}>
                Forgot Your Password?
            </Link>
        </div>
    )
}

export default SignIn