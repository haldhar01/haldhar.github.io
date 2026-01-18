"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sprout, TrendingUp, Truck, HandCoins } from "lucide-react";
import Image from "next/image";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const services = [
    {
      title: "Smart Recommendations",
      desc: "Get AI-driven crop suggestions based on your soil health and season.",
      icon: <Sprout className="text-green-600" size={32} />,
    },
    {
      title: "Mandi Rates",
      desc: "Live market prices from mandis across Rajasthan and Gujarat.",
      icon: <TrendingUp className="text-blue-600" size={32} />,
    },
    {
      title: "Input Delivery",
      desc: "Order seeds, fertilizers, and tools at fair prices directly to your farm.",
      icon: <Truck className="text-orange-600" size={32} />,
    },
    {
      title: "Buyback Guarantee",
      desc: "Secure your profit with our pre-harvest buyback contracts.",
      icon: <HandCoins className="text-purple-600" size={32} />,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-green-900 via-green-800 to-green-900">

        {/* Background Image with Low Opacity */}
        <div className="absolute inset-0 z-0 opacity-20 user-select-none pointer-events-none">
          <Image
            src="/farmland.png"
            alt="Farmland Background"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Abstract Gradient Overlay for depth */}
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-green-950/80 via-transparent to-green-900/40" />

        <motion.div
          className="relative z-10 text-center px-4 max-w-4xl mx-auto text-white flex flex-col items-center"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >


          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 tracking-tight drop-shadow-lg"
            variants={itemVariants}
          >
            Soil to <span className="text-green-400">Success</span>
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-8 text-gray-100 max-w-2xl mx-auto font-light"
            variants={itemVariants}
          >
            Empowering farmers with smart insights, direct market access, and guaranteed buyback.
          </motion.p>
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dashboard"
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all transform hover:scale-105 shadow-xl flex items-center justify-center gap-2"
            >
              Get Started <ArrowRight size={20} />
            </Link>
            <Link
              href="/about"
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/30 px-8 py-4 rounded-full font-semibold text-lg transition-all"
            >
              Learn More
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">Our Services</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive solutions designed to maximize your yield and profit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 p-8 rounded-2xl hover:shadow-lg transition-shadow border border-gray-100"
              >
                <div className="bg-white w-16 h-16 rounded-xl flex items-center justify-center mb-6 shadow-sm border border-gray-100">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission/Quote Section */}
      <section className="py-20 bg-green-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Sprout className="mx-auto text-green-600 mb-6" size={48} />
          <blockquote className="text-2xl md:text-3xl font-medium text-gray-800 italic mb-8 leading-relaxed">
            "Our land is not just soil, it's the root of our dreams. Halधर is born from the smile of every farmer."
          </blockquote>
          <cite className="text-gray-600 font-semibold not-italic">
            — Founders of Halधर
          </cite>
        </div>
      </section>
    </div>
  );
}
