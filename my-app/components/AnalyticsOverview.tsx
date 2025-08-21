import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const AnalyticsOverview = () => {
  const topProducts = [
    { name: 'Organic Kale', sales: 45, revenue: '$224.55' },
    { name: 'Fresh Spinach', sales: 38, revenue: '$151.62' },
    { name: 'Organic Carrots', sales: 32, revenue: '$95.68' }
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sales Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>This Week</span>
                <span className="font-semibold">$450</span>
              </div>
              <div className="flex justify-between items-center">
                <span>This Month</span>
                <span className="font-semibold">$2,450</span>
              </div>
              <div className="flex justify-between items-center">
                <span>This Year</span>
                <span className="font-semibold">$18,750</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topProducts.map((product, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm">{product.name}</span>
                  <div className="text-right">
                    <p className="text-sm font-medium">{product.sales} units</p>
                    <p className="text-xs text-gray-600">{product.revenue}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customer Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">156</p>
              <p className="text-sm text-gray-600">Total Customers</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">4.8</p>
              <p className="text-sm text-gray-600">Average Rating</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-2xl font-bold text-purple-600">78%</p>
              <p className="text-sm text-gray-600">Repeat Customers</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AnalyticsOverview
