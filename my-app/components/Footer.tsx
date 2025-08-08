import React from "react";

const Footer = () => {
    return (
        <footer className="bg-green-900 text-white py-16 mt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div>
                        <h3 className="text-3xl font-bold font-display text-green-200 mb-4">FreshMart 🌿</h3>
                        <p className="text-green-300">Your daily dose of farm-fresh goodness. We're committed to quality and sustainability.</p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-green-300">
                            <li><a href="#" className="hover:text-white hover:underline transition-all duration-300">About Us</a></li>
                            <li><a href="#" className="hover:text-white hover:underline transition-all duration-300">Contact</a></li>
                            <li><a href="#" className="hover:text-white hover:underline transition-all duration-300">FAQ</a></li>
                            <li><a href="#" className="hover:text-white hover:underline transition-all duration-300">Support</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-lg mb-4">Categories</h4>
                        <ul className="space-y-2 text-green-300">
                            <li><a href="#" className="hover:text-white hover:underline transition-all duration-300">Fruits 🍎</a></li>
                            <li><a href="#" className="hover:text-white hover:underline transition-all duration-300">Vegetables 🥕</a></li>
                            <li><a href="#" className="hover:text-white hover:underline transition-all duration-300">Meat 🥩</a></li>
                            <li><a href="#" className="hover:text-white hover:underline transition-all duration-300">Bakery 🍞</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-lg mb-4">Join Our Community</h4>
                        <div className="text-green-300 space-y-2">
                            <p>Sign up for our newsletter to get fresh deals!</p>
                            <div className="flex items-center space-x-4 mt-4">
                                <a href="#" className="text-white hover:text-green-400"><i className="fab fa-facebook-f"></i></a>
                                <a href="#" className="text-white hover:text-green-400"><i className="fab fa-instagram"></i></a>
                                <a href="#" className="text-white hover:text-green-400"><i className="fab fa-twitter"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-t border-green-800 mt-12 pt-8 text-center text-green-400">
                    <p>&copy; 2025 FreshMart. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};
export default Footer;