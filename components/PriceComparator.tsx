import React, { useState } from 'react';
import { Search, ShoppingCart, TrendingDown, Loader2 } from 'lucide-react';
import { Product } from '../types';
import { searchProductPrices } from '../services/geminiService';

export const PriceComparator: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    setLoading(true);
    setSearched(true);
    setProduct(null);

    try {
      const result = await searchProductPrices(searchTerm);
      if (result) {
        // Ensure ID is set
        setProduct({ ...result, id: 'dynamic-1' });
      }
    } catch (error) {
      console.error("Error searching product:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className="p-4 pb-24 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Ahorra en tu compra</h2>
        <p className="text-gray-500 text-sm mt-1">Busca cualquier producto y la IA estimará los precios en supermercados actuales.</p>
      </div>

      <div className="relative mb-8">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Buscar producto (ej: Salmón, Detergente, Aguacate)..."
          className="w-full pl-12 pr-12 py-3 rounded-xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
        />
        <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
        {searchTerm && (
          <button
            onClick={handleSearch}
            disabled={loading}
            className="absolute right-2 top-2 bg-green-500 text-white p-1.5 rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />}
          </button>
        )}
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-10">
            <Loader2 size={48} className="mx-auto mb-4 text-green-500 animate-spin" />
            <p className="text-gray-500">Buscando los mejores precios para ti...</p>
          </div>
        ) : !product && searched ? (
          <div className="text-center py-10 text-gray-400 animate-fadeIn">
            <ShoppingCart size={48} className="mx-auto mb-2 opacity-20" />
            <p>No encontramos información reciente para ese producto.</p>
            <p className="text-xs mt-2">Intenta ser más específico, ej: "Leche entera 1L".</p>
          </div>
        ) : product ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-slideUp">
            <div className="p-4 flex items-center border-b border-gray-50">
              <span className="text-4xl mr-4">{product.image}</span>
              <div>
                <h3 className="font-bold text-gray-800 text-lg">{product.name}</h3>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{product.category}</span>
              </div>
            </div>
            <div className="p-4 bg-gray-50">
              <div className="flex justify-between items-center mb-3 text-sm font-semibold text-gray-700">
                <span>Supermercado</span>
                <span>Precio Est.</span>
              </div>
              <div className="space-y-2">
                {[...product.prices]
                  .sort((a, b) => a.price - b.price)
                  .map((p, idx) => (
                    <div key={idx} className={`flex justify-between items-center p-3 rounded-lg ${idx === 0 ? 'bg-green-100 border border-green-200 shadow-sm' : 'bg-white border border-gray-100'}`}>
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{p.logo}</span>
                        <div className="flex flex-col">
                          <span className={idx === 0 ? 'font-bold text-green-900' : 'text-gray-700 font-medium'}>{p.supermarket}</span>
                          {idx === 0 && <span className="text-[10px] text-green-700 font-bold uppercase tracking-wider">Mejor Opción</span>}
                        </div>
                      </div>
                      <span className={`font-mono text-lg ${idx === 0 ? 'font-bold text-green-800' : 'text-gray-600'}`}>
                        {p.price.toFixed(2)}€
                      </span>
                    </div>
                  ))}
              </div>
              {product.prices.length > 1 && (
                <div className="mt-4 p-3 bg-green-50 rounded-lg text-center text-sm text-green-700 font-medium flex items-center justify-center gap-2 border border-green-100">
                  <TrendingDown size={16} />
                  <span>
                    Ahorro potencial: {((Math.max(...product.prices.map(p => p.price)) - Math.min(...product.prices.map(p => p.price))).toFixed(2))}€
                  </span>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-10 opacity-50">
            <Search size={48} className="mx-auto mb-2 text-gray-300" />
            <p className="text-gray-400">Busca algo para empezar a comparar</p>
          </div>
        )}
      </div>
    </div>
  );
};