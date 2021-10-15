//TODO
//Transparenz
//bezirksgrenzen
//grenzen farbe

const parteien = ["oevp", "spoe", "fpoe", "gruene", "kpoe", "neos"];

let globalClusterCount = 2; //2-6
const clusterColors = {
  0: "#e6194B", //rot
  1: "#3cb44b", //grün
  2: "#4363d8", //blau
  3: "#ffe119", //gelb
  4: "#911eb4", //violett
  5: "#42d4f4", //türkis
  6: "#f58231",
  7: "#ff82f6",
  8: "#000075",
  9: "#a9a9a9",
};

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
const btnWard = document.querySelector(".ward");
const btnKmeans = document.querySelector(".kmeans");

let inputClusterCount = document.querySelector(".clustercount");
inputClusterCount.value = 2;
//bottom buttons
const transparenz = document.querySelector(".transparenz");
const linecolor = document.querySelector(".line-color");
const bezirksgrentenBtn = document.querySelector(".bezirke-grenzen");
const hintergrundBtn = document.querySelector(".hintergrund");
const kleinparteienBtn = document.querySelector(".kleinparteien");

const clusterTableDiv = document.querySelector(".cluster-table");

inputClusterCount.addEventListener("input", () => {
  if (isNaN(inputClusterCount.value)) inputClusterCount.value = 2;
  if (inputClusterCount.value > 10) inputClusterCount.value = 10;
  else if (inputClusterCount.value < 2) inputClusterCount.value = 2;
  globalClusterCount = inputClusterCount.value;
  drawAll();
});

transparenz.addEventListener("click", () => {
  transparenzIndex = (transparenzIndex + 1) % transparenzSettings.length;
  drawAll();
});

linecolor.addEventListener("click", () => {
  lineColorIndex = (lineColorIndex + 1) % lineColors.length;
  drawAll();
});

bezirksgrentenBtn.addEventListener("click", () => {
  bezirksGrenzenEnabled = !bezirksGrenzenEnabled;
  drawAll();
});

hintergrundBtn.addEventListener("click", () => {
  hintergrund = !hintergrund;
  drawAll();
});

const buttons = [btnWard, btnKmeans];

// Creating map options
var mapOptions = {
  center: [47.073, 15.441],
  zoom: 12.3,
  wheelPxPerZoomLevel: 400,
  zoomSnap: 0.01,
};

// Creating a map object
var map = new L.map("map", mapOptions);
map.doubleClickZoom.disable();
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

drawAll();

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

function drawAll() {
  drawMap();
}

function drawMap() {
  geoJsonLayer.setStyle(drawCluster);
  bezirkeLayer.setStyle(drawBezirke);
  getClusterStats();
  if (hintergrund) layer.setOpacity(1);
  else layer.setOpacity(0);
}

function drawCluster(feature) {
  const clusterDataName = "ac_cluster" + globalClusterCount;
  const clusterData = eval(clusterDataName);
  const color = getClusterColor(feature, clusterData);
  return {
    color: lineColors[lineColorIndex],
    weight: "1",
    opacity: "1",
    fillColor: color,
    fillOpacity: transparenzSettings[transparenzIndex],
  };
}

