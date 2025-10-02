import React from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Building2, Tag } from "lucide-react";

interface BrandSectionProps {
  brandName: string;
  setBrandName: (name: string) => void;
  industry: string;
  setIndustry: (industry: string) => void;
}

const industries = [
  "Technology",
  "Healthcare",
  "Finance",
  "Retail",
  "Food & Beverage",
  "Automotive",
  "Entertainment",
  "Fashion",
  "Real Estate",
  "Education",
  "Travel & Tourism",
  "Sports & Fitness",
  "Beauty & Cosmetics",
  "Home & Garden",
  "Other",
];

export function BrandSection({
  brandName,
  setBrandName,
  industry,
  setIndustry,
}: BrandSectionProps) {
  return (
    <Card className="bg-background border border-border p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-foreground mb-6">
        Brand Information
      </h3>

      <div className="grid grid-cols-2 gap-6">
        {/* Brand Name */}
        <div className="space-y-3">
          <Label className="text-foreground">Brand Name</Label>
          <div className="relative">
            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              placeholder="Enter your brand name"
              className="pl-10 bg-background border border-border text-foreground placeholder:text-muted-foreground focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
        </div>

        {/* Industry */}
        <div className="space-y-3">
          <Label className="text-foreground">Industry</Label>
          <Select value={industry} onValueChange={setIndustry}>
            <SelectTrigger className="bg-background border border-border text-foreground">
              <div className="flex items-center">
                <Tag className="w-4 h-4 mr-2 text-muted-foreground" />
                <SelectValue placeholder="Select industry" />
              </div>
            </SelectTrigger>
            <SelectContent className="bg-background border border-border shadow-lg backdrop-blur-md">
              {industries.map((ind) => (
                <SelectItem
                  key={ind}
                  value={ind}
                  className="text-foreground hover:bg-accent"
                >
                  {ind}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-4 p-3 bg-accent rounded-lg">
        <p className="text-sm text-muted-foreground">
          Brand information helps us optimize your campaign for better audience
          targeting and compliance.
        </p>
      </div>
    </Card>
  );
}
