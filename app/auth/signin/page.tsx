import Link from "next/link"
import SignInForm from "@/app/components/SignInForm"

const SignIn = () => {
    return (
        <div>
            <SignInForm />
            <Link href={"/auth/forgotPass"}>
                Forgot Your Password?
            </Link>
        </div>
    )
}

export default SignIn