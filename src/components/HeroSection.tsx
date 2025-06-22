"use client";
import React, { useRef } from "react";
import { useState } from 'react';

import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function HeroSection() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    // Parallax effects
    const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacityBg = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    // Scale down title on scroll
    const titleScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
    const titleY = useTransform(scrollYProgress, [0, 0.5], [0, -50]);

    // Animation variants
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
            },
        },
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    const statsContainer = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.2,
                delay: 1,
            },
        },
    };

    const statItem = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
    };

    return (
        <div
            ref={ref}
            className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-slate-50"
        >
            {/* Logo in background - fixed position with low opacity */}

            {/* Animated background elements */}
            <motion.div
                style={{ y: yBg }}
                className="pointer-events-none absolute inset-0 z-0 h-full w-full"
            >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-rose-100 via-blue-50 to-white"></div>
            </motion.div>

            <motion.div
                className="absolute right-[10%] top-[30%] z-10 hidden lg:block"
                initial={{ opacity: 0, y: -50 }}
                animate={{
                    opacity: 1,
                    y: 0,
                    rotate: [0, 5, -5, 0],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 0.5,
                }}
            >
                <div className="relative w-64 h-96 bg-white rounded-3xl shadow-2xl border-8 border-gray-800 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-rose-100 to-blue-100 opacity-80"></div>
                    <div className="absolute top-4 left-0 right-0 flex justify-center">
                        <div className="h-6 w-24 bg-gray-800 rounded-full"></div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                            className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-lg"
                            animate={{
                                scale: [1, 1.05, 1], // Subtle pulse instead of rotation
                            }}
                            transition={{
                                duration: 6,
                                repeat: Infinity,
                                repeatType: "reverse",
                            }}
                        >
                            <Image
                                src="/logo.png"
                                alt="Your Logo"
                                width={400}
                                height={400}
                                className="object-cover rounded-full p-4"
                            />
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            {/* Floating particles */}
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{
                        x: Math.random() * 100 - 50,
                        y: Math.random() * 100 - 50,
                        opacity: 0,
                    }}
                    animate={{
                        y: [0, Math.random() * 100 - 50],
                        x: [0, Math.random() * 100 - 50],
                        opacity: [0, 0.8, 0],
                        transition: {
                            duration: 5 + Math.random() * 10,
                            repeat: Infinity,
                            repeatType: "reverse",
                            delay: Math.random() * 5,
                        },
                    }}
                    className="absolute z-10 h-1 w-1 rounded-full bg-rose-400"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                    }}
                />
            ))}
            {/* Content container */}
            <motion.div
                initial="hidden"
                animate="show"
                variants={container}
                className="relative z-20 mx-auto max-w-6xl px-4 text-center flex flex-col"
            >
                <motion.h1
                    variants={item}
                    style={{ scale: titleScale, y: titleY }}
                    className={cn(
                        "text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl",
                        "bg-gradient-to-r from-gray-900 via-rose-800 to-gray-900 bg-clip-text text-transparent"
                    )}
                >
                    AI-Powered Tongue{" "}
                    <motion.span
                        className="whitespace-nowrap"
                        animate={{
                            textShadow: "0 0 8px rgba(225, 29, 72, 0.5)",
                        }}
                        transition={{
                            repeat: Infinity,
                            repeatType: "reverse",
                            duration: 2,
                        }}
                    >
                        Diagnostics
                    </motion.span>
                </motion.h1>

                <motion.p
                    variants={item}
                    className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600"
                >
                    Tongue analysis has long been used in Eastern medicine as a
                    window into the body's internal health. Our deep learning
                    model digitizes this ancient practice to deliver real-time
                    health insights.
                </motion.p>

                <motion.div
                    variants={item}
                    className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
                >
                    <Button
                        asChild
                        className="rounded-full px-8 py-6 text-lg font-semibold shadow-lg transition-all hover:scale-105 md:hidden"
                    >
                        <Link href="/camera">
                            <motion.span
                                whileHover={{ x: 2 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center"
                            >
                                Take a Picture{" "}
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </motion.span>
                        </Link>
                    </Button>
                    <Button
                        asChild
                        className="rounded-full px-8 py-6 text-lg font-semibold shadow-lg transition-all hover:scale-105 hidden lg:flex"
                    >
                        <Link href="/send-image">
                            <motion.span
                                whileHover={{ x: 2 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center"
                            >
                                Choose a Picture{" "}
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </motion.span>
                        </Link>
                    </Button>
                </motion.div>
            </motion.div>

            {/* Add near your stats preview */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="absolute left-[10%] top-[30%] z-10 hidden xl:block"
            >
                <div className="relative w-56 p-4 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg">
                    <h4 className="text-xs font-semibold text-gray-500 mb-3">
                        HEALTH METRICS
                    </h4>
                    {[
                        { name: "Moisture", value: 78, color: "bg-blue-400" },
                        { name: "Coating", value: 62, color: "bg-rose-400" },
                        { name: "Color", value: 84, color: "bg-emerald-400" },
                        { name: "Texture", value: 71, color: "bg-purple-400" },
                    ].map((metric, i) => (
                        <div key={i} className="mb-3 last:mb-0">
                            <div className="flex justify-between text-xs mb-1">
                                <span>{metric.name}</span>
                                <span>{metric.value}%</span>
                            </div>
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                <motion.div
                                    className={`h-full ${metric.color} rounded-full`}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${metric.value}%` }}
                                    transition={{
                                        duration: 1.5,
                                        delay: 1.5 + i * 0.2,
                                        ease: "easeOut",
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
