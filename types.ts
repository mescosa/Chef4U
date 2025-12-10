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

export interface Comment {
  id: string;
  author: string;
  text: string;
  timestamp: string;
}

export interface ForumPost {
  id: string;
  author: string;
  avatar: string;
  content: string;
  category: 'General' | 'Dudas' | 'Presumir Plato';
  likes: number;
  timestamp: string;
  comments: Comment[];
  likedByMe?: boolean;
}

export type ViewState = 'home' | 'fridge' | 'recipes' | 'forum' | 'prices';