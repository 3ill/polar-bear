import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import CanvasLoader from "../components/canvas-loader";
import { calculateSizes, Models } from "../constants";
import { useRef } from "react";
import Stars from "../components/stars";
import DarkModeToggle from "../components/dark-mode-toggle";

const Hero = () => {
  const [activeModelIndex, setActiveModelIndex] = useState(0);
  const [activeColorIndex, setActiveColorIndex] = useState(0);
  const [sliderStyle, setSliderStyle] = useState({ left: 0, width: 0 });
  const buttonRefs = useRef([]);
  const containerRef = useRef(null);
  const canvasContainerRef = useRef(null);
  const [defaultCarRotation, setDefaultCarRotation] = useState([
    0,
    Math.PI / 2,
    0,
  ]);

  // Swipe detection state
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  console.log(activeModelIndex);
  const activeModel = Models[activeModelIndex];
  console.log(activeModel);

  useEffect(() => {
    // Preload images
    const images = [
      "/assets/JS2/JS2-EX-001.jpg",
      "/assets/JS2/JS2-EX-002.jpg",
      "/assets/JS2/JS2-EX-005.jpg",
      "/assets/JS2/JS2-EX-009.jpg",
      // JS3
      "/assets/JS3/JS3-EX-001.jpg",
      "/assets/JS3/JS3-EX-004.jpg",
      "/assets/JS3/JS3-EX-005.jpg",
      "/assets/JS3/JS3-EX-006.jpg",
      // JS4
      "/assets/JS4/JS4-EX-001.jpg",
      "/assets/JS4/JS4-EX-002.jpg",
      "/assets/JS4/JS4-EX-003.jpg",
      "/assets/JS4/JS4-EX-006.jpg",

      // JS6
      "/assets/JS6/EXTERIOR/JS6-EX-001.png",
      "/assets/JS6/EXTERIOR/JS6-EX-002.png",
      "/assets/JS6/EXTERIOR/JS6-EX-003.png",
      "/assets/JS6/EXTERIOR/JS6-EX-004.png",
      "/assets/JS6/INTERIOR/JS6-IN-001.jpg",
      "/assets/JS6/INTERIOR/JS6-IN-002.jpg",
      "/assets/JS6/INTERIOR/JS6-IN-003.jpg",
      "/assets/JS6/INTERIOR/JS6-IN-004.jpg",

      // JS7
      "/assets/JS7/EXTERIOR/JS7-EX-001.jpg",
      "/assets/JS7/EXTERIOR/JS7-EX-002.jpg",
      "/assets/JS7/EXTERIOR/JS7-EX-003.jpg",
      "/assets/JS7/EXTERIOR/JS7-EX-004.png",
      "/assets/JS7/INTERIOR/JS7-IN-001.jpg",
      "/assets/JS7/INTERIOR/JS7-IN-002.jpg",
      "/assets/JS7/INTERIOR/JS7-IN-003.jpg",
      "/assets/JS7/INTERIOR/JS7-IN-004.jpg",

      // T8 PRO
      "/assets/T8/EXTERIOR/T8-R-EX-001.jpg",
      "/assets/T8/EXTERIOR/T8-R-EX-002.jpg",
      "/assets/T8/EXTERIOR/T8-R-EX-003.jpg",
      "/assets/T8/EXTERIOR/T8-R-EX-004.jpg",
      "/assets/T8/INTERIOR/T8-R-IN-001.jpg",
      "/assets/T8/INTERIOR/T8-R-IN-002.jpg",
      "/assets/T8/INTERIOR/T8-R-IN-003.jpg",
      "/assets/T8/INTERIOR/T8-R-IN-004.jpg",
    ];
    images.map((src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve;
        img.onerror = reject;
      });
    });

    // Slider position logic
    const updateSliderPosition = () => {
      if (buttonRefs.current[activeModelIndex] && containerRef.current) {
        const button = buttonRefs.current[activeModelIndex];

        setSliderStyle({
          left: button.offsetLeft,
          width: button.offsetWidth,
        });
      }
    };

    setTimeout(updateSliderPosition, 0);
    window.addEventListener("resize", updateSliderPosition);

    return () => {
      window.removeEventListener("resize", updateSliderPosition);
    };
  }, [activeModelIndex]);

  const handleSetActiveModelIndex = (index) => {
    setDefaultCarRotation([0, Math.PI / 2, 0]);
    setActiveModelIndex(index);
    setActiveColorIndex(0); // Reset to first color when changing models
  };

  const handleSetActiveColorIndex = (index) => {
    setActiveColorIndex(index);
  };

  const handlePreviousModel = () => {
    const newIndex =
      activeModelIndex === 0 ? Models.length - 1 : activeModelIndex - 1;
    handleSetActiveModelIndex(newIndex);
  };

  const handleNextModel = () => {
    const newIndex =
      activeModelIndex === Models.length - 1 ? 0 : activeModelIndex + 1;
    handleSetActiveModelIndex(newIndex);
  };

  const handlePreviousColor = () => {
    const newIndex =
      activeColorIndex === 0
        ? activeModel.colors.length - 1
        : activeColorIndex - 1;
    handleSetActiveColorIndex(newIndex);
  };

  const handleNextColor = () => {
    const newIndex =
      activeColorIndex === activeModel.colors.length - 1
        ? 0
        : activeColorIndex + 1;
    handleSetActiveColorIndex(newIndex);
  };

  // Swipe handlers
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNextColor();
    }
    if (isRightSwipe) {
      handlePreviousColor();
    }
  };

  // Mouse/pointer swipe handlers for desktop
  const [pointerStart, setPointerStart] = useState(null);
  const [pointerEnd, setPointerEnd] = useState(null);
  const [isPointerDown, setIsPointerDown] = useState(false);

  const onPointerDown = (e) => {
    setIsPointerDown(true);
    setPointerEnd(null);
    setPointerStart(e.clientX);
  };

  const onPointerMove = (e) => {
    if (!isPointerDown) return;
    setPointerEnd(e.clientX);
  };

  const onPointerUp = () => {
    if (!pointerStart || !pointerEnd || !isPointerDown) {
      setIsPointerDown(false);
      return;
    }

    const distance = pointerStart - pointerEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNextColor();
    }
    if (isRightSwipe) {
      handlePreviousColor();
    }

    setIsPointerDown(false);
  };

  const isSmall = useMediaQuery({
    maxWidth: 440,
  });

  const isMobile = useMediaQuery({
    maxWidth: 768,
  });
  const isTablet = useMediaQuery({
    minWidth: 768,
    maxWidth: 1024,
  });

  if (isSmall || isMobile || isTablet) {
    return (
      <section className="flex h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <span className="font-bebas mt-4 text-black dark:text-white">
            View on Desktop for the best experience
          </span>
        </div>
      </section>
    );
  }

  const sizes = calculateSizes(isSmall, isMobile, isTablet);
  console.log(activeColorIndex);
  const ModelComponent = activeModel.colors[activeColorIndex].component;

  return (
    <section id="home" className="relative flex w-full flex-col">
      <div className="c-space mx-auto mt-0 flex w-full flex-col gap-3 sm:mt-5">
        <div className="relative flex w-full flex-row items-center">
          <div className="z-50 flex w-fit rounded-[15px]">
            <a href="/" className="">
              <img
                src={"assets/jac-logo.jpg"}
                alt="logo"
                className="h-40 w-50 rounded-[8px] object-contain"
              />
            </a>
          </div>

          {/* Floating Model Toggle*/}
          <div
            ref={containerRef}
            className="inner-shadow absolute top-1/2 left-1/2 z-50 hidden origin-center -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-3 rounded-[50px] border border-neutral-500 bg-white/20 px-2 py-3 shadow-lg backdrop-blur-md lg:flex dark:border-neutral-900"
          >
            <div
              className="shadow-custom pointer-events-none absolute h-[calc(100%-16px)] rounded-[50px] bg-white/20 opacity-50 shadow-md backdrop-blur-md transition-all duration-500 ease-out"
              style={{
                left: `${sliderStyle.left}px`,
                width: `${sliderStyle.width}px`,
              }}
            />

            {Models.map((model, index) => {
              return (
                <button
                  key={index}
                  ref={(el) => (buttonRefs.current[index] = el)}
                  onClick={() => handleSetActiveModelIndex(index)}
                  className={`${
                    activeModelIndex === index
                      ? "font-extrabold text-white transition-all duration-500 dark:text-white "
                      : "font-light text-neutral-400 transition-all duration-500 dark:text-neutral-400 "
                  } font-bebas relative z-10 px-4 py-2 text-4xl text-nowrap`}
                  style={{
                    willChange: "transform",
                    backfaceVisibility: "hidden",
                    WebkitFontSmoothing: "antialiased",
                    MozOsxFontSmoothing: "grayscale",
                  }}
                >
                  {model.name}
                </button>
              );
            })}
          </div>

          <div className="absolute right-0 z-50">
            <DarkModeToggle />
          </div>
        </div>

        <div className="relative flex h-screen w-full pt-20 sm:pt-0">
          <div className="flex w-full flex-col lg:flex-row">
            {/* Controls fot tab and Mobile Displays*/}
            <div
              className="relative flex items-center justify-center gap-2 text-white lg:hidden"
              key={activeModel.id}
            >
              <button
                onClick={handlePreviousModel}
                className="absolute top-[200px] -left-4 z-20 -translate-y-1/2 text-white transition-all duration-200 hover:scale-110 active:scale-95 sm:top-[400px] sm:left-4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-4 w-4 sm:h-8 sm:w-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </button>

              <div
                className={`$ absolute top-[10px] left-1/2 -translate-x-1/2 sm:top-[150px]`}
              >
                <h1 className="motion-preset-expand motion-duration-900 font-bebas text-5xl font-extrabold whitespace-nowrap sm:text-7xl">
                  {activeModel.name}
                </h1>
              </div>

              <button
                onClick={handleNextModel}
                className="absolute top-[200px] -right-4 z-20 -translate-y-1/2 text-white transition-all duration-200 hover:scale-110 active:scale-95 sm:top-[400px] sm:right-4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-4 w-4 sm:h-8 sm:w-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            </div>

            {/* 3D Canvas */}
            <div className="relative flex h-full w-full">
              <div
                ref={canvasContainerRef}
                className="absolute inset-0 -top-[30%] h-full w-full sm:top-0 md:-top-30"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerLeave={() => setIsPointerDown(false)}
                style={{
                  touchAction: "pan-y",
                  cursor: isPointerDown ? "grabbing" : "grab",
                }}
              >
                <div
                  style={{
                    height: "95vh",
                    width: "100%",
                    position: "relative",
                  }}
                >
                  <Canvas gl={{ toneMappingExposure: 0.45 }}>
                    <Suspense fallback={<CanvasLoader />}>
                      <OrbitControls
                        maxPolarAngle={Math.PI / 2}
                        enableZoom={false}
                        enableDamping={true}
                        dampingFactor={0.2}
                        enablePan={true}
                        enableRotate={true}
                      />
                      <PerspectiveCamera makeDefault position={[0, 0, 27]} />

                      <ambientLight intensity={0.6} color="#ffb380" />
                      <directionalLight
                        position={[0, 10, 0]}
                        intensity={5}
                        castShadow
                      />

                      <directionalLight
                        position={[-10, 0, 0]}
                        intensity={3.5}
                        castShadow
                      />
                      <directionalLight
                        position={[10, 0, 0]}
                        intensity={5}
                        castShadow
                      />
                      <directionalLight
                        position={[0, 0, 27]}
                        intensity={0.5}
                        castShadow
                      />
                      <Environment
                        files="/small-studio.hdr"
                        background={false}
                        backgroundIntensity={0.3}
                        envMapIntensity={0.05}
                        resolution={1080}
                      />
                      <Stars />
                      {ModelComponent && (
                        <ModelComponent
                          key={`${activeModel.id}-${activeColorIndex}`}
                          animationKey={`${activeModel.id}-${activeColorIndex}`}
                          scale={sizes.carScale}
                          position={sizes.carPosition}
                          rotation={defaultCarRotation}
                          wireframe={false}
                        />
                      )}
                    </Suspense>
                  </Canvas>
                  {activeModel.colors[activeColorIndex].image && (
                    <img
                      key={activeModel.colors[activeColorIndex].image}
                      src={activeModel.colors[activeColorIndex].image}
                      alt={`${activeModel.name} Car`}
                      loading="eager"
                      decoding="async"
                      className="scale-[1.10]"
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "53%",
                        width: "auto",
                        height: "60%",
                        transform: "translate(-50%, -50%)",
                        borderRadius: "15px",
                        boxShadow: "0 4px 32px rgba(0,0,0,0.3)",
                        pointerEvents: "none",
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="inner-shadow absolute top-[65%] left-1/2 flex w-fit -translate-x-1/2 -translate-y-1/2 transform flex-row items-center justify-center gap-3 rounded-[30px] border border-neutral-500 bg-white/20 p-2 text-white shadow-lg backdrop-blur-md sm:top-[75%] dark:border-neutral-900">
          {activeModel.colors.map((colorObj, index) => (
            <button
              key={index}
              onClick={() => handleSetActiveColorIndex(index)}
              className={`h-4 w-4 rounded-full lg:h-15 lg:w-15 ${colorObj.color} shadow-custom shadow-md transition-all duration-300 ${
                activeColorIndex === index
                  ? "w-8 opacity-100 transition-all duration-300 lg:w-30 "
                  : "opacity-80 hover:opacity-75 dark:opacity-30 "
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
