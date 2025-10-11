import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import { useMediaQuery } from "react-responsive";
import CanvasLoader from "../components/canvas-loader";
import { calculateSizes, Models } from "../constants";

const Hero = () => {
  const [activeModelIndex, setActiveModelIndex] = useState(0);
  const [activeColorIndex, setActiveColorIndex] = useState(0);
  const [defaultCarRotation, setDefaultCarRotation] = useState([
    0,
    Math.PI / 2,
    0,
  ]);
  console.log(activeModelIndex);
  const activeModel = Models[activeModelIndex];
  console.log(activeModel);

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

  // const controls = useControls("RedJac", {
  //   position: [0, -2, 0],
  //   scale: 15,
  //   rotation: [0, Math.PI / 2, 0],
  // });
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

  const sizes = calculateSizes(isSmall, isMobile, isTablet);
  console.log(activeColorIndex);
  const ModelComponent = activeModel.colors[activeColorIndex].component;

  return (
    <section id="home" className=" w-full flex flex-col relative">
      <div className="w-full mx-auto flex flex-col sm:mt-5 mt-0 c-space gap-3 relative">
        <div className="flex flex-col w-full max-w-[200px]">
          <a href="/" className="">
            <img
              src={"assets/jac-logo.jpg"}
              alt="logo"
              className="object-contain w-30 h-30"
            />
          </a>
        </div>
        <div className="flex w-full h-screen  relative pt-20 sm:pt-0">
          <div className="flex w-full flex-col lg:flex-row">
            <div className="lg:flex absolute origin-left top-30 lg:flex-col gap-10 z-10 mt-4 flex-wrap hidden">
              {Models.map((model, index) => {
                const distance = Math.abs(activeModelIndex - index);
                let scale = 1;
                if (distance === 0) scale = 4;
                else if (distance === 1) scale = 2;
                else if (distance === 2) scale = 1.5;

                return (
                  <button
                    key={index}
                    onClick={() => handleSetActiveModelIndex(index)}
                    className={`${
                      activeModelIndex === index
                        ? "text-white font-extrabold transition-all duration-500  "
                        : "text-neutral-500 font-light transition-all duration-500   hover:scale-150 "
                    } font-bebas text-lg origin-left`}
                    style={{
                      transform: `scale(${scale})`,
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

            <div
              className="flex lg:hidden text-white justify-center items-center relative gap-2 "
              key={activeModel.id}
            >
              <button
                onClick={handlePreviousModel}
                className="absolute -left-4 sm:left-4 top-[200px] sm:top-[400px] -translate-y-1/2 z-20 text-white hover:scale-110 active:scale-95 transition-all duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4 sm:w-8 sm:h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </button>

              <div
                className={`absolute top-[10px] sm:top-[150px]   left-1/2 -translate-x-1/2 $`}
              >
                <h1 className="motion-preset-expand  motion-duration-900 font-bebas font-extrabold text-5xl  sm:text-7xl whitespace-nowrap">
                  {activeModel.name}
                </h1>
              </div>

              <button
                onClick={handleNextModel}
                className="absolute -right-4 sm:right-4 top-[200px] sm:top-[400px]  -translate-y-1/2 z-20 text-white hover:scale-110 active:scale-95 transition-all duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4 sm:w-8 sm:h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            </div>

            <div className="w-full h-full absolute -top-50 sm:top-0 md:-top-30 inset-0">
              <div
                style={{ height: "95vh", width: "100%", position: "relative" }}
              >
                <Canvas>
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
                      intensity={3.5}
                      castShadow
                    />

                    <directionalLight
                      position={[-10, 0, 0]}
                      intensity={0.8}
                      castShadow
                    />
                    <directionalLight
                      position={[10, 0, 0]}
                      intensity={0.8}
                      castShadow
                    />

                    <ModelComponent
                      key={`${activeModel.id}-${activeColorIndex}`}
                      animationKey={`${activeModel.id}-${activeColorIndex}`}
                      scale={sizes.carScale}
                      position={sizes.carPosition}
                      rotation={defaultCarRotation}
                      wireframe={false}
                    />
                  </Suspense>
                </Canvas>
              </div>
            </div>
          </div>
        </div>

        <div className="text-white w-fit  absolute top-[65%] sm:top-[70%] lg:top-[80%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex  flex-row gap-3 bg-white/30 backdrop-blur-md p-2 rounded-[30px]  justify-center items-center shadow-lg border border-neutral-900">
          {activeModel.colors.map((colorObj, index) => (
            <button
              key={index}
              onClick={() => handleSetActiveColorIndex(index)}
              className={`w-4 h-4 rounded-full ${colorObj.color} transition-all duration-300 ${
                activeColorIndex === index
                  ? "w-8 transition-all duration-300 opacity-100 border border-neutral-600"
                  : "opacity-30 hover:opacity-75 border border-transparent"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
