/** biome-ignore-all lint/correctness/useExhaustiveDependencies: <> */
import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";

import { SectionLabel } from "./AboutSection";

type Terminal = {
  id: string;
  name: string;
  country: string;
  lon: number;
  lat: number;
  region: string;
  cap: string;
  tanks: number;
};
type Zone = {
  name: string;
  tag: string;
  terminalIds: string[];
  ports: string[];
};
type ZoneRegion = {
  id: string;
  lon: number;
  lat: number;
  rx: number;
  ry: number;
};
type FilterKey = "all" | "terminals" | "routes" | "zones";

const landData: { pts: number[][] }[] = [
  // North America
  {
    pts: [
      [-170, 72],
      [-160, 75],
      [-145, 78],
      [-135, 78],
      [-125, 76],
      [-115, 72],
      [-105, 70],
      [-95, 68],
      [-88, 68],
      [-80, 68],
      [-73, 70],
      [-68, 72],
      [-65, 74],
      [-63, 75],
      [-62, 74],
      [-65, 72],
      [-68, 70],
      [-70, 66],
      [-72, 62],
      [-74, 58],
      [-75, 54],
      [-76, 50],
      [-77, 46],
      [-78, 42],
      [-79, 38],
      [-80, 34],
      [-80, 30],
      [-82, 28],
      [-84, 26],
      [-86, 26],
      [-88, 28],
      [-90, 29],
      [-90, 30],
      [-88, 32],
      [-86, 34],
      [-85, 36],
      [-84, 38],
      [-83, 40],
      [-82, 42],
      [-81, 44],
      [-80, 46],
      [-80, 48],
      [-80, 50],
      [-80, 52],
      [-82, 54],
      [-84, 56],
      [-86, 58],
      [-88, 60],
      [-90, 62],
      [-95, 64],
      [-100, 66],
      [-105, 67],
      [-110, 68],
      [-115, 68],
      [-120, 68],
      [-125, 70],
      [-130, 72],
      [-135, 73],
      [-140, 73],
      [-145, 72],
      [-150, 70],
      [-155, 68],
      [-160, 67],
      [-165, 68],
      [-168, 70],
    ],
  },
  // Greenland
  {
    pts: [
      [-18, 76],
      [-25, 80],
      [-35, 83],
      [-45, 83],
      [-55, 80],
      [-60, 77],
      [-58, 73],
      [-50, 70],
      [-42, 68],
      [-36, 68],
      [-30, 70],
      [-24, 74],
    ],
  },
  // Iceland
  {
    pts: [
      [-24, 65],
      [-18, 63],
      [-12, 63],
      [-8, 64],
      [-6, 66],
      [-8, 68],
      [-14, 68],
      [-20, 67],
    ],
  },
  // UK & Ireland
  {
    pts: [
      [-5, 50],
      [-3, 51],
      [0, 52],
      [2, 52],
      [2, 50],
      [0, 50],
      [-3, 50],
      [-5, 50],
      [-6, 52],
      [-8, 54],
      [-6, 58],
      [-3, 58],
      [-2, 56],
    ],
  },
  {
    pts: [
      [-10, 52],
      [-6, 52],
      [-6, 54],
      [-8, 56],
      [-10, 54],
      [-10, 52],
    ],
  },
  // Europe
  {
    pts: [
      [-10, 36],
      [-5, 36],
      [0, 36],
      [5, 36],
      [10, 36],
      [15, 37],
      [20, 38],
      [25, 37],
      [30, 36],
      [35, 37],
      [38, 38],
      [40, 38],
      [42, 38],
      [42, 40],
      [40, 42],
      [38, 44],
      [36, 46],
      [35, 48],
      [35, 50],
      [36, 52],
      [37, 54],
      [36, 56],
      [35, 58],
      [34, 60],
      [33, 62],
      [32, 64],
      [30, 66],
      [28, 68],
      [26, 70],
      [24, 72],
      [22, 70],
      [20, 68],
      [18, 66],
      [16, 66],
      [14, 68],
      [12, 70],
      [10, 70],
      [8, 68],
      [6, 66],
      [4, 64],
      [2, 62],
      [0, 60],
      [-2, 58],
      [-4, 56],
      [-6, 54],
      [-8, 52],
      [-10, 50],
      [-10, 48],
      [-8, 46],
      [-6, 44],
      [-4, 42],
      [-2, 40],
      [-2, 38],
      [-4, 36],
    ],
  },
  // Africa
  {
    pts: [
      [-5, 36],
      [0, 37],
      [5, 37],
      [10, 37],
      [15, 37],
      [20, 37],
      [25, 36],
      [30, 31],
      [32, 28],
      [35, 24],
      [37, 20],
      [39, 16],
      [41, 12],
      [42, 8],
      [43, 4],
      [42, 0],
      [40, -4],
      [38, -8],
      [36, -12],
      [34, -16],
      [32, -20],
      [30, -24],
      [28, -28],
      [26, -32],
      [24, -34],
      [22, -35],
      [18, -34],
      [16, -30],
      [14, -26],
      [12, -22],
      [10, -18],
      [8, -14],
      [6, -10],
      [4, -6],
      [2, -2],
      [0, 2],
      [-2, 6],
      [-4, 10],
      [-6, 14],
      [-8, 18],
      [-10, 22],
      [-12, 26],
      [-14, 30],
      [-16, 32],
      [-16, 36],
      [-12, 36],
      [-8, 36],
    ],
  },
  // Madagascar
  {
    pts: [
      [44, -12],
      [46, -16],
      [48, -20],
      [49, -24],
      [48, -26],
      [46, -26],
      [44, -24],
      [43, -20],
      [43, -16],
      [43, -12],
    ],
  },
  // Middle East (Turkey, Levant, Iran)
  {
    pts: [
      [26, 40],
      [28, 40],
      [30, 40],
      [32, 40],
      [34, 38],
      [36, 36],
      [38, 36],
      [40, 36],
      [42, 36],
      [44, 36],
      [46, 34],
      [48, 32],
      [50, 30],
      [52, 28],
      [54, 26],
      [56, 26],
      [58, 26],
      [60, 26],
      [62, 26],
      [64, 25],
      [66, 24],
      [68, 24],
      [70, 24],
      [72, 23],
      [74, 22],
      [76, 20],
      [78, 18],
      [80, 14],
      [80, 10],
      [79, 8],
      [77, 8],
      [75, 10],
      [74, 12],
      [73, 14],
      [72, 16],
      [71, 18],
      [70, 20],
      [70, 22],
      [70, 24],
      [68, 24],
      [66, 23],
      [64, 22],
      [62, 22],
      [60, 22],
      [58, 22],
      [57, 22],
      [56, 22],
      [55, 22],
      [54, 22],
      [53, 22],
      [52, 22],
      [51, 22],
      [50, 22],
      [49, 22],
      [48, 22],
      [47, 22],
      [46, 22],
      [45, 22],
      [44, 22],
      [43, 22],
      [42, 22],
      [41, 22],
      [40, 22],
      [39, 22],
      [38, 22],
      [37, 22],
      [36, 22],
      [35, 22],
      [34, 22],
      [33, 22],
      [32, 22],
      [31, 22],
      [30, 22],
      [29, 22],
      [28, 22],
      [27, 22],
      [26, 22],
      [25, 22],
      [24, 22],
      [23, 22],
      [22, 22],
      [21, 22],
      [20, 22],
      [19, 22],
      [18, 22],
      [17, 22],
      [16, 22],
      [15, 22],
      [14, 22],
      [13, 22],
      [12, 22],
      [11, 22],
      [10, 22],
      [9, 22],
      [8, 22],
      [7, 22],
      [6, 22],
      [5, 22],
      [4, 22],
      [3, 22],
      [2, 22],
      [1, 22],
      [0, 22],
    ],
  },
  // Arabian Peninsula
  {
    pts: [
      [36, 30],
      [38, 28],
      [40, 26],
      [42, 24],
      [44, 22],
      [46, 20],
      [48, 18],
      [50, 16],
      [52, 14],
      [54, 12],
      [56, 10],
      [58, 10],
      [60, 12],
      [62, 14],
      [63, 16],
      [64, 18],
      [65, 20],
      [66, 22],
      [67, 24],
      [68, 26],
      [68, 28],
      [67, 30],
      [66, 30],
      [65, 30],
      [64, 30],
      [62, 30],
      [60, 30],
      [58, 30],
      [56, 30],
      [54, 30],
      [52, 30],
      [50, 30],
      [48, 30],
      [46, 30],
      [44, 30],
      [42, 30],
      [40, 30],
      [38, 30],
    ],
  },
  // India
  {
    pts: [
      [62, 22],
      [65, 22],
      [68, 22],
      [70, 22],
      [72, 20],
      [74, 18],
      [76, 16],
      [78, 14],
      [79, 12],
      [80, 10],
      [80, 8],
      [79, 6],
      [77, 4],
      [75, 2],
      [73, 0],
      [71, -2],
      [69, -2],
      [67, -2],
      [65, 0],
      [63, 4],
      [61, 8],
      [60, 12],
      [60, 16],
      [61, 18],
      [62, 20],
    ],
  },
  // Russia + Central Asia (top band)
  {
    pts: [
      [26, 60],
      [30, 62],
      [40, 63],
      [50, 63],
      [60, 62],
      [70, 60],
      [80, 58],
      [90, 56],
      [100, 54],
      [110, 52],
      [120, 50],
      [130, 48],
      [140, 46],
      [150, 46],
      [160, 47],
      [168, 52],
      [170, 56],
      [168, 60],
      [160, 62],
      [150, 63],
      [140, 63],
      [130, 62],
      [120, 60],
      [110, 58],
      [100, 57],
      [90, 57],
      [80, 58],
      [70, 58],
      [60, 58],
      [50, 58],
      [40, 58],
      [30, 58],
    ],
  },
  // China
  {
    pts: [
      [100, 52],
      [105, 50],
      [110, 48],
      [115, 46],
      [120, 44],
      [125, 42],
      [130, 40],
      [135, 38],
      [138, 36],
      [140, 34],
      [142, 32],
      [144, 30],
      [145, 28],
      [145, 26],
      [143, 24],
      [140, 22],
      [137, 20],
      [135, 18],
      [133, 16],
      [132, 14],
      [130, 12],
      [128, 12],
      [126, 13],
      [124, 14],
      [122, 15],
      [120, 16],
      [118, 17],
      [116, 18],
      [114, 20],
      [112, 22],
      [110, 24],
      [108, 26],
      [106, 28],
      [104, 29],
      [102, 29],
      [100, 28],
      [98, 26],
      [96, 24],
      [94, 22],
      [92, 20],
      [90, 18],
      [88, 16],
      [86, 14],
      [84, 13],
      [82, 13],
      [82, 14],
      [82, 16],
      [82, 18],
      [83, 20],
      [84, 22],
      [85, 24],
      [86, 26],
      [87, 28],
      [88, 29],
      [90, 30],
      [92, 32],
      [94, 34],
      [96, 36],
      [98, 38],
      [100, 40],
      [100, 42],
      [100, 44],
      [100, 46],
      [100, 48],
      [100, 50],
    ],
  },
  // Korea
  {
    pts: [
      [125, 36],
      [127, 34],
      [128, 32],
      [130, 30],
      [132, 28],
      [134, 27],
      [136, 28],
      [136, 30],
      [135, 32],
      [134, 34],
      [132, 36],
      [130, 37],
      [128, 37],
      [126, 37],
    ],
  },
  // Japan
  {
    pts: [
      [130, 34],
      [132, 36],
      [134, 36],
      [136, 35],
      [138, 34],
      [140, 32],
      [142, 30],
      [144, 28],
      [145, 28],
      [144, 30],
      [142, 32],
      [140, 34],
      [138, 36],
      [136, 38],
      [134, 39],
      [132, 39],
      [130, 38],
      [130, 36],
    ],
  },
  // SE Asia (Vietnam, Thailand, Myanmar)
  {
    pts: [
      [100, 22],
      [102, 18],
      [104, 14],
      [106, 10],
      [108, 6],
      [110, 4],
      [112, 4],
      [114, 6],
      [116, 8],
      [118, 10],
      [120, 12],
      [120, 14],
      [118, 16],
      [116, 18],
      [114, 20],
      [112, 20],
      [110, 20],
      [108, 20],
      [106, 22],
      [104, 22],
      [102, 22],
    ],
  },
  // Malay Peninsula
  {
    pts: [
      [102, 6],
      [104, 4],
      [105, 2],
      [106, 0],
      [105, -2],
      [104, -3],
      [102, -2],
      [100, 0],
      [100, 2],
      [101, 4],
      [102, 5],
    ],
  },
  // Sumatra
  {
    pts: [
      [96, -4],
      [100, -2],
      [104, 0],
      [106, 2],
      [107, 4],
      [106, 6],
      [104, 4],
      [102, 2],
      [100, 0],
      [98, -2],
      [96, -4],
      [94, -5],
      [92, -4],
      [90, -2],
      [89, 0],
      [90, 2],
      [92, 4],
      [95, 4],
      [96, 2],
      [96, 0],
      [95, -2],
    ],
  },
  // Java
  {
    pts: [
      [106, -6],
      [110, -6],
      [114, -7],
      [118, -8],
      [120, -9],
      [118, -9],
      [114, -9],
      [110, -9],
      [107, -8],
    ],
  },
  // Borneo
  {
    pts: [
      [108, 6],
      [112, 4],
      [115, 2],
      [117, 0],
      [118, -2],
      [118, -4],
      [116, -5],
      [113, -4],
      [110, -2],
      [107, 0],
      [105, 2],
      [104, 4],
      [106, 6],
    ],
  },
  // Australia
  {
    pts: [
      [114, -22],
      [116, -20],
      [118, -18],
      [120, -16],
      [122, -14],
      [124, -12],
      [126, -12],
      [128, -12],
      [130, -12],
      [132, -12],
      [135, -12],
      [138, -14],
      [140, -16],
      [142, -18],
      [144, -20],
      [146, -22],
      [148, -22],
      [150, -22],
      [152, -22],
      [153, -26],
      [153, -30],
      [152, -34],
      [150, -36],
      [148, -38],
      [146, -38],
      [144, -38],
      [142, -36],
      [140, -34],
      [138, -32],
      [136, -30],
      [134, -28],
      [132, -26],
      [130, -24],
      [128, -22],
      [126, -22],
      [124, -22],
      [122, -22],
      [120, -22],
      [118, -22],
      [116, -22],
      [114, -22],
    ],
  },
  // New Zealand (North)
  {
    pts: [
      [174, -37],
      [176, -39],
      [178, -41],
      [177, -43],
      [175, -44],
      [173, -43],
      [172, -41],
      [172, -39],
      [173, -37],
    ],
  },
  {
    pts: [
      [168, -44],
      [170, -46],
      [172, -48],
      [172, -50],
      [170, -52],
      [168, -52],
      [166, -50],
      [166, -48],
      [167, -46],
    ],
  },
  // South America
  {
    pts: [
      [-82, 8],
      [-80, 6],
      [-78, 2],
      [-76, -2],
      [-74, -6],
      [-72, -10],
      [-70, -14],
      [-68, -18],
      [-67, -22],
      [-68, -26],
      [-69, -30],
      [-70, -34],
      [-71, -38],
      [-70, -42],
      [-68, -44],
      [-66, -44],
      [-64, -42],
      [-62, -40],
      [-60, -38],
      [-58, -36],
      [-57, -34],
      [-57, -30],
      [-58, -26],
      [-59, -22],
      [-60, -18],
      [-61, -14],
      [-62, -10],
      [-64, -6],
      [-66, -2],
      [-68, 2],
      [-70, 6],
      [-72, 10],
      [-74, 12],
      [-76, 14],
      [-78, 14],
      [-79, 12],
      [-80, 10],
      [-80, 8],
    ],
  },
];

