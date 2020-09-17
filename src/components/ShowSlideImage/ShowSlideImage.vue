<template>
  <v-carousel cycle height="300" hide-delimiter-background show-arrows-on-hover>
    <v-carousel-item v-for="data in showImage" :key="data.id">
      <router-link
        text
        class="text-decoration-none"
        color="secondary"
        :to="{
          name: 'showDetail',
          params: { showId: data.id }
        }"
      >
        <v-sheet height="100%">
          <v-row class="fill-height" align="center" justify="center">
            <v-img
              :src="data.image"
              data-test="show-slide-image"
              class="white--text align-end"
            ></v-img>
          </v-row>
        </v-sheet>
      </router-link>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  name: "showSlideImage",
  props: {
    showImage: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>
