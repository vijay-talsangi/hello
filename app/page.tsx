"use client";

import * as React from "react";
import { mockProperties } from "@/lib/mock-data";
import { Property } from "@/types";
import { FilterSidebar, Filters } from "@/components/filter-sidebar";
import { PropertyCard } from "@/components/property-card";
import { PropertyDetailsModal } from "@/components/property-details-modal";

const initialFilters: Filters = {
  priceRange: [0, 500],
  type: 'all',
  bedrooms: 0,
};

export default function HomePage() {
  const [filters, setFilters] = React.useState<Filters>(initialFilters);
  const [selectedProperty, setSelectedProperty] = React.useState<Property | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
  };
  
  const handleResetFilters = () => {
    setFilters(initialFilters);
  }

  const handleCardClick = (property: Property) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProperty(null);
  };

  const filteredProperties = React.useMemo(() => {
    return mockProperties.filter(property => {
      const { priceRange, type, bedrooms } = filters;
      
      // Price filter
      if (property.price < priceRange[0] || property.price > priceRange[1]) {
        return false;
      }

      // Type filter
      if (type !== 'all' && property.type !== type) {
        return false;
      }
      
      // Bedrooms filter
      if (bedrooms > 0) {
        if (bedrooms === 4 && property.bedrooms < 4) return false;
        if (bedrooms < 4 && property.bedrooms !== bedrooms) return false;
      }

      return true;
    });
  }, [filters]);

  return (
    <main className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Find Your Perfect Stay</h1>
        <p className="mt-4 text-lg text-muted-foreground">Explore our curated list of properties</p>
      </header>
      <div className="flex flex-col md:flex-row gap-12">
        <FilterSidebar filters={filters} onFilterChange={handleFilterChange} onReset={handleResetFilters} />
        <div className="flex-1">
          {filteredProperties.length > 0 ? (
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map(property => (
                <PropertyCard key={property.id} property={property} onClick={() => handleCardClick(property)} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full min-h-[400px] bg-card rounded-lg p-8">
              <h3 className="text-2xl font-semibold">No Properties Found</h3>
              <p className="text-muted-foreground mt-2">Try adjusting your filters to find your perfect stay.</p>
            </div>
          )}
        </div>
      </div>
      <PropertyDetailsModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        property={selectedProperty}
      />
    </main>
  );
}
