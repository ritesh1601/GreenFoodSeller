'use client'

import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

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

interface OrdersProps {
  onOrderClick: (order: Order) => void
}

const Orders: React.FC<OrdersProps> = ({ onOrderClick }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  // Mock data - replace with actual API call
  const [orders] = useState<Order[]>([
    {
      id: '1',
      orderNumber: 'ORD-001',
      customerName: 'John Smith',
      date: '2024-01-15',
      total: 150.00,
      status: 'Delivered',
      shippingLocation: 'New York, NY',
      shippingDate: '2024-01-18',
      percentageCut: 15,
      items: [
        { name: 'Fresh Tomatoes', quantity: 2, price: 25.00, ratePerKg: 10 },
        { name: 'Organic Lettuce', quantity: 1, price: 15.00, ratePerKg: 5 },
        { name: 'Carrots', quantity: 3, price: 20.00, ratePerKg: 8 }
      ]
    },
    {
      id: '2',
      orderNumber: 'ORD-002',
      customerName: 'Sarah Johnson',
      date: '2024-01-16',
      total: 89.50,
      status: 'Shipped',
      shippingLocation: 'Los Angeles, CA',
      shippingDate: '2024-01-19',
      percentageCut: 15,
      items: [
        { name: 'Fresh Tomatoes', quantity: 1, price: 25.00, ratePerKg: 10 },
        { name: 'Organic Lettuce', quantity: 2, price: 15.00, ratePerKg: 5 },
        { name: 'Broccoli', quantity: 1, price: 34.50, ratePerKg: 12 }
      ]
    },
    {
      id: '3',
      orderNumber: 'ORD-003',
      customerName: 'Mike Davis',
      date: '2024-01-17',
      total: 200.00,
      status: 'Processing',
      shippingLocation: 'Chicago, IL',
      shippingDate: '2024-01-20',
      percentageCut: 15,
      items: [
        { name: 'Fresh Tomatoes', quantity: 4, price: 25.00, ratePerKg: 10 },
        { name: 'Organic Lettuce', quantity: 3, price: 15.00, ratePerKg: 5 },
        { name: 'Carrots', quantity: 2, price: 20.00, ratePerKg: 8 },
        { name: 'Broccoli', quantity: 2, price: 34.50, ratePerKg: 12 }
      ]
    }
  ])

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

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search orders by number or customer name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          <option value="all">All Statuses</option>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
        </select>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-gray-500">No orders found matching your criteria.</p>
            </CardContent>
          </Card>
        ) : (
          filteredOrders.map((order) => (
            <Card key={order.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => onOrderClick(order)}>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">Order {order.orderNumber}</h3>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                    </div>
                    <p className="text-gray-600 mb-1">Customer: {order.customerName}</p>
                    <p className="text-gray-600 mb-1">Date: {order.date}</p>
                    <p className="text-gray-600">Location: {order.shippingLocation}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-600">${order.total.toFixed(2)}</p>
                    <p className="text-sm text-gray-500">Your cut: ${(order.total * (order.percentageCut / 100)).toFixed(2)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

export default Orders
