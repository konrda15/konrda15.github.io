//TODO
//Transparenz
//bezirksgrenzen
//grenzen farbe

let globalMode = 0; //ersterplatz, zweiterplatz, dritterplatz, parteiergebnis, wahlbeteiligung 0-4
let globalErgebnisStimmen = 0; //0:ergebnis, 1:stimmen
let globalSetting = 0; //verlauf, top50, top10, bot10, vergleich 0-4

const transparenzSettings = [1, 0.75, 0.5, 0.25, 0];
let transparenzIndex = 0;
const lineColors = [
  "#ffffff",
  "#000000",
  "#808080",
  "#aa0000",
  "#205ca5",
  "#51a51e",
];
let lineColorIndex = 0;
let kleinparteien = true;

let bezirksGrenzenEnabled = true;
let hintergrund = true;

//buttons
const btnErsterPlatz = document.querySelector(".erster-platz");
const btnZweiterPlatz = document.querySelector(".zweiter-platz");
const btnDritterPlatz = document.querySelector(".dritter-platz");
const btnParteiergebnis = document.querySelector(".parteiergebnis");
const btnWahlbeteiligung = document.querySelector(".wahlbeteiligung");
const selectParteiauswahl = document.querySelector("#parteiauswahl");
const btnErgebnis = document.querySelector(".ergebnis");
const btnStimmen = document.querySelector(".stimmen");
const btnVerlauf = document.querySelector(".verlauf");
const btnTop50 = document.querySelector(".top50");
const btnTop10 = document.querySelector(".top10");
const btnTop90 = document.querySelector(".top90");
const vergleich2017 = document.querySelector(".vergleich2017");
//bottom buttons
const transparenz = document.querySelector(".transparenz");
const linecolor = document.querySelector(".line-color");
const bezirksgrentenBtn = document.querySelector(".bezirke-grenzen");
const hintergrundBtn = document.querySelector(".hintergrund");
//const kleinparteienBtn = document.querySelector(".kleinparteien");

btnErsterPlatz.addEventListener("click", () => {
  globalMode = 0;
  drawMap();
  drawButtons();
});
btnZweiterPlatz.addEventListener("click", () => {
  globalMode = 1;
  drawMap();
  drawButtons();
});
btnDritterPlatz.addEventListener("click", () => {
  globalMode = 2;
  drawMap();
  drawButtons();
});

btnParteiergebnis.addEventListener("click", () => {
  globalMode = 3;
  drawMap();
  drawButtons();
});

btnWahlbeteiligung.addEventListener("click", () => {
  globalMode = 4;
  drawMap();
  drawButtons();
});

selectParteiauswahl.addEventListener("change", () => {
  globalMode = 3;
  drawMap();
  drawButtons();
});

btnErgebnis.addEventListener("click", () => {
  globalMode = 3;
  globalErgebnisStimmen = 0;
  drawMap();
  drawButtons();
});

btnStimmen.addEventListener("click", () => {
  globalMode = 3;
  globalErgebnisStimmen = 1;
  drawMap();
  drawButtons();
});

btnVerlauf.addEventListener("click", () => {
  globalMode = 3;
  globalSetting = 0;
  drawMap();
  drawButtons();
});

btnTop50.addEventListener("click", () => {
  globalMode = 3;
  globalSetting = 2;
  drawMap();
  drawButtons();
});

btnTop10.addEventListener("click", () => {
  globalMode = 3;
  globalSetting = 1;
  drawMap();
  drawButtons();
});

btnTop90.addEventListener("click", () => {
  globalMode = 3;
  globalSetting = 3;
  drawMap();
  drawButtons();
});
vergleich2017.addEventListener("click", () => {
  globalMode = 3;
  globalSetting = 4;
  drawMap();
  drawButtons();
});

transparenz.addEventListener("click", () => {
  transparenzIndex = (transparenzIndex + 1) % transparenzSettings.length;
  drawMap();
});

