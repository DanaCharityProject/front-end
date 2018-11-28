<template>
  <div class="dashboard">
    <Map />

    <v-fade-transition>
      <v-layout
        row
        v-if="!messageDismissed"
      >
        <v-flex
          xs10
          offset-xs1
          mt-5
        >
          <v-card>
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">Welcome to Dana!</h3>
                <div>Dana is a platform to promote community awareness of local charities and provide a system to easily give back to them.</div>
              </div>
            </v-card-title>

            <v-card-actions>
              <v-btn
                flat
                color="orange"
                @click="messageDismissed = true"
              >Explore</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-fade-transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Map from '@/components/Map.vue';

@Component({
  components: {
    Map,
  },
})
export default class Dashboard extends Vue {
  private messageDismissed: boolean = false;
}
</script>

<style>
.dashboard {
  padding: 0;
  height: 100%;
}
</style>

