"use client";

import { Link as ScrollLink } from 'react-scroll';
import NextLink from "next/link";
import Logo from '../../../public/assets/Logo.png';
import Image from 'next/image';
import { Instagram, Github, Linkedin, Heart } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
                    
                    {/* Kolom 1: CleanPoint Info & Sosmed Kamu */}
                    <div className="md:col-span-2 space-y-6">
                        <NextLink href='/' className="flex items-center space-x-2 group">
                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center group-hover:rotate-6 transition-transform duration-300">
                                <Image src={Logo} width={28} height={28} alt="CleanPoint Logo" className="w-7 h-7"/>
                            </div>
                            <span className="text-2xl font-bold tracking-tight">CleanPoint</span>
                        </NextLink>
                        <p className="text-gray-400 text-base leading-relaxed max-w-xl">
                            CleanPoint adalah platform digital inovatif untuk melaporkan masalah lingkungan secara cepat dan transparan. Bersama Moch Ridho Kurniawan, mari wujudkan masa depan yang lebih hijau.
                        </p>
                        <div className="flex space-x-4 pt-2">
                            <a href="https://instagram.com/ridhokurnwnn" target="_blank" rel="noopener noreferrer" 
                               className="w-11 h-11 bg-gray-800 rounded-xl flex items-center justify-center text-gray-400 hover:bg-emerald-500 hover:text-white hover:-translate-y-1 transition-all duration-300 shadow-lg">
                                <Instagram size={22} />
                            </a>
                            <a href="https://github.com/lewyinn" target="_blank" rel="noopener noreferrer" 
                               className="w-11 h-11 bg-gray-800 rounded-xl flex items-center justify-center text-gray-400 hover:bg-gray-700 hover:text-white hover:-translate-y-1 transition-all duration-300 shadow-lg">
                                <Github size={22} />
                            </a>
                            <a href="https://linkedin.com/in/moch-ridho-kurniawan" target="_blank" rel="noopener noreferrer" 
                               className="w-11 h-11 bg-gray-800 rounded-xl flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white hover:-translate-y-1 transition-all duration-300 shadow-lg">
                                <Linkedin size={22} />
                            </a>
                        </div>
                    </div>

                    {/* Kolom 2: Navigasi Cepat */}
                    <div className="flex flex-col md:items-end">
                        <div className="w-full md:w-40">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-emerald-500 mb-6">Navigasi</h3>
                            <ul className="space-y-4 text-sm font-medium">
                                {['home', 'works', 'impact', 'benefits'].map((item) => (
                                    <li key={item}>
                                        <ScrollLink 
                                            to={item} 
                                            smooth spy offset={-100} duration={600}
                                            className="text-gray-400 hover:text-white transition-colors cursor-pointer capitalize flex items-center group"
                                        >
                                            <span className="w-0 group-hover:w-4 h-0.5 bg-emerald-500 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                                            {item === 'home' ? 'Beranda' : item.replace('-', ' ')}
                                        </ScrollLink>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar & Credits */}
                <div className="border-t border-gray-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <p className="text-gray-500 text-xs tracking-widest font-bold">
                        © 2026 CLEANPOINT. ALL RIGHTS RESERVED.
                    </p>
                    <div className="flex items-center text-sm text-gray-400">
                        <span className="font-medium">Made with</span>
                        <Heart size={14} className="mx-2 text-rose-500 fill-rose-500 animate-pulse" />
                        <span className="mr-1.5">by</span>
                        <a 
                            href="https://github.com/lewyinn" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-white hover:text-emerald-400 transition-all font-black border-b border-transparent hover:border-emerald-400 pb-0.5"
                        >
                            Moch Ridho Kurniawan (Lewyinn)
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}