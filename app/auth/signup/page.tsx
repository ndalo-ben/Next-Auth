import SignInButton from "@/app/components/SignInButton"
import SignUpForm from "@/app/components/SignUpForm"
import { Image } from "@nextui-org/react"

const SignupPage = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 place-items-center items-center gap-3">
            <div className="md:col-span-2 flex justify-center items-center">
                <p className="text-center p-2">Already Signed up?</p>
                <SignInButton />
            </div>
            <SignUpForm />
            <Image
                src="/register.svg"
                alt="signup"
                width={500}
                height={500}
            />
        </div>
    )
}

export default SignupPage