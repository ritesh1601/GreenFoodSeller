'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, MapPin } from 'lucide-react'

// You'll need to define this interface in your main dashboard file
interface Order {
  id: string
  orderNumber: string
  customerName: string
  date: string
  total: number
  status: string
  shippingLocation: string
  shippingDate: string
  percentageCut: number
  items: Array<{
    name: string
    quantity: number
    price: number
    ratePerKg: number
  }>
}

interface OrderDetailViewProps {
  order: Order
  onBack: () => void
}

const OrderDetailView: React.FC<OrderDetailViewProps> = ({ order, onBack }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800'
      case 'Shipped':
        return 'bg-blue-100 text-blue-800'
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  // Calculate the total based on items, just in case
  const calculatedTotal = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button onClick={onBack} variant="outline" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Orders
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Order {order.orderNumber}</h1>
          <p className="text-gray-600">From: {order.customerName}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Order Summary Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-purple-600">📊</span>
              Order Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Order Date</p>
                <p className="text-gray-900">{order.date}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Status</p>
                <Badge className={getStatusColor(order.status)}>
                  {order.status}
                </Badge>
              </div>
              <div className="col-span-2">
                <p className="text-sm font-medium text-gray-500">Total Order Value</p>
                <p className="text-2xl font-bold text-green-600">${calculatedTotal.toFixed(2)}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm font-medium text-gray-500">Your Cut</p>
                <p className="text-2xl font-bold text-blue-600">
                  ${(calculatedTotal * (order.percentageCut / 100)).toFixed(2)}
                  <span className="text-base text-gray-500 ml-2">({order.percentageCut}%)</span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Shipping Details Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-green-600" />
              Shipping Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <p className="text-sm font-medium text-gray-500">Shipping To</p>
              <p className="text-gray-900">{order.shippingLocation}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Shipped On</p>
              <p className="text-gray-900">{order.shippingDate}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Order Items Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-purple-600">🛒</span>
            Items in Order
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Item</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">Rate Per Kg</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Quantity</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">Price</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, index) => (
                  <tr key={index} className="border-b border-gray-100 last:border-b-0">
                    <td className="py-4 px-4 text-gray-900">{item.name}</td>
                    <td className="py-4 px-4 text-right text-gray-600">${item.ratePerKg.toFixed(2)}/kg</td>
                    <td className="py-4 px-4 text-left text-gray-900">{item.quantity}</td>
                    <td className="py-4 px-4 text-right text-gray-900">${item.price.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-gray-50">
                  <td colSpan={3} className="py-4 px-4 font-bold text-gray-900">Total</td>
                  <td className="py-4 px-4 text-right font-bold text-green-600">
                    ${calculatedTotal.toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default OrderDetailView
