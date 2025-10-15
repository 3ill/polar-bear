import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "../ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { useState, useEffect } from "react";

const GalleryCarousel = ({ iconColor, images }) => {
  const [shouldAutoPlay, setShouldAutoPlay] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    const imagePromises = images.map((src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve;
        img.onerror = reject;
      });
    });

    Promise.all(imagePromises)
      .then(() => {
        setImagesLoaded(true);
      })
      .catch((error) => {
        console.error("Error preloading images:", error);
        setImagesLoaded(true);
      });
  }, [images]);

  if (!imagesLoaded) {
    return (
      <section className="w-full lg:w-[600px]">
        <div className="p-1">
          <Card>
            <CardContent className="flex aspect-video items-center justify-center">
              <div className="h-full w-full animate-pulse rounded-[15px] bg-gray-200" />
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

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
