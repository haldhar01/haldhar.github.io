"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sprout, ShoppingBag, ScrollText, CheckCircle, Clock, Search, MapPin } from "lucide-react";

// Mock Data
const orders = [
    { id: "#ORD-932", item: "Urea Fertilizer", qty: "50 kg", status: "Delivered", date: "2024-12-10", price: "₹600" },
    { id: "#ORD-935", item: "Cotton Seeds", qty: "20 kg", status: "Processing", date: "2024-12-22", price: "₹1,500" },
    { id: "#ORD-938", item: "Bio-Pesticide", qty: "5 L", status: "Shipped", date: "2024-12-20", price: "₹850" },
];

const contracts = [
    { id: "#CTR-2024-001", crop: "Wheat", qty: "1000 kg", rate: "₹25/kg", harvestDate: "2025-04-15", status: "Active" },
    { id: "#CTR-2023-045", crop: "Mustard", qty: "500 kg", rate: "₹50/kg", harvestDate: "2024-03-10", status: "Completed" },
];

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState("recommendation");

    // Form State
    const [soilData, setSoilData] = useState({ ph: "", moisture: "", season: "Rabi" });
    const [recommendation, setRecommendation] = useState<string[] | null>(null);

    const handleRecommend = (e: React.FormEvent) => {
        e.preventDefault();
        // Simple logic for demo
        const ph = parseFloat(soilData.ph);
        if (!ph) return;

        if (soilData.season === "Rabi") setRecommendation(["Wheat", "Mustard", "Barley"]);
        else if (soilData.season === "Kharif") setRecommendation(["Paddy", "Cotton", "Maize"]);
        else setRecommendation(["Cucumber", "Bitter Gourd", "Pumpkin"]);
    };

    return (
        <div className="min-h-screen bg-gray-50/50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Farmer Dashboard</h1>

                {/* Tabs */}
                <div className="flex flex-wrap gap-4 mb-8">
                    {[
                        { id: "recommendation", label: "Crop Recommendation", icon: <Sprout size={18} /> },
                        { id: "orders", label: "My Orders", icon: <ShoppingBag size={18} /> },
                        { id: "contracts", label: "Buyback Contracts", icon: <ScrollText size={18} /> },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${activeTab === tab.id
                                    ? "bg-green-700 text-white shadow-lg"
                                    : "bg-white text-gray-600 hover:bg-green-50"
                                }`}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {activeTab === "recommendation" && (
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                    <Search className="text-green-600" /> Soil Analysis
                                </h2>
                                <form onSubmit={handleRecommend} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Soil pH Level</label>
                                        <input
                                            type="number"
                                            step="0.1"
                                            placeholder="e.g. 6.5"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                                            value={soilData.ph}
                                            onChange={(e) => setSoilData({ ...soilData, ph: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Moisture (%)</label>
                                        <input
                                            type="number"
                                            placeholder="e.g. 40"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                                            value={soilData.moisture}
                                            onChange={(e) => setSoilData({ ...soilData, moisture: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Season</label>
                                        <select
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all bg-white"
                                            value={soilData.season}
                                            onChange={(e) => setSoilData({ ...soilData, season: e.target.value })}
                                        >
                                            <option value="Rabi">Rabi (Winter)</option>
                                            <option value="Kharif">Kharif (Monsoon)</option>
                                            <option value="Zaid">Zaid (Summer)</option>
                                        </select>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition-colors shadow-md mt-2"
                                    >
                                        Analyze & Recommend
                                    </button>
                                </form>
                            </div>

                            {/* Results */}
                            <div className="space-y-6">
                                {recommendation && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="bg-green-50 p-8 rounded-2xl border border-green-100"
                                    >
                                        <h3 className="text-lg font-semibold text-green-900 mb-4">Recommended Crops</h3>
                                        <div className="flex flex-wrap gap-3">
                                            {recommendation.map((crop) => (
                                                <span key={crop} className="bg-white text-green-800 px-4 py-2 rounded-full font-medium shadow-sm border border-green-100 flex items-center gap-2">
                                                    <Sprout size={16} /> {crop}
                                                </span>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                                <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                                    <h3 className="text-lg font-semibold text-blue-900 mb-2">Did you know?</h3>
                                    <p className="text-blue-800 text-sm">Testing your soil every 3 years can increase yield by up to 20%. Visit the nearest lab today.</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "orders" && (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm text-gray-600">
                                    <thead className="bg-gray-50 text-gray-900 font-medium">
                                        <tr>
                                            <th className="px-6 py-4">Order ID</th>
                                            <th className="px-6 py-4">Item</th>
                                            <th className="px-6 py-4">Quantity</th>
                                            <th className="px-6 py-4">Total</th>
                                            <th className="px-6 py-4">Status</th>
                                            <th className="px-6 py-4">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {orders.map((order) => (
                                            <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 font-medium text-gray-900">{order.id}</td>
                                                <td className="px-6 py-4">{order.item}</td>
                                                <td className="px-6 py-4">{order.qty}</td>
                                                <td className="px-6 py-4 font-medium">{order.price}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${order.status === "Delivered" ? "bg-green-100 text-green-700" :
                                                            order.status === "Shipped" ? "bg-blue-100 text-blue-700" :
                                                                "bg-amber-100 text-amber-700"
                                                        }`}>
                                                        {order.status === "Delivered" ? <CheckCircle size={14} /> : <Clock size={14} />}
                                                        {order.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">{order.date}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === "contracts" && (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {contracts.map(contract => (
                                <div key={contract.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <p className="text-xs text-gray-500 font-medium tracking-wide">CONTRACT ID</p>
                                            <p className="font-semibold text-gray-900">{contract.id}</p>
                                        </div>
                                        <span className={`px-2 py-1 rounded text-xs font-medium ${contract.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                                            {contract.status}
                                        </span>
                                    </div>
                                    <div className="space-y-2 mb-4">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">Crop</span>
                                            <span className="font-medium text-gray-900">{contract.crop}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">Quantity</span>
                                            <span className="font-medium text-gray-900">{contract.qty}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">Agreed Rate</span>
                                            <span className="font-medium text-gray-900">{contract.rate}</span>
                                        </div>
                                    </div>
                                    <div className="pt-4 border-t border-gray-100 text-sm flex items-center text-gray-500 gap-2">
                                        <Clock size={16} /> Harvest: {contract.harvestDate}
                                    </div>
                                </div>
                            ))}

                            {/* Add New Contract Card */}
                            <button className="border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center p-6 text-gray-400 hover:border-green-500 hover:text-green-500 transition-all group min-h-[200px]">
                                <div className="w-12 h-12 rounded-full bg-gray-50 group-hover:bg-green-50 flex items-center justify-center mb-3 transition-colors">
                                    <span className="text-2xl">+</span>
                                </div>
                                <span className="font-medium">Request New Contract</span>
                            </button>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
