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

const GalleryCarousel = ({ iconColor, images }) => {
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
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-video items-center justify-center">
                    <img
                      src={image}
                      alt={`Image ${index + 1}`}
                      loading="eager"
                      fetchpriority="high"
                      className="rounded-[15px] object-cover object-center"
                    />
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
