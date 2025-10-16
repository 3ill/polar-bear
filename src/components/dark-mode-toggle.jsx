import { IconMoonFilled, IconSunFilled } from "@tabler/icons-react";
import { useState, useRef, useEffect } from "react";

export default function DarkModeToggle() {
  const [mode, setMode] = useState(() =>
    typeof window !== "undefined" &&
    document.documentElement.classList.contains("dark")
      ? "dark"
      : localStorage.getItem("theme") || "dark",
  );
  const buttonRefs = useRef([]);

  const modes = [
    {
      name: "Light",
      icon:
        mode === "light" ? (
          <IconSunFilled color="black" />
        ) : (
          <IconSunFilled color="white" />
        ),
      value: "light",
    },
    {
      name: "Dark",
      icon:
        mode === "dark" ? (
          <IconMoonFilled color="white" />
        ) : (
          <IconMoonFilled color="black" />
        ),
      value: "dark",
    },
  ];

  useEffect(() => {
    if (mode === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [mode]);

  const [sliderStyle, setSliderStyle] = useState({ left: 0, width: 0 });
  useEffect(() => {
    const updateSlider = () => {
      const idx = modes.findIndex((m) => m.value === mode);
      if (buttonRefs.current[idx]) {
        setSliderStyle({
          left: buttonRefs.current[idx].offsetLeft,
          width: buttonRefs.current[idx].offsetWidth,
        });
      }
    };
    updateSlider();
    window.addEventListener("resize", updateSlider);
    return () => window.removeEventListener("resize", updateSlider);
  }, [mode]);

  return (
    <div className="inner-shadow relative flex w-fit items-center justify-center gap-3 rounded-[30px] border border-neutral-500 bg-white/20 p-2 shadow-lg backdrop-blur-md dark:border-neutral-900">
      <div
        className="shadow-custom pointer-events-none absolute h-[calc(100%-16px)] rounded-[24px] bg-white opacity-50 shadow-md backdrop-blur-md transition-all duration-500 ease-out dark:bg-black"
        style={{
          left: sliderStyle.left,
          width: sliderStyle.width,
        }}
      />
      {modes.map((m, idx) => (
        <button
          key={m.value}
          ref={(el) => (buttonRefs.current[idx] = el)}
          onClick={() => setMode(m.value)}
          className={`relative z-10 px-4 py-2 text-lg font-semibold transition-all duration-500`}
        >
          {m.icon}
        </button>
      ))}
    </div>
  );
}
