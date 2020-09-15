<template>
  <v-flex xs6 sm4 md3 lg3 class="pa-4">
    <v-card class="tv_show_card" app color="secondary" dark width="200">
      <v-img
        height="200"
        :src="showData.image.medium"
        class="white--text align-end"
      >
        <v-card-title id="data-test-tvshow-name">{{
          showData.name
        }}</v-card-title>
      </v-img>
      <div>
        <v-card-text :class="['pa-2', { show_genre: showGenre }]">
          <p
            class="text-break card-genre"
            id="data-test-tv-genre"
            v-if="showGenre"
          >
            {{ showData.genres.join(",") }}
          </p>
          <div>
            <v-icon color="amber">mdi-star</v-icon> |
            <span class="pr-1" id="data-test-tv-rating">{{
              showData.rating.average
            }}</span>
            <span class="pr-1" id="data-test-tv-language"
              >, {{ showData.language }}</span
            >
            <span class="pr-1">, {{ showData.premiered.split("-")[0] }}</span>
          </div>
        </v-card-text>
      </div>
      <v-card-actions class="justify-center">
        <v-btn class="tvshow-detail-btn" text @click="showDetail(showData)">
          {{ constant.SHOW_DETAILS_BTN }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>

<script>
import { Constants } from "@/Constant/index";
export default {
  name: "TVShow",
  props: {
    showData: {
      type: [Array, Object],
      default() {
        return {};
      }
    },
    showGenre: {
      type: Boolean,
      default: true,
      required: false
    }
  },
  data() {
    return {
      constant: Constants
    };
  },
  methods: {
    showDetail(data) {
      const { name, id } = data;
      this.$route.params.showName = name;
      this.$route.params.showid = Number(id);
      this.$router.push(`/${name}/${id}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.tv_show_card {
  .show_genre {
    height: 105px;
  }
  .card-genre {
    min-height: 7vh;
    max-width: 80vw;
  }
}
.rating {
  color: "#ffff008f !important";
}
</style>
