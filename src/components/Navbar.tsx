"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Github, Stethoscope, Activity } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { name: "Home", href: "/" },
        {
            name: "GitHub",
            href: "https://github.com/username/reponame",
            icon: <Github className="h-4 w-4" />,
        },
    ];

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className="sticky top-0 z-[100] h-20 bg-white/80 backdrop-blur-md border-b border-gray-200/60 p-4 shadow-sm"
        >
            <div className="container mx-auto flex items-center justify-between h-full">
                {/* Logo */}
                <motion.div
                    whileHover={{ scale: 1.03 }}
                    className="flex items-center gap-2"
                >
                    <motion.div
                        animate={{
                            rotate: [0, 10, -10, 0],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatType: "reverse",
                        }}
                    >
                        <Stethoscope className="h-6 w-6 text-rose-500" />
                    </motion.div>
                    <motion.span className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-blue-600 bg-clip-text text-transparent">
                        <Link href="/">Tongue Diagnostics</Link>
                    </motion.span>
                </motion.div>

                {/* Desktop Navigation */}
                <nav className="hidden md:block">
                    <ul className="flex space-x-8">
                        {navItems.map((item, index) => (
                            <motion.li
                                key={item.name}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * index }}
                                whileHover={{ scale: 1.05 }}
                            >
                                <Link
                                    href={item.href}
                                    scroll={false}
                                    className="flex items-center gap-2 text-gray-700 hover:text-rose-600 transition-colors duration-300 group"
                                >
                                    {item.icon && (
                                        <motion.span
                                            className="group-hover:rotate-12 transition-transform"
                                            whileHover={{ scale: 1.2 }}
                                        >
                                            {item.icon}
                                        </motion.span>
                                    )}
                                    <span className="font-medium">
                                        {item.name}
                                    </span>
                                    {index !== navItems.length - 1 && (
                                        <motion.span
                                            className="h-1 w-1 rounded-full bg-gray-300 ml-2"
                                            animate={{
                                                opacity: [0.6, 1, 0.6],
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                            }}
                                        />
                                    )}
                                </Link>
                            </motion.li>
                        ))}
                    </ul>
                </nav>

                {/* Mobile Menu Button */}
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.05 }}
                    className="md:hidden p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300 bg-white/50"
                    onClick={toggleMenu}
                >
                    {isOpen ? (
                        <X className="h-6 w-6 text-rose-600" />
                    ) : (
                        <Menu className="h-6 w-6 text-gray-700" />
                    )}
                </motion.button>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="md:hidden absolute top-20 left-0 right-0 bg-white/95 backdrop-blur-lg shadow-xl border-b border-gray-200/60"
                        >
                            <ul className="flex flex-col space-y-2 p-4">
                                {navItems.map((item) => (
                                    <motion.li
                                        key={item.name}
                                        initial={{ x: 20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Link
                                            href={item.href}
                                            className="flex items-center gap-3 text-lg text-gray-700 hover:text-rose-600 hover:bg-rose-50/50 transition-colors duration-300 p-3 rounded-lg"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {item.icon && (
                                                <motion.span
                                                    animate={{
                                                        rotate: [0, 10, -10, 0],
                                                    }}
                                                    transition={{
                                                        duration: 1.5,
                                                    }}
                                                >
                                                    {item.icon}
                                                </motion.span>
                                            )}
                                            {item.name}
                                        </Link>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.header>
    );
};

export default Navbar;
