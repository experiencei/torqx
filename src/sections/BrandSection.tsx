import React from 'react';
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Building2, Tag } from 'lucide-react';

interface BrandSectionProps {
  brandName: string;
  setBrandName: (name: string) => void;
  industry: string;
  setIndustry: (industry: string) => void;
}

const industries = [
  'Technology',
  'Healthcare',
  'Finance',
  'Retail',
  'Food & Beverage',
  'Automotive',
  'Entertainment',
  'Fashion',
  'Real Estate',
  'Education',
  'Travel & Tourism',
  'Sports & Fitness',
  'Beauty & Cosmetics',
  'Home & Garden',
  'Other'
];

export function BrandSection({ brandName, setBrandName, industry, setIndustry }: BrandSectionProps) {
  return (
    <Card className="bg-white border-gray-200 p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-black mb-6">Brand Information</h3>
      
      <div className="grid grid-cols-2 gap-6">
        {/* Brand Name */}
        <div className="space-y-3">
          <Label className="text-black">Brand Name</Label>
          <div className="relative">
            <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
            <Input
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              placeholder="Enter your brand name"
              className="pl-10 bg-white border-gray-300 text-black placeholder-gray-500 focus:border-purple-500"
            />
          </div>
        </div>

        {/* Industry */}
        <div className="space-y-3">
          <Label className="text-black">Industry</Label>
          <Select value={industry} onValueChange={setIndustry}>
            <SelectTrigger className="bg-white border-gray-300 text-black">
              <div className="flex items-center">
                <Tag className="w-4 h-4 mr-2 text-gray-500" />
                <SelectValue placeholder="Select industry" />
              </div>
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-200">
              {industries.map((ind) => (
                <SelectItem key={ind} value={ind} className="text-black hover:bg-gray-50">
                  {ind}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          Brand information helps us optimize your campaign for better audience targeting and compliance.
        </p>
      </div>
    </Card>
  );
}