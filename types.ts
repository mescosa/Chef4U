export interface Ingredient {
  name: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  steps: string[];
  time: string;
  difficulty: 'Fácil' | 'Medio' | 'Difícil';
  calories?: string;
}

export interface ProductPrice {
  supermarket: string;
  price: number;
  logo: string; // Emoji or generic icon
}

export interface Product {
  id: string;
  name: string;
  category: string;
  prices: ProductPrice[];
  image: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export type ViewState = 'home' | 'fridge' | 'recipes' | 'prices';