/* eslint-disable react-hooks/rules-of-hooks */
import useIsVisible from "../../utils/use-is-visible";
import GalleryCarousel from "../components/gallery-carousel";
import { VehicleGallery } from "../constants";

const Gallery = () => {
  return (
    <section className="my-20 flex w-full flex-col bg-neutral-950 py-4">
      <div className="max-w-7xl c-space mx-auto">
        <h1 className="head-text">Explore</h1>
        <div className="flex flex-col gap-10">
          {VehicleGallery.map((vehicle, index) => {
            // biome-ignore lint/correctness/useHookAtTopLevel: <This allows the animation to play on each header>
            const { ref, isVisible } = useIsVisible();
            return (
              <div
                key={index}
                className="work-container flex flex-col lg:flex-row items-center gap-8 lg:gap-16"
              >
                <div
                  ref={ref}
                  className={`flex flex-col gap-3 w-full lg:w-1/2 ${
                    isVisible
                      ? "motion-preset-expand motion-duration-1000 "
                      : "opacity-0"
                  }`}
                >
                  <h1 className="text-white font-bebas text-4xl lg:text-6xl text-nowrap">
                    {vehicle.name}
                  </h1>
                  <p className="grid-subtext capitalize text-nowrap">
                    {vehicle.description}
                  </p>
                </div>
                <div className="w-full ">
                  <GalleryCarousel
                    borderColor={vehicle.borderColor}
                    iconColor={vehicle.iconColor}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
