"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Property } from "@/types";

export interface Filters {
  priceRange: [number, number];
  type: 'all' | Property['type'];
  bedrooms: number;
}

interface FilterSidebarProps {
  filters: Filters;
  onFilterChange: (newFilters: Filters) => void;
  onReset: () => void;
}

export function FilterSidebar({ filters, onFilterChange, onReset }: FilterSidebarProps) {
  const handlePriceChange = (value: number[]) => {
    onFilterChange({ ...filters, priceRange: [value[0], value[1]] });
  };

  const handleTypeChange = (value: 'all' | Property['type']) => {
    onFilterChange({ ...filters, type: value });
  };

  const handleBedroomsChange = (value: string) => {
    onFilterChange({ ...filters, bedrooms: parseInt(value, 10) });
  };

  return (
    <aside className="w-full md:w-80 lg:w-96 p-6 bg-card rounded-lg shadow-lg h-fit sticky top-8">
      <h2 className="text-2xl font-bold mb-6">Filters</h2>
      <div className="space-y-8">
        <div>
          <Label htmlFor="price-range" className="text-lg font-semibold">Price Range</Label>
          <div className="mt-4">
            <Slider
              id="price-range"
              min={0}
              max={500}
              step={10}
              value={filters.priceRange}
              onValueChange={handlePriceChange}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground mt-2">
              <span>${filters.priceRange[0]}</span>
              <span>${filters.priceRange[1]}</span>
            </div>
          </div>
        </div>

        <div>
          <Label htmlFor="property-type" className="text-lg font-semibold">Property Type</Label>
           <Select onValueChange={handleTypeChange} value={filters.type} >
              <SelectTrigger id="property-type" className="w-full mt-2">
                <SelectValue placeholder="Select a type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="house">House</SelectItem>
                <SelectItem value="condo">Condo</SelectItem>
              </SelectContent>
            </Select>
        </div>

        <div>
          <Label className="text-lg font-semibold">Bedrooms</Label>
          <RadioGroup value={String(filters.bedrooms)} onValueChange={handleBedroomsChange} className="mt-2 space-y-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="0" id="any-beds" />
              <Label htmlFor="any-beds">Any</Label>
            </div>
             <div className="flex items-center space-x-2">
              <RadioGroupItem value="1" id="1-bed" />
              <Label htmlFor="1-bed">1</Label>
            </div>
             <div className="flex items-center space-x-2">
              <RadioGroupItem value="2" id="2-beds" />
              <Label htmlFor="2-beds">2</Label>
            </div>
             <div className="flex items-center space-x-2">
              <RadioGroupItem value="3" id="3-beds" />
              <Label htmlFor="3-beds">3</Label>
            </div>
             <div className="flex items-center space-x-2">
              <RadioGroupItem value="4" id="4-beds" />
              <Label htmlFor="4-beds">4+</Label>
            </div>
          </RadioGroup>
        </div>
        
        <Button onClick={onReset} variant="outline" className="w-full">Reset Filters</Button>
      </div>
    </aside>
  );
}
