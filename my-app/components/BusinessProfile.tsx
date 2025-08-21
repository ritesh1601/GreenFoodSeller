import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const BusinessProfile = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Business Profile</CardTitle>
          <CardDescription>Manage your business information and settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="businessName">Business Name</Label>
              <Input id="businessName" defaultValue="Green Valley Farm" />
            </div>
            <div>
              <Label htmlFor="ownerName">Owner Name</Label>
              <Input id="ownerName" defaultValue="John Smith" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" defaultValue="john@greenvalleyfarm.com" />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" defaultValue="+1 (555) 123-4567" />
            </div>
          </div>

          <div>
            <Label htmlFor="address">Business Address</Label>
            <Input id="address" defaultValue="123 Farm Road, Green Valley, CA 90210" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="certification">Organic Certification</Label>
              <select id="certification" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                <option value="usda">USDA Organic</option>
                <option value="eu">EU Organic</option>
                <option value="canada">Canada Organic</option>
                <option value="none">No certification</option>
              </select>
            </div>
            <div>
              <Label htmlFor="experience">Years of Experience</Label>
              <Input id="experience" type="number" defaultValue="8" min="0" />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Business Description</Label>
            <textarea 
              id="description" 
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              defaultValue="We are a family-owned organic farm committed to sustainable agriculture and providing the highest quality produce to our community."
            />
          </div>

          <Button className="bg-green-600 hover:bg-green-700 text-white">
            Update Profile
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default BusinessProfile
