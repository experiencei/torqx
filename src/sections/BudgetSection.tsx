import React from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Monitor, TrendingUp } from 'lucide-react';

interface BudgetSectionProps {
  budget: number;
  setBudget: (budget: number) => void;
  estimatedImpressions: number;
  cpm: number;
  screensCount: number;
  maxCapacity: boolean;
}

function SpeedometerChart({ value, max }: { value: number; max: number }) {
  const percentage = Math.min((value / max) * 100, 100);
  const angle = (percentage / 100) * 180; // Half circle
  
  return (
    <div className="relative w-24 h-12 md:w-32 md:h-16 mx-auto mb-4">
      {/* Background arc */}
      <svg className="w-full h-full" viewBox="0 0 128 64">
        <path
          d="M 16 48 A 48 48 0 0 1 112 48"
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="8"
          strokeLinecap="round"
        />
        {/* Progress arc */}
        <path
          d="M 16 48 A 48 48 0 0 1 112 48"
          fill="none"
          stroke="#9333ea"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={`${(angle / 180) * 150.8} 150.8`}
          className="transition-all duration-500"
        />
      </svg>
      {/* Pointer */}
      <div 
        className="absolute top-12 left-1/2 w-0.5 h-6 bg-purple-600 origin-bottom transition-transform duration-500"
        style={{ transform: `translateX(-50%) rotate(${angle - 90}deg)` }}
      />
      {/* Center dot */}
      <div className="absolute top-12 left-1/2 w-2 h-2 bg-purple-600 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
    </div>
  );
}

export function BudgetSection({ 
  budget, 
  setBudget, 
  estimatedImpressions, 
  cpm, 
  screensCount, 
  maxCapacity 
}: BudgetSectionProps) {
  const maxImpressions = 100000;
  
  return (
    <div className="space-y-6">
      {/* Budget Input */}
      <div className="space-y-3">
        <Label className="text-black">Campaign Budget</Label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600">₦</span>
          <Input
            type="number"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            className="pl-8 bg-white border-gray-300 text-black placeholder-gray-500 focus:border-purple-500"
            placeholder="500,000"
          />
        </div>
        <p className="text-sm text-gray-600">Enter your total campaign budget in Naira</p>
      </div>

      {/* Dynamic Metrics Card */}
      <Card className="bg-white border-gray-200 p-4 md:p-6 shadow-sm">
        <h3 className="text-base md:text-lg font-semibold text-black mb-4">Live Campaign Metrics</h3>
        
        {/* Speedometer for Impressions */}
        <div className="mb-6">
          <div className="text-center mb-2">
            <p className="text-sm text-gray-600 mb-1">Estimated Impressions</p>
            <SpeedometerChart value={estimatedImpressions} max={maxImpressions} />
            <p className="text-xl md:text-2xl font-semibold text-black">
              {estimatedImpressions.toLocaleString()}
            </p>
            <p className="text-xs text-gray-500">of {maxImpressions.toLocaleString()} max</p>
          </div>
        </div>

        <div className="space-y-4">
          {/* CPM */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm md:text-base text-black">CPM</span>
            </div>
            <span className="text-lg md:text-xl font-semibold text-black">₦{cpm}</span>
          </div>

          {/* Screens Count */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Monitor className="w-4 h-4 md:w-5 md:h-5 text-purple-600" />
              <span className="text-sm md:text-base text-black">Screens Count</span>
            </div>
            <span className="text-lg md:text-xl font-semibold text-black">{screensCount}</span>
          </div>

          {/* Max Capacity Warning */}
          {maxCapacity && (
            <div className="flex items-center space-x-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
              <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-orange-600 flex-shrink-0" />
              <div>
                <p className="text-sm md:text-base text-orange-800 font-medium">Max Capacity Reached</p>
                <p className="text-xs md:text-sm text-orange-700">Consider increasing budget for better coverage</p>
              </div>
            </div>
          )}
        </div>

        {/* Real-time indicator */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs md:text-sm text-gray-600">Metrics update in real-time</span>
          </div>
        </div>
      </Card>
    </div>
  );
}