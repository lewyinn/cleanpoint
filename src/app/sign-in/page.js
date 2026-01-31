'use client';

import { useEffect, useState, Suspense } from 'react';
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';
import Logo from '../../../public/assets/Logo.png'
import Image from 'next/image';
import Link from 'next/link';
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Alert from '@/components/Alert';

// Komponen ini berisi semua kode asli kamu tanpa ada yang diubah tampilannya
function LoginContent() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        if (searchParams.get('success')) {
            setAlert({ type: 'success', message: "Registrasi berhasil! Silahkan masuk." });
            const timer = setTimeout(() => setAlert(null), 5000);
            return () => clearTimeout(timer);
        }
    }, [searchParams]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setAlert(null);

        const res = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (res.error) {
            setAlert({ type: 'error', message: res.error });
            setIsLoading(false);
        } else {
            setAlert({ type: 'success', message: "Login Berhasil! Mohon tunggu..." });
            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 1500);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4 relative overflow-hidden">
            {alert && <Alert type={alert.type} message={alert.message} />}
            
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <div className="w-full max-w-md relative">
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-blue-500/10 p-8 sm:p-12 border border-white/20 transform hover:scale-[1.01] transition-all duration-300">
                    <div className="text-center mb-8">
                        <Link href="/" className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 transform hover:rotate-6 transition-transform duration-300">
                            <Image src={Logo} alt="Logo" width={72} height={72} />
                        </Link>
                        <h1 className="text-3xl font-bold text-[#007E5B] mb-2">Welcome Back</h1>
                        <p className="text-slate-600 text-sm">Sign in to continue to your account</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="group">
                            <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-[#007E5B] transition-colors" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#007E5B] focus:border-transparent transition-all duration-200 text-slate-900 placeholder:text-slate-400"
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="group">
                            <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-[#007E5B] transition-colors" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-12 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#007E5B] focus:border-transparent transition-all duration-200 text-slate-900 placeholder:text-slate-400"
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-[#007E5B] text-white py-3.5 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 group cursor-pointer"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    <span>Signing in...</span>
                                </>
                            ) : (
                                <>
                                    <span>Sign In</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <p className="text-center mt-8 text-sm text-slate-600">
                        Don't have an account?{' '}
                        <Link href="/sign-up" className="text-emerald-600 hover:text-emerald-800 font-semibold hover:underline transition-all">
                            Sign up for free
                        </Link>
                    </p>
                </div>

                <p className="text-center mt-6 text-xs text-slate-600">
                    By continuing, you agree to our{' '}
                    <a href="#" className="underline hover:text-slate-900 transition-colors">Terms of Service</a>
                    {' '}and{' '}
                    <a href="#" className="underline hover:text-slate-900 transition-colors">Privacy Policy</a>
                </p>
            </div>

            <style jsx>{`
                @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
                * { font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif; }
                @keyframes pulse { 0%, 100% { opacity: 0.3; } 50% { opacity: 0.5; } }
                .delay-1000 { animation-delay: 1s; }
            `}</style>
        </div>
    );
}

// Komponen utama hanya bertugas membungkus dengan Suspense
export default function LoginPage() {
    return (
        <Suspense fallback={null}>
            <LoginContent />
        </Suspense>
    );
}