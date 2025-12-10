import React, { useState } from 'react';
import { Heart, MessageCircle, Send, Plus, Users } from 'lucide-react';
import { ForumPost } from '../types';

const INITIAL_POSTS: ForumPost[] = [
    {
        id: '1',
        author: 'Ana_Cocinillas',
        avatar: '👩‍🍳',
        content: '¡Chicos! He probado la receta de la carbonara fácil de la app y ha quedado increíble. 🍝 Un truco: añadid un poco más de pimienta negra al final.',
        category: 'Presumir Plato',
        likes: 24,
        timestamp: 'Hace 2h',
        comments: [
            { id: 'c1', author: 'Pedro1999', text: '¡Tomo nota! A mí se me cuajó el huevo la última vez 😅', timestamp: 'Hace 1h' }
        ],
        likedByMe: false
    },
    {
        id: '2',
        author: 'Javi_Student',
        avatar: '👨‍🎓',
        content: '¿Alguien sabe cómo sustituir el vino blanco en los guisos? No suelo comprar alcohol.',
        category: 'Dudas',
        likes: 5,
        timestamp: 'Hace 4h',
        comments: [
            { id: 'c2', author: 'Chef4U_Fan', text: 'Puedes usar un poco de caldo de pollo o incluso agua con un chorrito de limón o vinagre.', timestamp: 'Hace 3h' }
        ],
        likedByMe: true
    },
    {
        id: '3',
        author: 'MartaHealthy',
        avatar: '🥗',
        content: '¡Oferta en el Lidl! Los aguacates están a mitad de precio hoy. ¡Aprovechad para las tostadas!',
        category: 'General',
        likes: 42,
        timestamp: 'Hace 5h',
        comments: [],
        likedByMe: false
    }
];

export const Forum: React.FC = () => {
    const [posts, setPosts] = useState<ForumPost[]>(INITIAL_POSTS);
    const [newPostContent, setNewPostContent] = useState('');
    const [activeCategory, setActiveCategory] = useState<'Todas' | 'Dudas' | 'Presumir Plato' | 'General'>('Todas');
    const [expandedComments, setExpandedComments] = useState<string | null>(null);
    const [newComment, setNewComment] = useState('');

    const handleLike = (id: string) => {
        setPosts(posts.map(post => {
            if (post.id === id) {
                return {
                    ...post,
                    likes: post.likedByMe ? post.likes - 1 : post.likes + 1,
                    likedByMe: !post.likedByMe
                };
            }
            return post;
        }));
    };

    const handleCreatePost = () => {
        if (!newPostContent.trim()) return;
        const newPost: ForumPost = {
            id: Date.now().toString(),
            author: 'Tú',
            avatar: '😎',
            content: newPostContent,
            category: 'General',
            likes: 0,
            timestamp: 'Ahora mismo',
            comments: [],
            likedByMe: false
        };
        setPosts([newPost, ...posts]);
        setNewPostContent('');
    };

    const handleAddComment = (postId: string) => {
        if (!newComment.trim()) return;
        setPosts(posts.map(post => {
            if (post.id === postId) {
                return {
                    ...post,
                    comments: [...post.comments, {
                        id: Date.now().toString(),
                        author: 'Tú',
                        text: newComment,
                        timestamp: 'Ahora'
                    }]
                };
            }
            return post;
        }));
        setNewComment('');
    };

    const toggleComments = (id: string) => {
        if (expandedComments === id) {
            setExpandedComments(null);
        } else {
            setExpandedComments(id);
        }
    };

    const filteredPosts = activeCategory === 'Todas' 
        ? posts 
        : posts.filter(p => p.category === activeCategory);

    return (
        <div className="flex flex-col h-full bg-gray-50 pb-24">
            {/* Header */}
            <div className="bg-white p-4 sticky top-0 z-10 border-b border-gray-100 shadow-sm">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <Users className="text-orange-500" /> Comunidad Chef4U
                </h2>
                
                {/* Category Filter */}
                <div className="flex gap-2 mt-4 overflow-x-auto no-scrollbar">
                    {['Todas', 'Dudas', 'Presumir Plato', 'General'].map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat as any)}
                            className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                                activeCategory === cat 
                                    ? 'bg-orange-500 text-white shadow-md' 
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Create Post Input */}
            <div className="p-4 bg-white mb-2 shadow-sm">
                <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-xl flex-shrink-0">
                        😎
                    </div>
                    <div className="flex-1">
                        <textarea
                            value={newPostContent}
                            onChange={(e) => setNewPostContent(e.target.value)}
                            placeholder="Comparte una receta, truco o duda..."
                            className="w-full bg-gray-50 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none h-20"
                        />
                        <div className="flex justify-end mt-2">
                            <button 
                                onClick={handleCreatePost}
                                disabled={!newPostContent.trim()}
                                className="bg-gray-900 text-white px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                Publicar
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Posts Feed */}
            <div className="p-4 space-y-4">
                {filteredPosts.map(post => (
                    <div key={post.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                        {/* Post Header */}
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-xl shadow-inner">
                                    {post.avatar}
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-sm">{post.author}</h3>
                                    <p className="text-xs text-gray-400">{post.timestamp} • <span className="text-orange-500">{post.category}</span></p>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                            {post.content}
                        </p>

                        {/* Actions */}
                        <div className="flex items-center gap-6 border-t border-gray-50 pt-3">
                            <button 
                                onClick={() => handleLike(post.id)}
                                className={`flex items-center gap-1.5 text-sm transition-colors ${
                                    post.likedByMe ? 'text-red-500 font-semibold' : 'text-gray-500 hover:text-red-500'
                                }`}
                            >
                                <Heart size={18} fill={post.likedByMe ? "currentColor" : "none"} />
                                {post.likes}
                            </button>
                            
                            <button 
                                onClick={() => toggleComments(post.id)}
                                className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-500 transition-colors"
                            >
                                <MessageCircle size={18} />
                                {post.comments.length}
                            </button>
                        </div>

                        {/* Comments Section */}
                        {expandedComments === post.id && (
                            <div className="mt-4 pt-4 border-t border-gray-100 bg-gray-50 -mx-4 px-4 pb-2">
                                <div className="space-y-3 mb-4">
                                    {post.comments.length === 0 && (
                                        <p className="text-center text-xs text-gray-400 italic py-2">Sé el primero en comentar</p>
                                    )}
                                    {post.comments.map(comment => (
                                        <div key={comment.id} className="flex gap-2">
                                            <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-500 flex-shrink-0">
                                                <Users size={12} />
                                            </div>
                                            <div className="bg-white p-2 rounded-lg rounded-tl-none shadow-sm flex-1">
                                                <div className="flex justify-between items-center mb-1">
                                                    <span className="font-bold text-xs text-gray-700">{comment.author}</span>
                                                    <span className="text-[10px] text-gray-400">{comment.timestamp}</span>
                                                </div>
                                                <p className="text-xs text-gray-600">{comment.text}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex gap-2">
                                    <input 
                                        type="text" 
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleAddComment(post.id)}
                                        placeholder="Escribe un comentario..."
                                        className="flex-1 text-xs px-3 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-1 focus:ring-orange-500"
                                    />
                                    <button 
                                        onClick={() => handleAddComment(post.id)}
                                        disabled={!newComment.trim()}
                                        className="bg-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-orange-600 disabled:opacity-50"
                                    >
                                        <Send size={14} />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};