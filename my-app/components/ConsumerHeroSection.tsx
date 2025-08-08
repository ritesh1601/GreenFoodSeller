import {ShoppingCart, Star} from "lucide-react";
import Animated3DCarrot from "@/components/ui/Animated3DCarrot";
import React from "react";

const ConsumerHeroSection = () => {
    return (
        <section className="bg-[url('https://assets.website-files.com/645b2c7e097f48b940984852/645b2c7e097f48b94098486e_bg-fresh.svg')] bg-cover bg-center text-white py-24 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-3xl">
                    <h2 className="text-5xl md:text-7xl font-bold font-display leading-tight drop-shadow-lg animate-fade-in-down">Eat Fresh. Live Better.</h2>
                    <p className="text-xl md:text-2xl mt-4 mb-8 text-green-50 drop-shadow-md animate-fade-in-up">Premium, organic groceries delivered straight from the farm to your table.</p>

                    <div className="flex flex-wrap justify-start gap-8 mb-8">
                        <div className="flex items-center p-3 bg-white rounded-full shadow-md transform rotate-2 animate-pulse-slow">
                            <div className="bg-green-600 text-white rounded-full p-2 mr-3">
                                <Star className="h-6 w-6" />
                            </div>
                            <span className="text-green-800 text-lg font-semibold">Best Quality</span>
                        </div>
                        <div className="flex items-center p-3 bg-white rounded-full shadow-md transform -rotate-2 animate-pulse-slow-delay">
                            <div className="bg-green-600 text-white rounded-full p-2 mr-3">
                                <ShoppingCart className="h-6 w-6" />
                            </div>
                            <span className="text-green-800 text-lg font-semibold">Free Shipping</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="absolute right-0 bottom-0 lg:bottom-10 lg:right-20 animate-wiggle-slow">
                <img src="https://assets.website-files.com/645b2c7e097f48b940984852/645b2c7e097f48b940984872_carrot-hero.png" alt="3D Animated Carrot" className="w-48 lg:w-96 drop-shadow-2xl" />
            </div>
            {/*<Animated3DCarrot/>*/}
        </section>
    );
};
export default ConsumerHeroSection;