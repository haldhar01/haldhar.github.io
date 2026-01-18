"use client";

import { useState, useEffect } from "react";
import { Search, MapPin, Wind, Droplets, CloudRain } from "lucide-react";
import { motion } from "framer-motion";

const API_KEY = "b35c4f0ee6f060f01db25f991d79ee74";

export default function Weather() {
    const [city, setCity] = useState("Kolkata"); // Default
    const [weatherData, setWeatherData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchWeather = async (queryCity: string) => {
        setLoading(true);
        setError("");
        try {
            const res = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?q=${queryCity}&appid=${API_KEY}&units=metric`
            );
            if (!res.ok) throw new Error("City not found");
            const data = await res.json();
            setWeatherData(data);
        } catch (err) {
            setError("Failed to fetch weather data. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWeather(city);
    }, []); // Initial fetch

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        fetchWeather(city);
    };

    // Group forecast by day
    const dailyForecast = weatherData?.list.reduce((acc: any, item: any) => {
        const date = item.dt_txt.split(" ")[0];
        if (!acc[date]) acc[date] = [];
        acc[date].push(item);
        return acc;
    }, {});

    return (
        <div className="min-h-screen bg-blue-50/30 py-12">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
                    <CloudRain className="text-blue-600" /> Live Weather Forecast
                </h1>

                {/* Search */}
                <form onSubmit={handleSearch} className="mb-8 relative max-w-lg">
                    <input
                        type="text"
                        placeholder="Enter city name..."
                        className="w-full pl-12 pr-4 py-4 rounded-full border border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <button
                        type="submit"
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-medium transition-colors"
                    >
                        Check
                    </button>
                </form>

                {loading && <div className="text-center py-20 text-blue-600">Loading weather data...</div>}
                {error && <div className="text-center py-12 text-red-500 bg-red-50 rounded-xl">{error}</div>}

                {weatherData && !loading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-8"
                    >
                        {/* Current Weather Card */}
                        <div className="bg-white rounded-3xl shadow-lg border border-blue-100 p-8 md:p-12 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full blur-3xl -mr-16 -mt-16 opacity-50"></div>

                            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
                                <div>
                                    <h2 className="text-4xl font-bold text-gray-900 mb-2">{weatherData.city.name}</h2>
                                    <p className="text-blue-600 font-medium flex items-center justify-center md:justify-start gap-1">
                                        <MapPin size={16} /> {weatherData.city.country}
                                    </p>
                                    <div className="mt-6">
                                        <span className="text-7xl font-bold text-gray-900">
                                            {Math.round(weatherData.list[0].main.temp)}°
                                        </span>
                                        <p className="text-xl text-gray-500 capitalize">{weatherData.list[0].weather[0].description}</p>
                                    </div>
                                </div>

                                <div className="mt-8 md:mt-0 grid grid-cols-2 gap-6">
                                    <div className="bg-blue-50 p-4 rounded-2xl flex flex-col items-center min-w-[120px]">
                                        <Wind className="text-blue-500 mb-2" />
                                        <span className="text-sm text-gray-500">Wind</span>
                                        <strong className="text-lg text-gray-900">{weatherData.list[0].wind.speed} km/h</strong>
                                    </div>
                                    <div className="bg-blue-50 p-4 rounded-2xl flex flex-col items-center min-w-[120px]">
                                        <Droplets className="text-blue-500 mb-2" />
                                        <span className="text-sm text-gray-500">Humidity</span>
                                        <strong className="text-lg text-gray-900">{weatherData.list[0].main.humidity}%</strong>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 5-Day Forecast */}
                        <h3 className="text-xl font-bold text-gray-800 mt-12 mb-6">5-Day Forecast</h3>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                            {Object.keys(dailyForecast).slice(0, 5).map((date, index) => {
                                const dayData = dailyForecast[date][0];
                                const temps = dailyForecast[date].map((d: any) => d.main.temp);
                                const min = Math.min(...temps).toFixed(0);
                                const max = Math.max(...temps).toFixed(0);

                                return (
                                    <motion.div
                                        key={date}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow"
                                    >
                                        <p className="text-gray-500 text-sm mb-2">{new Date(date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}</p>
                                        <div className="text-3xl mb-4">
                                            {/* Simple icon logic based on desc */}
                                            {dayData.weather[0].main === "Clear" ? "☀️" : dayData.weather[0].main === "Clouds" ? "☁️" : "🌧️"}
                                        </div>
                                        <div className="flex justify-center gap-3 font-medium">
                                            <span className="text-gray-900">{max}°</span>
                                            <span className="text-gray-400">{min}°</span>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
