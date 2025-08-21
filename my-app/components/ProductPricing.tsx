'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

interface Product {
  id: string
  name: string
  currentPrice: number
  lastUpdatedPrice: number
  unit: string
  category: string
}

const ProductPricing: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Organic Kale',
      currentPrice: 4.99,
      lastUpdatedPrice: 4.99,
      unit: 'per lb',
      category: 'Leafy Greens'
    },
    {
      id: '2',
      name: 'Fresh Spinach',
      currentPrice: 3.99,
      lastUpdatedPrice: 3.99,
      unit: 'per lb',
      category: 'Leafy Greens'
    },
    {
      id: '3',
      name: 'Organic Carrots',
      currentPrice: 2.99,
      lastUpdatedPrice: 2.99,
      unit: 'per lb',
      category: 'Root Vegetables'
    },
    {
      id: '4',
      name: 'Fresh Basil',
      currentPrice: 5.99,
      lastUpdatedPrice: 5.99,
      unit: 'per bunch',
      category: 'Herbs'
    },
    {
      id: '5',
      name: 'Organic Tomatoes',
      currentPrice: 3.49,
      lastUpdatedPrice: 3.49,
      unit: 'per lb',
      category: 'Fruits'
    }
  ])

  const [newProductName, setNewProductName] = useState('')
  const [newProductPrice, setNewProductPrice] = useState('')
  const [newProductUnit, setNewProductUnit] = useState('per lb')
  const [newProductCategory, setNewProductCategory] = useState('Vegetables')
  const [updatingProduct, setUpdatingProduct] = useState<string | null>(null)

  const handleUpdatePrice = async (productId: string, newPrice: number) => {
    setUpdatingProduct(productId)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    
    setProducts(prev => 
      prev.map(product => 
        product.id === productId 
          ? { 
              ...product, 
              currentPrice: newPrice,
              lastUpdatedPrice: newPrice
            }
          : product
      )
    )
    
    setUpdatingProduct(null)
  }

  const handleAddProduct = async () => {
    if (!newProductName || !newProductPrice) return

    const newProduct: Product = {
      id: Date.now().toString(),
      name: newProductName,
      currentPrice: parseFloat(newProductPrice),
      lastUpdatedPrice: parseFloat(newProductPrice),
      unit: newProductUnit,
      category: newProductCategory
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    
    setProducts(prev => [...prev, newProduct])
    
    // Reset form
    setNewProductName('')
    setNewProductPrice('')
    setNewProductUnit('per lb')
    setNewProductCategory('Vegetables')
  }

  const getPriceChangeIndicator = (current: number, last: number) => {
    if (current > last) {
      return <span className="text-green-600 text-sm">↗ +${(current - last).toFixed(2)}</span>
    } else if (current < last) {
      return <span className="text-red-600 text-sm">↘ -${(last - current).toFixed(2)}</span>
    }
    return <span className="text-gray-500 text-sm">No change</span>
  }

  return (
    <div className="space-y-6">
      {/* Add New Product Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-green-600">➕</span>
            Add New Product
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <Input
              placeholder="Product name"
              value={newProductName}
              onChange={(e) => setNewProductName(e.target.value)}
              className="md:col-span-1"
            />
            <Input
              type="number"
              step="0.01"
              placeholder="Price"
              value={newProductPrice}
              onChange={(e) => setNewProductPrice(e.target.value)}
              className="md:col-span-1"
            />
            <select
              value={newProductUnit}
              onChange={(e) => setNewProductUnit(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="per lb">per lb</option>
              <option value="per bunch">per bunch</option>
              <option value="per piece">per piece</option>
              <option value="per kg">per kg</option>
            </select>
            <select
              value={newProductCategory}
              onChange={(e) => setNewProductCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="Vegetables">Vegetables</option>
              <option value="Leafy Greens">Leafy Greens</option>
              <option value="Root Vegetables">Root Vegetables</option>
              <option value="Herbs">Herbs</option>
              <option value="Fruits">Fruits</option>
            </select>
            <Button
              onClick={handleAddProduct}
              disabled={!newProductName || !newProductPrice}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Add Product
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Product Pricing Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-blue-600">💰</span>
            Daily Product Pricing
          </CardTitle>
          <p className="text-sm text-gray-600">
            Update your product prices for today. Changes are saved immediately.
          </p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Product</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Category</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Current Price</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">New Price</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Change</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} data-product-id={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{product.name}</p>
                        <p className="text-sm text-gray-500">{product.unit}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                        {product.category}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <p className="font-medium text-gray-900">
                        ${product.currentPrice.toFixed(2)}
                      </p>
                    </td>
                    <td className="py-4 px-4">
                      <Input
                        type="number"
                        step="0.01"
                        defaultValue={product.currentPrice}
                        className="w-24"
                        onBlur={(e) => {
                          const newPrice = parseFloat(e.target.value)
                          if (!isNaN(newPrice) && newPrice > 0) {
                            handleUpdatePrice(product.id, newPrice)
                          }
                        }}
                        placeholder={product.currentPrice.toString()}
                      />
                    </td>
                    <td className="py-4 px-4">
                      {getPriceChangeIndicator(product.currentPrice, product.lastUpdatedPrice)}
                    </td>
                    <td className="py-4 px-4">
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={updatingProduct === product.id}
                        onClick={() => {
                          // Find the input field in the same row
                          const row = document.querySelector(`tr[data-product-id="${product.id}"]`)
                          const input = row?.querySelector('input[type="number"]') as HTMLInputElement
                          if (input) {
                            const newPrice = parseFloat(input.value)
                            if (!isNaN(newPrice) && newPrice > 0) {
                              handleUpdatePrice(product.id, newPrice)
                            }
                          }
                        }}
                        className="bg-green-600 hover:bg-green-700 text-white border-green-600"
                      >
                        {updatingProduct === product.id ? 'Updating...' : 'Update'}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {products.length === 0 && (
            <p className="text-gray-500 text-center py-8">No products available. Add your first product above.</p>
          )}
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">Total Products</p>
              <p className="text-2xl font-bold text-blue-600">{products.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">Average Price</p>
              <p className="text-2xl font-bold text-green-600">
                ${(products.reduce((sum, p) => sum + p.currentPrice, 0) / products.length || 0).toFixed(2)}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">Price Changes Today</p>
              <p className="text-2xl font-bold text-purple-600">
                {products.filter(p => p.currentPrice !== p.lastUpdatedPrice).length}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ProductPricing
