"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const emails = [
    "s23118@students.iitmandi.ac.in",
    "s23117@students.iitmandi.ac.in",
    "s23096@students.iitmandi.ac.in",
    "b21001@students.iitmandi.ac.in",
    "b21251@students.iitmandi.ac.in",
    "b21158@students.iitmandi.ac.in",
];

export default function Footer() {
    return (
        <motion.footer
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="bg-black text-white py-10 px-6 md:px-20"
        >
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                {/* Logos Section */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold"></h3>
                    <div className="flex gap-4 flex-wrap">
                        {/* Replace these with actual logo images */}
                        <Image
                            src="/hcl.png"
                            width={200}
                            height={50}
                            alt="HCL"
                        />
                        <Image
                            src="/logo.png"
                            width={50}
                            height={50}
                            alt="HCL"
                            className="rounded-full object-cover object-center"
                        />
                    </div>
                </div>

                {/* Contact Section */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Contact Us</h3>
                    <ul className="space-y-1 text-sm text-neutral-300">
                        {emails.map((email) => (
                            <li key={email}>
                                <Link
                                    href={`mailto:${email}`}
                                    className="hover:underline"
                                >
                                    {email}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Copyright */}
                <div className="md:text-right space-y-2 text-sm text-neutral-400">
                    <p>
                        &copy; {new Date().getFullYear()} All rights reserved.
                    </p>
                    <p></p>
                </div>
            </div>
        </motion.footer>
    );
}
