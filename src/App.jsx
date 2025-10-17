import { useEffect } from "react";
import Footer from "./sections/footer";
import Hero from "./sections/hero";
import { useState } from "react";

const App = () => {
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    const images = [
      "/assets/JS2/JS2-EX-001.webp",
      "/assets/JS2/JS2-EX-002.webp",
      "/assets/JS2/JS2-EX-005.webp",
      "/assets/JS2/JS2-EX-009.webp",
      "/assets/JS2/JS2-SPEC-DOCS-A-UPSCALED.webp",
      "/assets/JS2/JS2-SPEC-DOCS-B-UPSCALED.webp",
      // JS3
      "/assets/JS3/JS3-EX-001.webp",
      "/assets/JS3/JS3-EX-004.webp",
      "/assets/JS3/JS3-EX-005.webp",
      "/assets/JS3/JS3-EX-006.webp",
      "/assets/JS3/JS3-SPEC-DOCS-A.webp",
      "/assets/JS3/JS3-SPEC-DOCS-B.webp",

      // JS4
      "/assets/JS4/JS4-EX-008.webp",
      "/assets/JS4/JS4-EX-010.webp",
      "/assets/JS4/JS4-EX-007.webp",
      "/assets/JS4/JS4-EX-006.webp",
      "/assets/JS4/JS4-SPEC-DOCS-A.webp",
      "/assets/JS4/JS4-SPEC-DOCS-B.webp",

      // JS6
      "/assets/JS6/EXTERIOR/JS6-EX-001.webp",
      "/assets/JS6/EXTERIOR/JS6-EX-002.webp",
      "/assets/JS6/EXTERIOR/JS6-EX-003.webp",
      "/assets/JS6/EXTERIOR/JS6-EX-004.webp",
      "/assets/JS6/INTERIOR/JS6-IN-001.webp",
      "/assets/JS6/INTERIOR/JS6-IN-002.webp",
      "/assets/JS6/INTERIOR/JS6-IN-003.webp",
      "/assets/JS6/INTERIOR/JS6-IN-004.webp",
      "/assets/JS6/JS6-SPEC-DOCS-A.webp",
      "/assets/JS6/JS6-SPEC-DOCS-B.webp",
      "/assets/JS6/JS6-SPEC-DOCS-C.webp",

      // JS7
      "/assets/JS7/EXTERIOR/JS7-EX-001.webp",
      "/assets/JS7/EXTERIOR/JS7-EX-002.webp",
      "/assets/JS7/EXTERIOR/JS7-EX-003.webp",
      "/assets/JS7/EXTERIOR/JS7-EX-004.webp",
      "/assets/JS7/INTERIOR/JS7-IN-001.webp",
      "/assets/JS7/INTERIOR/JS7-IN-002.webp",
      "/assets/JS7/INTERIOR/JS7-IN-003.webp",
      "/assets/JS7/INTERIOR/JS7-IN-004.webp",
      "/assets/JS7/JS7-SPEC-DOCS-A.webp",
      "/assets/JS7/JS7-SPEC-DOCS-B.webp",
      "/assets/JS7/JS7-SPEC-DOCS-C.webp",

      // T8 PRO
      "/assets/T8/EXTERIOR/T8-R-EX-001.webp",
      "/assets/T8/EXTERIOR/T8-R-EX-002.webp",
      "/assets/T8/EXTERIOR/T8-R-EX-003.webp",
      "/assets/T8/EXTERIOR/T8-R-EX-004.webp",
      "/assets/T8/INTERIOR/T8-R-IN-001.webp",
      "/assets/T8/INTERIOR/T8-R-IN-002.webp",
      "/assets/T8/INTERIOR/T8-R-IN-003.webp",
      "/assets/T8/INTERIOR/T8-R-IN-004.webp",
      "/assets/T8/T8-SPEC-DOCS-A.webp",
      "/assets/T8/T8-SPEC-DOCS-B.webp",

      "/assets/T6/T6-L-EX-001.webp",
      "/assets/T6/T6-L-EX-002.webp",
      "/assets/T6/T6-L-EX-003.webp",
      "/assets/T6/T6-L-EX-004.webp",

      "/assets/RF8/RF8-EX-001.webp",
      "/assets/RF8/RF8-EX-002.webp",
      "/assets/RF8/RF8-EX-003.webp",
      "/assets/RF8/RF8-EX-004.webp",
      "/assets/RF8/RF8-EX-005.webp",
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
      <section className="flex h-screen w-full items-center justify-center bg-black">
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
          <span className="font-bebas mt-4 text-white">
            preparing experience
          </span>
        </div>
      </section>
    );
  }
  return (
    <main className="gap-[50px] overflow-x-hidden overflow-y-hidden bg-neutral-100 dark:bg-[#010103]">
      <div className="max-w-9xl bg-future mx-auto bg-cover bg-center bg-no-repeat dark:bg-[#010103] dark:bg-none">
        <Hero />
      </div>
      <Footer />
    </main>
  );
};

export default App;
