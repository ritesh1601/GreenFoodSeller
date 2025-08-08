import Image from 'next/image'
import { Heart } from 'lucide-react'
import { ProductItem } from '@/app/constants'

interface ProductCardProps {
    item: ProductItem
}

export default function ProductCard({ item }: ProductCardProps) {
    // Error handling for missing item data
    if (!item || !item.name || typeof item.price !== 'number') {
        return (
            <div className="group cursor-pointer bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="relative mb-3">
                    <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                        <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                            <span className="text-gray-500 font-semibold text-sm text-center px-2">
                                Invalid Product
                            </span>
                        </div>
                    </div>
                </div>
                <div className="space-y-1">
                    <h3 className="font-medium text-gray-500 text-sm leading-tight">
                        Product unavailable
                    </h3>
                    <div className="text-lg font-bold text-gray-500">
                        $0.00
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="group cursor-pointer bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="relative mb-3">
                <div className="aspect-square bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center overflow-hidden">
                    {/* Using a placeholder div since we don't have actual images */}
                    <div className="w-full h-full bg-gradient-to-br from-green-200 to-green-300 flex items-center justify-center">
                        <span className="text-green-600 font-semibold text-sm text-center px-2">
                            {item.name}
                        </span>
                    </div>
                </div>
                <button className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    <Heart className="w-4 h-4 text-gray-400 hover:text-red-500" />
                </button>
            </div>

            <div className="space-y-1">
                <h3 className="font-medium text-gray-900 text-sm leading-tight">
                    {item.name}
                </h3>
                <div className="text-lg font-bold text-gray-900">
                    ${item.price.toFixed(2)}
                </div>
            </div>
        </div>
    )
}