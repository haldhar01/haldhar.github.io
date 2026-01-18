"use client";

import { motion } from "framer-motion";
import { Linkedin, Twitter, Mail } from "lucide-react";
import Image from "next/image";

export default function About() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero */}
            <section className="bg-green-50 py-20 px-4 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
                >
                    About <span className="text-green-700">Halधर</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
                >
                    We are a team of passionate developers and agricultural enthusiasts committed to transforming farming through technology.
                </motion.p>
            </section>

            {/* Mission */}
            <section className="py-16 max-w-4xl mx-auto px-4">
                <div className="prose prose-lg mx-auto text-gray-600">
                    <p>
                        "Halधर" is not just a startup — it's a companion to every farmer's hope. Our land is not just soil, it's the root of our dreams. We bring smart solutions to every field — from soil analysis to direct market access.
                    </p>
                    <p>
                        We analyze your soil and suggest the most profitable crops, supply agri-inputs at fair prices, and ensure buyback. Every drop of your sweat is sacred to us, and we are committed to turning it into profit.
                    </p>
                </div>
            </section>

            {/* Founders */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Meet the Founders</h2>
                    <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">

                        {/* Founder 1 */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm text-center border border-gray-100">
                            <div className="w-24 h-24 bg-green-100 rounded-full mx-auto mb-6 flex items-center justify-center text-3xl">👨‍💻</div>
                            <h3 className="text-xl font-bold text-gray-900">Abhimanyu Patidar</h3>
                            <p className="text-green-600 font-medium mb-4">Co-Founder</p>
                            <div className="flex justify-center gap-4 text-gray-400">
                                <a href="#" className="hover:text-blue-600"><Linkedin size={20} /></a>
                                <a href="#" className="hover:text-blue-400"><Twitter size={20} /></a>
                                <a href="#" className="hover:text-gray-900"><Mail size={20} /></a>
                            </div>
                        </div>

                        {/* Founder 2 */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm text-center border border-gray-100">
                            <div className="w-24 h-24 bg-blue-100 rounded-full mx-auto mb-6 flex items-center justify-center text-3xl">👨‍💼</div>
                            <h3 className="text-xl font-bold text-gray-900">Vishnu Skanda</h3>
                            <p className="text-green-600 font-medium mb-4">Co-Founder</p>
                            <div className="flex justify-center gap-4 text-gray-400">
                                <a href="#" className="hover:text-blue-600"><Linkedin size={20} /></a>
                                <a href="#" className="hover:text-blue-400"><Twitter size={20} /></a>
                                <a href="#" className="hover:text-gray-900"><Mail size={20} /></a>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
}
