import React from 'react';
import { Home, ChefHat, BookOpen, Users, Activity } from 'lucide-react';
import { ViewState } from '../types';

interface NavigationProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentView, setView }) => {
  const navItems: { id: ViewState; label: string; icon: React.ElementType }[] = [
    { id: 'home', label: 'Inicio', icon: Home },
    { id: 'fridge', label: 'Nevera', icon: ChefHat },
    { id: 'recipes', label: 'Recetas', icon: BookOpen },
    { id: 'nutritionist', label: 'Nutrición', icon: Activity },
    { id: 'forum', label: 'Comunidad', icon: Users },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg pb-safe z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`flex flex-col items-center justify-center w-full h-full transition-colors duration-200 px-1 ${
                isActive ? 'text-orange-500' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] mt-1 font-medium tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};