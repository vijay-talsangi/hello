"use client";

import * as React from "react";
import { Property } from "@/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Bed, Bath, Users, MapPin, Star } from "lucide-react";

interface PropertyDetailsModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
}

export function PropertyDetailsModal({ property, isOpen, onClose }: PropertyDetailsModalProps) {
  if (!property) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <div className="relative mb-4">
             <img
                src={property.imageUrl}
                alt={property.title}
                className="w-full h-64 object-cover rounded-t-lg"
              />
          </div>
          <DialogTitle className="text-2xl font-bold">{property.title}</DialogTitle>
          <DialogDescription className="flex items-center text-muted-foreground pt-1">
            <MapPin className="w-4 h-4 mr-1" />
            {property.location}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <p className="text-base">{property.description}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-muted">
              <Bed className="w-6 h-6 mb-1" />
              <span className="font-semibold">{property.bedrooms}</span>
              <span className="text-sm text-muted-foreground">Bedrooms</span>
            </div>
            <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-muted">
              <Bath className="w-6 h-6 mb-1" />
              <span className="font-semibold">{property.bathrooms}</span>
              <span className="text-sm text-muted-foreground">Bathrooms</span>
            </div>
             <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-muted">
              <Users className="w-6 h-6 mb-1" />
              <span className="font-semibold">{property.guests}</span>
              <span className="text-sm text-muted-foreground">Guests</span>
            </div>
            <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-muted">
              <Star className="w-6 h-6 mb-1 text-yellow-500 fill-yellow-500" />
               <span className="font-semibold">{property.rating}</span>
               <span className="text-sm text-muted-foreground">Rating</span>
            </div>
          </div>
           <div className="text-3xl font-bold text-right mt-4">
            ${property.price} <span className="text-lg font-normal text-muted-foreground">/ night</span>
           </div>
        </div>
        <DialogFooter>
          <Button onClick={onClose} variant="outline">Close</Button>
          <Button>Book Now</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
