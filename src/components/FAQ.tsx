"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
const FAQ = () => {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 max-w-3xl">
                <h2 className="text-3xl font-bold text-center mb-12">
                    Frequently Asked Questions
                </h2>

                <div className="space-y-4">
                    {[
                        {
                            question: "How accurate is the AI diagnosis?",
                            answer: "Our model achieves 95% accuracy compared to expert practitioners in clinical trials...",
                        },
                        {
                            question: "What conditions can it detect?",
                            answer: "The system identifies patterns associated with digestive health, hydration levels...",
                        },
                        {
                            question: "Is my health data secure?",
                            answer: "We use end-to-end encryption and never sell or share your personal health data...",
                        },
                        {
                            question: "Can I use this alongside my doctor?",
                            answer: "Absolutely! This tool is designed to complement professional medical advice...",
                        },
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ x: 5 }}
                            className="border border-gray-200 rounded-lg overflow-hidden"
                        >
                            <motion.button
                                className="w-full flex justify-between items-center p-6 text-left"
                                whileTap={{ backgroundColor: "#f9fafb" }}
                            >
                                <h3 className="font-semibold">
                                    {item.question}
                                </h3>
                                <ChevronDown className="h-5 w-5 text-gray-500" />
                            </motion.button>
                            <motion.div
                                className="px-6 pb-6 text-gray-600"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                {item.answer}
                            </motion.div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <p className="text-gray-600 mb-6">Still have questions?</p>
                    <Button
                        variant="outline"
                        className="border-rose-500 text-rose-500 hover:bg-rose-50"
                    >
                        Contact Support
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
