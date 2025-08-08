"use client"
import React, { useState } from 'react';
import { products, ProductItem } from "@/app/constants"
import ConsumerHeroSection from "@/components/ConsumerHeroSection"
import SearchBar from "@/components/SearchBar"
import CategoryNav from "@/components/CategoryNav";
import ProductGrid from "@/components/ProductGrid";

const App = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [cart, setCart] = useState<ProductItem[]>([]);

    // For a real app, you would fetch these from an API
    const categories = ['All', 'Fruits', 'Vegetables', 'Meat', 'Bakery', 'Dairy', 'Pantry'];


    // The rest of the app logic remains the same
    const filteredProducts = products.filter(product => {
        const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()));
        return matchesCategory && matchesSearch;
    });

    const handleAddToCart = (product: ProductItem) => {
        setCart([...cart, product]);
    };

    const handleToggleFavorite = (productId: number) => {
        console.log(`Toggled favorite for product ${productId}`);
    };

    const handleSearch = () => {
        console.log(`Searching for: ${searchTerm}`);
    };

    return (
        <div className="min-h-screen bg-green-50">
            <ConsumerHeroSection />
            <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                onSearch={handleSearch}
            />
            <CategoryNav
                categories={categories}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
            />
            <ProductGrid
                products={filteredProducts}
                onAddToCart={handleAddToCart}
                onToggleFavorite={handleToggleFavorite}
            />
        </div>
    );
};

export default App;