// ── DATA ──
const terminals: Terminal[] = [
  {
    id: "van",
    name: "Vancouver",
    country: "Canada",
    lon: -123.1,
    lat: 49.3,
    region: "North America",
    cap: "850,000 m³",
    tanks: 7,
  },
  {
    id: "sj",
    name: "Saint John",
    country: "Canada",
    lon: -66.1,
    lat: 45.3,
    region: "North America",
    cap: "750,000 m³",
    tanks: 6,
  },
  {
    id: "hou",
    name: "Houston",
    country: "USA",
    lon: -95.4,
    lat: 29.8,
    region: "North America",
    cap: "1,900,000 m³",
    tanks: 11,
  },
  {
    id: "cc",
    name: "Corpus Christi",
    country: "USA",
    lon: -97.4,
    lat: 27.8,
    region: "North America",
    cap: "1,300,000 m³",
    tanks: 8,
  },
  {
    id: "rot",
    name: "Rotterdam",
    country: "Netherlands",
    lon: 4.0,
    lat: 51.9,
    region: "Europe",
    cap: "1,700,000 m³",
    tanks: 10,
  },
  {
    id: "fuj",
    name: "Fujairah",
    country: "UAE",
    lon: 56.4,
    lat: 25.1,
    region: "Middle East",
    cap: "1,950,000 m³",
    tanks: 11,
  },
  {
    id: "ja",
    name: "Jebel Ali",
    country: "UAE",
    lon: 55.0,
    lat: 25.0,
    region: "Middle East",
    cap: "850,000 m³",
    tanks: 7,
  },
  {
    id: "kf",
    name: "Khor Fakkan",
    country: "UAE",
    lon: 56.4,
    lat: 25.4,
    region: "Middle East",
    cap: "750,000 m³",
    tanks: 6,
  },
  {
    id: "jur",
    name: "Jurong",
    country: "Singapore",
    lon: 103.7,
    lat: 1.3,
    region: "Singapore",
    cap: "1,750,000 m³",
    tanks: 10,
  },
  {
    id: "seb",
    name: "Sebarok",
    country: "Singapore",
    lon: 103.8,
    lat: 1.2,
    region: "Singapore",
    cap: "950,000 m³",
    tanks: 8,
  },
  {
    id: "uls",
    name: "Ulsan",
    country: "South Korea",
    lon: 129.3,
    lat: 35.5,
    region: "Asia Pacific",
    cap: "1,050,000 m³",
    tanks: 8,
  },
  {
    id: "nbo",
    name: "Ningbo-Zhoushan",
    country: "China",
    lon: 121.9,
    lat: 29.9,
    region: "Asia Pacific",
    cap: "1,200,000 m³",
    tanks: 9,
  },
];

