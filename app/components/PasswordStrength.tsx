import { cn } from "clsx-tailwind-merge";

interface Props {
    passStrength: number;
}


const PasswordStrength = ({ passStrength }: Props) => {
    return (
        <div className="flex gap-2">
            {
                Array.from({
                    length: passStrength + 1
                }).map((_, index) => (
                    <div key={index} className={cn}></div>
             ))
            }
        </div>
    )
}

export default PasswordStrength