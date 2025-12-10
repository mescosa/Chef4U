import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { Home } from './components/Home';
import { FridgeChef } from './components/FridgeChef';
import { PriceComparator } from './components/PriceComparator';
import { RecipeFeed } from './components/RecipeFeed';
import { Forum } from './components/Forum';
import { ViewState } from './types';

function App() {
  const [currentView, setView] = useState<ViewState>('home');

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <Home setView={setView} />;
      case 'fridge':
        return <FridgeChef />;
      case 'recipes':
        return <RecipeFeed />;
      case 'forum':
        return <Forum />;
      case 'prices':
        return <PriceComparator />;
      default:
        return <Home setView={setView} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-orange-200">
      <main className="max-w-md mx-auto min-h-screen bg-white shadow-2xl relative overflow-hidden">
        {/* Header (Simplified) */}
        <header className="px-5 py-4 bg-white sticky top-0 z-30 flex justify-between items-center bg-opacity-90 backdrop-blur-md">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-tr from-orange-500 to-red-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                    C
                </div>
                <span className="font-bold text-xl tracking-tight text-gray-800">Chef4U</span>
            </div>
            {/* API Key Warning if missing, hidden in production if Env is set properly, 
                but good for development feedback */}
            {!process.env.API_KEY && (
                <span className="text-[10px] bg-red-100 text-red-600 px-2 py-1 rounded">No API Key</span>
            )}
        </header>

        {/* Content */}
        <div className="animate-fadeIn">
             {renderView()}
        </div>

        {/* Navigation */}
        <Navigation currentView={currentView} setView={setView} />
      </main>
    </div>
  );
}

export default App;