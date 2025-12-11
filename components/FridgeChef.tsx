import React, { useState } from 'react';
import { Plus, X, Sparkles, Loader2, Camera } from 'lucide-react';
import { generateRecipesFromIngredients, identifyIngredientsFromImage } from '../services/geminiService';
import { Recipe } from '../types';
import { RecipeCard } from './RecipeCard';

export const FridgeChef: React.FC = () => {
  const [ingredientInput, setIngredientInput] = useState('');
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addIngredient = () => {
    if (ingredientInput.trim()) {
      setIngredients([...ingredients, ingredientInput.trim()]);
      setIngredientInput('');
    }
  };

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleGenerate = async () => {
    if (ingredients.length === 0) return;
    setLoading(true);
    setError(null);
    try {
      const generatedRecipes = await generateRecipesFromIngredients(ingredients);
      setRecipes(generatedRecipes);
    } catch (err) {
      setError("Hubo un error al contactar al Chef AI. Verifica tu conexión o intenta más tarde.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsAnalyzing(true);
    setError(null);

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result as string;
      try {
        const detectedIngredients = await identifyIngredientsFromImage(base64String);
        setIngredients(prev => {
          const newIngs = detectedIngredients.filter(newIng =>
            !prev.some(p => p.toLowerCase() === newIng.toLowerCase())
          );
          return [...prev, ...newIngs];
        });
      } catch (err) {
        setError("No pude identificar los ingredientes. Intenta con otra foto.");
      } finally {
        setIsAnalyzing(false);
        // Reset input to allow selecting same file
        event.target.value = '';
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="p-4 pb-24 max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">¿Qué hay en tu nevera?</h2>
        <p className="text-gray-500 text-sm mt-1">Dime qué ingredientes tienes y te diré qué cocinar.</p>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6">
        <div className="flex gap-2 mb-3">
          <input
            type="file"
            accept="image/*"
            capture="environment"
            id="camera-input"
            className="hidden"
            onChange={handleImageUpload}
            disabled={loading || isAnalyzing}
          />
          <label
            htmlFor="camera-input"
            className={`p-3 rounded-lg flex items-center justify-center transition-colors cursor-pointer border ${loading || isAnalyzing
                ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-orange-50 border-orange-200 text-orange-600 hover:bg-orange-100'
              }`}
          >
            {isAnalyzing ? <Loader2 size={24} className="animate-spin" /> : <Camera size={24} />}
          </label>
          <input
            type="text"
            value={ingredientInput}
            onChange={(e) => setIngredientInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addIngredient()}
            placeholder="Ej: Huevos, Tomate, Arroz..."
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
          <button
            onClick={addIngredient}
            className="bg-gray-900 text-white p-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Plus size={24} />
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {ingredients.length === 0 && <span className="text-gray-400 text-sm italic">Agrega ingredientes arriba...</span>}
          {ingredients.map((ing, idx) => (
            <span key={idx} className="inline-flex items-center bg-orange-100 text-orange-800 text-sm px-3 py-1 rounded-full">
              {ing}
              <button onClick={() => removeIngredient(idx)} className="ml-2 hover:text-orange-950">
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
      </div>

      <button
        onClick={handleGenerate}
        disabled={ingredients.length === 0 || loading}
        className={`w-full py-3 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md transition-all ${ingredients.length === 0 || loading
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 transform hover:scale-[1.02]'
          }`}
      >
        {loading ? (
          <><Loader2 className="animate-spin mr-2" /> Cocinando ideas...</>
        ) : (
          <><Sparkles className="mr-2" /> Ver Recetas Mágicas</>
        )}
      </button>

      {error && (
        <div className="mt-6 p-4 bg-red-50 text-red-600 rounded-lg text-center text-sm">
          {error}
        </div>
      )}

      <div className="mt-8 space-y-6">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};