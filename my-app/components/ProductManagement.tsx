import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const ProductManagement = () => {
  const products = [
    { name: 'Organic Kale', price: '$4.99/lb', stock: '25 lbs', image: '🥬' },
    { name: 'Fresh Spinach', price: '$3.99/lb', stock: '18 lbs', image: '🥬' },
    { name: 'Organic Carrots', price: '$2.99/lb', stock: '30 lbs', image: '🥕' },
    { name: 'Fresh Basil', price: '$5.99/bunch', stock: '12 bunches', image: '🌿' },
    { name: 'Organic Tomatoes', price: '$3.49/lb', stock: '22 lbs', image: '🍅' },
    { name: 'Fresh Mint', price: '$4.99/bunch', stock: '8 bunches', image: '🌿' }
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Your Products</h2>
        <Button className="bg-green-600 hover:bg-green-700">
          + Add New Product
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="text-center mb-4">
                <span className="text-4xl">{product.image}</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
              <p className="text-green-600 font-medium mb-2">{product.price}</p>
              <p className="text-gray-600 text-sm mb-4">Stock: {product.stock}</p>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1">Edit</Button>
                <Button variant="outline" size="sm" className="flex-1">Update Stock</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default ProductManagement
