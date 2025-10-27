"use client";

import * as React from "react";
import { Property } from "@/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

interface PropertyCardProps {
  property: Property;
  onClick: () => void;
}

export function PropertyCard({ property, onClick }: PropertyCardProps) {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer" onClick={onClick}>
      <CardHeader className="p-0">
        <div className="relative">
          <img
            src={property.imageUrl}
            alt={property.title}
            className="w-full h-48 object-cover"
          />
          <Badge className="absolute top-2 right-2" variant="destructive">${property.price}/night</Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg font-semibold mb-2 truncate">{property.title}</CardTitle>
        <p className="text-sm text-muted-foreground">{property.location}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center p-4 pt-0">
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          <span className="text-sm font-bold">{property.rating}</span>
        </div>
        <p className="text-sm capitalize">{property.type}</p>
      </CardFooter>
    </Card>
  );
}
