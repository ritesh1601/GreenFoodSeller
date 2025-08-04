import React, {useState} from "react";
import {motion} from "framer-motion";
import {Heart, Plus, Star} from "lucide-react";

const ProductCard = ({ product, onAddToCart, onToggleFavorite }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group relative p-4"
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            whileHover={{ y: -5 }}
        >
            <div className="relative">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-2xl mb-4 transform group-hover:scale-105 transition-transform duration-300"
                />
                <motion.button
                    onClick={() => onToggleFavorite(product.id)}
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    whileTap={{ scale: 0.8 }}
                    className={`absolute top-4 right-4 p-2 rounded-full ${
                        product.isFavorite ? 'bg-red-500 text-white' : 'bg-white text-gray-400'
                    } hover:bg-red-500 hover:text-white transition-colors shadow-lg`}
                >
                    <Heart className="h-5 w-5 fill-current" />
                </motion.button>
                {product.discount && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: isHovered ? 1 : 0.8 }}
                        className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-md transform -rotate-6"
                    >
                        -{product.discount}%
                    </motion.div>
                )}
            </div>

            <div className="p-2">
                <h3 className="font-bold text-xl text-green-800 mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{product.description}</p>

                <div className="flex items-center mb-3">
                    <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-4 w-4 ${i < product.rating ? 'fill-current' : ''}`} />
                        ))}
                    </div>
                    <span className="text-gray-500 text-xs ml-2">({product.reviews})</span>
                </div>

                <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center">
                        <span className="text-3xl font-extrabold text-green-600">${product.price}</span>
                        {product.originalPrice && (
                            <span className="text-gray-500 line-through ml-2">${product.originalPrice}</span>
                        )}
                    </div>
                    <motion.button
                        onClick={() => onAddToCart(product)}
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-green-600 text-white p-3 rounded-full hover:bg-green-700 transition-colors shadow-md"
                    >
                        <Plus className="h-5 w-5" />
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};
export default ProductCard;