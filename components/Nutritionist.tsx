import React, { useState } from 'react';
import { Activity, Check, ChevronRight, Scale, Ruler, Calendar, Zap, Loader2, ArrowLeft } from 'lucide-react';
import { NutritionProfile, NutritionPlan } from '../types';
import { generateNutritionPlan } from '../services/geminiService';

export const Nutritionist: React.FC = () => {
  const [step, setStep] = useState<'form' | 'loading' | 'plan'>('form');
  const [profile, setProfile] = useState<NutritionProfile>({
    age: '',
    weight: '',
    height: '',
    goal: 'Perder peso',
    speed: 'Moderado'
  });
  const [plan, setPlan] = useState<NutritionPlan | null>(null);

  const handleGenerate = async () => {
    if (!profile.age || !profile.weight || !profile.height) return;
    
    setStep('loading');
    try {
      const result = await generateNutritionPlan(profile);
      setPlan(result);
      setStep('plan');
    } catch (error) {
      alert("Hubo un error generando el plan. Verifica tu API Key o intenta más tarde.");
      setStep('form');
    }
  };

  const reset = () => {
    setStep('form');
    setPlan(null);
  };

  if (step === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] p-6 text-center">
        <div className="relative mb-6">
            <div className="absolute inset-0 bg-green-200 rounded-full animate-ping opacity-25"></div>
            <div className="relative bg-green-100 p-4 rounded-full text-green-600">
                <Loader2 size={48} className="animate-spin" />
            </div>
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Analizando tu perfil...</h3>
        <p className="text-gray-500">Nuestra IA está calculando tus necesidades calóricas y diseñando tu menú.</p>
      </div>
    );
  }

  if (step === 'plan' && plan) {
    return (
      <div className="pb-24">
        <div className="bg-green-600 text-white p-6 rounded-b-[2rem] shadow-lg mb-6">
            <button onClick={reset} className="flex items-center text-green-100 hover:text-white mb-4 text-sm font-semibold">
                <ArrowLeft size={16} className="mr-1" /> Nuevo cálculo
            </button>
            <h2 className="text-2xl font-bold mb-2">Tu Plan Nutricional</h2>
            <p className="text-green-100 opacity-90">{plan.summary}</p>
        </div>

        <div className="px-4 space-y-6">
            {/* Recommendations */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center">
                    <Zap className="text-yellow-500 mr-2" size={20} /> Alimentos Clave
                </h3>
                <div className="flex flex-wrap gap-2">
                    {plan.recommendations.map((rec, idx) => (
                        <span key={idx} className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium border border-green-100">
                            {rec}
                        </span>
                    ))}
                </div>
            </div>

            {/* Menu */}
            <div>
                <h3 className="font-bold text-gray-800 mb-3 px-1 flex items-center">
                    <Calendar className="text-green-600 mr-2" size={20} /> Menú Sugerido (3 Días)
                </h3>
                <div className="space-y-4">
                    {plan.menu.map((day, idx) => (
                        <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="bg-gray-50 px-4 py-2 border-b border-gray-100 font-bold text-gray-700 text-sm">
                                {day.day}
                            </div>
                            <div className="p-4 space-y-3 text-sm">
                                <div className="flex gap-3">
                                    <span className="font-bold text-green-600 w-20 flex-shrink-0">Desayuno</span>
                                    <span className="text-gray-600">{day.breakfast}</span>
                                </div>
                                <div className="flex gap-3">
                                    <span className="font-bold text-orange-500 w-20 flex-shrink-0">Almuerzo</span>
                                    <span className="text-gray-600">{day.lunch}</span>
                                </div>
                                <div className="flex gap-3">
                                    <span className="font-bold text-blue-500 w-20 flex-shrink-0">Cena</span>
                                    <span className="text-gray-600">{day.dinner}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-xs text-yellow-800 text-center">
                Nota: Esto es una sugerencia basada en IA. Consulta siempre a un médico antes de hacer cambios drásticos en tu dieta.
            </div>
        </div>
      </div>
    );
  }

  // Form Step
  return (
    <div className="p-4 pb-24 max-w-md mx-auto">
      <div className="mb-6 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-4">
            <Activity size={32} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Nutricionista Privado</h2>
        <p className="text-gray-500 text-sm mt-1">Cuéntame sobre ti para crear tu plan ideal.</p>
      </div>

      <div className="space-y-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        
        {/* Physical Stats */}
        <div className="grid grid-cols-3 gap-4">
            <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Edad</label>
                <div className="relative">
                    <input 
                        type="number" 
                        value={profile.age}
                        onChange={(e) => setProfile({...profile, age: e.target.value})}
                        className="w-full p-2 pl-3 rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none text-center font-bold text-gray-800"
                        placeholder="20"
                    />
                </div>
            </div>
            <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Peso (kg)</label>
                <div className="relative">
                    <input 
                        type="number" 
                        value={profile.weight}
                        onChange={(e) => setProfile({...profile, weight: e.target.value})}
                        className="w-full p-2 pl-3 rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none text-center font-bold text-gray-800"
                        placeholder="70"
                    />
                </div>
            </div>
            <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Altura (cm)</label>
                <div className="relative">
                    <input 
                        type="number" 
                        value={profile.height}
                        onChange={(e) => setProfile({...profile, height: e.target.value})}
                        className="w-full p-2 pl-3 rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none text-center font-bold text-gray-800"
                        placeholder="175"
                    />
                </div>
            </div>
        </div>

        {/* Goal Selection */}
        <div className="pt-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">¿Cuál es tu objetivo?</label>
            <div className="grid grid-cols-1 gap-2">
                {['Perder peso', 'Ganar músculo', 'Mantenerse'].map((g) => (
                    <button
                        key={g}
                        onClick={() => setProfile({...profile, goal: g as any})}
                        className={`p-3 rounded-xl border flex justify-between items-center transition-all ${
                            profile.goal === g 
                            ? 'bg-green-50 border-green-500 text-green-700 font-bold' 
                            : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                        }`}
                    >
                        {g}
                        {profile.goal === g && <Check size={18} />}
                    </button>
                ))}
            </div>
        </div>

        {/* Speed Selection */}
        <div className="pt-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">¿Qué ritmo prefieres?</label>
            <div className="flex bg-gray-100 p-1 rounded-xl">
                {['Lento', 'Moderado', 'Rápido'].map((s) => (
                    <button
                        key={s}
                        onClick={() => setProfile({...profile, speed: s as any})}
                        className={`flex-1 py-2 text-sm rounded-lg transition-all ${
                            profile.speed === s 
                            ? 'bg-white text-gray-900 shadow-sm font-bold' 
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        {s}
                    </button>
                ))}
            </div>
        </div>

        <button
            onClick={handleGenerate}
            disabled={!profile.age || !profile.weight || !profile.height}
            className="w-full mt-4 bg-gray-900 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
            Generar Plan <ChevronRight className="ml-2" />
        </button>

      </div>
    </div>
  );
};