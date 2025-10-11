import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "../ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { useState } from "react";

const GalleryCarousel = ({ borderColor, iconColor }) => {
  const [shouldAutoPlay, setShouldAutoPlay] = useState(true);
  return (
    <section
      onMouseEnter={() => setShouldAutoPlay(false)}
      onMouseLeave={() => setShouldAutoPlay(true)}
    >
      <Carousel
        plugins={
          shouldAutoPlay
            ? [
                Autoplay({
                  delay: 5000,
                }),
              ]
            : []
        }
        className="w-full lg:w-[600px]"
      >
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card className={`${borderColor}`}>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-4xl text-white font-semibold">
                      {index + 1}
                    </span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className={`hidden lg:flex ${iconColor}`} />
        <CarouselNext className={`hidden lg:flex ${iconColor}`} />
      </Carousel>
    </section>
  );
};

export default GalleryCarousel;
