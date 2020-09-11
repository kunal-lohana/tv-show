<template>
  <v-flex xs6 sm4 md3 lg3 class="pa-4">
    <v-sheet
      :color="`grey ${theme.isDark ? 'darken-2' : 'lighten-4'}`"
      class="px-3 pt-3 pb-3"
    >
      <v-skeleton-loader max-height="150" type="image"> </v-skeleton-loader>
      <v-skeleton-loader type="list-item-two-line"> </v-skeleton-loader>
      <v-skeleton-loader class="ml-6" type="button"> </v-skeleton-loader>
    </v-sheet>
  </v-flex>
</template>

<script>
export default {
  name: "TVShowSkeletion",
  inject: ["theme"]
};
</script>
