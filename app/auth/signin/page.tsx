import Link from "next/link"
import SignInForm from "@/app/components/SignInForm"

const SignIn = (props: any) => {
    return (
        <div>
            <SignInForm {...props}>
                <Link href={"/auth/forgotPass"}>
                    Forgot Your Password?
                </Link>
            </SignInForm>
        </div>
    )
}

export default SignIn