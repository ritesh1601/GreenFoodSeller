import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const DashboardOverview = () => {
  const stats = [
    { label: 'Total Revenue', value: '$2,450', icon: '💰', bgColor: 'bg-green-100', textColor: 'text-green-600' },
    { label: 'Orders', value: '24', icon: '📦', bgColor: 'bg-blue-100', textColor: 'text-blue-600' },
    { label: 'Products', value: '12', icon: '🥬', bgColor: 'bg-yellow-100', textColor: 'text-yellow-600' },
    { label: 'Rating', value: '4.8', icon: '⭐', bgColor: 'bg-purple-100', textColor: 'text-purple-600' }
  ]

  const recentOrders = [
    { id: 1, customer: 'Sarah Johnson', product: 'Organic Kale', amount: '$45.00', status: 'Delivered' },
    { id: 2, customer: 'Mike Chen', product: 'Fresh Spinach', amount: '$32.50', status: 'In Transit' },
    { id: 3, customer: 'Emma Davis', product: 'Organic Carrots', amount: '$28.75', status: 'Processing' }
  ]

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800'
      case 'In Transit':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-yellow-100 text-yellow-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className={`w-8 h-8 ${stat.bgColor} rounded-full flex items-center justify-center`}>
                  <span className={`${stat.textColor} text-lg`}>{stat.icon}</span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-xl font-bold">{stat.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{order.customer}</p>
                  <p className="text-sm text-gray-600">{order.product}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{order.amount}</p>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusStyle(order.status)}`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default DashboardOverview
