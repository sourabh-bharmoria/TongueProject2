"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function SpecialThanks() {
  return (
    <section className="py-16 bg-white dark:bg-neutral-900">
      <div className="max-w-4xl mx-auto text-center px-4">
        <motion.h2
          className="text-4xl font-bold text-gray-800 dark:text-white mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Special Thanks
        </motion.h2>

        <motion.div
          className="inline-flex flex-col items-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="w-32 h-32 relative rounded-full overflow-hidden shadow-lg mb-4 border-4 border-gray-200 dark:border-neutral-700">
            <Image
              src="/dradityanigam.png"
              alt="Special Person"
              fill
              className="object-cover"
              priority
            />
          </div>
          <p className="text-xl font-semibold text-gray-700 dark:text-gray-300">
          Dr. Aditya Nigam
          </p>
        </motion.div>
      </div>
    </section>
  );
}
