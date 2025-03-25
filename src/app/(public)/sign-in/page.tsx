"use client"
import Image from "next/image";
import { useState } from "react";
import MonSegurosLogo from '../../../../public/images/logo_monseguros_white.png'
import Link from "next/link";
import { Eye, EyeClosed } from "@phosphor-icons/react";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Login:", { email, password });
    }

    return (
        <div className="flex h-screen">
            <section className="grid w-4xl place-items-center bg-white">
                <div className="flex items-center justify-center min-h-screen ">
                    <div className="w-md">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                    Email
                                </label>
                                <input
                                className="w-full px-4 py-2 border-2 border-to-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Senha
                                </label>
                                <div className="relative">
                                    <input
                                    className="w-full px-4 py-2 border-2 border-to-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 px-3 py-2 text-sm text-gray-600"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <Eye size={20} /> : <EyeClosed size={20} />}
                                    </button>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-950 hover:bg-blue-1000 text-white font-bold py-2 px-4 rounded-lg translate-0.5 cursor-pointer"
                            >
                                Entrar
                            </button>
                        </form>

                        <div className="pt-4">
                            <Link href='#'>Redefinir senha</Link>
                        </div>
                    </div>
                </div>
            </section>
            <section className="grid w-full place-items-center bg-blue-1000">
                <Image src={MonSegurosLogo} alt="Logo Amarelo mon" width={500} height={500}/>
            </section>
        </div>
    )
}
