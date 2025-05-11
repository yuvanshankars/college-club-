
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { LogIn } from "lucide-react";

interface HomeFeaturesProps {
  eventImages: string[];
  onLogin: () => void;
}

const HomeFeatures: React.FC<HomeFeaturesProps> = ({ eventImages, onLogin }) => {
  return (
    <div className="max-w-3xl mx-auto text-center py-12">
      <h2 className="text-3xl font-bold mb-4">Welcome to Lovable</h2>
      <p className="text-xl text-muted-foreground mb-8">
        Your one-stop platform for college events and activities.
      </p>
      
      {/* Featured Event Images */}
      <div className="mb-12">
        <h3 className="text-xl font-semibold mb-4">Featured Events</h3>
        <Carousel className="w-full max-w-4xl mx-auto">
          <CarouselContent>
            {eventImages.map((img, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card className="overflow-hidden">
                    <div className="h-48">
                      <img 
                        src={img} 
                        alt={`Featured event ${index + 1}`} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <p className="font-medium">Upcoming Event {index + 1}</p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card className="hover-scale transition-all">
          <CardHeader>
            <CardTitle>Discover Events</CardTitle>
            <CardDescription>Find events that match your interests</CardDescription>
          </CardHeader>
        </Card>
        
        <Card className="hover-scale transition-all">
          <CardHeader>
            <CardTitle>Register Easily</CardTitle>
            <CardDescription>Simple one-click registration process</CardDescription>
          </CardHeader>
        </Card>
        
        <Card className="hover-scale transition-all">
          <CardHeader>
            <CardTitle>Stay Updated</CardTitle>
            <CardDescription>Get notifications about upcoming events</CardDescription>
          </CardHeader>
        </Card>
      </div>
      
      <Button size="lg" onClick={onLogin} className="hover-scale transition-all">
        <LogIn className="mr-2" size={20} />
        Get Started
      </Button>
    </div>
  );
};

export default HomeFeatures;
