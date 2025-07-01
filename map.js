const szer = 2288;
const wys = 1118;
const bounds = [[0, 0], [wys, szer]];

const map = L.map('map', {
  crs: L.CRS.Simple,
  minZoom: -0.3,
  maxZoom: 1.5,
  maxBounds: bounds,
  zoomSnap: 0.1,
  zoomDelta: 0.25,
}).setView([wys / 2, szer / 2], 0);

// Piętro 1 i Piętro 2
const pietro1 = L.imageOverlay('assets/mapa-szkoly4.2.png', bounds);
const pietro2 = L.imageOverlay('assets/pietro2.png', bounds);

// Start na pietro 1
pietro1.addTo(map);

const baseLayers = {
  "Piętro 1": pietro1,
  "Piętro 2": pietro2,
};

L.control.layers(baseLayers).addTo(map);

// Ikony
const ballIcon = L.icon({
  iconUrl: 'assets/ball.png',
  iconSize: [32, 32],
  iconAnchor: [16, 16], // środek ikony
  popupAnchor: [0, -16],
});

const carIcon = L.icon({
  iconUrl: 'assets/car.png',
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16],
});

// Markery z custom ikonami i twoimi współrzędnymi
const markers = {
  A: L.marker([245, 1245]).addTo(map).bindPopup("Budynek A"),
  B: L.marker([220, 1580]).addTo(map).bindPopup("Budynek B"),
  C: L.marker([820, 1082]).addTo(map).bindPopup("Budynek C"),
  Boisko: L.marker([545, 1532], { icon: ballIcon }).addTo(map).bindPopup("Tartan"),
  Hala_C: L.marker([838, 796], { icon: carIcon }).addTo(map).bindPopup("Hala przy budynku C"),
  Parking_B: L.marker([505, 1915], { icon: carIcon }).addTo(map).bindPopup("Parking przy budynku B"),
  Parking_C: L.marker([690, 792], { icon: carIcon }).addTo(map).bindPopup("Parking przy budynku C"),
};



// Polygon - prosty budynek (przykład)
const budynekCoords = [
  [675, 1813], // lewy górny róg
  [360, 1796], // lewy dolny róg
  [343, 2008], // prawy dolny róg
  [665, 2021], // prawy górny róg
];

const budynek = L.polygon(budynekCoords, {
  color: 'blue',
  fillColor: '#3388ff',
  fillOpacity: 0.5,
}).addTo(map).bindPopup("Parking przy budynku B");


const budynekB = [
  [626, 1420], // lewy górny róg
  [498, 1414], // lewy dolny róg
  [485, 1642], // prawy dolny róg
  [608, 1653], // prawy górny róg
];

const budynekB_ustawienia = L.polygon(budynekB, {
  color: 'blue',
  fillColor: '#3388ff',
  fillOpacity: 0.5,
}).addTo(map).bindPopup("Budynek B");

let highlightedPolygon = null;

function resetPolygonStyle(polygon) {
  polygon.setStyle({ color: 'blue', fillOpacity: 0.5 });
}

// Podświetlenie polygonu po kliknięciu i resetowanie poprzedniego
budynek.on('click', function(e) {
  if (highlightedPolygon && highlightedPolygon !== budynek) {
    resetPolygonStyle(highlightedPolygon);
  }

  this.setStyle({ color: 'red', fillOpacity: 0.8 });
  this.openPopup();

  highlightedPolygon = this;

  e.originalEvent.stopPropagation(); // żeby kliknięcie na polygon nie wywołało eventu mapy
});

// Reset podświetlenia po kliknięciu gdziekolwiek indziej na mapie
map.on('click', function() {
  if (highlightedPolygon) {
    resetPolygonStyle(highlightedPolygon);
    highlightedPolygon = null;
  }
});

// Logowanie współrzędnych kliknięcia w konsoli
map.on('click', function(e) {
  const { lat, lng } = e.latlng;
  console.log(`Kliknięto na współrzędne: [${lat.toFixed(2)}, ${lng.toFixed(2)}]`);
});