linecolor.addEventListener("click", () => {
  lineColorIndex = (lineColorIndex + 1) % lineColors.length;
  drawMap();
});

bezirksgrentenBtn.addEventListener("click", () => {
  bezirksGrenzenEnabled = !bezirksGrenzenEnabled;
  drawMap();
});

hintergrundBtn.addEventListener("click", () => {
  hintergrund = !hintergrund;
  drawMap();
});

/*kleinparteienBtn.addEventListener("click", () => {
  kleinparteien = !kleinparteien;
  drawMap();
});*/

const buttons = [
  btnErsterPlatz,
  btnZweiterPlatz,
  btnDritterPlatz,
  btnParteiergebnis,
  btnWahlbeteiligung,
  btnErgebnis,
  btnStimmen,
  btnVerlauf,
  btnTop10,
  btnTop50,
  btnTop90,
  vergleich2017,
];
const secondRowIndex = 5;

function drawButtons() {
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove("btn-active");
  }
  if (globalMode === 0) {
    btnErsterPlatz.classList.add("btn-active");
  } else if (globalMode === 1) {
    btnZweiterPlatz.classList.add("btn-active");
  } else if (globalMode === 2) {
    btnDritterPlatz.classList.add("btn-active");
  } else if (globalMode === 3) {
    btnParteiergebnis.classList.add("btn-active");
    if (globalErgebnisStimmen === 0) {
      btnErgebnis.classList.add("btn-active");
    } else {
      btnStimmen.classList.add("btn-active");
    }

    if (globalSetting === 0) {
      btnVerlauf.classList.add("btn-active");
    } else if (globalSetting === 1) {
      btnTop10.classList.add("btn-active");
    } else if (globalSetting === 2) {
      btnTop50.classList.add("btn-active");
    } else if (globalSetting === 3) {
      btnTop90.classList.add("btn-active");
    } else if (globalSetting === 4) {
      vergleich2017.classList.add("btn-active");
    }
  } else if (globalMode === 4) {
    btnWahlbeteiligung.classList.add("btn-active");
  }

  if (globalMode != 3) {
    for (let i = secondRowIndex; i < buttons.length; i++) {
      buttons[i].classList.add("btn-disabled");
    }
  } else {
    for (let i = secondRowIndex; i < buttons.length; i++) {
      buttons[i].classList.remove("btn-disabled");
    }
  }
}

// Creating map options
var mapOptions = {
  center: [47.073, 15.441],
  zoom: 12.5,
  wheelPxPerZoomLevel: 400,
  zoomSnap: 0.01,
};

// Creating a map object
var map = new L.map("map", mapOptions);

// Creating a Layer object
var layer = new L.TileLayer(
  "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
);

map.addLayer(layer);

var geoJsonLayer = new L.geoJSON(sprengelGrenzen, {
  onEachFeature: onEachFeature,
});
geoJsonLayer.addTo(map);

var bezirkeLayer = new L.geoJSON(bezirksgrenzen, { interactive: false });
bezirkeLayer.addTo(map);

drawMap();
drawButtons();

