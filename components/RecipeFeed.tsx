import React, { useState } from 'react';
import { RecipeCard } from './RecipeCard';
import { AIChat } from './AIChat';
import { MessageSquare } from 'lucide-react';
import { Recipe } from '../types';

// Some static "Featured" recipes to populate the feed initially
const FEATURED_RECIPES: Recipe[] = [
    {
        id: 'static-1',
        title: 'Pasta Carbonara (Versión Fácil)',
        description: 'La clásica pasta italiana pero adaptada para cuando tienes prisa y pocos ingredientes.',
        time: '20 min',
        difficulty: 'Fácil',
        calories: '550 kcal',
        ingredients: ['Espaguetis', 'Huevos', 'Bacon o Panceta', 'Queso rallado (Parmesano mejor)', 'Pimienta negra'],
        steps: [
            'Hierve la pasta en agua con sal.',
            'Mientras, fríe el bacon hasta que esté crujiente.',
            'En un bol, bate los huevos con el queso y mucha pimienta.',
            'Cuela la pasta (guarda un poco de agua) y échala a la sartén del bacon (fuera del fuego).',
            'Añade la mezcla de huevo y remueve rápido con el calor residual para crear la crema. Si queda seco, añade un poco de agua de cocción.'
        ]
    },
    {
        id: 'static-2',
        title: 'Tostada de Aguacate y Huevo',
        description: 'El desayuno de campeones. Nutritivo, rápido y super instagrameable.',
        time: '10 min',
        difficulty: 'Fácil',
        calories: '320 kcal',
        ingredients: ['Pan de hogaza', '1 Aguacate maduro', '1 Huevo', 'Limón', 'Sal y pimienta', 'Chili flakes (opcional)'],
        steps: [
            'Tuesta el pan.',
            'Chafa el aguacate con un tenedor, añade limón, sal y pimienta.',
            'Fríe el huevo o hazlo poché.',
            'Monta la tostada: pan, aguacate, huevo encima y decora con chili flakes.'
        ]
    }
];

export const RecipeFeed: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'feed' | 'chat'>('feed');

  return (
    <div className="flex flex-col h-full">
      <div className="flex border-b border-gray-100 bg-white">
        <button
          onClick={() => setActiveTab('feed')}
          className={`flex-1 py-4 text-sm font-bold text-center border-b-2 transition-colors ${
            activeTab === 'feed' ? 'border-orange-500 text-orange-500' : 'border-transparent text-gray-400'
          }`}
        >
          Recetas Top
        </button>
        <button
          onClick={() => setActiveTab('chat')}
          className={`flex-1 py-4 text-sm font-bold text-center border-b-2 transition-colors flex items-center justify-center gap-2 ${
            activeTab === 'chat' ? 'border-orange-500 text-orange-500' : 'border-transparent text-gray-400'
          }`}
        >
          <MessageSquare size={16} /> Chat Chef
        </button>
      </div>

      <div className="flex-1 bg-gray-50 pb-24">
        {activeTab === 'feed' ? (
          <div className="p-4 space-y-4">
             <div className="bg-orange-100 rounded-lg p-3 text-orange-800 text-sm mb-4">
                🔥 Estas son las recetas más populares de la semana entre los estudiantes.
             </div>
            {FEATURED_RECIPES.map(r => <RecipeCard key={r.id} recipe={r} />)}
          </div>
        ) : (
          <AIChat />
        )}
      </div>
    </div>
  );
};