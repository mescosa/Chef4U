import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { Home } from './components/Home';
import { FridgeChef } from './components/FridgeChef';
import { PriceComparator } from './components/PriceComparator';
import { RecipeFeed } from './components/RecipeFeed';
import { Forum } from './components/Forum';
import { Nutritionist } from './components/Nutritionist';
import { ViewState } from './types';
import logoChef from './assets/Logo_Chef4U.jpg';

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
      case 'nutritionist':
        return <Nutritionist />;
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
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('home')}>
                <div className="shadow-md rounded-lg p-1">
                    <img src={logoChef} alt="Chef4U Logo" className="w-10 h-10 rounded-lg object-contain" />
                </div>
                <span className="font-bold text-xl tracking-tight text-gray-800">Chef4U</span>
            </div>
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