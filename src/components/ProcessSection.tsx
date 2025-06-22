"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ActivityIcon, CameraIcon, CpuIcon, ChevronRight } from "lucide-react";
import { useRef } from "react";

const blankImage =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMwAAADACAMAAAB/Pny7AAAAQlBMVEU0NDSenp4xMTEqKiqamppUVFRjY2N/f3+lpaWHh4ctLS2ioqKLi4tMTEwhISEYGBhBQUF3d3c8PDyUlJRaWlpra2uLUZmMAAABgElEQVR4nO3Z246CMBRA0V65tIJC4f9/dVqZ8RKtGeeFHGevF2N86Q49hKJSAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgfzD2BbP36t50al44yaoxPjpdE33Ye31vMb5LbdUg7cp0/agqIxMKQT3nmNnXLfPeS/y9EnP0sTo2uvNyLs13jDtUOIExvQlPHXuJMer5kkdi9nKNKffimx+2RxmhMWqNrrnWjOtSImTGGJ+07i/PYnZI7Wwkx8RLjFFtTEOQGqPM2qXlZ2zGSTu9CI6xxzHYZi2DPzZOuzjlfSY1Jn+xi4urzQNz0M7pss/kxoRTnx/Sck0bXVb2mdgYo6YckWtWXVrO+0xsTGi2CL19lH0mNsbmm7O7oxepMTYPzH1L2WdCY9TUPRzM0iD0CDAPj7y8K3PYZubZ8UzYrVnNy2A/5TyjTDDhY2KyHFN9EZjkxejqK1oXhcWY1y/P917emz7qbw0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPBXX03UGMBymTrgAAAAAElFTkSuQmCC";

function HowItWorks() {
    const sectionRef = useRef(null);
    const cardRefs = [useRef(null), useRef(null), useRef(null)];

    // Scroll progress for the entire section
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    // Background color changes based on scroll
    const bgColor = useTransform(
        scrollYProgress,
        [0, 0.5, 1],
        ["#ffffff", "#f9fafb", "#ffffff"]
    );

    // Title animation based on scroll
    const titleScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.05]);
    const titleOpacity = useTransform(scrollYProgress, [0, 0.3, 0.8], [1, 1, 0]);

    // Create individual scroll progress for each card
    const cardScrollProgress = cardRefs.map((ref) => {
        const { scrollYProgress } = useScroll({
            target: ref,
            offset: ["start end", "center start"],
        });
        return scrollYProgress;
    });

    // Card animations
    const cardAnimations = cardRefs.map((_, index) => ({
        scale: useTransform(cardScrollProgress[index], [0, 1], [0.9, 1]),
        opacity: useTransform(cardScrollProgress[index], [0, 1], [0.5, 1]),
        y: useTransform(cardScrollProgress[index], [0, 1], [50, 0]),
        rotateY: useTransform(cardScrollProgress[index], [0, 1], [15, 0]),
    }));

    const steps = [
        {
            title: "Capture Image",
            description: "",
            icon: <CameraIcon className="h-8 w-8" />,
            color: "bg-rose-100",
        },
        {
            title: "AI Analysis",
            description: "",
            icon: <CpuIcon className="h-8 w-8" />,
            color: "bg-blue-100",
        },
        {
            title: "Get Insights",
            description: "",
            icon: <ActivityIcon className="h-8 w-8" />,
            color: "bg-emerald-100",
        },
    ];

    // Generate random initial positions for floating elements
    const floatingElements = Array.from({ length: 15 }).map(() => ({
        id: Math.random().toString(36).substring(2, 9),
        size: Math.random() * 200 + 50,
        left: Math.random() * 100,
        top: Math.random() * 100,
        xOffset: Math.random() * 100 - 50,
        yOffset: Math.random() * 100 - 50,
    }));

    return (
        <motion.section
            ref={sectionRef}
            style={{ backgroundColor: bgColor }}
            className="py-20 relative overflow-hidden"
        >
            {/* Floating background elements - now properly animated */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {floatingElements.map((element) => (
                    <motion.div
                        key={element.id}
                        className="absolute rounded-full bg-rose-200/30"
                        style={{
                            width: element.size,
                            height: element.size,
                            left: `${element.left}%`,
                            top: `${element.top}%`,
                            x: useTransform(
                                scrollYProgress,
                                [0, 1],
                                [0, element.xOffset]
                            ),
                            y: useTransform(
                                scrollYProgress,
                                [0, 1],
                                [0, element.yOffset]
                            ),
                            opacity: useTransform(
                                scrollYProgress,
                                [0, 0.5, 1],
                                [0.1, 0.3, 0.1]
                            ),
                            scale: useTransform(
                                scrollYProgress,
                                [0, 1],
                                [1, 1.2]
                            ),
                        }}
                    />
                ))}
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    style={{
                        scale: titleScale,
                        opacity: titleOpacity,
                    }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                        Traditional Diagnostics Meet AI
                    </h2>
                    <motion.div
                        style={{
                            scaleX: useTransform(scrollYProgress, [0, 0.3], [0, 1]),
                        }}
                        className="mt-4 h-1 bg-gradient-to-r from-transparent via-rose-500 to-transparent mx-auto max-w-md"
                    />
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                        Combining centuries-old Eastern medicine with
                        cutting-edge computer vision
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            ref={cardRefs[index]}
                            style={{
                                scale: cardAnimations[index].scale,
                                opacity: cardAnimations[index].opacity,
                                y: cardAnimations[index].y,
                                rotateY: cardAnimations[index].rotateY,
                            }}
                            className="bg-white rounded-xl p-8 text-center shadow-md hover:shadow-lg transition-all"
                            whileHover={{
                                y: -10,
                                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                            }}
                        >
                            <motion.div
                                className="flex justify-center mb-4"
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className={`${step.color} p-4 rounded-full`}>
                                    {step.icon}
                                </div>
                            </motion.div>
                            <h3 className="text-xl font-semibold mb-2">
                                {step.title}
                            </h3>
                            <p className="text-gray-600 mb-4">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
}

export default HowItWorks;
