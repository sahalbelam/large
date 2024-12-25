import { SignIn } from "@clerk/nextjs"
import { neobrutalism } from "@clerk/themes"

const page = async () => {
    return (
        <div className="flex justify-center items-center bg-gradient-to-bl from-slate-800 to-slate-950 min-h-screen h-full">
            <SignIn
                appearance={{
                    baseTheme: neobrutalism
                }}
            />
        </div>
    )
}

export default page