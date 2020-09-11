<template>
  <v-sheet
    :color="`grey ${theme.isDark ? 'darken-2' : 'lighten-4'}`"
    class="px-3 pt-3 pb-3"
  >
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-skeleton-loader type="image"></v-skeleton-loader>
        </v-col>
        <v-col cols="12" md="8">
          <v-skeleton-loader type="article"></v-skeleton-loader>
        </v-col>

        <!--<v-col
          cols="12"
          md="4"
        >
          <v-skeleton-loader
            class="mb-6"
            type="list-item-avatar, divider, list-item-three-line, card-heading, image, actions"
          ></v-skeleton-loader>

          <v-skeleton-loader type="list-item-avatar-three-line, image, article"></v-skeleton-loader>
        </v-col> -->
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-skeleton-loader type="list-item-two-line"> </v-skeleton-loader>
        </v-col>
      </v-row>
    </v-container>
    <!--<v-skeleton-loader max-height="150" type="image"> </v-skeleton-loader>
      <v-skeleton-loader type="list-item-two-line"> </v-skeleton-loader>
      <v-skeleton-loader class="ml-6" type="button"> </v-skeleton-loader> -->
  </v-sheet>
</template>

<script>
export default {
  name: "ShowDetailSkeleton",
  inject: ["theme"]
};
</script>
