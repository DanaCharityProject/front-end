<template>
  <div class="map">
    <div id="leaflet-map"></div>

    <v-fab-transition>
      <v-btn
        color="primary"
        fab
        fixed
        bottom
        right
      >
        <v-icon>my_location</v-icon>
      </v-btn>
    </v-fab-transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import L from 'leaflet';

@Component({})
export default class Map extends Vue {
  private map: any;
  private accessToken: string =
    'pk.eyJ1IjoiZGFuYXRlc3QiLCJhIjoiY2ppbmcxaXB6MGIwNDNrbzc0cWQzb2d4cSJ9.hqahFzlxsbPWRbnuCFU8xg';
  private lat: number = 51.505;
  private lng: number = -0.09;

  private mounted() {
    this.map = L.map('leaflet-map', {
      zoomControl: false,
    })
      .setView([this.lat, this.lng], 14)
      .setZoom(14);

    L.tileLayer(
      'https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token=' +
        this.accessToken,
      {
        maxZoom: 20,
      },
    ).addTo(this.map);
  }
}
</script>


<style>
.map {
  position: absolute;
  height: 100%;
  width: 100vw;
  z-index: 0;
}

#leaflet-map {
  position: absolute;
  height: 100%;
  width: 100vw;
  z-index: 0;
}
</style>