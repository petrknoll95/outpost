<template>
  <div ref="mapContainer" class="map-container"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const mapContainer = ref(null);
const map = ref(null);
const marker = ref(null);
const initialZoom = 12;

// Default center coordinates (can be customized via props)
const props = defineProps({
  center: {
    type: Array,
    default: () => [-74.5, 40], // Default to New York
  },
  zoom: {
    type: Number,
    default: initialZoom,
  },
  style: {
    type: [String, Object],
    default: 'https://demotiles.maplibre.org/style.json', // Default free style
  },
  markerWidth: {
    type: Number,
    default: 80,
  },
  markerHeight: {
    type: Number,
    default: 80,
  },
  markerLink: {
    type: String,
    default: 'https://www.google.com/maps/place/1001+N+North+Branch+St,+Chicago,+IL+60642/'
  }
});

onMounted(() => {
  if (mapContainer.value) {
    map.value = new maplibregl.Map({
      container: mapContainer.value,
      style: props.style,
      center: props.center,
      zoom: props.zoom,
      attributionControl: false,
      cooperativeGestures: false // Disable cooperative gestures to remove the overlay
    });
    
    // Add the custom marker when the map loads
    map.value.on('load', () => {
      addCustomMarker();
    });
  }
});

const addCustomMarker = () => {
  if (!map.value) return;
  
  // Create a DOM element for the marker
  const el = document.createElement('div');
  el.className = 'marker';
  el.style.backgroundImage = 'url(/images/icons/pin.svg)';
  el.style.width = `${props.markerWidth}px`;
  el.style.height = `${props.markerHeight}px`;
  el.style.backgroundSize = 'contain';
  el.style.backgroundPosition = 'center';
  el.style.backgroundRepeat = 'no-repeat';
  
  // Add click event to open Google Maps
  el.addEventListener('click', () => {
    window.open(props.markerLink, '_blank');
  });
  
  // Add marker to map
  marker.value = new maplibregl.Marker({
    element: el,
    anchor: 'center'
  })
    .setLngLat(props.center)
    .addTo(map.value);
};

onUnmounted(() => {
  if (marker.value) {
    marker.value.remove();
  }
  if (map.value) {
    map.value.remove();
  }
});

// Expose the map instance for parent components
defineExpose({
  getMap: () => map.value
});
</script>

<style>
.map-container {
  width: 100%;
  height: 100%;
  min-height: 400px;
}

.marker {
  display: block;
  cursor: pointer;
  padding: 0;
}

/* Hide the MapLibre logo */
.maplibregl-ctrl-logo {
  display: none !important;
}

/* Hide the cooperative gestures overlay */
.maplibregl-ctrl-cooperative-gestures-instructions {
  display: none !important;
}
</style> 