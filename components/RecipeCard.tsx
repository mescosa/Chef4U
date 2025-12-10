import React, { useState } from 'react';
import { Clock, BarChart, Flame, ChevronDown, ChevronUp } from 'lucide-react';
import { Recipe } from '../types';

interface RecipeCardProps {
  recipe: Recipe;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-4 transition-all hover:shadow-md">
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-gray-800 leading-tight">{recipe.title}</h3>
            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                recipe.difficulty === 'Fácil' ? 'bg-green-100 text-green-700' :
                recipe.difficulty === 'Medio' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
            }`}>
                {recipe.difficulty}
            </span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4">{recipe.description}</p>

        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <Clock size={16} className="mr-1 text-orange-500" />
            {recipe.time}
          </div>
          {recipe.calories && (
            <div className="flex items-center">
                <Flame size={16} className="mr-1 text-red-500" />
                {recipe.calories}
            </div>
          )}
        </div>

        <button 
            onClick={() => setExpanded(!expanded)}
            className="w-full flex items-center justify-center py-2 bg-orange-50 text-orange-600 rounded-lg text-sm font-semibold hover:bg-orange-100 transition-colors"
        >
            {expanded ? (
                <>Ocultar Pasos <ChevronUp size={16} className="ml-1" /></>
            ) : (
                <>Ver Receta Completa <ChevronDown size={16} className="ml-1" /></>
            )}
        </button>
      </div>

      {expanded && (
        <div className="px-5 pb-5 bg-orange-50/30 border-t border-gray-100">
            <div className="mt-4">
                <h4 className="font-semibold text-gray-800 mb-2">Ingredientes:</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                    {recipe.ingredients.map((ing, idx) => (
                        <li key={idx}>{ing}</li>
                    ))}
                </ul>
            </div>
            <div className="mt-4">
                <h4 className="font-semibold text-gray-800 mb-2">Preparación:</h4>
                <ol className="list-decimal list-inside space-y-3 text-gray-700 text-sm">
                    {recipe.steps.map((step, idx) => (
                        <li key={idx} className="pl-1"><span className="ml-[-4px]">{step}</span></li>
                    ))}
                </ol>
            </div>
        </div>
      )}
    </div>
  );
};