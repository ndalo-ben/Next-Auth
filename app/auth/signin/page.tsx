import Link from "next/link"
import SignInForm from "@/app/components/SignInForm"

const SignIn = () => {
    return (
        <div className="flex flex-col items-center justify-center ">
            <SignInForm />
            <Link href={"/auth/forgotPass"}>
                Forgot Your Password?
            </Link>
        </div>
    )
}

export default SignIn