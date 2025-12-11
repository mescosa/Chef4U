import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, TrendingUp, ChefHat, Users, Activity, Lightbulb } from 'lucide-react';
import { KITCHEN_HACKS } from '../utils/tipsData';
import { ViewState } from '../types';

interface HomeProps {
    setView: (view: ViewState) => void;
}

export const Home: React.FC<HomeProps> = ({ setView }) => {
    const [dailyTip, setDailyTip] = useState("Cargando truco...");

    useEffect(() => {
        // Select a random tip on mount
        const randomTip = KITCHEN_HACKS[Math.floor(Math.random() * KITCHEN_HACKS.length)];
        setDailyTip(randomTip);
    }, []);

    return (
        <div className="pb-24">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-orange-400 to-red-500 text-white p-6 pt-10 rounded-b-[2.5rem] shadow-xl mb-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full translate-x-10 -translate-y-10 blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-yellow-300 opacity-20 rounded-full -translate-x-5 translate-y-5 blur-xl"></div>

                <div className="relative z-10">
                    <h1 className="text-4xl font-black mb-2 tracking-tight">Chef4U</h1>
                    <p className="text-orange-50 text-lg font-medium mb-6 max-w-xs">Cocina fácil, come rico y ahorra dinero. Todo en una sola app.</p>

                    <button
                        onClick={() => setView('fridge')}
                        className="bg-white text-orange-600 font-bold py-3 px-6 rounded-full shadow-lg flex items-center gap-2 hover:bg-gray-50 transition-transform active:scale-95"
                    >
                        Empezar a cocinar <ArrowRight size={18} />
                    </button>
                </div>
            </div>

            <div className="px-5">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Herramientas</h2>

                <div className="grid grid-cols-2 gap-4">
                    {/* Feature Card 1: Fridge */}
                    <div
                        onClick={() => setView('fridge')}
                        className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center gap-3 cursor-pointer hover:shadow-md transition-shadow group"
                    >
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 group-hover:scale-110 transition-transform">
                            <ChefHat size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-800 text-sm">Mi Nevera</h3>
                            <p className="text-[10px] text-gray-500 leading-tight mt-1">Recetas con lo que tienes</p>
                        </div>
                    </div>

                    {/* Feature Card 2: Nutritionist (New) */}
                    <div
                        onClick={() => setView('nutritionist')}
                        className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center gap-3 cursor-pointer hover:shadow-md transition-shadow group"
                    >
                        <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                            <Activity size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-800 text-sm">Nutricionista</h3>
                            <p className="text-[10px] text-gray-500 leading-tight mt-1">Planes personalizados</p>
                        </div>
                    </div>

                    {/* Feature Card 3: Forum */}
                    <div
                        onClick={() => setView('forum')}
                        className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center gap-3 cursor-pointer hover:shadow-md transition-shadow group"
                    >
                        <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center text-pink-600 group-hover:scale-110 transition-transform">
                            <Users size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-800 text-sm">Comunidad</h3>
                            <p className="text-[10px] text-gray-500 leading-tight mt-1">Comparte y aprende</p>
                        </div>
                    </div>

                    {/* Feature Card 4: AI Chat */}
                    <div
                        onClick={() => setView('recipes')}
                        className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center gap-3 cursor-pointer hover:shadow-md transition-shadow group"
                    >
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform">
                            <Sparkles size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-800 text-sm">Chat Chef</h3>
                            <p className="text-[10px] text-gray-500 leading-tight mt-1">Preguntas y dudas</p>
                        </div>
                    </div>
                </div>

                {/* Feature Wide Card: Prices */}
                <div
                    onClick={() => setView('prices')}
                    className="mt-4 bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 cursor-pointer hover:shadow-md transition-shadow group"
                >
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                        <TrendingUp size={24} />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-800">Comparador de Precios</h3>
                        <p className="text-xs text-gray-500">Encuentra el súper más barato</p>
                    </div>
                </div>

                {/* Daily Tip / Truco */}
                <div className="mt-8 bg-yellow-50 border border-yellow-100 rounded-2xl p-5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 -mt-2 -mr-2 text-yellow-200">
                        <Sparkles size={64} opacity={0.5} />
                    </div>
                    <h3 className="font-bold text-yellow-800 mb-1 relative z-10 flex items-center gap-2">
                        <Lightbulb size={18} /> Truco Chef4U
                    </h3>
                    <p className="text-sm text-yellow-700 relative z-10 font-medium">
                        {dailyTip}
                    </p>
                </div>
            </div>
        </div>
    );
};