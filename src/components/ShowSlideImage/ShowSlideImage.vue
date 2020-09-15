<template>
  <v-carousel cycle height="300" hide-delimiter-background show-arrows-on-hover>
    <v-carousel-item v-for="data in showImage" :key="data.id">
      <v-sheet height="100%">
        <v-row class="fill-height" align="center" justify="center">
          <v-img :src="data.image" class="white--text align-end"></v-img>
        </v-row>
      </v-sheet>
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
