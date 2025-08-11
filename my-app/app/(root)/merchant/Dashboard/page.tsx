'use client'

import React, { useState } from 'react'
// import DashboardHeader from '@/components/DashboardHeader'
import MerchantSidebar from '@/components/MerchantSidebar'
import CustomerManagement from '@/components/CustomerManagement'
import CustomerDetailView from '@/components/CustomerDetailView'
import ProductPricing from '@/components/ProductPricing'
import Orders from '@/components/Orders'
import OrderDetailView from '@/components/OrderDetailView'

interface Customer {
  id: string
  name: string
  email: string
  status: 'approved' | 'pending'
  joinDate: string
}

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

const MerchantDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const handleCustomerClick = (customer: Customer) => {
    setSelectedCustomer(customer)
  }

  const handleBackToCustomers = () => {
    setSelectedCustomer(null)
  }

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order)
  }

  const handleBackToOrders = () => {
    setSelectedOrder(null)
  }

  const renderContent = () => {
    if (selectedCustomer) {
      return (
        <CustomerDetailView 
          customer={selectedCustomer} 
          onBack={handleBackToCustomers} 
        />
      )
    }

    if (selectedOrder) {
      return (
        <OrderDetailView 
          order={selectedOrder} 
          onBack={handleBackToOrders} 
        />
      )
    }

    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Customer Dashboard</h1>
              <p className="text-gray-600">Manage your approved customers and review applications</p>
            </div>
            <CustomerManagement onCustomerClick={handleCustomerClick} />
          </div>
        )
      case 'applications':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Customer Applications</h1>
              <p className="text-gray-600">Review and approve new customer sign-ups</p>
            </div>
            <CustomerManagement onCustomerClick={handleCustomerClick} />
          </div>
        )
      case 'products':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Product Pricing</h1>
              <p className="text-gray-600">Manage your product prices and add new products</p>
            </div>
            <ProductPricing />
          </div>
        )
      case 'orders':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
              <p className="text-gray-600">View and manage customer orders</p>
            </div>
            <Orders onOrderClick={handleOrderClick} />
          </div>
        )
      default:
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Customer Dashboard</h1>
              <p className="text-gray-600">Manage your approved customers and review applications</p>
            </div>
            <CustomerManagement onCustomerClick={handleCustomerClick} />
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <DashboardHeader isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} /> */}
      
      <div className="flex">
        {/* Sidebar */}
        <div className="hidden lg:block">
          <MerchantSidebar 
            activeSection={activeSection} 
            onSectionChange={setActiveSection} 
          />
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-40">
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setIsMenuOpen(false)} />
            <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white">
              <MerchantSidebar 
                activeSection={activeSection} 
                onSectionChange={(section) => {
                  setActiveSection(section)
                  setIsMenuOpen(false)
                }} 
              />
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <main>
              {renderContent()}
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MerchantDashboard
