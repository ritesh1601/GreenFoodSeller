'use client'
import { useState } from 'react'
import {
    Home,
    CreditCard,
    MessageSquare,
    Clock,
    FileText,
    Shield,
    ChevronRight
} from 'lucide-react'
import { navItems, NavItem } from "@/app/constants";

export default function Sidebar() {
    const [isExpanded, setIsExpanded] = useState(false)

    // Error handling for missing navItems
    if (!navItems || navItems.length === 0) {
        return (
            <div className="fixed left-0 top-0 h-full bg-indigo-600 z-50 w-20">
                <div className="flex items-center justify-center h-16 bg-indigo-700">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                        <span className="text-indigo-600 font-bold text-xl">G</span>
                    </div>
                </div>
                <div className="mt-8 px-2">
                    <div className="text-center text-indigo-200 text-xs">
                        Navigation unavailable
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            {/* Mobile backdrop */}
            {isExpanded && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={() => setIsExpanded(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`fixed left-0 top-0 h-full bg-indigo-600 z-50 transition-all duration-300 ${
                isExpanded ? 'w-64' : 'w-20'
            } lg:w-20`}>
                {/* Logo */}
                <div className="flex items-center justify-center h-16 bg-indigo-700">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                        <span className="text-indigo-600 font-bold text-xl">G</span>
                    </div>
                    {isExpanded && (
                        <span className="ml-3 text-white font-semibold lg:hidden">GreenMart</span>
                    )}
                </div>

                {/* Expand/Collapse button */}
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="absolute -right-3 top-20 bg-white rounded-full p-1.5 shadow-lg lg:hidden"
                >
                    <ChevronRight className={`w-4 h-4 text-gray-600 transition-transform ${
                        isExpanded ? 'rotate-180' : ''
                    }`} />
                </button>

                {/* Navigation */}
                <nav className="mt-8 px-2">
                    {navItems.map((item: NavItem, index: number) => {
                        const Icon = item.icon
                        return (
                            <button
                                key={index}
                                className={`w-full flex items-center justify-center lg:justify-center p-3 mb-2 rounded-lg transition-colors ${
                                    item.active
                                        ? 'bg-indigo-700 text-white'
                                        : 'text-indigo-200 hover:bg-indigo-700 hover:text-white'
                                }`}
                            >
                                <Icon className="w-6 h-6" />
                                {isExpanded && (
                                    <span className="ml-3 lg:hidden">Menu {index + 1}</span>
                                )}
                            </button>
                        )
                    })}
                </nav>

                {/* Support button at bottom */}
                <div className="absolute bottom-4 w-full px-2">
                    <button className="w-full flex items-center justify-center p-3 text-indigo-200 hover:bg-indigo-700 hover:text-white rounded-lg transition-colors">
                        <MessageSquare className="w-6 h-6" />
                        {isExpanded && (
                            <span className="ml-3 lg:hidden">Support</span>
                        )}
                    </button>
                </div>
            </div>
        </>
    )
}