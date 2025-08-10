import React from 'react'
import LeafIcon from '@/components/ui/LeafIcon'
import MenuIcon from '@/components/ui/MenuIcon'
import XIcon from '@/components/ui/XIcon'

interface DashboardHeaderProps {
  isMenuOpen: boolean
  setIsMenuOpen: (isOpen: boolean) => void
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ isMenuOpen, setIsMenuOpen }) => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <LeafIcon className="w-8 h-8 text-green-600" />
            <h1 className="text-xl font-bold text-gray-900">Merchant Dashboard</h1>
          </div>
          
          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            {isMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>
    </header>
  )
}

export default DashboardHeader