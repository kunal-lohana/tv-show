<template>
  <v-flex xs6 sm4 md3 lg3 class="pa-4" v-if="data">
    <v-card app color="secondary" dark width="200">
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-img
            v-bind="attrs"
            v-on="on"
            height="200"
            :src="data.image.medium"
            data-test="show-slide-image"
            class="white--text align-end"
          >
            <v-card-title>{{ data.name }}</v-card-title>
          </v-img>
        </template>
        <span v-html="data.summary"></span>
      </v-tooltip>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  name: "showImage",
  props: {
    data: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>
>
