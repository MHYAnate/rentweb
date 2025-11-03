"use client"

import { Building, Users, Star, TrendingUp } from "lucide-react"

export function PremiumSection() {
  return (
    <section className="py-16 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Why Choose Ppoint?</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join thousands of satisfied users who have found their perfect properties through our platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building className="w-8 h-8 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Verified Properties</h3>
            <p className="text-gray-300">All properties are verified by our team for authenticity and quality</p>
          </div>

          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Trusted Agents</h3>
            <p className="text-gray-300">Work with verified and experienced real estate professionals</p>
          </div>

          <div className="text-center">
            <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-yellow-600" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Quality Service</h3>
            <p className="text-gray-300">Exceptional customer service and support throughout your journey</p>
          </div>

          <div className="text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Market Insights</h3>
            <p className="text-gray-300">Get access to real-time market data and property analytics</p>
          </div>
        </div>
      </div>
    </section>
  )
}
