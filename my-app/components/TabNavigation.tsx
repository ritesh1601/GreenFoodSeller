import React from 'react'

interface Tab {
  id: string
  label: string
  icon: string
}

interface TabNavigationProps {
  tabs: Tab[]
  activeTab: string
  setActiveTab: (tabId: string) => void
}

const TabNavigation: React.FC<TabNavigationProps> = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="mb-8">
      <nav className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-green-600 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  )
}

export default TabNavigation