function getClusterColor(feature, clusterData) {
  const sprengel = parseInt(feature.properties.WAHLSPRENGEL_NR);
  for (let i = 0; i < clusterData.clusteringResults.length; i++) {
    spr = clusterData.clusteringResults[i].sprengel;
    cluster = clusterData.clusteringResults[i].cluster;
    if (spr == sprengel) {
      return clusterColors[cluster];
    }
  }
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

function getClusterStats() {
  const clusterDataName = "ac_cluster" + globalClusterCount;
  const cluster_data = eval(clusterDataName);

  //für jeden cluster ausführen
  let clusterStats = [];
  for (let i = 0; i < globalClusterCount; i++) {
    clusterStats.push({
      wahlbeteiligung: 0,
      wahlberechtigte: 0,
      oevp: 0,
      fpoe: 0,
      spoe: 0,
      gruene: 0,
      kpoe: 0,
      neos: 0,
    });
    let cmax = {
      wahlbeteiligung: 0,
      oevp: 0,
      fpoe: 0,
      spoe: 0,
      gruene: 0,
      kpoe: 0,
      neos: 0,
    };
    let cmin = {
      wahlbeteiligung: 0,
      oevp: 100,
      fpoe: 100,
      spoe: 100,
      gruene: 100,
      kpoe: 100,
      neos: 100,
    };
    let csum = {
      wahlbeteiligung: 0,
      oevp: 0,
      fpoe: 0,
      spoe: 0,
      gruene: 0,
      kpoe: 0,
      neos: 0,
    };
    let count = 0;
    let wahlberechtigte = 0;
    //alle einträge der clusterdaten durchsuchen
    for (let sc = 0; sc < cluster_data.clusteringResults.length; sc++) {
      //wenn im aktuellen cluster
      if (cluster_data.clusteringResults[sc].cluster == i) {
        count++;
        //dazugehöriges wahlergebnis finden
        for (let se = 0; se < wahlergebnis.length; se++) {
          if (
            wahlergebnis[se].id == cluster_data.clusteringResults[sc].sprengel
          ) {
            wahlberechtigte += wahlergebnis[se].wahlberechtigt;

            let wahlbet =
              (wahlergebnis[se].gueltig + wahlergebnis[se].ungueltig) /
              wahlergebnis[se].wahlberechtigt;
            csum["wahlbeteiligung"] += wahlbet;
            cmax["wahlbeteiligung"] =
              cmax["wahlbeteiligung"] < wahlbet
                ? wahlbet
                : cmax["wahlbeteiligung"];
            cmin["wahlbeteiligung"] =
              cmin["wahlbeteiligung"] > wahlbet
                ? wahlbet
                : cmin["wahlbeteiligung"];

            //alle parteien durcharbeiten
            for (let pi = 0; pi < parteien.length; pi++) {
              let ergebnis =
                wahlergebnis[se][parteien[pi]] /
                (wahlergebnis[se].gueltig + wahlergebnis[se].ungueltig);
              let partei = parteien[pi];
              csum[partei] += ergebnis;
              cmax[partei] = cmax[partei] < ergebnis ? ergebnis : cmax[partei];
              cmin[partei] = cmin[partei] > ergebnis ? ergebnis : cmin[partei];
            }

            break;
          }
        }
      }
    }
    let wavg = csum["wahlbeteiligung"] / count;
    let wmax = cmax["wahlbeteiligung"];
    let wmin = cmin["wahlbeteiligung"];
    wavg = Math.trunc(wavg * 100) / 1;
    wmax = Math.trunc(wmax * 100) / 1;
    wmin = Math.trunc(wmin * 100) / 1;
    clusterStats[i]["wahlbeteiligung"] = {
      avg: wavg,
      min: wmin,
      max: wmax,
    };

    for (let pi2 = 0; pi2 < parteien.length; pi2++) {
      let partei = parteien[pi2];
      let avg = csum[partei] / count;
      let max = cmax[partei];
      let min = cmin[partei];
      avg = Math.trunc(avg * 100) / 1;
      max = Math.trunc(max * 100) / 1;
      min = Math.trunc(min * 100) / 1;
      clusterStats[i][partei] = {
        name: namen[partei],
        avg: avg,
        min: min,
        max: max,
      };
    }
    clusterStats[i].wahlberechtigte = wahlberechtigte;
  }
  drawClusterTable(clusterStats);
}

function drawClusterTable(clusterStats) {
  content = `<table>
  <tr>
  <th>Cluster</th>`;

  for (let p = 0; p < parteien.length; p++) {
    content += `<th>${namen[parteien[p]]}</th>`;
  }
  content += `<th>Wahlbeteiligung</th>`;
  content += `<th>Wahlberechtigte</th>`;
  content += `</tr>`;

  for (let c = 0; c < clusterStats.length; c++) {
    content += `<tr>`;
    content += `<td style="background-color:${clusterColors[c]}"></td>`;

    for (let p = 0; p < parteien.length; p++) {
      content += `<td>
        <span class="table-entry top-line" >${clusterStats[c][parteien[p]].avg}%
        </span>
        <span class="table-entry bottom-line" >${
          clusterStats[c][parteien[p]].min
        }%-${clusterStats[c][parteien[p]].max}%
        </span> 
      </td>`;
    }

    content += `<td>${clusterStats[c].wahlbeteiligung.avg}%</td>`;
    content += `<td>${clusterStats[c].wahlberechtigte}</td>`;

    content += `</tr>`;
  }

  clusterTableDiv.innerHTML = content;
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
