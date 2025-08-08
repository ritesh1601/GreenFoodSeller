// components/RightSidebar.tsx
import { Shield, Phone, MessageCircle, CheckCircle } from 'lucide-react'

export default function RightSidebar() {
    return (
        <div className="hidden xl:block w-80 p-6 bg-white border-l border-gray-200">
            <div className="space-y-6">
                {/* Security Status */}
                <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900">Security status</h3>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                            <span className="text-sm text-gray-600">Secure</span>
                        </div>
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>

                    <div className="text-xs text-gray-500">
                        Password last changed<br />
                        <span className="font-medium">Mar 15</span>
                    </div>

                    <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
                        Security Settings →
                    </button>
                </div>

                {/* Account Status */}
                <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900">Account status</h3>

                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                        </div>
                        <div>
                            <div className="text-sm font-medium text-gray-900">Secure</div>
                            <div className="text-xs text-gray-500">From and LookUp</div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="text-sm text-gray-600">Two-factor authentn</div>
                        <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-900">Enabled</span>
                            <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-indigo-600">
                                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6"></span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="text-sm text-gray-600">Account activity</div>
                        <div className="text-xs text-gray-500">Expiring 11:52 AM</div>
                        <button className="flex items-center text-indigo-600 text-sm hover:underline">
                            <Shield className="w-4 h-4 mr-1" />
                            Reset them
                        </button>
                    </div>
                </div>

                {/* Support */}
                <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900">Support</h3>

                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                        <div>
                            <div className="text-sm font-medium text-gray-900">Sarah Green</div>
                            <div className="text-xs text-gray-500">Support Agent</div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="text-sm text-gray-600">Contact number</div>
                        <div className="text-sm font-medium text-gray-900">(555) 123-4567</div>
                    </div>

                    <button className="flex items-center text-indigo-600 text-sm hover:underline">
                        <Phone className="w-4 h-4 mr-1" />
                        contact support
                    </button>
                </div>

                {/* Additional Support */}
                <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-3 mb-4">
                        <MessageCircle className="w-5 h-5 text-gray-400" />
                        <span className="text-sm font-medium text-gray-900">Quick Help</span>
                    </div>

                    <div className="space-y-2">
                        <div className="text-sm text-gray-600">Available 24/7</div>
                        <div className="text-sm font-medium text-gray-900">(555) 987-6543</div>
                    </div>

                    <button className="mt-3 text-indigo-600 text-sm hover:underline">
                        Contact support
                    </button>
                </div>
            </div>
        </div>
    )
}