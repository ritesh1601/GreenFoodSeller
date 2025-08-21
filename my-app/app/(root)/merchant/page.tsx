'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Textarea } from '@/components/ui/textarea'
import LeafIcon from '@/components/ui/LeafIcon'

// This component uses a richer visual language with gradients, shadows, and more modern layouts.
// It combines the stats and benefits section for a more powerful message.

const MerchantPage = () => {
  const [showForm, setShowForm] = useState(false)

  // Use a modern, asymmetric layout for the hero section with a subtle background animation
  const renderHeroSection = () => (
    <div className="relative overflow-hidden bg-gradient-to-br from-green-50 to-emerald-100 py-24 md:py-36">
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="mb-6 inline-flex items-center justify-center rounded-full bg-green-200 p-4 shadow-lg animate-pulse">
          <LeafIcon className="h-16 w-16 text-green-700" />
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-4">
          Grow Your Business with Sustainable Sourcing
        </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-4xl mx-auto mb-8">
          Join our curated network of farmers and producers. Access a thriving community of customers who seek high-quality, organic, and ethically sourced food.
        </p>
        <Button
          onClick={() => setShowForm(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-10 py-6 text-lg md:text-xl rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
        >
          Apply to Sell Today
        </Button>
      </div>
      {/* Subtle background graphics for visual interest */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
      </div>
    </div>
  )

  // Combine benefits and stats into a single, visually striking section
  const renderValueProposition = () => (
    <div className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16">Why Partners Thrive with Us</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Benefit Card 1 */}
          <div className="text-center group p-6 rounded-xl transition-all duration-300 hover:bg-gray-800 hover:shadow-2xl hover:scale-105">
            <div className="mx-auto mb-4 w-16 h-16 bg-green-600 rounded-full flex items-center justify-center transform transition-transform group-hover:rotate-12">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold mb-2">Higher Profits</h3>
            <p className="text-gray-400">Eliminate middlemen and keep more of your hard-earned revenue. We provide a direct-to-consumer pipeline.</p>
          </div>
          {/* Benefit Card 2 */}
          <div className="text-center group p-6 rounded-xl transition-all duration-300 hover:bg-gray-800 hover:shadow-2xl hover:scale-105">
            <div className="mx-auto mb-4 w-16 h-16 bg-green-600 rounded-full flex items-center justify-center transform transition-transform group-hover:-rotate-12">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold mb-2">Premium Customers</h3>
            <p className="text-gray-400">Tap into an exclusive market of customers who value quality, sustainability, and are willing to pay for it.</p>
          </div>
          {/* Benefit Card 3 */}
          <div className="text-center group p-6 rounded-xl transition-all duration-300 hover:bg-gray-800 hover:shadow-2xl hover:scale-105">
            <div className="mx-auto mb-4 w-16 h-16 bg-green-600 rounded-full flex items-center justify-center transform transition-transform group-hover:rotate-12">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold mb-2">Simplified Management</h3>
            <p className="text-gray-400">Our intuitive dashboard makes managing inventory and orders a breeze, so you can focus on your farm.</p>
          </div>
          {/* Stats Card - integrated for a stronger message */}
          <div className="text-center group p-6 rounded-xl transition-all duration-300 bg-emerald-500 hover:bg-emerald-600 hover:shadow-2xl hover:scale-105">
            <div className="mx-auto mb-4 w-16 h-16 bg-white rounded-full flex items-center justify-center">
              <div className="text-3xl font-bold text-emerald-600">+</div>
            </div>
            <h3 className="text-2xl font-semibold mb-2">10,000+ Happy Sellers</h3>
            <p className="text-emerald-100">Join a growing community of successful farmers and food producers already making an impact.</p>
          </div>
        </div>
      </div>
    </div>
  )

  // Testimonials with a more modern, layered design
  const renderTestimonialsSection = () => (
    <div className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Hear from Our Valued Partners</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-white p-8 rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mr-6">
                <span className="text-green-600 text-2xl font-bold">SM</span>
              </div>
              <div>
                <div className="font-bold text-lg text-gray-900">Sarah Mitchell</div>
                <div className="text-base text-gray-500">Organic Vegetable Farmer</div>
              </div>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">
              &ldquo;Since joining this platform, my sales have increased by 300%. The customers are amazing and really appreciate quality produce. The tools are intuitive and have saved me so much time.&rdquo;
            </p>
          </Card>
          <Card className="bg-white p-8 rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mr-6">
                <span className="text-green-600 text-2xl font-bold">MJ</span>
              </div>
              <div>
                <div className="font-bold text-lg text-gray-900">Mike Johnson</div>
                <div className="text-base text-gray-500">Local Herb Grower</div>
              </div>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">
              &ldquo;The platform is incredibly easy to use. I can focus on growing while they handle the customer relationships and payments. It has truly transformed my business and reach.&rdquo;
            </p>
          </Card>
        </div>
      </div>
    </div>
  )


  const renderCTASection = () => (
    <div className="relative py-24 bg-gradient-to-b from-emerald-600 to-green-800 text-white text-center">
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Ready to Take Your Farm to the Next Level?</h2>
        <p className="text-xl text-green-100 max-w-3xl mx-auto mb-10">
          Join thousands of successful farmers who are already thriving on our platform. Start your journey today and connect with customers who are passionate about quality and sustainability.
        </p>
        <div className="space-y-4 sm:space-y-0 sm:space-x-6">
          <Button
            onClick={() => setShowForm(true)}
            className="bg-white text-green-700 hover:bg-gray-100 px-10 py-6 text-lg rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            Start Your Application
          </Button>
          <Button
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-green-700 px-10 py-6 text-lg rounded-full transition-all duration-300"
          >
            Learn More About Our Mission
          </Button>
        </div>
      </div>
      {/* Subtle overlay for visual depth */}
      <div className="absolute inset-0 bg-black opacity-10"></div>
    </div>
  )

  const renderRegisterForm = () => (
    <div className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <Card className="w-full bg-white rounded-2xl shadow-2xl">
          <CardHeader className="text-center p-8">
            <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center shadow-md">
              <LeafIcon className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-3xl font-bold text-gray-900">Become a Green Food Seller</CardTitle>
            <CardDescription className="text-gray-600 mt-2">
              Complete the form below to start your application. We will review your submission and get back to you shortly.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="Enter your first name" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Enter your last name" className="mt-1" />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="Enter your email" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" placeholder="Enter your phone number" className="mt-1" />
              </div>
            </div>
            <div>
              <Label htmlFor="businessName">Business Name</Label>
              <Input id="businessName" placeholder="Enter your business name" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="location">Location/Farm Address</Label>
              <Input id="location" placeholder="Enter your farm location" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="products">Types of Products You&apos;ll Sell</Label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="vegetables" />
                  <Label htmlFor="vegetables" className="text-sm">Vegetables</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="fruits" />
                  <Label htmlFor="fruits" className="text-sm">Fruits</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="herbs" />
                  <Label htmlFor="herbs" className="text-sm">Herbs</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="grains" />
                  <Label htmlFor="grains" className="text-sm">Grains</Label>
                </div>
              </div>
            </div>
            <div>
              <Label htmlFor="about">Tell us about your farm/business</Label>
              <Textarea id="about" placeholder="Describe your farming practices, mission, and products." className="mt-1 min-h-[100px]" />
            </div>
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg rounded-full shadow-lg transition-all duration-300">
              Submit Application
            </Button>
            <p className="text-center text-sm text-gray-500 mt-4">
              We&apos;ll review your application and get back to you within 2 business days.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <main>
        {!showForm ? (
          <>
            {renderHeroSection()}
            {renderValueProposition()}
            {renderTestimonialsSection()}
            {renderCTASection()}
          </>
        ) : (
          <>
            <div className="bg-gray-100 py-6 border-b border-gray-200">
              <div className="container mx-auto px-4">
                <Button
                  variant="ghost"
                  onClick={() => setShowForm(false)}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Overview
                </Button>
              </div>
            </div>
            {renderRegisterForm()}
          </>
        )}
      </main>
    </div>
  )
}

export default MerchantPage
  