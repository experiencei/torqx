import React from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Monitor, TrendingUp } from "lucide-react";

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
  const angle = (percentage / 100) * 180;

  return (
    <div className="relative w-24 h-12 md:w-32 md:h-16 mx-auto mb-4">
      {/* Background arc */}
      <svg className="w-full h-full" viewBox="0 0 128 64">
        <path
          d="M 16 48 A 48 48 0 0 1 112 48"
          fill="none"
          stroke="currentColor"
          className="text-muted-foreground"
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
  maxCapacity,
}: BudgetSectionProps) {
  const maxImpressions = 100000;

  return (
    <div className="space-y-6">
      {/* Budget Input */}
      <div className="space-y-3">
        <Label className="text-foreground">Campaign Budget</Label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
            ₦
          </span>
          <Input
            type="number"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            className="pl-8 bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-purple-500"
            placeholder="500,000"
          />
        </div>
        <p className="text-sm text-muted-foreground">
          Enter your total campaign budget in Naira
        </p>
      </div>

      {/* Dynamic Metrics Card */}
      <Card className="bg-background border border-border p-4 md:p-6 shadow-sm">
        <h3 className="text-base md:text-lg font-semibold text-foreground mb-4">
          Live Campaign Metrics
        </h3>

        {/* Speedometer for Impressions */}
        <div className="mb-6">
          <div className="text-center mb-2">
            <p className="text-sm text-muted-foreground mb-1">
              Estimated Impressions
            </p>
            <SpeedometerChart
              value={estimatedImpressions}
              max={maxImpressions}
            />
            <p className="text-xl md:text-2xl font-semibold text-foreground">
              {estimatedImpressions.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground">
              of {maxImpressions.toLocaleString()} max
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {/* CPM */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm md:text-base text-foreground">CPM</span>
            </div>
            <span className="text-lg md:text-xl font-semibold text-foreground">
              ₦{cpm}
            </span>
          </div>

          {/* Screens Count */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Monitor className="w-4 h-4 md:w-5 md:h-5 text-purple-600" />
              <span className="text-sm md:text-base text-foreground">
                Screens Count
              </span>
            </div>
            <span className="text-lg md:text-xl font-semibold text-foreground">
              {screensCount}
            </span>
          </div>

          {/* Max Capacity Warning */}
          {maxCapacity && (
            <div className="flex items-center space-x-3 p-3 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg">
              <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-orange-600 flex-shrink-0" />
              <div>
                <p className="text-sm md:text-base text-orange-800 dark:text-orange-300 font-medium">
                  Max Capacity Reached
                </p>
                <p className="text-xs md:text-sm text-orange-700 dark:text-orange-400">
                  Consider increasing budget for better coverage
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Real-time indicator */}
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs md:text-sm text-muted-foreground">
              Metrics update in real-time
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
}
