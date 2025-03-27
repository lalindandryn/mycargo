import Input from "~/components/atoms/inputs/input/input";
import Button from "~/components/atoms/inputs/button/button";

export default function LoginPage(){
    return (
        <div className=" w-full h-dvh flex items-center justify-center">
            <div className="flex flex-col items-center justify-center px-6 py-3 bg-white rounded-xl">
                <p className="text-4xl mb-4">Login</p>
                <div className="flex flex-col gap-2">
                    <Input
                        label="Email"
                        type="email"
                        placeholder="Email"
                    />
                    <Input
                        label="Password"
                        type="password"
                        placeholder="Password"
                    />
                </div>
                <Button
                    type="submit"
                >Login</Button>
            </div>
        </div>
    )
}