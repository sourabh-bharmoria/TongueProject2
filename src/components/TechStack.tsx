"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import {
    Cpu,
    Database,
    Eye,
    Palette,
    Scan,
    BrainCircuit,
    Network,
    Binary,
    Laptop,
} from "lucide-react";
import { useRef } from "react";

function TechStack() {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    // Background color animation
    const bgColor = useTransform(
        scrollYProgress,
        [0, 0.5, 1],
        ["#f9fafb", "#f3f4f6", "#f9fafb"]
    );

    // Title animation
    const titleScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.05]);
    const titleOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 1]);

    // Image container animation
    const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
    const imageOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 1]);

    const features = [
        {
            name: "Color Analysis",
            icon: <Palette className="h-5 w-5" />,
            description:
                "Detects subtle color variations indicating health conditions",
            color: "text-rose-500",
        },
        {
            name: "Texture Mapping",
            icon: <Scan className="h-5 w-5" />,
            description:
                "Identifies patterns and irregularities in tongue surface",
            color: "text-blue-500",
        },
        {
            name: "Shape Recognition",
            icon: <BrainCircuit className="h-5 w-5" />,
            description: "Analyzes tongue shape and size variations",
            color: "text-emerald-500",
        },
        {
            name: "Coating Analysis",
            icon: <Network className="h-5 w-5" />,
            description: "Measures coating distribution and density",
            color: "text-purple-500",
        },
    ];

    return (
        <motion.section
            ref={sectionRef}
            style={{ backgroundColor: bgColor }}
            className="py-32 relative overflow-hidden"
        >
            {/* Floating tech elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(18)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute opacity-10"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            rotate: useTransform(
                                scrollYProgress,
                                [0, 1],
                                [0, 360]
                            ),
                            scale: useTransform(
                                scrollYProgress,
                                [0, 1],
                                [1, 1.5]
                            ),
                        }}
                    >
                        {
                            [
                                <Cpu />,
                                <Database />,
                                <Eye />,
                                <Binary />,
                                <Laptop />,
                            ][i % 5]
                        }
                    </motion.div>
                ))}
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    {/* Left column - image */}
                    <motion.div
                        className="md:w-1/2"
                        style={{
                            y: imageY,
                            opacity: imageOpacity,
                        }}
                    >
                        <motion.div
                            className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border border-gray-200"
                            whileHover={{ scale: 1.02 }}
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            {/* Animated neural network visualization */}
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200">
                                {/* Simulated neural network nodes */}
                                {[...Array(15)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="absolute rounded-full bg-white shadow-sm"
                                        style={{
                                            width: Math.random() * 20 + 10,
                                            height: Math.random() * 20 + 10,
                                            left: `${Math.random() * 100}%`,
                                            top: `${Math.random() * 100}%`,
                                            opacity: useTransform(
                                                scrollYProgress,
                                                [0, 1],
                                                [0.5, 1]
                                            ),
                                            scale: useTransform(
                                                scrollYProgress,
                                                [0, 1],
                                                [0.8, 1.1]
                                            ),
                                        }}
                                    />
                                ))}

                                {/* Connecting lines */}
                                {[...Array(8)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="absolute bg-gray-300"
                                        style={{
                                            height: 2,
                                            width: useTransform(
                                                scrollYProgress,
                                                [0, 1],
                                                [0, Math.random() * 100 + 50]
                                            ),
                                            left: `${Math.random() * 100}%`,
                                            top: `${Math.random() * 100}%`,
                                            rotate: Math.random() * 360,
                                            opacity: useTransform(
                                                scrollYProgress,
                                                [0, 1],
                                                [0, 0.5]
                                            ),
                                        }}
                                    />
                                ))}

                                {/* Central visualization */}
                                <motion.div
                                    className="absolute inset-0 flex items-center justify-center"
                                    animate={{
                                        scale: [1, 1.05, 1],
                                        opacity: [0.9, 1, 0.9],
                                    }}
                                    transition={{
                                        duration: 6,
                                        repeat: Infinity,
                                        repeatType: "reverse",
                                    }}
                                >
                                    <div className="relative">
                                        <motion.div
                                            animate={{
                                                rotate: 360,
                                                scale: [1, 1.1, 1],
                                            }}
                                            transition={{
                                                duration: 12,
                                                repeat: Infinity,
                                                ease: "linear",
                                            }}
                                            className="h-32 w-32 rounded-full border-2 border-dashed border-gray-300"
                                        />
                                        <motion.div
                                            animate={{
                                                rotate: -360,
                                                scale: [1, 0.9, 1],
                                            }}
                                            transition={{
                                                duration: 8,
                                                repeat: Infinity,
                                                ease: "linear",
                                            }}
                                            className="absolute inset-0 m-auto h-24 w-24 rounded-full border-2 border-dashed border-gray-400"
                                        />
                                        <div className="absolute inset-0 m-auto flex items-center justify-center h-16 w-16 rounded-full bg-white shadow-md">
                                            <Cpu className="h-8 w-8 text-gray-600" />
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right column - content */}
                    <motion.div
                        className="md:w-1/2"
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <motion.div
                            style={{
                                scale: titleScale,
                                opacity: titleOpacity,
                            }}
                        >
                            <motion.h2
                                className="text-4xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent"
                                whileHover={{
                                    backgroundImage:
                                        "linear-gradient(to right, #9f1239, #6b21a8)",
                                }}
                            >
                                Advanced Computer Vision
                            </motion.h2>
                            <motion.div
                                className="h-1 bg-gradient-to-r from-rose-400 to-blue-400 mb-8"
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                transition={{ duration: 0.8 }}
                            />
                            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                
                            </p>
                        </motion.div>

                        <div className="space-y-6">
                            {features.map((feature, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{
                                        delay: 0.1 * i,
                                        duration: 0.5,
                                    }}
                                    whileHover={{
                                        x: 5,
                                        backgroundColor:
                                            "rgba(255, 255, 255, 1)",
                                    }}
                                    className="flex items-start p-4 rounded-xl transition-all shadow-sm hover:shadow-md bg-white/80 backdrop-blur-sm"
                                >
                                    <motion.div
                                        className={`flex-shrink-0 p-2 rounded-lg ${feature.color} bg-opacity-10`}
                                        whileHover={{
                                            scale: 1.2,
                                            rotate: 10,
                                        }}
                                    >
                                        {feature.icon}
                                    </motion.div>
                                    <div className="ml-4">
                                        <h4
                                            className={`text-lg font-semibold ${feature.color}`}
                                        >
                                            {feature.name}
                                        </h4>
                                        <p className="text-gray-600 text-sm mt-1">
                                            {feature.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
}

export default TechStack;