//add popup, this is a mess...
function onEachFeature(feature, layer) {
  const sprengel = parseInt(feature.properties.WAHLSPRENGEL_NR);
  for (let i = 0; i < wahlergebnis.length; i++) {
    if (wahlergebnis[i].id == sprengel) {
      wahl2017index = -1;
      for (let j = 0; j < wahl2017.length; j++) {
        if (wahl2017[j].id == sprengel) {
          wahl2017index = j;
          break;
        }
      }

      erg = Object.entries(wahlergebnis[i]);
      erg.splice(0, 4);
      if (!kleinparteien) erg.splice(6);
      const gueltig = wahlergebnis[i].gueltig;
      const wahlbeteiligung =
        Math.trunc(
          ((gueltig + wahlergebnis[i].ungueltig) * 10000) /
            wahlergebnis[i].wahlberechtigt
        ) / 100;

      content = `<h2>Sprengel: ${sprengel}</h2>
      <table>
      <tr>
        <th>Partei</th>
        <th>Stimmen</th>
        <th>%</th>
      </tr>
      <tr>
        <td>Wahlberechtigte</td>
        <td>${wahlergebnis[i].wahlberechtigt}</td>
        <td></td>
      </tr>
      <tr>
        <td>Wahlbeteiligung</td>
        <td>${wahlbeteiligung}%</td>
        <td></td>
      </tr>
      <tr>
        <td>Gültig</td>
        <td>${gueltig}</td>
        <td></td>
      </tr>
      <tr>
        <td>Ungültig</td>
        <td>${wahlergebnis[i].ungueltig}</td>
        <td></td>
      </tr>`;

      //add row for each party
      for (let i = 0; i < erg.length; i++) {
        let votes21 = erg[i][1];
        if (votes21 == 0) continue;
        let party = erg[i][0];
        let percentage21 = Math.trunc((votes21 * 10000) / gueltig) / 100;

        //2017 spans
        let absclasses = "info2017";
        let relclasses = "info2017";
        let absSpan = "";
        if (wahl2017index === -1) {
          absSpan = `<span class="${absclasses}">(-)</span>`;
        } else {
          let votes17 = wahl2017[wahl2017index][party];
          let votesdiff = votes21 - votes17;
          if (votesdiff > 0) {
            votesdiff = "+" + votesdiff;
            absclasses += " diffpos";
          } else if (votesdiff < 0) {
            absclasses += " diffneg";
          }
          if (votes17 == undefined) votesdiff = "-";
          absSpan = `<span class="${absclasses}">(${votesdiff})</span>`;
        }
        let relSpan = "";
        if (wahl2017index === -1) {
          relSpan = `<span class="${relclasses}">(-)</span>`;
        } else {
          let votes17 = wahl2017[wahl2017index][party];
          let percentage17 = (100 * votes17) / wahl2017[wahl2017index].gueltig;
          let percentagediff = percentage21 - percentage17;
          percentagediff = Math.trunc(percentagediff * 100) / 100;
          if (percentagediff > 0) {
            percentagediff = "+" + percentagediff;
            relclasses += " diffpos";
          } else if (percentagediff < 0) {
            relclasses += " diffneg";
          }
          if (votes17 == undefined) percentagediff = "-";
          relSpan = `<span class="${relclasses}">(${percentagediff})</span>`;
        }

        //create row
        content += `
        <tr>
          <td>${namen[party]}</td>
          <td>${votes21} ${absSpan}</td>
          <td>${percentage21} ${relSpan}</td>
        </tr>`;
      }

      content += "</table>";

      layer.bindPopup(content, { autoPan: true });

      break;
    }
  }
}

function drawMap() {
  if (globalMode <= 2) {
    geoJsonLayer.setStyle(drawResult);
  } else if (globalMode === 3) {
    geoJsonLayer.setStyle(drawParty);
  } else if (globalMode === 4) {
    geoJsonLayer.setStyle(drawWahlbeteiligung);
  }

  bezirkeLayer.setStyle(drawBezirke);

  if (hintergrund) layer.setOpacity(1);
  else layer.setOpacity(0);
}

function drawBezirke(feature) {
  let lines = 4;
  if (!bezirksGrenzenEnabled) lines = 0;
  return {
    color: lineColors[lineColorIndex],
    weight: lines,
    opacity: "1",
    fillOpacity: 0,
  };
}

//erster, zweiter, dritter Platz
function drawResult(feature) {
  const color = getResultColor(feature, globalMode + 1);
  return {
    color: lineColors[lineColorIndex],
    weight: "1",
    opacity: "1",
    fillColor: color,
    fillOpacity: transparenzSettings[transparenzIndex],
  };
}