const routePairs: string[][] = [
  ["van", "hou"],
  ["hou", "rot"],
  ["sj", "rot"],
  ["rot", "fuj"],
  ["rot", "ja"],
  ["fuj", "kf"],
  ["fuj", "jur"],
  ["ja", "jur"],
  ["jur", "seb"],
  ["jur", "uls"],
];

const zones: Record<string, Zone> = {
  na: {
    name: "North America",
    tag: "2 Countries · 4 Terminals",
    terminalIds: ["van", "sj", "hou", "cc"],
    ports: [
      "Vancouver★",
      "Saint John★",
      "Houston★",
      "Corpus Christi★",
      "Beaumont",
      "Port Arthur",
      "Galveston",
      "Freeport",
      "Texas City",
      "Lake Charles",
      "New Orleans",
      "LOOP",
      "Pascagoula",
      "Mobile",
      "Baton Rouge",
      "Port Fourchon",
      "Brownsville",
      "Sabine Pass",
      "Cameron",
      "Tampa",
      "Jacksonville",
      "Savannah",
      "Charleston",
      "Norfolk",
      "Philadelphia",
      "New York",
      "Boston",
      "Baltimore",
      "Port Everglades",
      "Miami",
      "Newark",
      "Los Angeles",
      "Long Beach",
      "San Francisco",
      "Seattle",
      "Portland",
      "Tacoma",
      "San Diego",
      "Prince Rupert",
      "Halifax",
      "Montreal",
      "Quebec City",
      "Thunder Bay",
      "Hamilton",
    ],
  },
  sa: {
    name: "South America",
    tag: "Atlantic & Pacific Coast",
    terminalIds: [],
    ports: [
      "Santos",
      "Rio de Janeiro",
      "Paranagua",
      "Suape",
      "Itaqui",
      "São Sebastião",
      "Buenos Aires",
      "Bahia Blanca",
      "Cartagena",
      "Barranquilla",
      "Puerto La Cruz",
      "Jose Terminal",
      "Montevideo",
      "Rosario",
      "Maracaibo",
      "Callao",
      "Guayaquil",
      "Balboa",
      "Valparaiso",
      "San Antonio",
      "Iquique",
      "Antofagasta",
      "Buenaventura",
    ],
  },
  eu: {
    name: "Europe",
    tag: "ARA + Northern Europe · 1 Terminal",
    terminalIds: ["rot"],
    ports: [
      "Rotterdam★",
      "Amsterdam",
      "Antwerp",
      "Zeebrugge",
      "Vlissingen",
      "Hamburg",
      "Bremen",
      "Wilhelmshaven",
      "Le Havre",
      "Dunkirk",
      "Southampton",
      "Immingham",
      "Teesport",
      "Grangemouth",
      "Milford Haven",
      "Gdansk",
      "Tallinn",
      "Primorsk",
      "Ventspils",
      "Klaipeda",
    ],
  },
  med: {
    name: "Med & Black Sea",
    tag: "Southern Europe + Levant",
    terminalIds: [],
    ports: [
      "Gibraltar",
      "Algeciras",
      "Marseille",
      "Fos-sur-Mer",
      "Genoa",
      "Trieste",
      "Augusta",
      "Piraeus",
      "Barcelona",
      "Valencia",
      "Naples",
      "Livorno",
      "Ravenna",
      "Taranto",
      "La Spezia",
      "Cagliari",
      "Palermo",
      "Constanta",
      "Novorossiysk",
      "Burgas",
      "Batumi",
      "Poti",
      "Odessa",
      "Alexandria",
      "Port Said",
      "Suez",
      "Damietta",
      "Skikda",
      "Oran",
      "Tunis",
    ],
  },
  me: {
    name: "Middle East",
    tag: "UAE + Gulf Region · 3 Terminals",
    terminalIds: ["fuj", "ja", "kf"],
    ports: [
      "Fujairah★",
      "Jebel Ali★",
      "Khor Fakkan★",
      "Abu Dhabi",
      "Ruwais",
      "Sharjah",
      "Ajman",
      "Ras Tanura",
      "Jubail",
      "Dammam",
      "Yanbu",
      "Jeddah",
      "Rabigh",
      "Jazan",
      "Ras Laffan",
      "Mesaieed",
      "Hamad Port",
      "Mina Al Ahmadi",
      "Mina Abdullah",
      "Shuaiba",
      "Sohar",
      "Duqm",
      "Muscat",
      "Salalah",
      "Sitra",
    ],
  },
  af: {
    name: "Africa",
    tag: "West, East, South & North",
    terminalIds: [],
    ports: [
      "Lomé",
      "Lagos",
      "Bonny",
      "Port Harcourt",
      "Warri",
      "Tema",
      "Takoradi",
      "Abidjan",
      "Dakar",
      "Luanda",
      "Pointe-Noire",
      "Libreville",
      "Douala",
      "Cotonou",
      "Conakry",
      "Freetown",
      "Monrovia",
      "Mombasa",
      "Djibouti",
      "Dar es Salaam",
      "Port Sudan",
      "Maputo",
      "Beira",
      "Walvis Bay",
      "Durban",
      "Richards Bay",
      "Saldanha Bay",
      "Cape Town",
      "Port Elizabeth",
    ],
  },
  sg: {
    name: "Singapore",
    tag: "Regional Hub · 2 Terminals",
    terminalIds: ["jur", "seb"],
    ports: [
      "Jurong★",
      "Sebarok★",
      "Singapore Main Port",
      "Pasir Panjang",
      "Pulau Bukom",
    ],
  },
  ap: {
    name: "Asia Pacific",
    tag: "Korea, China, Japan, Taiwan · 2 Terminals",
    terminalIds: ["uls", "nbo"],
    ports: [
      "Ulsan★",
      "Busan",
      "Yeosu",
      "Incheon",
      "Pyeongtaek",
      "Daesan",
      "Masan",
      "Pohang",
      "Shanghai",
      "Ningbo",
      "Zhoushan",
      "Qingdao",
      "Dalian",
      "Tianjin",
      "Xiamen",
      "Guangzhou",
      "Shenzhen",
      "Yantai",
      "Kaohsiung",
      "Taichung",
      "Keelung",
      "Yokohama",
      "Chiba",
      "Nagoya",
      "Osaka",
      "Kobe",
      "Tokyo",
      "Kitakyushu",
    ],
  },
  au: {
    name: "Australia & Oceania",
    tag: "16 Ports",
    terminalIds: [],
    ports: [
      "Melbourne",
      "Sydney",
      "Brisbane",
      "Fremantle",
      "Darwin",
      "Gladstone",
      "Geelong",
      "Kwinana",
      "Port Botany",
      "Port Hedland",
      "Dampier",
      "Newcastle",
      "Townsville",
      "Auckland",
      "Wellington",
      "Tauranga",
      "Lyttelton",
    ],
  },
};

