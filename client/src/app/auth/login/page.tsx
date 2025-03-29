"use client";

import Input from "~/components/atoms/inputs/input/Input";
import Button from "~/components/atoms/inputs/button/Button";
import Image from "next/image";
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
        <div className="flex h-dvh bg-gradient-to-r from-white via-[#fdddd0] to-background">
            {/* Gambar SVG di Kiri */}
            <div className="hidden md:flex lg:w-3/5 items-center justify-center gap-0.5">
                <div className="w-full flex flex-col items-end gap-0.5">
                    <Image
                        src="/images/login2.svg"
                        alt="Login Illustration"
                        width={200}
                        height={200}
                        className="w-3/4 border-8 border-border rounded-tl-3xl p-3"
                    />
                    <Image
                        src="/images/login1.svg"
                        alt="Login Illustration"
                        width={200}
                        height={200}
                        className="w-3/4 p-3"
                    />
                </div>
                <div className="w-full flex flex-col items-start gap-0.5">
                    <Image
                        src="/images/login3.svg"
                        alt="Login Illustration"
                        width={200}
                        height={200}
                        className="w-3/4 p-3"
                    />
                    <Image
                        src="/images/login4.svg"
                        alt="Login Illustration"
                        width={300}
                        height={300}
                        className="w-3/4 border-8 border-border rounded-br-3xl p-3"
                    />
                </div>
            </div>

            {/* Form Login di Kanan */}
            <div className="w-full lg:w-2/5 flex items-center justify-center p-6">
                <div
                    className="w-full h-full flex flex-col items-center justify-center bg-[rgba(249,127,81,0.4)] rounded-xl">
                    <p className="text-7xl font-bold text-text-primary mb-4">Login</p>
                    <div className="flex flex-col gap-2 w-80">
                        <Input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                    </div>
                    <Button onClick={handleLogin} className="mt-5 w-80">Login</Button>
                </div>
            </div>
        </div>
    )
};