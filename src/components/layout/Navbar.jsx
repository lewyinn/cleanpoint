"use client";

import React, { useState } from "react";
import Image from "next/image";
import NextLink from "next/link";
import { Link as ScrollLink } from "react-scroll";
import { motion, AnimatePresence } from "framer-motion";
import { ChartBarStacked, LaptopMinimalCheck, Menu, MoveUpRight, Workflow, X } from "lucide-react";
import Logo from "../../../public/assets/Logo.png";

const menuItems = [
    { label: "How It Works", to: "works", icon: Workflow },
    { label: "Impact Stats", to: "impact", icon: ChartBarStacked },
    { label: "Benefits", to: "benefits", icon: LaptopMinimalCheck },
];

const menuVariants = {
    hidden: {
        opacity: 0,
        height: 0,
    },
    visible: {
        opacity: 1,
        height: "auto",
        transition: {
            duration: 0.3,
            ease: "easeOut",
            when: "beforeChildren",
            staggerChildren: 0.07,
        },
    },
    exit: {
        opacity: 0,
        height: 0,
        transition: {
            duration: 0.25,
            ease: "easeIn",
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
};

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 ${isScrolled ? "bg-white/70 backdrop-blur-xl shadow-sm" : "bg-transparent"}`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-2">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <NextLink href="/" className="flex items-center gap-2 cursor-pointer">
                        <div className="w-10 h-10 md:w-12 md:h-12">
                            <Image src={Logo} alt="CleanPoint Logo" priority className="w-full h-full" />
                        </div>
                        <span className="text-xl md:text-2xl font-bold text-[#007E5B]">
                            CleanPoint
                        </span>
                    </NextLink>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        {menuItems.map((item) => (
                            <ScrollLink key={item.to} to={item.to} smooth spy offset={-80} duration={600}
                                activeClass="active"
                                className="nav-link cursor-pointer bg-[#ECECEC] rounded-full flex justify-center items-center gap-2 py-2 pl-2 pr-4">
                                <span className="text-xl bg-white px-2 py-2 rounded-full text-center text-black">{item.icon && <item.icon />}</span>
                                <span className="text-black text-base font-medium items-center">{item.label}</span>
                            </ScrollLink>
                        ))}
                    </div>

                    {/* Desktop CTA */}
                    <div className="hidden md:block">
                        <NextLink target="_blank" href="https://wa.me/6285282932422?text=Halo%20Brandly,%20saya%20mau%20konsultasi%20tentang%20website%20anda."
                            className="group cursor-pointer bg-[#007E5B] hover:bg-[#00684B] transition-all duration-300 rounded-full flex justify-center items-center gap-3 py-2 pl-8 pr-2 shadow-sm hover:shadow-md">
                            <span className="text-white text-base font-medium">
                                Hubungi Kami
                            </span>

                            <span className="text-xl bg-white px-2 py-2 rounded-full text-black transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:rotate-1 ">
                                <MoveUpRight />
                            </span>
                        </NextLink>

                    </div>

                    {/* Mobile Toggle */}
                    <button
                        onClick={() => setIsOpen((prev) => !prev)}
                        className="md:hidden text-gray-700"
                    >
                        {isOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>
                </div>

                {/* Mobile Menu with Animation */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            variants={menuVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="md:hidden overflow-hidden"
                        >
                            <div className="flex flex-col gap-4 pb-6 pt-4">
                                {menuItems.map((item) => (
                                    <motion.div key={item.to} variants={itemVariants}>
                                        <ScrollLink
                                            to={item.to}
                                            smooth
                                            spy
                                            offset={-80}
                                            duration={600}
                                            activeClass="active"
                                            className="nav-link cursor-pointer w-full flex items-center gap-3 rounded-xl bg-gray-100 px-4 py-3 active:scale-[0.98] transition">
                                            <span className="bg-white p-2 rounded-lg text-black">{item.icon && <item.icon size={18} />}</span>
                                            <span className="text-black text-sm font-medium">{item.label}</span>
                                        </ScrollLink>
                                    </motion.div>
                                ))}

                                <motion.div variants={itemVariants}>
                                    <NextLink
                                        href="https://wa.me/6285282932422?text=Halo%20Brandly,%20saya%20mau%20konsultasi%20tentang%20website%20anda."
                                        className="w-full mt-2 flex items-center justify-between rounded-xl bg-[#007E5B] px-5 py-3 text-white active:scale-[0.98] transition">
                                        <span className="text-sm font-medium">Hubungi Kami</span>
                                        <span className="bg-white p-2 rounded-lg text-[#007E5B]"><MoveUpRight size={18} /></span>
                                    </NextLink>
                                </motion.div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
};

export default Navbar;