// Zone click regions [lon, lat, radiusX, radiusY] (ellipses)
const zoneRegions: ZoneRegion[] = [
  { id: "na", lon: -100, lat: 45, rx: 42, ry: 30 },
  { id: "sa", lon: -60, lat: -15, rx: 22, ry: 28 },
  { id: "eu", lon: 10, lat: 55, rx: 22, ry: 16 },
  { id: "med", lon: 20, lat: 36, rx: 22, ry: 10 },
  { id: "me", lon: 52, lat: 22, rx: 18, ry: 14 },
  { id: "af", lon: 22, lat: 0, rx: 24, ry: 36 },
  { id: "sg", lon: 104, lat: 1, rx: 5, ry: 5 },
  { id: "ap", lon: 120, lat: 32, rx: 28, ry: 22 },
  { id: "au", lon: 134, lat: -26, rx: 22, ry: 18 },
];

// Vessel animations

// Vessel animation seeds (computed once, kept stable via ref init below)
type Vessel = { a: string; b: string; t: number; speed: number; dir: number };

export default function TankTerminalNetwork() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Mutable interaction/render state that must NOT trigger React re-renders
  // (mirrors the original module-level `let` variables).
  const sizeRef = useRef({ W: 0, H: 0 });
  const filterRef = useRef<FilterKey>("all");
  const hoverZoneRef = useRef<string | null>(null);
  const hoverTermRef = useRef<string | null>(null);
  const zoomRef = useRef(1);
  const panRef = useRef({ x: 0, y: 0 });
  const isPanningRef = useRef(false);
  const panStartRef = useRef({ x: 0, y: 0 });
  const panOriginRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef(0);
  const particlesRef = useRef<
    { x: number; y: number; s: number; o: number; sp: number }[]
  >([]);
  const vesselsRef = useRef<Vessel[]>([]);
  const rafRef = useRef<number | null>(null);
  const lastTouchDistRef = useRef<number | null>(null);

  // State that DOES drive UI (buttons, tooltip box, side panel)
  const [filter, setFilterState] = useState<FilterKey>("all");
  const [tooltip, setTooltip] = useState<{
    show: boolean;
    x: number;
    y: number;
    terminal: Terminal | null;
  }>({ show: false, x: 0, y: 0, terminal: null });
  const [panelOpen, setPanelOpen] = useState(false);
  const [activeZoneKey, setActiveZoneKey] = useState<string | null>(null);

  const setFilter = useCallback((f: FilterKey) => {
    filterRef.current = f;
    setFilterState(f);
  }, []);

  // ── Projection helpers ──
  const proj = useCallback((lon: number, lat: number): [number, number] => {
    const { W, H } = sizeRef.current;
    const { x: panX, y: panY } = panRef.current;
    const zoom = zoomRef.current;
    const x = ((lon + 180) / 360) * W * zoom + panX;
    const y = ((80 - lat) / 145) * H * zoom + panY;
    return [x, y];
  }, []);

  const clampPan = useCallback(() => {
    const { W, H } = sizeRef.current;
    const zoom = zoomRef.current;
    const minX = W * (1 - zoom);
    const minY = H * (1 - zoom);
    panRef.current.x = Math.min(0, Math.max(panRef.current.x, minX));
    panRef.current.y = Math.min(0, Math.max(panRef.current.y, minY));
  }, []);

  const doZoom = useCallback(
    (factor: number, cx?: number, cy?: number) => {
      const { W, H } = sizeRef.current;
      const prevZoom = zoomRef.current;
      const newZoom = Math.min(Math.max(prevZoom * factor, 1), 8);
      const actualFactor = newZoom / prevZoom;
      zoomRef.current = newZoom;
      const ox = cx !== undefined ? cx : W / 2;
      const oy = cy !== undefined ? cy : H / 2;
      panRef.current.x = ox - actualFactor * (ox - panRef.current.x);
      panRef.current.y = oy - actualFactor * (oy - panRef.current.y);
      clampPan();
    },
    [clampPan],
  );

  const resetZoom = useCallback(() => {
    zoomRef.current = 1;
    panRef.current = { x: 0, y: 0 };
  }, []);

  const curvePoints = (
    x1: number,
    y1: number,
    x2: number,
    y2: number,
  ): [number, number] => {
    const mx = (x1 + x2) / 2,
      my = (y1 + y2) / 2;
    const dx = x2 - x1,
      dy = y2 - y1;
    const len = Math.sqrt(dx * dx + dy * dy);
    const cx = mx - dy * 0.18,
      cy = my + dx * 0.18 - len * 0.12;
    return [cx, cy];
  };

  // ── Draw functions ──
  const drawOcean = (ctx: CanvasRenderingContext2D) => {
    const { W, H } = sizeRef.current;
    const g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, "#050f1c");
    g.addColorStop(0.5, "#071422");
    g.addColorStop(1, "#040c18");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);

    const g2 = ctx.createRadialGradient(
      W / 2,
      H * 0.55,
      0,
      W / 2,
      H * 0.55,
      W * 0.7,
    );
    g2.addColorStop(0, "rgba(8,30,55,0.25)");
    g2.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g2;
    ctx.fillRect(0, 0, W, H);

    ctx.strokeStyle = "rgba(15,45,75,0.5)";
    ctx.lineWidth = 0.5;
    for (let lon = -180; lon <= 180; lon += 30) {
      ctx.beginPath();
      for (let lat = 80; lat >= -65; lat -= 5) {
        const [px, py] = proj(lon, lat);
        lat === 80 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.stroke();
    }
    for (let lat = -60; lat <= 80; lat += 30) {
      ctx.beginPath();
      for (let lon = -180; lon <= 180; lon += 5) {
        const [px, py] = proj(lon, lat);
        lon === -180 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.stroke();
    }
  };

  const drawLand = (ctx: CanvasRenderingContext2D) => {
    ctx.save();
    landData.forEach(({ pts }) => {
      if (!pts || pts.length < 3) return;
      ctx.beginPath();
      pts.forEach(([lon, lat], i) => {
        const [x, y] = proj(lon, lat);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      });
      ctx.closePath();
      ctx.fillStyle = "#0f2234";
      ctx.fill();
      ctx.strokeStyle = "#1a3a52";
      ctx.lineWidth = 0.7;
      ctx.stroke();
    });
    ctx.restore();
  };

  const drawParticles = (ctx: CanvasRenderingContext2D) => {
    const { W, H } = sizeRef.current;
    particlesRef.current.forEach((p) => {
      p.x += p.sp;
      if (p.x > 1) p.x = 0;
      ctx.beginPath();
      ctx.arc(p.x * W, p.y * H, p.s, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(30,80,140,${p.o})`;
      ctx.fill();
    });
  };

  const drawZones = (ctx: CanvasRenderingContext2D) => {
    const f = filterRef.current;
    if (f === "routes" || f === "terminals") return;
    const { W } = sizeRef.current;
    zoneRegions.forEach((z) => {
      const [cx, cy] = proj(z.lon, z.lat);
      const [ex] = proj(z.lon + z.rx, z.lat);
      const [, ey] = proj(z.lon, z.lat - z.ry);
      const rX = Math.abs(ex - cx),
        rY = Math.abs(ey - cy);
      const isHover = hoverZoneRef.current === z.id;
      ctx.save();
      ctx.beginPath();
      ctx.ellipse(cx, cy, rX, rY, 0, 0, Math.PI * 2);
      if (isHover) {
        ctx.fillStyle = "rgba(42,106,170,0.18)";
        ctx.strokeStyle = "rgba(60,140,220,0.5)";
        ctx.lineWidth = 1;
        ctx.fill();
        ctx.stroke();
      } else {
        ctx.strokeStyle = "rgba(25,65,110,0.3)";
        ctx.lineWidth = 0.6;
        ctx.setLineDash([4, 6]);
        ctx.stroke();
        ctx.setLineDash([]);
      }
      ctx.restore();
      if (filterRef.current !== "terminals") {
        const [lx, ly] = proj(z.lon, z.lat + z.ry * 0.6 + 2);
        ctx.font = `500 ${Math.max(8, W / 115)}px "Segoe UI",system-ui,sans-serif`;
        ctx.textAlign = "center";
        ctx.fillStyle = isHover
          ? "rgba(100,170,220,0.9)"
          : "rgba(35,85,130,0.7)";
        ctx.fillText(zones[z.id].name.toUpperCase(), lx, ly);
      }
    });
  };

  const drawRoutes = (ctx: CanvasRenderingContext2D) => {
    const f = filterRef.current;
    if (f === "zones" || f === "terminals") return;
    routePairs.forEach(([aid, bid]) => {
      const a = terminals.find((t) => t.id === aid);
      const b = terminals.find((t) => t.id === bid);
      if (!a || !b) return;
      const [x1, y1] = proj(a.lon, a.lat),
        [x2, y2] = proj(b.lon, b.lat);
      const [cpx, cpy] = curvePoints(x1, y1, x2, y2);
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.quadraticCurveTo(cpx, cpy, x2, y2);
      ctx.strokeStyle = "rgba(30,90,160,0.45)";
      ctx.lineWidth = 1.2;
      ctx.setLineDash([6, 5]);
      ctx.lineDashOffset = -frameRef.current * 0.6;
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();
    });
  };

  const drawVessels = (ctx: CanvasRenderingContext2D) => {
    const f = filterRef.current;
    if (f === "zones" || f === "terminals") return;
    vesselsRef.current.forEach((v) => {
      v.t += v.speed;
      if (v.t > 1) v.t = 0;
      const a = terminals.find((t) => t.id === v.a);
      const b = terminals.find((t) => t.id === v.b);
      if (!a || !b) return;
      const [x1, y1] = proj(a.lon, a.lat),
        [x2, y2] = proj(b.lon, b.lat);
      const [cpx, cpy] = curvePoints(x1, y1, x2, y2);
      const t = v.t;
      const px = (1 - t) * (1 - t) * x1 + 2 * (1 - t) * t * cpx + t * t * x2;
      const py = (1 - t) * (1 - t) * y1 + 2 * (1 - t) * t * cpy + t * t * y2;
      const dx = 2 * (1 - t) * (cpx - x1) + 2 * t * (x2 - cpx);
      const dy = 2 * (1 - t) * (cpy - y1) + 2 * t * (y2 - cpy);
      const angle = Math.atan2(dy, dx);
      ctx.save();
      ctx.translate(px, py);
      ctx.rotate(angle);
      ctx.beginPath();
      ctx.moveTo(6, 0);
      ctx.lineTo(-4, 3);
      ctx.lineTo(-3, 0);
      ctx.lineTo(-4, -3);
      ctx.closePath();
      ctx.fillStyle = "rgba(255,210,80,0.9)";
      ctx.fill();
      ctx.beginPath();
      ctx.arc(0, 0, 4, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,200,60,0.15)";
      ctx.fill();
      ctx.restore();
    });
  };

  const labelOffsets: Record<
    string,
    { dx: number; dy: number; align: CanvasTextAlign }
  > = {
    jur: { dx: 10, dy: -10, align: "left" },
    seb: { dx: 10, dy: 14, align: "left" },
    kf: { dx: 10, dy: -10, align: "left" },
    ja: { dx: -12, dy: 14, align: "right" },
    fuj: { dx: 10, dy: 2, align: "left" },
    cc: { dx: -12, dy: 14, align: "right" },
    hou: { dx: 10, dy: 2, align: "left" },
  };

  const drawTerminals = (ctx: CanvasRenderingContext2D) => {
    const f = filterRef.current;
    if (f === "zones") return;
    const { W } = sizeRef.current;
    terminals.forEach((t, idx) => {
      const [x, y] = proj(t.lon, t.lat);
      const isHover = hoverTermRef.current === t.id;
      const pulse = (Math.sin(frameRef.current * 0.05 + idx * 0.8) + 1) / 2;
      if (f !== "routes") {
        const r = 10 + pulse * 10;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(240,192,96,${0.08 + pulse * 0.12})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(x, y, r * 0.55, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(240,192,96,${0.15 + pulse * 0.1})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      const dotR = isHover ? 8 : 6;
      ctx.beginPath();
      ctx.arc(x, y, dotR, 0, Math.PI * 2);
      const dg = ctx.createRadialGradient(x - 1, y - 1, 0, x, y, dotR);
      dg.addColorStop(0, "#fff7cc");
      dg.addColorStop(0.4, "#f0c060");
      dg.addColorStop(1, "#c08020");
      ctx.fillStyle = dg;
      ctx.fill();
      ctx.strokeStyle = "rgba(6,20,40,0.8)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      if (f !== "routes") {
        const off = labelOffsets[t.id] || {
          dx: 10,
          dy: 2,
          align: "left" as CanvasTextAlign,
        };
        const fontSize = Math.max(8.5, W / 112);
        ctx.font = `600 ${fontSize}px "Segoe UI",system-ui,sans-serif`;
        ctx.textAlign = off.align;
        const lx = off.align === "right" ? x - 10 : x + off.dx;
        const ly = y + off.dy;
        ctx.fillStyle = "rgba(4,14,26,0.7)";
        ctx.fillText(t.name, lx + 1, ly + 1);
        ctx.fillStyle = "rgba(200,230,250,0.95)";
        ctx.fillText(t.name, lx, ly);
        ctx.font = `400 ${fontSize - 1}px "Segoe UI",system-ui,sans-serif`;
        ctx.fillStyle = "rgba(4,14,26,0.7)";
        ctx.fillText(t.country, lx + 1, ly + fontSize + 2);
        ctx.fillStyle = "rgba(80,130,170,0.85)";
        ctx.fillText(t.country, lx, ly + fontSize + 1);
      }
    });
  };

  // ── Resize ──
  const resize = useCallback(() => {
    const root = rootRef.current,
      canvas = canvasRef.current;
    if (!root || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const W = root.offsetWidth,
      H = root.offsetHeight;
    sizeRef.current = { W, H };
    const dpr = window.devicePixelRatio || 1;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
  }, []);

  // ── Mount: init particles/vessels, render loop, listeners ──
  useEffect(() => {
    particlesRef.current = Array.from({ length: 80 }, () => ({
      x: Math.random(),
      y: Math.random(),
      s: Math.random() * 1.2 + 0.3,
      o: Math.random() * 0.3 + 0.05,
      sp: Math.random() * 0.0001 + 0.00005,
    }));
    vesselsRef.current = routePairs.map((pair) => ({
      a: pair[0],
      b: pair[1],
      t: Math.random(),
      speed: 0.0004 + Math.random() * 0.0003,
      dir: 1,
    }));

    resize();
    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const render = () => {
      const { W, H } = sizeRef.current;
      ctx.clearRect(0, 0, W, H);
      drawOcean(ctx);
      drawParticles(ctx);
      drawLand(ctx);
      drawZones(ctx);
      drawRoutes(ctx);
      drawVessels(ctx);
      drawTerminals(ctx);
      frameRef.current++;
      rafRef.current = requestAnimationFrame(render);
    };
    rafRef.current = requestAnimationFrame(render);

    // ── Mouse interaction ──
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left,
        my = e.clientY - rect.top;
      let foundTerm: string | null = null,
        foundZone: string | null = null;

      terminals.forEach((t) => {
        const [x, y] = proj(t.lon, t.lat);
        if (Math.hypot(mx - x, my - y) < 14) foundTerm = t.id;
      });

      if (
        !foundTerm &&
        filterRef.current !== "terminals" &&
        filterRef.current !== "routes"
      ) {
        zoneRegions.forEach((z) => {
          const [cx, cy] = proj(z.lon, z.lat);
          const [ex] = proj(z.lon + z.rx, z.lat);
          const [, ey] = proj(z.lon, z.lat - z.ry);
          const rX = Math.abs(ex - cx),
            rY = Math.abs(ey - cy);
          const dx = (mx - cx) / rX,
            dy = (my - cy) / rY;
          if (dx * dx + dy * dy < 1) foundZone = z.id;
        });
      }

      hoverTermRef.current = foundTerm;
      hoverZoneRef.current = foundZone;
      canvas.style.cursor = foundTerm || foundZone ? "pointer" : "default";

      if (foundTerm) {
        const t = terminals.find((x) => x.id === foundTerm);
        if (!t) {
          setTooltip((prev) => (prev.show ? { ...prev, show: false } : prev));
          return;
        }
        const rootRect = rootRef.current?.getBoundingClientRect();
        if (!rootRect) {
          setTooltip((prev) => (prev.show ? { ...prev, show: false } : prev));
          return;
        }
        const tx = e.clientX - rootRect.left;
        const ty = e.clientY - rootRect.top;
        const { W } = sizeRef.current;
        const tipW = 210,
          tipH = 160;
        let lx = tx + 14,
          ly = ty - tipH / 2;
        if (lx + tipW > W - 10) lx = tx - tipW - 14;
        if (ly < 8) ly = 8;
        setTooltip({ show: true, x: lx, y: ly, terminal: t });
      } else {
        setTooltip((prev) => (prev.show ? { ...prev, show: false } : prev));
      }
    };

    const openZoneByKey = (key: string) => {
      if (!zones[key]) return;
      setActiveZoneKey(key);
      setPanelOpen(true);
    };

    const onClick = () => {
      if (hoverZoneRef.current) {
        openZoneByKey(hoverZoneRef.current);
      } else if (hoverTermRef.current) {
        const termId = hoverTermRef.current;
        const zk = Object.keys(zones).find((k) =>
          zones[k].terminalIds.includes(termId),
        );
        if (zk) openZoneByKey(zk);
      }
    };

    const onMouseLeave = () => {
      setTooltip((prev) => (prev.show ? { ...prev, show: false } : prev));
      hoverTermRef.current = null;
      hoverZoneRef.current = null;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const cx = e.clientX - rect.left,
        cy = e.clientY - rect.top;
      doZoom(e.deltaY < 0 ? 1.15 : 1 / 1.15, cx, cy);
    };

    const onMouseDown = (e: MouseEvent) => {
      if (e.button !== 0) return;
      isPanningRef.current = true;
      panStartRef.current = { x: e.clientX, y: e.clientY };
      panOriginRef.current = { ...panRef.current };
      canvas.style.cursor = "grabbing";
    };
    const onWindowMouseMove = (e: MouseEvent) => {
      if (!isPanningRef.current) return;
      panRef.current.x =
        panOriginRef.current.x + (e.clientX - panStartRef.current.x);
      panRef.current.y =
        panOriginRef.current.y + (e.clientY - panStartRef.current.y);
      clampPan();
    };
    const onWindowMouseUp = () => {
      if (isPanningRef.current) {
        isPanningRef.current = false;
        canvas.style.cursor = "default";
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        lastTouchDistRef.current = Math.hypot(dx, dy);
      } else if (e.touches.length === 1) {
        isPanningRef.current = true;
        panStartRef.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
        panOriginRef.current = { ...panRef.current };
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2 && lastTouchDistRef.current) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const dist = Math.hypot(dx, dy);
        const mid = {
          x: (e.touches[0].clientX + e.touches[1].clientX) / 2,
          y: (e.touches[0].clientY + e.touches[1].clientY) / 2,
        };
        const rect = canvas.getBoundingClientRect();
        doZoom(
          dist / lastTouchDistRef.current,
          mid.x - rect.left,
          mid.y - rect.top,
        );
        lastTouchDistRef.current = dist;
      } else if (e.touches.length === 1 && isPanningRef.current) {
        panRef.current.x =
          panOriginRef.current.x +
          (e.touches[0].clientX - panStartRef.current.x);
        panRef.current.y =
          panOriginRef.current.y +
          (e.touches[0].clientY - panStartRef.current.y);
        clampPan();
      }
    };
    const onTouchEnd = () => {
      isPanningRef.current = false;
      lastTouchDistRef.current = null;
    };

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("click", onClick);
    canvas.addEventListener("mouseleave", onMouseLeave);
    canvas.addEventListener("wheel", onWheel, { passive: false });
    canvas.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onWindowMouseMove);
    window.addEventListener("mouseup", onWindowMouseUp);
    canvas.addEventListener("touchstart", onTouchStart, { passive: true });
    canvas.addEventListener("touchmove", onTouchMove, { passive: true });
    canvas.addEventListener("touchend", onTouchEnd);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("click", onClick);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      canvas.removeEventListener("wheel", onWheel);
      canvas.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onWindowMouseMove);
      window.removeEventListener("mouseup", onWindowMouseUp);
      canvas.removeEventListener("touchstart", onTouchStart);
      canvas.removeEventListener("touchmove", onTouchMove);
      canvas.removeEventListener("touchend", onTouchEnd);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clampPan, doZoom, proj, resize]);

  const activeZone = activeZoneKey ? zones[activeZoneKey] : null;

  return (
    <>
      <header className="mx-auto px-4 md:px-6 lg:px-8 xl:px-10 pt-24 max-w-screen-2xl">
        <SectionLabel label="Network Coverage" />
        <div className="flex lg:flex-row flex-col justify-between lg:items-end gap-6 mb-16">
          <h2 className="mb-6 font-display font-black text-4xl md:text-5xl xl:text-6xl uppercase">
            Connected
            <br />
            <span className="text-gold">Globally</span>
          </h2>
          <p className="mb-8 max-w-[50ch] text-foreground/60 leading-relaxed">
            Operating from our Winnipeg hub, BCWEST's freight network is global
            connecting shippers to destinations throughout, Europe, Africa and beyond.
          </p>
        </div>
      </header>
      <div
        ref={rootRef}
        style={{
          position: "relative",
          width: "100%",
          height: 680,
          overflow: "hidden",
        }}
        className="mx-auto px-4 md:px-6 lg:px-8 xl:px-10 max-w-screen-2xl"
      >
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        >
          {/* Header */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              padding: "16px 20px 12px",
              background:
                "linear-gradient(to bottom, rgba(4,14,26,.98) 70%, transparent)",
              pointerEvents: "none",
            }}
          >
            <h1 className="font-bold text-fog">
              Global Storage Terminal &amp; Shipping Network
            </h1>
            <p className="mb-4 text-[11px] text-fog/70 md:text-xs xl:text-sm">
              Tank Storage · Lease &amp; Rental · Worldwide Port Coverage
            </p>
          </div>

          {/* Filters */}
          <div
            style={{
              position: "absolute",
              top: 68,
              left: 20,
              display: "flex",
              gap: 6,
              pointerEvents: "all",
            }}
          >
            {(["all", "terminals", "routes", "zones"] as FilterKey[]).map((f) => (
              <button
                type="button"
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  fontSize: 9.5,
                  padding: "4px 10px",
                  borderRadius: 20,
                  border: `1px solid ${filter === f ? "#f0c060" : "#1a3a5c"}`,
                  background: filter === f ? "#0e2a40" : "rgba(6,18,32,.85)",
                  color: filter === f ? "#f0c060" : "#5a8ab0",
                  cursor: "pointer",
                  letterSpacing: ".05em",
                  textTransform: "uppercase",
                  transition: "all .2s",
                }}
              >
                {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          {/* Zoom controls */}
          <div
            style={{
              position: "absolute",
              top: 58,
              right: 20,
              display: "flex",
              flexDirection: "column",
              gap: 4,
              pointerEvents: "all",
            }}
          >
            <button
              type="button"
              onClick={() => doZoom(1.4)}
              style={zoomBtnStyle}
            >
              +
            </button>
            <button
              type="button"
              onClick={() => doZoom(1 / 1.4)}
              style={zoomBtnStyle}
            >
              −
            </button>
            <button
              type="button"
              onClick={() => resetZoom()}
              style={{ ...zoomBtnStyle, fontSize: 9 }}
            >
              RESET
            </button>
          </div>

          {/* Stats bar */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              padding: "10px 20px",
              background:
                "linear-gradient(to top, rgba(4,14,26,.98) 70%, transparent)",
              display: "flex",
              alignItems: "center",
              gap: 0,
              pointerEvents: "none",
            }}
          >
            <Stat
              num="12"
              label={
                <>
                  Storage
                  <br />
                  Terminals
                </>
              }
              first
            />
            <Stat
              num="16.05M"
              label={
                <>
                  m³ Total
                  <br />
                  Capacity
                </>
              }
            />
            <Stat
              num="9"
              label={
                <>
                  Shipping
                  <br />
                  Zones
                </>
              }
            />
            <Stat
              num="200+"
              label={
                <>
                  Ports
                  <br />
                  Covered
                </>
              }
            />
            <Stat
              num="6"
              label={
                <>
                  Continents
                  <br />
                  Served
                </>
              }
              last
            />
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#4ec94e",
                marginLeft: "auto",
                animation: "tt-blink 2s ease-in-out infinite",
              }}
            />
            <div
              style={{
                fontSize: 9,
                color: "#4ec94e",
                marginLeft: 6,
                textTransform: "uppercase",
                letterSpacing: ".07em",
              }}
            >
              Live Network
            </div>
          </div>

          {/* Tooltip */}
          {tooltip.show && tooltip.terminal && (
            <div
              style={{
                position: "absolute",
                left: tooltip.x,
                top: tooltip.y,
                pointerEvents: "none",
                zIndex: 20,
              }}
            >
              <div
                style={{
                  background: "rgba(4,12,24,.97)",
                  border: "1px solid #1e4a72",
                  borderRadius: 10,
                  padding: "12px 15px",
                  minWidth: 200,
                  boxShadow: "0 8px 32px rgba(0,0,0,.7)",
                }}
              >
                <h4
                  style={{
                    fontSize: 12.5,
                    fontWeight: 600,
                    color: "#7bbfea",
                    marginBottom: 3,
                  }}
                >
                  {tooltip.terminal.name}
                </h4>
                <div
                  style={{
                    fontSize: 9.5,
                    color: "#3a6a8a",
                    textTransform: "uppercase",
                    letterSpacing: ".07em",
                    marginBottom: 8,
                  }}
                >
                  {tooltip.terminal.region} · {tooltip.terminal.country}
                </div>
                <TipRow label="Tanks" value={String(tooltip.terminal.tanks)} />
                <TipRow label="Total capacity" value={tooltip.terminal.cap} />
                <TipRow
                  label="Status"
                  value={
                    <>
                      Active{" "}
                      <span
                        style={{
                          fontSize: 9,
                          background: "#1a3a1a",
                          color: "#4ec94e",
                          border: "1px solid #2a5a2a",
                          borderRadius: 4,
                          padding: "1px 6px",
                          marginLeft: 6,
                        }}
                      >
                        OPERATIONAL
                      </span>
                    </>
                  }
                />
                <TipRow label="Service" value="Lease & Rental" last />
                <div
                  style={{
                    borderTop: "none",
                    paddingTop: 6,
                    fontSize: 9.5,
                    color: "#3a6a8a",
                  }}
                >
                  Click to view zone ports →
                </div>
              </div>
            </div>
          )}

          {/* Zone panel */}
          {panelOpen && activeZone && (
            <div
              style={{
                position: "absolute",
                top: 12,
                right: 12,
                width: 218,
                background: "rgba(4,12,24,.97)",
                border: "1px solid #1a3a5c",
                borderRadius: 11,
                display: "flex",
                flexDirection: "column",
                pointerEvents: "all",
                boxShadow: "0 8px 32px rgba(0,0,0,.7)",
                maxHeight: 520,
                overflow: "hidden",
              }}
            >
              <button
                type="button"
                onClick={() => setPanelOpen(false)}
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  background: "none",
                  border: "none",
                  color: "#3a6a8a",
                  cursor: "pointer",
                  fontSize: 16,
                  lineHeight: 1,
                  padding: 2,
                }}
              >
                ✕
              </button>
              <div
                style={{
                  padding: "14px 14px 10px",
                  borderBottom: "1px solid #0e2a40",
                  flexShrink: 0,
                }}
              >
                <h3
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#7bbfea",
                    margin: 0,
                  }}
                >
                  {activeZone.name}
                </h3>
                <div
                  style={{
                    fontSize: 9.5,
                    color: "#3a6a8a",
                    textTransform: "uppercase",
                    letterSpacing: ".07em",
                    marginTop: 3,
                  }}
                >
                  {activeZone.tag}
                </div>
                <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
                  <div
                    style={{
                      fontSize: 10,
                      color: "#5a8ab0",
                      background: "#0a1e32",
                      borderRadius: 5,
                      padding: "3px 8px",
                    }}
                  >
                    <b style={{ color: "#f0c060", fontWeight: 600 }}>
                      {activeZone.terminalIds.length}
                    </b>{" "}
                    terminals
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      color: "#5a8ab0",
                      background: "#0a1e32",
                      borderRadius: 5,
                      padding: "3px 8px",
                    }}
                  >
                    <b style={{ color: "#f0c060", fontWeight: 600 }}>
                      {activeZone.ports.length}
                    </b>{" "}
                    total ports
                  </div>
                </div>
              </div>
              <div
                className="tt-plist"
                style={{ overflowY: "auto", padding: "8px 0", flex: 1 }}
              >
                {activeZone.ports.map((p, i) => {
                  const isTerm = p.includes("★");
                  return (
                    <div
                      key={p}
                      style={{
                        padding: "5px 14px",
                        fontSize: 10.5,
                        color: isTerm ? "#f0c060" : "#7a9aba",
                        fontWeight: isTerm ? 600 : 400,
                        borderBottom:
                          i === activeZone.ports.length - 1
                            ? "none"
                            : "1px solid #080e18",
                        lineHeight: 1.4,
                      }}
                    >
                      {isTerm && (
                        <span style={{ fontSize: 8, opacity: 0.8 }}>◆ </span>
                      )}
                      {p.replace("★", "")}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <style>{`
        @keyframes tt-blink { 0%, 100% { opacity: 1; } 50% { opacity: .3; } }
        .tt-plist::-webkit-scrollbar { width: 4px; }
        .tt-plist::-webkit-scrollbar-track { background: #040e1a; }
        .tt-plist::-webkit-scrollbar-thumb { background: #1a3a5c; border-radius: 2px; }
      `}</style>
      </div>
    </>
  );
}

const zoomBtnStyle: React.CSSProperties = {
  fontSize: 14,
  fontWeight: 700,
  width: 30,
  height: 30,
  borderRadius: 6,
  border: "1px solid #1a3a5c",
  background: "rgba(6,18,32,.88)",
  color: "#7bbfea",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all .2s",
};

function Stat({
  num,
  label,
  first,
  last,
}: {
  num: string;
  label: React.ReactNode;
  first?: boolean;
  last?: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: first ? "0 18px 0 0" : "0 18px",
        borderRight: last ? "none" : "1px solid #0e2a40",
      }}
    >
      <div>
        <div
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: "#f0c060",
            letterSpacing: "-.01em",
          }}
        >
          {num}
        </div>
        <div
          style={{
            fontSize: 9.5,
            color: "#3a6a8a",
            textTransform: "uppercase",
            letterSpacing: ".07em",
            lineHeight: 1.4,
          }}
        >
          {label}
        </div>
      </div>
    </div>
  );
}

function TipRow({
  label,
  value,
  last,
}: {
  label: string;
  value: React.ReactNode;
  last?: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: 10.5,
        color: "#8ab4d4",
        padding: "3px 0",
        borderBottom: last ? "none" : "1px solid #0a2030",
      }}
    >
      <span>{label}</span>
      <span style={{ color: "#c8ddf0", fontWeight: 500 }}>{value}</span>
    </div>
  );
}
