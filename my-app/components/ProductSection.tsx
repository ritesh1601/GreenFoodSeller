// components/ProductSection.tsx
import ProductCard from './ProductCard'
import { Plus } from 'lucide-react'
import { ProductItem } from '@/app/constants'

interface ProductSectionProps {
    title: string
    items: ProductItem[]
    showAddButton?: boolean
}

export default function ProductSection({ title, items, showAddButton = false }: ProductSectionProps) {
    // Error handling for missing or empty items
    if (!items || items.length === 0) {
        return (
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
                    {showAddButton && (
                        <button className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium">
                            <Plus className="w-4 h-4 mr-1" />
                            Add
                        </button>
                    )}
                </div>
                <div className="text-center text-gray-500 py-8">
                    No items available at the moment.
                </div>
            </div>
        )
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
                {showAddButton && (
                    <button className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium">
                        <Plus className="w-4 h-4 mr-1" />
                        Add
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {items.map((item) => (
                    <ProductCard key={item.id} item={item} />
                ))}
            </div>
        </div>
    )
}