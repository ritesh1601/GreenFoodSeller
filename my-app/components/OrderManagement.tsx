import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const OrderManagement = () => {
  const orders = [
    { 
      id: 'ORD-001', 
      customer: 'Sarah Johnson', 
      items: ['Organic Kale (2 lbs)', 'Fresh Spinach (1 lb)'], 
      total: '$13.97', 
      date: '2024-01-15', 
      status: 'Pending' 
    },
    { 
      id: 'ORD-002', 
      customer: 'Mike Chen', 
      items: ['Organic Carrots (3 lbs)', 'Fresh Basil (1 bunch)'], 
      total: '$14.96', 
      date: '2024-01-14', 
      status: 'Shipped' 
    },
    { 
      id: 'ORD-003', 
      customer: 'Emma Davis', 
      items: ['Organic Tomatoes (2 lbs)'], 
      total: '$6.98', 
      date: '2024-01-13', 
      status: 'Delivered' 
    }
  ]

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800'
      case 'Shipped':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-yellow-100 text-yellow-800'
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Order Management</CardTitle>
          <CardDescription>Track and manage all customer orders</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold">{order.id}</h4>
                    <p className="text-gray-600">{order.customer}</p>
                    <p className="text-sm text-gray-500">{order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-lg">{order.total}</p>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusStyle(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-sm font-medium mb-1">Items:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {order.items.map((item, index) => (
                      <li key={index}>• {item}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">View Details</Button>
                  <Button size="sm" variant="outline">Update Status</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default OrderManagement