function getResultColor(feature, placement) {
  const sprengel = parseInt(feature.properties.WAHLSPRENGEL_NR);
  for (let i = 0; i < wahlergebnis.length; i++) {
    if (wahlergebnis[i].id == sprengel) {
      erg = Object.entries(wahlergebnis[i]);
      erg.splice(0, 4);
      erg = erg.sort((a, b) => {
        return b[1] - a[1];
      });
      console.log(erg);

      let winner = erg[placement - 1][0];

      if (erg[placement - 1][1] == erg[placement][1]) {
        winner = "default";
      }

      return farben[winner];
    }
  }
}

//Parteiergebnis
function drawParty(feature) {
  const partyInput = document.getElementById("parteiauswahl").value;
  const party = Object.keys(namen).find((key) => namen[key] === partyInput);

  let color;
  if (globalSetting === 0) {
    color = getPartyColor(feature, party);
  } else if (globalSetting === 4) {
    color = getVergleichColor(feature, party);
  } else {
    color = getTopXColor(feature, party);
  }

  return {
    color: lineColors[lineColorIndex],
    weight: "1",
    opacity: "1",
    fillColor: color,
    fillOpacity: transparenzSettings[transparenzIndex],
  };
}

function getPartyColor(feature, party) {
  const sprengel = parseInt(feature.properties.WAHLSPRENGEL_NR);
  for (let i = 0; i < wahlergebnis.length; i++) {
    if (wahlergebnis[i].id == sprengel) {
      const color = farben[party];
      let colorrgb = hexToRgb(color);

      if (globalErgebnisStimmen == 0) {
        erg = Object.entries(wahlergebnis[i]);
        erg.splice(0, 4);
        const getGueltig = (acc, val) => acc + val[1];
        const ratio = wahlergebnis[i][party] / erg.reduce(getGueltig, 0);
        const maxRatio = highestPercentage[party] / 100;
        colorrgb = ratioColor(colorrgb, ratio, maxRatio);
      } else {
        const maxVotes = highestVotes[party];
        colorrgb = ratioColor(colorrgb, wahlergebnis[i][party], maxVotes);
      }

      return rgbToHex(...colorrgb);
    }
  }
}

function getTopXColor(feature, party) {
  const sprengel = parseInt(feature.properties.WAHLSPRENGEL_NR);
  let settingName = "";
  if (globalSetting === 1) {
    settingName = "p90";
  } else if (globalSetting === 2) {
    settingName = "p50";
  } else {
    settingName = "p10";
  }

  for (let i = 0; i < wahlergebnis.length; i++) {
    if (wahlergebnis[i].id == sprengel) {
      if (globalErgebnisStimmen === 0) {
        erg = Object.entries(wahlergebnis[i]);
        erg.splice(0, 4);
        const getGueltig = (acc, val) => acc + val[1];
        const ratio =
          (100 * wahlergebnis[i][party]) / erg.reduce(getGueltig, 0);
        if (ratio > percentile[party]["rel"][settingName]) return farben[party];
        else return farben["default2"];
      } else if (globalErgebnisStimmen === 1) {
        if (wahlergebnis[i][party] > percentile[party]["abs"][settingName])
          return farben[party];
        else return farben["default2"];
      }
    }
  }
}

