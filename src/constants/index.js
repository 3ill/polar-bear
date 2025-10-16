import {
  JS201,
  JS202,
  JS205,
  JS206,
  JS207,
  JS208,
  JS209,
  JS210,
  JS211,
  JS212,
  JS213,
  JS214,
  JS301,
  JS304,
  JS305,
  JS306,
  JS307,
  JS308,
  JS309,
  JS401,
  JS402,
  JS403,
  JS406,
  JS407,
  JS408,
  JS409,
  JS410,
  JS412,
  JS413,
} from "../../public/assets";
import BlackSUV from "../components/black-suv";
import BlackTruck from "../components/black-truck";
import BlueTruck from "../components/blue-truck";
import GreyTruck from "../components/grey-truck";
import RedSUV from "../components/red-suv";
import WhiteSUV from "../components/white-suv";

export const calculateSizes = (isSmall, isMobile, isTablet) => {
  return {
    deskScale: isSmall ? 0.05 : isMobile ? 0.06 : 0.08,
    deskPosition: isMobile ? [0.5, 4, 0] : [0.25, -0.5, 0],
    cubePosition: isSmall
      ? [4, 3.9, 0]
      : isMobile
        ? [5, 2, 0]
        : isTablet
          ? [5, -5, 0]
          : [9, -5.5, 0],
    reactLogoPosition: isSmall
      ? [3, 11, 0]
      : isMobile
        ? [5, 11, 0]
        : isTablet
          ? [5, 4, 0]
          : [12, 3, 0],
    ringPosition: isSmall
      ? [-15, 11.2, 0]
      : isMobile
        ? [-17, 11.2, 0]
        : isTablet
          ? [-40, 20, 0]
          : [-20, 20, 0],
    targetPosition: isSmall
      ? [-5, 3.9, -10]
      : isMobile
        ? [-7, 2, -10]
        : isTablet
          ? [-11, -7, -10]
          : [-11, -10, -10],

    carScale: isSmall ? 9 : isMobile ? 12 : isTablet ? 12 : 17,
    carPosition: isSmall ? [0, -2, 0] : [0, -1.5, 0],
  };
};

export const Models = [
  {
    id: "JAC-JS8-SUV",
    name: "JS8",
    component: BlackSUV,
    defaultScale: 15,
    defaultPosition: [0, -2, 0],
    defaultRotation: [0, Math.PI / 2, 0],
    colors: [
      { color: "bg-white", component: WhiteSUV },
      { color: "bg-black", component: BlackSUV },
      { color: "bg-red-500", component: RedSUV },
    ],
  },
  {
    id: "JAC-T9-TRUCK",
    name: "T9",
    component: RedSUV,
    defaultScale: 15,
    defaultPosition: [0, -2, 0],
    defaultRotation: [0, Math.PI / 2, 0],
    colors: [
      { color: "bg-black", component: BlackTruck },
      { color: "bg-cyan-800", component: BlueTruck },
      { color: "bg-neutral-600", component: GreyTruck },
    ],
  },
];

export const VehicleGallery = [
  {
    name: "JS2",
    description: "where comfort meets elegance",
    borderColor: "border-cyan-500",
    iconColor: "text-cyan-500",
    images: [
      JS201,
      JS202,
      JS205,
      JS206,
      JS207,
      JS208,
      JS209,
      JS210,
      JS211,
      JS212,
      JS213,
      JS214,
    ],
  },
  {
    name: "JS3",
    description: "Ultra Sleek, Ultra Performance",
    borderColor: "border-indigo-500",
    iconColor: "text-indigo-500",
    images: [JS301, JS304, JS305, JS306, JS307, JS308, JS309],
  },
  {
    name: "JS4",
    description: "super charge your experience",
    borderColor: "border-neutral-500",
    iconColor: "text-neutral-500",
    images: [
      JS401,
      JS402,
      JS403,
      JS406,
      JS407,
      JS408,
      JS409,
      JS410,
      JS412,
      JS413,
    ],
  },
];
