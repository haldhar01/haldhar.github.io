"use client";

import { useState, useEffect } from "react";
import { Search, Filter, TrendingUp, Loader2, AlertCircle } from "lucide-react";

// Mock Data (Fallback)
const MOCK_RATES = [
    { state: "Rajasthan", district: "Jaipur", market: "Jaipur Mandi", commodity: "Wheat", min_price: "2150", max_price: "2300", date: "23/12/2024" },
    { state: "Rajasthan", district: "Kota", market: "Kota Mandi", commodity: "Soybean", min_price: "4200", max_price: "4500", date: "23/12/2024" },
    { state: "Gujarat", district: "Surat", market: "Surat Mandi", commodity: "Cotton", min_price: "5900", max_price: "6200", date: "22/12/2024" },
    { state: "Gujarat", district: "Rajkot", market: "Rajkot APMC", commodity: "Groundnut", min_price: "5500", max_price: "5800", date: "22/12/2024" },
    { state: "Madhya Pradesh", district: "Indore", market: "Indore Mandi", commodity: "Wheat", min_price: "2200", max_price: "2450", date: "23/12/2024" },
];

export default function MandiRates() {
    const [rates, setRates] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [filters, setFilters] = useState({ state: "", commodity: "" });
    const [search, setSearch] = useState("");

    // NOTE: This usually comes from specific resource IDs on data.gov.in
    // You need a valid API key from https://data.gov.in/
    const API_KEY = process.env.NEXT_PUBLIC_DATA_GOV_API_KEY || "";
    const RESOURCE_ID = "9ef84268-d588-465a-a308-a864a43d0070";

    useEffect(() => {
        fetchRates();
    }, []);

    const fetchRates = async () => {
        setLoading(true);
        setError("");

        if (!API_KEY) {
            console.warn("No API Key found. Using mock data.");
            setRates(MOCK_RATES);
            setLoading(false);
            return;
        }

        try {
            const res = await fetch(
                `https://api.data.gov.in/resource/${RESOURCE_ID}?api-key=${API_KEY}&format=json&limit=100`
            );

            if (!res.ok) throw new Error("Failed to fetch from API");

            const data = await res.json();
            if (data.records) {
                setRates(data.records);
            } else {
                // API might return different structure or limit reached
                setRates(MOCK_RATES);
            }
        } catch (err) {
            console.error(err);
            setError("Could not load live data. Showing offline data.");
            setRates(MOCK_RATES);
        } finally {
            setLoading(false);
        }
    };

    const filteredRates = rates.filter((rate) => {
        const market = rate.market || rate.mandi || "";
        const commodity = rate.commodity || rate.crop || "";
        const state = rate.state || "";

        const matchesState = filters.state === "" || state === filters.state;
        const matchesCommodity = filters.commodity === "" || commodity === filters.commodity;
        const matchesSearch = search === "" ||
            market.toLowerCase().includes(search.toLowerCase()) ||
            commodity.toLowerCase().includes(search.toLowerCase());

        return matchesState && matchesCommodity && matchesSearch;
    });

    const uniqueStates = Array.from(new Set(rates.map((r) => r.state).filter(Boolean)));
    const uniqueCommodities = Array.from(new Set(rates.map((r) => r.commodity || r.crop).filter(Boolean)));

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Mandi API Rates</h1>
                        <p className="text-gray-500">
                            {API_KEY ? "Live data from data.gov.in" : "Showing demo data (Config API Key for live rates)"}
                        </p>
                    </div>

                    <div className="flex gap-2">
                        <div className="bg-white p-2 rounded-lg border border-gray-200 shadow-sm flex items-center gap-2 text-sm text-green-700 font-medium">
                            <TrendingUp size={16} /> Market Trend: Bullish
                        </div>
                    </div>
                </div>

                {/* Error / Status Banner */}
                {!API_KEY && (
                    <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-xl mb-6 flex items-center gap-2 text-sm">
                        <AlertCircle size={16} />
                        <span>To get live real-time data, add your <strong>NEXT_PUBLIC_DATA_GOV_API_KEY</strong> to the .env file. using mock data for now.</span>
                    </div>
                )}
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-xl mb-6 flex items-center gap-2 text-sm">
                        <AlertCircle size={16} />
                        <span>{error}</span>
                    </div>
                )}

                {/* Filters */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="relative col-span-2">
                            <input
                                type="text"
                                placeholder="Search mandi or commodity..."
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-green-500 transition-all font-medium"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        </div>

                        <div className="relative">
                            <select
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-green-500 transition-all appearance-none cursor-pointer bg-white"
                                value={filters.state}
                                onChange={(e) => setFilters({ ...filters, state: e.target.value })}
                            >
                                <option value="">All States</option>
                                {uniqueStates.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        </div>

                        <div className="relative">
                            <select
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-green-500 transition-all appearance-none cursor-pointer bg-white"
                                value={filters.commodity}
                                onChange={(e) => setFilters({ ...filters, commodity: e.target.value })}
                            >
                                <option value="">All Commodities</option>
                                {uniqueCommodities.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        </div>
                    </div>
                </div>

                {/* Rates Table */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden min-h-[400px]">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center h-64 text-green-600">
                            <Loader2 className="animate-spin mb-2" size={32} />
                            <p>Fetching latest rates...</p>
                        </div>
                    ) : (
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-green-50/50">
                                <tr>
                                    <th className="p-5 font-semibold text-gray-700">Market / Mandi</th>
                                    <th className="p-5 font-semibold text-gray-700">State</th>
                                    <th className="p-5 font-semibold text-gray-700">Commodity</th>
                                    <th className="p-5 font-semibold text-gray-700 text-right">Min Price (₹)</th>
                                    <th className="p-5 font-semibold text-gray-700 text-right">Max Price (₹)</th>
                                    <th className="p-5 font-semibold text-gray-700 text-right">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredRates.length > 0 ? (
                                    filteredRates.map((rate, idx) => (
                                        <tr key={idx} className="hover:bg-gray-50 transition-colors">
                                            <td className="p-5 font-medium text-gray-900">{rate.market || rate.mandi}</td>
                                            <td className="p-5 text-gray-600">{rate.state}</td>
                                            <td className="p-5">
                                                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
                                                    {rate.commodity || rate.crop}
                                                </span>
                                            </td>
                                            <td className="p-5 text-right font-medium text-gray-700">₹{rate.min_price || rate.min}</td>
                                            <td className="p-5 text-right font-bold text-green-700">₹{rate.max_price || rate.max}</td>
                                            <td className="p-5 text-right text-sm text-gray-500">{rate.arrival_date || rate.date}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="p-10 text-center text-gray-500">No rates found matching your criteria.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}
