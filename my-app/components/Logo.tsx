import React from 'react'
import Link from 'next/link'
import LeafIcon from "@/components/ui/LeafIcon";
const Logo = () => {
  return (
    <Link href="/">
        <div className="flex items-center space-x-2">
            <LeafIcon />
            <span className="text-xl font-bold text-green-800">
                Green Street 🌿
              </span>
        </div>
    </Link>
  )
}

export default Logo
