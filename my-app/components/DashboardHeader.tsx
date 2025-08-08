import { Eye } from 'lucide-react'
import { summaryCards, orderStats, SummaryCard, OrderStat } from "@/app/constants"

export default function DashboardHeader() {
    // Error handling for missing data
    if (!summaryCards || !orderStats) {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-900">Good morning, James!</h1>
                    <div className="flex items-center space-x-4">
                        <button className="p-2 text-gray-400 hover:text-gray-600">
                            <Eye className="w-5 h-5" />
                        </button>
                        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="text-center text-gray-500">Loading dashboard data...</div>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Greeting */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Good morning, James!</h1>
                <div className="flex items-center space-x-4">
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                        <Eye className="w-5 h-5" />
                    </button>
                    <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {summaryCards.map((card: SummaryCard, index: number) => {
                    const Icon = card.icon
                    return (
                        <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                            <div className="flex items-start justify-between mb-2">
                                <Icon className="w-6 h-6 text-gray-400" />
                            </div>
                            <div className="space-y-1">
                                <div className="text-2xl font-bold text-gray-900">{card.value}</div>
                                <div className="text-sm text-gray-500">{card.label}</div>
                                <div className="text-xs text-blue-600 cursor-pointer hover:underline">
                                    {card.subtext}
                                </div>
                                {card.availability && (
                                    <div className="text-xs text-green-600">{card.availability}</div>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Order Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {orderStats.map((stat: OrderStat, index: number) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <div className="text-sm text-gray-500 mb-1">{stat.label}</div>
                        <div className="text-3xl font-bold text-gray-900 mb-2">
                            {stat.value}
                            {stat.rating && (
                                <span className="text-sm text-yellow-500 ml-2">★ {stat.rating}</span>
                            )}
                        </div>
                        <button className="text-sm text-blue-600 hover:underline">
                            {stat.action} →
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}