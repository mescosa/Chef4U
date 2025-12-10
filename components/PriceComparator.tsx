import React, { useState } from 'react';
import { Search, ShoppingCart, TrendingDown } from 'lucide-react';
import { Product } from '../types';

// Simulated Database
const MOCK_DB: Product[] = [
  {
    id: '1',
    name: 'Leche Entera 1L',
    category: 'Lácteos',
    image: '🥛',
    prices: [
      { supermarket: 'Mercadona', price: 0.95, logo: '🟢' },
      { supermarket: 'Carrefour', price: 1.05, logo: '🔵' },
      { supermarket: 'Lidl', price: 0.91, logo: '🟡' },
      { supermarket: 'Dia', price: 0.99, logo: '🔴' }
    ]
  },
  {
    id: '2',
    name: 'Huevos L (Docena)',
    category: 'Huevos',
    image: '🥚',
    prices: [
      { supermarket: 'Mercadona', price: 2.10, logo: '🟢' },
      { supermarket: 'Carrefour', price: 2.35, logo: '🔵' },
      { supermarket: 'Lidl', price: 1.99, logo: '🟡' },
    ]
  },
  {
    id: '3',
    name: 'Aceite de Oliva Virgen Extra 1L',
    category: 'Aceites',
    image: '🫒',
    prices: [
      { supermarket: 'Mercadona', price: 8.50, logo: '🟢' },
      { supermarket: 'Carrefour', price: 8.95, logo: '🔵' },
      { supermarket: 'Lidl', price: 8.45, logo: '🟡' },
      { supermarket: 'Alcampo', price: 8.25, logo: '🔴' }
    ]
  },
  {
    id: '4',
    name: 'Arroz Redondo 1kg',
    category: 'Despensa',
    image: '🍚',
    prices: [
      { supermarket: 'Mercadona', price: 1.30, logo: '🟢' },
      { supermarket: 'Carrefour', price: 1.45, logo: '🔵' },
      { supermarket: 'Lidl', price: 1.25, logo: '🟡' },
    ]
  },
  {
    id: '5',
    name: 'Pechuga de Pollo 1kg',
    category: 'Carnicería',
    image: '🍗',
    prices: [
      { supermarket: 'Mercadona', price: 6.95, logo: '🟢' },
      { supermarket: 'Carrefour', price: 7.50, logo: '🔵' },
      { supermarket: 'Lidl', price: 6.80, logo: '🟡' },
      { supermarket: 'Carnicería local', price: 8.00, logo: '🥩' }
    ]
  },
  {
    id: '6',
    name: 'Tomate Frito',
    category: 'Despensa',
    image: '🥫',
    prices: [
      { supermarket: 'Mercadona', price: 0.85, logo: '🟢' },
      { supermarket: 'Carrefour', price: 0.99, logo: '🔵' },
      { supermarket: 'Lidl', price: 0.80, logo: '🟡' },
    ]
  }
];

export const PriceComparator: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredProducts = MOCK_DB.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 pb-24 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Ahorra en tu compra</h2>
        <p className="text-gray-500 text-sm mt-1">Busca productos y encuentra el precio más bajo.</p>
      </div>

      <div className="relative mb-8">
        <input 
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar producto (ej: leche, aceite, pollo)..."
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
        />
        <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
      </div>

      <div className="space-y-4">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-10 text-gray-400">
            <ShoppingCart size={48} className="mx-auto mb-2 opacity-20" />
            <p>No encontramos ese producto en nuestra base de datos.</p>
            <p className="text-xs mt-2">Prueba con básicos como "leche", "huevos", o "arroz".</p>
          </div>
        ) : (
            filteredProducts.map(product => {
                // Sort prices low to high
                const sortedPrices = [...product.prices].sort((a, b) => a.price - b.price);
                const bestPrice = sortedPrices[0];
                const saving = sortedPrices[sortedPrices.length - 1].price - bestPrice.price;

                return (
                    <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-4 flex items-center border-b border-gray-50">
                            <span className="text-2xl mr-4">{product.image}</span>
                            <div>
                                <h3 className="font-bold text-gray-800">{product.name}</h3>
                                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{product.category}</span>
                            </div>
                        </div>
                        <div className="p-4 bg-gray-50">
                            <div className="flex justify-between items-center mb-3 text-sm font-semibold text-gray-700">
                                <span>Supermercado</span>
                                <span>Precio</span>
                            </div>
                            <div className="space-y-2">
                                {sortedPrices.map((p, idx) => (
                                    <div key={idx} className={`flex justify-between items-center p-2 rounded-lg ${idx === 0 ? 'bg-green-100 border border-green-200' : 'bg-white border border-gray-100'}`}>
                                        <div className="flex items-center gap-2">
                                            <span>{p.logo}</span>
                                            <span className={idx === 0 ? 'font-bold text-green-800' : 'text-gray-600'}>{p.supermarket}</span>
                                            {idx === 0 && <span className="bg-green-600 text-white text-[10px] px-1.5 py-0.5 rounded ml-2">MEJOR PRECIO</span>}
                                        </div>
                                        <span className={`font-mono ${idx === 0 ? 'font-bold text-green-800' : 'text-gray-600'}`}>
                                            {p.price.toFixed(2)}€
                                        </span>
                                    </div>
                                ))}
                            </div>
                            {saving > 0 && (
                                <div className="mt-3 text-center text-xs text-green-600 font-medium flex items-center justify-center gap-1">
                                    <TrendingDown size={14} />
                                    Ahorras hasta {saving.toFixed(2)}€ eligiendo bien
                                </div>
                            )}
                        </div>
                    </div>
                );
            })
        )}
      </div>
    </div>
  );
};