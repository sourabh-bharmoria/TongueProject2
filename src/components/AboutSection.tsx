"use client";
import React from "react";
import { motion } from "framer-motion";
import {
    Leaf,
    HeartPulse,
    BrainCircuit,
    ScanEye,
    Award,
    Clock,
    Users,
} from "lucide-react";
import { MeetTheTeam } from "@/components/MeetTheTeam";

const AboutSection = () => {
    const features = [
        {
            icon: <ScanEye className="h-8 w-8 text-rose-500" />,
            title: "AI-Powered Analysis",
            description:
                "Our deep learning model analyzes tongue features with clinical accuracy",
        },
        {
            icon: <BrainCircuit className="h-8 w-8 text-blue-500" />,
            title: "Rapid Prototyping",
            description: "Built in 72 hours during the AITeck Hackathon",
        },
        {
            icon: <Leaf className="h-8 w-8 text-green-500" />,
            title: "Holistic Approach",
            description: "Combining TCM wisdom with modern technology",
        },
    ];

    const hackathonDetails = [
        {
            icon: <Clock className="h-6 w-6" />,
            text: "72-hour intensive development",
        },
        {
            icon: <Users className="h-6 w-6" />,
            text: "Team of 4 cross-disciplinary developers",
        },
        {
            icon: <Award className="h-6 w-6" />,
            text: "Mentored by HCLTech and IIT Mandi experts",
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-gradient-to-b from-gray-50 to-white"
            id="about"
        >
            <div className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                {/* Hero Section */}

                {/* Hackathon Story */}
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-16 border border-gray-100">
                    <div className="grid grid-cols-1 ">
                        <div className="bg-gray-50 flex items-center justify-center p-8">
                            <div className="bg-gradient-to-br from-blue-50 to-rose-50 rounded-xl p-8 w-full h-full flex items-center justify-center">
                                <div className="text-center">
                                    <Award className="h-12 w-12 mx-auto text-rose-500 mb-4" />
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                        AITeck Hackathon 2025
                                    </h3>
                                    <p className="text-gray-600">
                                        HCLTech × IIT Mandi
                                    </p>
                                    <p className="text-sm text-gray-500 mt-4">
                                        May 2-4, 2025
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features Grid */}
                {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
                        >
                            <div className="flex justify-center mb-4">
                                <div className="p-3 rounded-full bg-gray-50">
                                    {feature.icon}
                                </div>
                            </div>
                            <h3 className="text-xl font-semibold text-center mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 text-center">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div> */}

                {/* Team Section */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-12">
                        Meet The Team
                    </h2>
                    <MeetTheTeam />
                </div>

                {/* CTA Section */}
                {/* <div className="bg-gradient-to-r from-blue-500 to-rose-500 rounded-2xl p-12 text-center text-white">
                    <h2 className="text-3xl font-bold mb-4">
                        Experience Our Hackathon Innovation
                    </h2>
                    <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                        Try our proof-of-concept that blends traditional
                        diagnostics with AI technology
                    </p>
                </div> */}
            </div>
        </motion.div>
    );
};

export default AboutSection;
