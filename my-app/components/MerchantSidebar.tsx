'use client'

import React from 'react'
import { Button } from '@/components/ui/button'

interface MerchantSidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

const MerchantSidebar: React.FC<MerchantSidebarProps> = ({ activeSection, onSectionChange }) => {
  const sections = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: '👥',
      description: 'View approved customers'
    },
    {
      id: 'applications',
      label: 'Applications',
      icon: '📝',
      description: 'Review new sign-ups'
    },
    {
      id: 'products',
      label: 'Products',
      icon: '💰',
      description: 'Manage pricing'
    },
    {
      id: 'orders',
      label: 'Orders',
      icon: '📦',
      description: 'View orders'
    }
  ]

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-6 space-y-4">
      <nav className="space-y-2">
        {sections.map((section) => {
          const isActive = activeSection === section.id
          return (
            <Button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              variant={isActive ? 'default' : 'ghost'}
              className={`w-full justify-start h-auto p-4 ${
                isActive
                  ? 'bg-green-600 hover:bg-green-700 text-white shadow-md'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <div className="flex items-start space-x-3 text-left">
                <span className="text-xl">{section.icon}</span>
                <div>
                  <div className="font-medium">{section.label}</div>
                  <div className={`text-xs ${
                    isActive ? 'text-green-100' : 'text-gray-500'
                  }`}>
                    {section.description}
                  </div>
                </div>
              </div>
            </Button>
          )
        })}
      </nav>

      {/* Quick Stats */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Quick Stats</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Approved Customers</span>
            <span className="font-medium text-green-600">24</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Pending Applications</span>
            <span className="font-medium text-yellow-600">3</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Active Products</span>
            <span className="font-medium text-blue-600">12</span>
          </div>
        </div>
      </div>

      {/* Help Section */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Need Help?</h3>
        <Button variant="outline" size="sm" className="w-full">
          📞 Contact Support
        </Button>
      </div>
    </div>
  )
}

export default MerchantSidebar
