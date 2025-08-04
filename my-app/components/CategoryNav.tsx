import {motion} from "framer-motion";
import React from "react";

const CategoryNav = ({ categories, activeCategory, setActiveCategory }) => {
    return (
        <div className="bg-green-50 py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-wrap justify-center gap-4">
                    {categories.map((category) => (
                        <motion.button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform border-2 ${
                                activeCategory === category
                                    ? 'bg-green-600 text-white border-green-600 shadow-lg scale-105'
                                    : 'bg-white text-gray-700 border-gray-200 hover:bg-green-100'
                            }`}
                        >
                            {category}
                        </motion.button>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default CategoryNav;