function getVergleichColor(feature, party) {
  const sprengel = parseInt(feature.properties.WAHLSPRENGEL_NR);
  for (let i = 0; i < wahlergebnis.length; i++) {
    if (wahlergebnis[i].id == sprengel) {
      wahl2017index = -1;
      for (let j = 0; j < wahl2017.length; j++) {
        if (wahl2017[j].id == sprengel) {
          wahl2017index = j;
          break;
        }
      }

      if (wahl2017index == -1) {
        return farben["default"];
      }

      if (globalErgebnisStimmen === 1) {
        let votes17 = wahl2017[wahl2017index][party];
        if (!votes17) votes17 = 0;

        let absdiff = wahlergebnis[i][party] - wahl2017[wahl2017index][party];

        if (absdiff > 0) {
          let color = "#008000";
          let colorrgb = hexToRgb(color);
          colorrgb = ratioColor(colorrgb, absdiff, changeAbs[party].pos);
          return rgbToHex(...colorrgb);
        } else {
          let color = "#ff0000";
          let colorrgb = hexToRgb(color);
          colorrgb = ratioColor(colorrgb, -absdiff, changeAbs[party].neg);
          return rgbToHex(...colorrgb);
        }
      } else {
        let percentage17 =
          wahl2017[wahl2017index][party] / wahl2017[wahl2017index].gueltig;
        let percentage21 = wahlergebnis[i][party] / wahlergebnis[i].gueltig;
        if (!percentage17) percentage17 = 0;
        let reldiff = percentage21 - percentage17;
        if (reldiff > 0) {
          let color = "#008000";
          let colorrgb = hexToRgb(color);
          colorrgb = ratioColor(colorrgb, reldiff, changeRel[party].pos);
          return rgbToHex(...colorrgb);
        } else {
          let color = "#ff0000";
          let colorrgb = hexToRgb(color);
          colorrgb = ratioColor(colorrgb, -reldiff, changeRel[party].neg);
          return rgbToHex(...colorrgb);
        }
      }
    }
  }
}

function drawWahlbeteiligung(feature) {
  const color = getWahlbeteiligungColor(feature);
  return {
    color: lineColors[lineColorIndex],
    weight: "1",
    opacity: "1",
    fillColor: color,
    fillOpacity: transparenzSettings[transparenzIndex],
  };
}

function getWahlbeteiligungColor(feature) {
  const sprengel = parseInt(feature.properties.WAHLSPRENGEL_NR);
  for (let i = 0; i < wahlergebnis.length; i++) {
    if (wahlergebnis[i].id == sprengel) {
      const stimmen = wahlergebnis[i].ungueltig + wahlergebnis[i].gueltig;
      const wahlbeteiligung = stimmen / wahlergebnis[i].wahlberechtigt;

      const colorrgb = hexToRgb("#218644"); //33,134,68
      const color = ratioColor(colorrgb, wahlbeteiligung, 0.6);

      return rgbToHex(...color);
    }
  }
}

//helper functions
function ratioColor(colorrgb, ratio, maxRatio) {
  let relativeRatio = 1 - ratio / maxRatio;
  const diff = [255 - colorrgb[0], 255 - colorrgb[1], 255 - colorrgb[2]];

  colorrgb = [
    Math.trunc(colorrgb[0] + diff[0] * relativeRatio),
    Math.trunc(colorrgb[1] + diff[1] * relativeRatio),
    Math.trunc(colorrgb[2] + diff[2] * relativeRatio),
  ];
  return colorrgb;
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
      ]
    : null;
}
function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

/*findMaxDiff();
function findMaxDiff() {
  party = "fpoe";
  maxdiff = -1000;
  mindiff = 1000;
  for (let i = 0; i < wahlergebnis.length; i++) {
    for (let j = 0; j < wahl2017.length; j++) {
      if (wahlergebnis[i].id == wahl2017[j].id) {
        let diff = wahlergebnis[i][party] - wahl2017[j][party];
        if (diff > maxdiff) maxdiff = diff;
        if (diff < mindiff) mindiff = diff;
      }
    }
  }
  console.log(maxdiff, mindiff);
}
findMaxRelDiff();
function findMaxRelDiff() {
  party = "wir";
  maxdiff = -1000;
  mindiff = 1000;
  for (let i = 0; i < wahlergebnis.length; i++) {
    for (let j = 0; j < wahl2017.length; j++) {
      if (wahlergebnis[i].id == wahl2017[j].id) {
        let percentage17 = wahl2017[j][party] / wahl2017[j].gueltig;
        let percentage21 = wahlergebnis[i][party] / wahlergebnis[i].gueltig;

        let diff = percentage21 - percentage17;
        if (diff > maxdiff) maxdiff = diff;
        if (diff < mindiff) mindiff = diff;
      }
    }
  }
  console.log(maxdiff, mindiff);
}*/
