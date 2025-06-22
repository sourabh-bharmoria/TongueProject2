"use client";

import { CheckCircleIcon, ClockIcon, CpuIcon, XCircleIcon } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";

const Comparision = () => {
    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-16">
                    Traditional vs AI Diagnosis
                </h2>

                <div className="grid md:grid-cols-2 gap-8">
                    <motion.div
                        whileHover={{ y: -10 }}
                        className="bg-white p-8 rounded-2xl shadow-md"
                    >
                        <div className="flex items-center mb-6">
                            <div className="bg-rose-100 p-3 rounded-full mr-4">
                                <ClockIcon className="h-6 w-6 text-rose-600" />
                            </div>
                            <h3 className="text-xl font-semibold">
                                Traditional Method
                            </h3>
                        </div>
                        <ul className="space-y-4 text-gray-600">
                            {[
                                "Subjective visual assessment",
                                "Requires specialist training",
                                "Time-consuming process",
                                "Hard to track changes over time",
                            ].map((item, i) => (
                                <li key={i} className="flex">
                                    <XCircleIcon className="h-5 w-5 text-rose-500 mr-2 mt-0.5" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div
                        whileHover={{ y: -10 }}
                        className="bg-white p-8 rounded-2xl shadow-md border-2 border-emerald-500 relative"
                    >
                        <div className="absolute top-4 right-4 bg-emerald-500 text-white text-xs px-2 py-1 rounded-full">
                            Our Solution
                        </div>
                        <div className="flex items-center mb-6">
                            <div className="bg-emerald-100 p-3 rounded-full mr-4">
                                <CpuIcon className="h-6 w-6 text-emerald-600" />
                            </div>
                            <h3 className="text-xl font-semibold">
                                AI-Powered Analysis
                            </h3>
                        </div>
                        <ul className="space-y-4 text-gray-600">
                            {[
                                "Objective quantitative measurements",
                                "Instant automated assessment",
                                "Standardized results",
                                "Digital health tracking over time",
                            ].map((item, i) => (
                                <li key={i} className="flex">
                                    <CheckCircleIcon className="h-5 w-5 text-emerald-500 mr-2 mt-0.5" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Comparision;
