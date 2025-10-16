import { useEffect } from "react";
import Footer from "./sections/footer";
import Hero from "./sections/hero";
import { useState } from "react";

const App = () => {
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    const images = [
      "/assets/JS2/JS2-EX-001.jpg",
      "/assets/JS2/JS2-EX-002.jpg",
      "/assets/JS2/JS2-EX-005.jpg",
      "/assets/JS2/JS2-EX-009.jpg",
      "/assets/JS3/JS3-EX-001.jpg",
      "/assets/JS3/JS3-EX-004.jpg",
      "/assets/JS3/JS3-EX-005.jpg",
      "/assets/JS3/JS3-EX-006.jpg",
      "/assets/JS4/JS4-EX-001.jpg",
      "/assets/JS4/JS4-EX-002.jpg",
      "/assets/JS4/JS4-EX-003.jpg",
      "/assets/JS4/JS4-EX-006.jpg",
    ];
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
  }, []);

  if (!imagesLoaded) {
    return (
      <section className="flex h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          {/* Hourglass SVG with gradient */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="animate-spin-slow h-16 w-16"
            fill="none"
            viewBox="0 0 24 24"
            stroke="url(#hourglass-gradient)"
            strokeWidth={2}
          >
            <defs>
              <linearGradient
                id="hourglass-gradient"
                x1="0"
                y1="0"
                x2="1"
                y2="1"
              >
                <stop offset="0%" stopColor="#ff0000" /> {/* Red */}
                <stop offset="50%" stopColor="#000000" /> {/* Black */}
                <stop offset="100%" stopColor="#ffd600" /> {/* Yellow */}
              </linearGradient>
            </defs>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 3h10.5M6.75 21h10.5M6.75 3v2.25a6 6 0 003 5.19v.12a6 6 0 01-3 5.19V21m10.5-18v2.25a6 6 0 01-3 5.19v.12a6 6 0 003 5.19V21"
            />
          </svg>
          <span className="font-bebas mt-4 text-black dark:text-white">
            preparing experience
          </span>
        </div>
      </section>
    );
  }
  return (
    <main className="overflow-x-hidden overflow-y-hidden bg-neutral-100 dark:bg-[#010103]">
      <div className="max-w-9xl mx-auto">
        <Hero />
      </div>
      <Footer />
    </main>
  );
};

export default App;
