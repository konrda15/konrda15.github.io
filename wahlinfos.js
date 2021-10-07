farben = {
  oevp: "#000000",
  kpoe: "#aa0000",
  fpoe: "#205ca5",
  gruene: "#51a51e",
  spoe: "#e31e2d",
  neos: "#e84188",
  pirat: "#6e17a1",
  erde: "#d3ac30",
  wir: "#dbd824", //"#f5f4c1",
  hc: "#173153",
  basis: "#ffd700",
  fbp: "#01b0f1",
  doep: "#b91023",
  graz: "#808080",
  default: "#808080",
  default2: "#a0a0a0",
};

namen = {
  oevp: "ÖVP",
  kpoe: "KPÖ",
  fpoe: "FPÖ",
  gruene: "GRÜNE",
  spoe: "SPÖ",
  neos: "NEOS",
  pirat: "PIRATEN",
  erde: "ERDE",
  wir: "WIR",
  hc: "HC",
  basis: "BASIS",
  fbp: "FBP",
  doep: "DÖP",
  graz: "GRAZ",
};

//aufgerundet auf 0.01
highestPercentage = {
  oevp: 43.95,
  kpoe: 47.93,
  fpoe: 33.88,
  gruene: 32.65,
  spoe: 30.77,
  neos: 12.87,
  pirat: 2.32,
  erde: 1.79,
  wir: 1.35,
  hc: 2.95,
  basis: 3.12,
  fbp: 1.95,
  doep: 0.91,
  graz: 1.96,
};

highestVotes = {
  oevp: 180,
  kpoe: 171,
  fpoe: 99,
  gruene: 127,
  spoe: 85,
  neos: 58,
  pirat: 7,
  erde: 6,
  wir: 3,
  hc: 8,
  basis: 11,
  fbp: 6,
  doep: 7,
  graz: 9,
};

percentile = {
  oevp: {
    abs: {
      p10: 38.4,
      p50: 77,
      p90: 130.6,
    },
    rel: {
      p10: 17.54,
      p50: 24.3,
      p90: 33.73,
    },
  },
  kpoe: {
    abs: {
      p10: 60,
      p50: 91,
      p90: 127.6,
    },
    rel: {
      p10: 20.21,
      p50: 29.28,
      p90: 39.86,
    },
  },
  fpoe: {
    abs: {
      p10: 19,
      p50: 35,
      p90: 59,
    },
    rel: {
      p10: 5.86,
      p50: 10.6,
      p90: 19.94,
    },
  },
  gruene: {
    abs: {
      p10: 16,
      p50: 52,
      p90: 88,
    },
    rel: {
      p10: 6.83,
      p50: 16.14,
      p90: 23.84,
    },
  },
  spoe: {
    abs: {
      p10: 17,
      p50: 28,
      p90: 47,
    },
    rel: {
      p10: 5.29,
      p50: 9.29,
      p90: 15.46,
    },
  },
  neos: {
    abs: {
      p10: 4,
      p50: 17,
      p90: 29,
    },
    rel: {
      p10: 2,
      p50: 4.95,
      p90: 7.68,
    },
  },
  pirat: {
    abs: {
      p10: 0,
      p50: 1,
      p90: 3,
    },
    rel: {
      p10: 0,
      p50: 0.3,
      p90: 0.99,
    },
  },
  hc: {
    abs: {
      p10: 0,
      p50: 0,
      p90: 2.6,
    },
    rel: {
      p10: 0,
      p50: 0,
      p90: 0.84,
    },
  },
  basis: {
    abs: {
      p10: 0,
      p50: 2,
      p90: 6,
    },
    rel: {
      p10: 0,
      p50: 0.81,
      p90: 1.83,
    },
  },
  erde: {
    abs: {
      p10: 0,
      p50: 1,
      p90: 3,
    },
    rel: {
      p10: 0,
      p50: 0.3,
      p90: 0.87,
    },
  },
  wir: {
    abs: {
      p10: 0,
      p50: 0,
      p90: 1,
    },
    rel: {
      p10: 0,
      p50: 0,
      p90: 0.4,
    },
  },
  fbp: {
    abs: {
      p10: 0,
      p50: 0,
      p90: 1,
    },
    rel: {
      p10: 0,
      p50: 0,
      p90: 0.44,
    },
  },
  doep: {
    abs: {
      p10: 0,
      p50: 0,
      p90: 1,
    },
    rel: {
      p10: 0,
      p50: 0,
      p90: 0.33,
    },
  },
  graz: {
    abs: {
      p10: 0,
      p50: 0,
      p90: 2,
    },
    rel: {
      p10: 0,
      p50: 0,
      p90: 0.6,
    },
  },
};

changeAbs = {
  oevp: {
    pos: 44,
    neg: 216,
  },
  fpoe: {
    pos: 44,
    neg: 94,
  },
  spoe: {
    pos: 38,
    neg: 80,
  },
  kpoe: {
    pos: 103,
    neg: 41,
  },
  gruene: {
    pos: 73,
    neg: 38,
  },
  neos: {
    pos: 33,
    neg: 20,
  },
  pirat: {
    pos: 3,
    neg: 15,
  },
  wir: {
    pos: 3,
    neg: 6,
  },
};

changeRel = {
  oevp: {
    pos: 0.0466,
    neg: 0.231,
  },
  fpoe: {
    pos: 0.0737,
    neg: 0.1522,
  },
  spoe: {
    pos: 0.0826,
    neg: 0.3014,
  },
  kpoe: {
    pos: 0.234,
    neg: 0.0313,
  },
  gruene: {
    pos: 0.1678,
    neg: 0.0411,
  },
  neos: {
    pos: 0.0776,
    neg: 0.0409,
  },
  pirat: {
    pos: 0.0122,
    neg: 0.0333,
  },
  wir: {
    pos: 0.0136,
    neg: 0.018,
  },
};
