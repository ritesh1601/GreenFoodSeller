'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface Customer {
  id: string
  name: string
  email: string
  status: 'approved' | 'pending'
  joinDate: string
}

interface CustomerManagementProps {
  onCustomerClick: (customer: Customer) => void
}

const CustomerManagement: React.FC<CustomerManagementProps> = ({ onCustomerClick }) => {
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      status: 'approved',
      joinDate: '2024-01-15'
    },
    {
      id: '2',
      name: 'Mike Chen',
      email: 'mike.chen@email.com',
      status: 'approved',
      joinDate: '2024-01-20'
    },
    {
      id: '3',
      name: 'Emma Davis',
      email: 'emma.davis@email.com',
      status: 'approved',
      joinDate: '2024-01-25'
    },
    {
      id: '4',
      name: 'Alex Thompson',
      email: 'alex.thompson@email.com',
      status: 'pending',
      joinDate: '2024-02-01'
    },
    {
      id: '5',
      name: 'Lisa Wang',
      email: 'lisa.wang@email.com',
      status: 'pending',
      joinDate: '2024-02-03'
    }
  ])

  const handleApprove = (customerId: string) => {
    setCustomers(prev => 
      prev.map(customer => 
        customer.id === customerId 
          ? { ...customer, status: 'approved' as const }
          : customer
      )
    )
  }

  const approvedCustomers = customers.filter(c => c.status === 'approved')
  const pendingCustomers = customers.filter(c => c.status === 'pending')

  return (
    <div className="space-y-6">
      {/* Approved Customers */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-green-600">✓</span>
            Approved Customers ({approvedCustomers.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {approvedCustomers.map((customer) => (
              <div
                key={customer.id}
                onClick={() => onCustomerClick(customer)}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <div>
                  <p className="font-medium text-gray-900">{customer.name}</p>
                  <p className="text-sm text-gray-600">{customer.email}</p>
                  <p className="text-xs text-gray-500">Joined: {customer.joinDate}</p>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Approved
                </Badge>
              </div>
            ))}
            {approvedCustomers.length === 0 && (
              <p className="text-gray-500 text-center py-4">No approved customers yet.</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Pending Applications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-yellow-600">⏳</span>
            Pending Applications ({pendingCustomers.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {pendingCustomers.map((customer) => (
              <div
                key={customer.id}
                className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-900">{customer.name}</p>
                  <p className="text-sm text-gray-600">{customer.email}</p>
                  <p className="text-xs text-gray-500">Applied: {customer.joinDate}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                    Pending
                  </Badge>
                  <Button
                    onClick={() => handleApprove(customer.id)}
                    className="bg-green-600 hover:bg-green-700 text-white"
                    size="sm"
                  >
                    Approve
                  </Button>
                </div>
              </div>
            ))}
            {pendingCustomers.length === 0 && (
              <p className="text-gray-500 text-center py-4">No pending applications.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default CustomerManagement
