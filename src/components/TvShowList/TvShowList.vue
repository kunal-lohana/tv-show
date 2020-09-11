<template>
  <div class="tv-show-list">
    <show-slide-image-skeleton v-if="!imageData.length" />
    <show-slide-image v-else :showImage="imageData" />
    <v-container grid-list-xs>
      <div v-if="!currentPageData.length">
        <v-layout row wrap>
          <tv-show-skeleton v-for="i in 10" :key="i" />
        </v-layout>
      </div>
      <v-layout row wrap v-else>
        <TvShow
          v-for="data in currentPageData"
          :key="data.id"
          :showData="data"
        />
      </v-layout>

      <div v-if="!genres.length">
        <div id="tv-show-skeleton-card" v-for="i in 5" :key="i">
          <v-divider class="mx-4 mt-5"></v-divider>
          <v-layout row wrap>
            <tv-show-skeleton v-for="i in 5" :key="i" />
          </v-layout>
        </div>
      </div>
      <div v-else>
        <div v-for="genre in genres" :key="genre" class="genre-list">
          <v-divider class="mx-4 mt-3"></v-divider>
          <v-card-title>{{ genre }}</v-card-title>
          <v-layout row wrap>
            <TvShow
              v-for="data in getGenresSel(genre)"
              :key="data.id"
              :showData="data"
              :showGenre="Boolean(false)"
            />
          </v-layout>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
import { fetchData } from "@/api/fetchData.js";
import { TV_SHOW_List } from "@/api/apiName.js";
import ShowSlideImage from "@/components/ShowSlideImage/ShowSlideImage";
import ShowSlideImageSkeleton from "@/components/ShowSlideImage/ShowSlideImage.skeleton.vue";
import TvShow from "@/components/TvShow/TvShow";
import TvShowSkeleton from "@/components/TvShow/TvShow.skeleton.vue";
export default {
  name: "TVShowList",
  components: {
    TvShow,
    ShowSlideImage,
    ShowSlideImageSkeleton,
    TvShowSkeleton
  },
  data() {
    return {
      showData: [],
      currentPageData: [],
      skeletionCount: 7,
      genresCategory: []
    };
  },
  computed: {
    imageData() {
      const imageData = this.currentPageData.slice(0, 7);
      return imageData.map(data => data.image.medium) || [];
    },
    genres() {
      return (
        this.currentPageData.reduce((acc, data) => {
          return [...new Set(Array.prototype.concat(acc, data.genres))];
        }, []) || []
      );
    }
  },
  created() {
    this.handleSelect();
  },
  methods: {
    async handleSelect() {
      const response = await fetchData({
        apiName: TV_SHOW_List
      });
      if (response) {
        this.showData = response.data.slice(0, 10);
        this.currentPageData = this.showData.sort(({rating : r1}, {rating: r2}) => {
          return r2.average -r1.average;
        }
        );
      }
    },
    getGenresSel(genre) {
      if (genre && this.currentPageData.length)
        return (
          this.currentPageData.filter(data => data.genres.includes(genre)) || []
        );
    }
  }
};
</script>

<style lang="scss" scoped>
.genre-list {
  .v-divider {
    border-width: 2px;
  }
}
</style>