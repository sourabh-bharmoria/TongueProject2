"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Leaf, AlertTriangle, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

interface AnalysisResult {
    score: number;
    metrics: {
        color: number;
        coating: number;
        texture: number;
        shape: number;
    };
    recommendations: string[];
}

const ResultsDisplay = ({ result }: { result: AnalysisResult }) => {
    const getScoreData = (score: number) => {
        if (score >= 8)
            return {
                level: "Excellent",
                icon: <CheckCircle className="h-8 w-8 text-green-500" />,
                color: "text-green-600",
                bg: "bg-green-50",
                barColor: "bg-green-500",
                message: "Your tongue shows excellent health indicators!",
            };
        if (score >= 5)
            return {
                level: "Moderate",
                icon: <Leaf className="h-8 w-8 text-amber-500" />,
                color: "text-amber-600",
                bg: "bg-amber-50",
                barColor: "bg-amber-500",
                message:
                    "Your tongue shows some variations that may need attention",
            };
        return {
            level: "Poor",
            icon: <AlertTriangle className="h-8 w-8 text-red-500" />,
            color: "text-red-600",
            bg: "bg-red-50",
            barColor: "bg-red-500",
            message:
                "Your tongue shows significant deviations from optimal health",
        };
    };

    const scoreData = getScoreData(result.score);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4"
        >
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
                    Your Tongue Analysis Results
                </h1>

                {/* Simplified Score Display */}
                <motion.div
                    initial={{ y: 20 }}
                    animate={{ y: 0 }}
                    className={`${scoreData.bg} rounded-2xl p-6 mb-8 shadow-sm flex flex-col items-center`}
                >
                    <div className="flex items-center gap-4 mb-4">
                        {scoreData.icon}
                        <div>
                            <h2
                                className={`text-xl font-semibold ${scoreData.color}`}
                            >
                                Overall Health: {scoreData.level}
                            </h2>
                            <p className="text-gray-600">{scoreData.message}</p>
                        </div>
                    </div>

                    <div className="w-full max-w-md">
                        <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium text-gray-700">
                                Your score: {result.score.toFixed(1)}/10
                            </span>
                            <span className="text-sm font-medium text-gray-500">
                                {scoreData.level}
                            </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{
                                    width: `${(result.score / 10) * 100}%`,
                                }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                className={`h-full rounded-full ${scoreData.barColor}`}
                            />
                        </div>
                        <div className="flex justify-between mt-1">
                            <span className="text-xs text-gray-500">
                                0 (Poor)
                            </span>
                            <span className="text-xs text-gray-500">
                                10 (Excellent)
                            </span>
                        </div>
                    </div>
                </motion.div>

                {/* Your Original Detailed Metrics - UNCHANGED */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {Object.entries(result.metrics).map(([metric, value]) => (
                        <motion.div
                            key={metric}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white p-4 rounded-xl shadow-sm border border-gray-100"
                        >
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="font-medium capitalize text-gray-700">
                                    {metric}
                                </h3>
                                <span
                                    className={`text-sm font-semibold ${
                                        value >= 8
                                            ? "text-green-600"
                                            : value >= 5
                                            ? "text-amber-600"
                                            : "text-red-600"
                                    }`}
                                >
                                    {value}/10
                                </span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-2">
                                <div
                                    className={`h-2 rounded-full ${
                                        value >= 8
                                            ? "bg-green-500"
                                            : value >= 5
                                            ? "bg-amber-500"
                                            : "bg-red-500"
                                    }`}
                                    style={{ width: `${(value / 10) * 100}%` }}
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Enhanced Recommendations Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="bg-blue-50 rounded-2xl p-6 border border-blue-200"
                >
                    <h2 className="text-xl font-semibold text-blue-700 mb-4">
                        Personalized Recommendations
                    </h2>
                    <ul className="space-y-3">
                        {result.recommendations.map((rec, i) => (
                            <motion.li
                                key={i}
                                initial={{ x: -20 }}
                                animate={{ x: 0 }}
                                transition={{ delay: 0.5 + i * 0.1 }}
                                className="flex items-start gap-3 bg-white/80 p-3 rounded-lg"
                            >
                                <ArrowRight className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700">{rec}</span>
                            </motion.li>
                        ))}
                    </ul>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4 mt-8"
                >
                    <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl font-medium hover:shadow-md transition-all">
                        Save Full Report
                    </button>
                    <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors">
                        Take Another Test
                    </button>
                </motion.div>
            </div>
        </motion.div>
    );
};

const sampleResult: AnalysisResult = {
    score: 5,
    metrics: {
        color: 8,
        coating: 10,
        texture: 7,
        shape: 5,
    },
    recommendations: [
        "Increase water intake to improve tongue coating",
        "Consider reducing spicy foods to improve tongue color",
        "Practice tongue scraping daily for better texture",
        "Consult a TCM practitioner for shape analysis",
    ],
};

export default function ResultsPage() {
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {


        const storedResults = sessionStorage.getItem("analysisResults");

        if (storedResults) {
            try {
                const parsed = JSON.parse(storedResults);

                setResult(parsed);
            } catch (error) {
                console.error("Failed to parse results:", error);
                setResult({
                    score: 0,
                    metrics: { color: 0, coating: 0, texture: 0, shape: 0 },
                    recommendations: ["Error parsing results"],
                });
            }
        } else {
            console.warn("No analysisResults found in sessionStorage");
            setResult({
                score: 0,
                metrics: { color: 0, coating: 0, texture: 0, shape: 0 },
                recommendations: ["Please complete the analysis first"],
            });
        }

        setLoading(false);

        return () => {

        };
    }, []);
    if (loading) {
        return <div className="text-center p-8">Loading results...</div>;
    }

    if (!result) {
        return (
            <div className="text-center p-8">
                <h2>No Results Found</h2>
                <p>Please complete the tongue analysis first</p>
                <Link
                    href="/send-image"
                    className="text-blue-500 mt-4 inline-block"
                >
                    Go to Analysis
                </Link>
            </div>
        );
    }

    return <ResultsDisplay result={result} />;
}
