import React from 'react'
import { recommendedItems, topSellers } from "@/app/constants"
import DashboardHeader from "@/components/DashboardHeader"
import ProductSection from "@/components/ProductSection"
import RightSidebar from "@/components/RightSidebar"

const page = () => {
    if (!recommendedItems || !topSellers) {
        return (
            <div className="flex min-h-screen bg-gray-50">
                <main className="flex-1">
                    <div className="flex">
                        <div className="flex-1 p-6 lg:pr-0">
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                                <div className="text-center text-gray-500">
                                    Loading dashboard...
                                </div>
                            </div>
                        </div>
                        <RightSidebar />
                    </div>
                </main>
            </div>
        )
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            <main className="flex-1">
                <div className="flex">
                    <div className="flex-1 p-6 lg:pr-0">
                        <DashboardHeader />

                        <div className="mt-8 space-y-8">
                            <ProductSection
                                title="Your recommendations"
                                items={recommendedItems}
                                showAddButton={true}
                            />

                            <ProductSection
                                title="Top sellers"
                                items={topSellers.slice(0, 3)}
                                showAddButton={false}
                            />
                        </div>
                    </div>

                    <RightSidebar />
                </div>
            </main>
        </div>
    )
}

export default page
