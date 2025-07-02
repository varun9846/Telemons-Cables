'use client'
import React from 'react'

export const Loader = () => {
  return (
    <div className="fixed inset-0 bg-telemons-blue-900/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="relative">
        {/* Outer ring with Telemons blue */}
        <div className="animate-spin rounded-full h-32 w-32 border-4 border-telemons-blue-200 border-t-telemons-blue-primary"></div>
        
        {/* Inner ring with Telemons orange */}
        <div className="absolute inset-4 animate-spin rounded-full border-4 border-telemons-orange-200 border-t-telemons-orange-primary" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
        
        {/* Center logo or text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-telemons-orange-primary font-bold text-lg">Telemons</div>
        </div>
      </div>
    </div>
  )
}
