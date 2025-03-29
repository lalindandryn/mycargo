"use client";

import Input from "~/components/atoms/inputs/input/Input";
import Button from "~/components/atoms/inputs/button/Button";
import {useState} from "react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async () => {
        setError("");
        if (!email || !password) {
            setError("Please enter your registered email and password");
            return
        }

        try {
            const res = await fetch("http://localhost:5000/api/users", {
                method: "POST",
                headers: {
                    contentType: "application/json",
                },
                body: JSON.stringify({email, password})
            })

            if (!res.ok) {
                throw new Error("Error occured");
            }
            const data = await res.json();
            console.log("login berhasil", data);
        } catch (error: any) {
            setError(error.message);
        }
    }


    return (
        <div className=" w-full h-dvh flex items-center justify-center">
            <div className="flex flex-col items-center justify-center px-6 py-3 bg-white rounded-xl">
                <p className="text-4xl mb-4">Login</p>
                <div className="flex flex-col gap-2">
                    <Input
                        label="Email"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        label="Password"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && <p className="text-error text-sm">{error}</p>}
                </div>
                <Button
                    className="mt-5 mb-2"
                    onClick={handleLogin}
                >Login</Button>
            </div>
        </div>
    )
};