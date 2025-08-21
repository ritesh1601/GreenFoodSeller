'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'

interface Customer {
  id: string
  name: string
  email: string
  status: 'approved' | 'pending'
  joinDate: string
}

interface Order {
  id: string
  date: string
  total: number
  status: string
  items: string[]
}

interface CustomerDetailViewProps {
  customer: Customer
  onBack: () => void
}

const CustomerDetailView: React.FC<CustomerDetailViewProps> = ({ customer, onBack }) => {
  const [notes, setNotes] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  // Mock order history data
  const orderHistory: Order[] = [
    {
      id: 'ORD-001',
      date: '2024-02-01',
      total: 45.00,
      status: 'Delivered',
      items: ['Organic Kale (2 lbs)', 'Fresh Spinach (1 lb)']
    },
    {
      id: 'ORD-002',
      date: '2024-01-28',
      total: 32.50,
      status: 'Delivered',
      items: ['Fresh Spinach (2 lbs)', 'Organic Carrots (1 lb)']
    },
    {
      id: 'ORD-003',
      date: '2024-01-20',
      total: 28.75,
      status: 'Delivered',
      items: ['Organic Carrots (2 lbs)', 'Fresh Basil (1 bunch)']
    }
  ]

  // Load saved notes from localStorage (or API in real app)
  useEffect(() => {
    const savedNotes = localStorage.getItem(`customer-notes-${customer.id}`)
    if (savedNotes) {
      setNotes(savedNotes)
    }
  }, [customer.id])

  // Auto-save notes after user stops typing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (notes !== '') {
        saveNotes()
      }
    }, 1000)

    return () => clearTimeout(timeoutId)
  }, [notes])

  const saveNotes = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Save to localStorage (or API in real app)
    localStorage.setItem(`customer-notes-${customer.id}`, notes)
    setIsSaving(false)
  }

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800'
      case 'In Transit':
        return 'bg-blue-100 text-blue-800'
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4">
        <Button
          onClick={onBack}
          variant="outline"
          className="flex items-center gap-2"
        >
          ← Back to Customers
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{customer.name}</h1>
          <p className="text-gray-600">{customer.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Connection Notes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-blue-600">📝</span>
              Connection Notes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Add notes about your relationship with this customer..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[200px] resize-none"
            />
            {isSaving && (
              <p className="text-sm text-gray-500 mt-2">Saving...</p>
            )}
            <p className="text-xs text-gray-500 mt-2">
              Notes are automatically saved as you type.
            </p>
          </CardContent>
        </Card>

        {/* Customer Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-green-600">👤</span>
              Customer Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Status</p>
              <Badge 
                variant="secondary" 
                className={customer.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
              >
                {customer.status === 'approved' ? 'Approved' : 'Pending'}
              </Badge>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Member Since</p>
              <p className="text-gray-900">{new Date(customer.joinDate).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Orders</p>
              <p className="text-2xl font-bold text-green-600">{orderHistory.length}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Spent</p>
              <p className="text-2xl font-bold text-green-600">
                ${orderHistory.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Order History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-purple-600">📦</span>
            Order History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {orderHistory.map((order) => (
              <div key={order.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-medium text-gray-900">Order {order.id}</p>
                    <p className="text-sm text-gray-600">{new Date(order.date).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-600">${order.total.toFixed(2)}</p>
                    <Badge variant="secondary" className={getStatusStyle(order.status)}>
                      {order.status}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-1">
                  {order.items.map((item, index) => (
                    <p key={index} className="text-sm text-gray-600">• {item}</p>
                  ))}
                </div>
              </div>
            ))}
            {orderHistory.length === 0 && (
              <p className="text-gray-500 text-center py-8">No orders yet.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default CustomerDetailView
