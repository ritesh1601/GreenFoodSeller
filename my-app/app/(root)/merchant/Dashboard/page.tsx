'use client'

import React, { useState } from 'react'
import DashboardHeader from '@/components/DashboardHeader'
import TabNavigation from '@/components/TabNavigation'
import DashboardOverview from '@/components/DashboardOverview'
import ProductManagement from '@/components/ProductManagement'
import OrderManagement from '@/components/OrderManagement'
import AnalyticsOverview from '@/components/AnalyticsOverview'
import BusinessProfile from '@/components/BusinessProfile'

const MerchantDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'products', label: 'Manage Products', icon: '🥬' },
    { id: 'orders', label: 'Orders & Sales', icon: '📦' },
    { id: 'analytics', label: 'Analytics', icon: '📈' },
    { id: 'profile', label: 'Profile', icon: '👤' }
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview />
      case 'products':
        return <ProductManagement />
      case 'orders':
        return <OrderManagement />
      case 'analytics':
        return <AnalyticsOverview />
      case 'profile':
        return <BusinessProfile />
      default:
        return <DashboardOverview />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TabNavigation tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

        <main>
          {renderContent()}
        </main>
      </div>
    </div>
  )
}

export default MerchantDashboard
