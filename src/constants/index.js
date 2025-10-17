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

    carScale: isSmall ? 9 : isMobile ? 12 : isTablet ? 12 : 18,
    carPosition: isSmall ? [0, -2, 0] : [0, -1.5, 0],
  };
};

export const Models = [
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

      {
        color: "bg-neutral-600",
        image: "/assets/T9/T9-SPEC-DOCS-A.png",
      },
      {
        color: "bg-neutral-600",
        image: "/assets/T9/T9-SPEC-DOCS-B.png",
      },
    ],
  },
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
    id: "JS2-SUV",
    name: "JS2",
    component: null,
    defaultScale: 200,
    defaultPosition: [0, -2, 0],
    defaultRotation: [0, Math.PI / 2, 0],
    colors: [
      { color: "bg-white", image: "/assets/JS2/JS2-EX-001.jpg" },
      { color: "bg-black", image: "/assets/JS2/JS2-EX-002.jpg" },
      { color: "bg-[#3E2723]", image: "/assets/JS2/JS2-EX-005.jpg" },
      { color: "bg-orange-500", image: "/assets/JS2/JS2-EX-009.jpg" },
      {
        color: "bg-red-500",
        image: "/assets/JS2/JS2-SPEC-DOCS-A-UPSCALED.png",
      },
      {
        color: "bg-red-500",
        image: "/assets/JS2/JS2-SPEC-DOCS-B-UPSCALED.png",
      },
    ],
  },
  {
    id: "JS3-SUV",
    name: "JS3",
    component: null,
    defaultScale: 200,
    defaultPosition: [0, -2, 0],
    defaultRotation: [0, Math.PI / 2, 0],
    colors: [
      { color: "bg-white", image: "/assets/JS3/JS3-EX-001.jpg" },
      { color: "bg-neutral-600", image: "/assets/JS3/JS3-EX-004.jpg" },
      { color: "bg-[#3E2723]", image: "/assets/JS3/JS3-EX-005.jpg" },
      { color: "bg-red-500", image: "/assets/JS3/JS3-EX-006.jpg" },
      {
        color: "bg-black",
        image: "/assets/JS3/JS3-SPEC-DOCS-A.png",
      },
      {
        color: "bg-black",
        image: "/assets/JS3/JS3-SPEC-DOCS-B.png",
      },
    ],
  },
  {
    id: "JS4-SUV",
    name: "JS4",
    component: null,
    defaultScale: 200,
    defaultPosition: [0, -2, 0],
    defaultRotation: [0, Math.PI / 2, 0],
    colors: [
      { color: "bg-white", image: "/assets/JS4/JS4-EX-001.jpg" },
      { color: "bg-black", image: "/assets/JS4/JS4-EX-002.jpg" },
      { color: "bg-red-500", image: "/assets/JS4/JS4-EX-003.jpg" },
      { color: "bg-[#3E2723]", image: "/assets/JS4/JS4-EX-006.jpg" },
      {
        color: "bg-black",
        image: "/assets/JS4/JS4-SPEC-DOCS-A.png",
      },
      {
        color: "bg-black",
        image: "/assets/JS4/JS4-SPEC-DOCS-B.png",
      },
    ],
  },
  {
    id: "JS6-SUV",
    name: "JS6",
    component: null,
    defaultScale: 200,
    defaultPosition: [0, -2, 0],
    defaultRotation: [0, Math.PI / 2, 0],
    colors: [
      { color: "bg-[#C0C0C0]", image: "/assets/JS6/EXTERIOR/JS6-EX-001.png" },
      { color: "bg-black", image: "/assets/JS6/EXTERIOR/JS6-EX-002.png" },
      { color: "bg-[#C0C0C0]", image: "/assets/JS6/EXTERIOR/JS6-EX-003.png" },
      { color: "bg-blue-400", image: "/assets/JS6/EXTERIOR/JS6-EX-004.png" },
      { color: "bg-gray-500", image: "/assets/JS6/INTERIOR/JS6-IN-001.jpg" },
      { color: "bg-gray-300", image: "/assets/JS6/INTERIOR/JS6-IN-002.jpg" },
      { color: "bg-[#C0C0C0]", image: "/assets/JS6/INTERIOR/JS6-IN-003.jpg" },
      { color: "bg-gray-400", image: "/assets/JS6/INTERIOR/JS6-IN-004.jpg" },
      {
        color: "bg-black",
        image: "/assets/JS6/JS6-SPEC-DOCS-A.png",
      },
      {
        color: "bg-black",
        image: "/assets/JS6/JS6-SPEC-DOCS-B.png",
      },
      {
        color: "bg-black",
        image: "/assets/JS6/JS6-SPEC-DOCS-C.png",
      },
    ],
  },
  {
    id: "JS7-SUV",
    name: "JS7",
    component: null,
    defaultScale: 200,
    defaultPosition: [0, -2, 0],
    defaultRotation: [0, Math.PI / 2, 0],
    colors: [
      { color: "bg-black", image: "/assets/JS7/EXTERIOR/JS7-EX-001.jpg" },
      { color: "bg-[#C0C0C0]", image: "/assets/JS7/EXTERIOR/JS7-EX-002.jpg" },
      { color: "bg-blue-600", image: "/assets/JS7/EXTERIOR/JS7-EX-003.jpg" },
      { color: "bg-red-500", image: "/assets/JS7/EXTERIOR/JS7-EX-004.png" },
      { color: "bg-gray-500", image: "/assets/JS7/INTERIOR/JS7-IN-001.jpg" },
      { color: "bg-gray-300", image: "/assets/JS7/INTERIOR/JS7-IN-002.jpg" },
      { color: "bg-[#C0C0C0]", image: "/assets/JS7/INTERIOR/JS7-IN-003.jpg" },
      { color: "bg-gray-400", image: "/assets/JS7/INTERIOR/JS7-IN-004.jpg" },
      {
        color: "bg-black",
        image: "/assets/JS7/JS7-SPEC-DOCS-A.png",
      },
      {
        color: "bg-black",
        image: "/assets/JS7/JS7-SPEC-DOCS-B.png",
      },
      {
        color: "bg-black",
        image: "/assets/JS7/JS7-SPEC-DOCS-C.png",
      },
    ],
  },
  {
    id: "T8-TRUCK",
    name: "T8 PRO",
    component: null,
    defaultScale: 200,
    defaultPosition: [0, -2, 0],
    defaultRotation: [0, Math.PI / 2, 0],
    colors: [
      { color: "bg-blue-500", image: "/assets/T8/EXTERIOR/T8-R-EX-001.jpg" },
      { color: "bg-blue-500", image: "/assets/T8/EXTERIOR/T8-R-EX-002.jpg" },
      { color: "bg-blue-500", image: "/assets/T8/EXTERIOR/T8-R-EX-003.jpg" },
      { color: "bg-blue-500", image: "/assets/T8/EXTERIOR/T8-R-EX-004.jpg" },
      { color: "bg-blue-500", image: "/assets/T8/INTERIOR/T8-R-IN-001.jpg" },
      { color: "bg-blue-500", image: "/assets/T8/INTERIOR/T8-R-IN-002.jpg" },
      { color: "bg-blue-500", image: "/assets/T8/INTERIOR/T8-R-IN-003.jpg" },
      { color: "bg-blue-500", image: "/assets/T8/INTERIOR/T8-R-IN-004.jpg" },
      {
        color: "bg-blue-500",
        image: "/assets/T8/T8-SPEC-DOCS-A.png",
      },
      {
        color: "bg-blue-500",
        image: "/assets/T8/T8-SPEC-DOCS-B.png",
      },
    ],
  },
  {
    id: "T6",
    name: "T6",
    component: null,
    defaultScale: 200,
    defaultPosition: [0, -2, 0],
    defaultRotation: [0, Math.PI / 2, 0],
    colors: [
      { color: "bg-[#C0C0C0]", image: "/assets/T6/T6-L-EX-001.jpg" },
      { color: "bg-[#C0C0C0]", image: "/assets/T6/T6-L-EX-002.png" },
      { color: "bg-[#C0C0C0]", image: "/assets/T6/T6-L-EX-003.png" },
      { color: "bg-[#C0C0C0]", image: "/assets/T6/T6-L-EX-004.png" },
    ],
  },
  {
    id: "RF8",
    name: "RF8",
    component: null,
    defaultScale: 200,
    defaultPosition: [0, -2, 0],
    defaultRotation: [0, Math.PI / 2, 0],
    colors: [
      { color: "bg-[#C0C0C0]", image: "/assets/RF8/RF8-EX-001.jpg" },
      { color: "bg-[#C0C0C0]", image: "/assets/RF8/RF8-EX-002.jpg" },
      { color: "bg-[#C0C0C0]", image: "/assets/RF8/RF8-EX-003.jpg" },
      { color: "bg-[#C0C0C0]", image: "/assets/RF8/RF8-EX-004.jpg" },
      { color: "bg-[#C0C0C0]", image: "/assets/RF8/RF8-EX-005.jpg" },
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
