import React from 'react'
import Link from 'next/link'
import { Button } from './ui/button'
import { ArrowLeft } from 'lucide-react'

export const BackToHomeBtn = () => {
  return (
    <Button variant="outline" className="inline-flex items-center gap-2 hover:bg-gray-50 transition-colors">
      <Link href="/" className="inline-flex items-center gap-2">
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>
    </Button>
  )
}