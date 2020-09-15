<template>
  <div class="tv-show-list">
    <show-slide-image-skeleton v-if="!imageData.length" />
    <show-slide-image v-else :showImage="imageData" />
    <v-container grid-list-xs>
      <div v-if="!currentPageData.length">
        <v-layout row wrap>
          <tv-show-skeleton v-for="i in 10" :key="i" />
        </v-layout>
        <div id="tv-show-skeleton-card" v-for="i in 5" :key="i">
          <v-divider class="mx-4 mt-5"></v-divider>
          <v-layout row wrap>
            <tv-show-skeleton v-for="i in 5" :key="i" />
          </v-layout>
        </div>
      </div>
      <v-layout row wrap v-else>
        <TvShow
          v-for="data in currentPageData"
          :key="data.id"
          :showData="data"
        />
      </v-layout>

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
  props: {
    searchProp: {
      type: [Array, Object],
      default() {
        return [];
      },
      required: false
    }
  },
  data() {
    return {
      showData: [],
      currentPageData: [],
      genresCategory: [],
      imageData: []
    };
  },
  computed: {
    genres() {
      if (this.currentPageData.length) {
        return this.currentPageData.reduce((acc, data) => {
          return [...new Set(Array.prototype.concat(acc, data.genres))];
        }, []);
      } else return [];
    }
  },
  watch: {
    searchProp(newVal, oldVal) {
      if (newVal.length && newVal != oldVal) {
        this.imageData = [];
        this.currentPageData = this.validateImage(newVal);
      }
    },
    currentPageData(newVal, oldVal) {
      if (newVal.length && newVal != oldVal) {
        const imageData = this.currentPageData.slice(0, 7);
        const filterData = this.validateImage(imageData);
        this.imageData = filterData.map(el => ({
          image: el.image.medium,
          id: el.id
        }));
      }
    }
  },
  async created() {
    await this.getShowData();
  },
  methods: {
    async getShowData() {
      const response = await fetchData({
        apiName: TV_SHOW_List
      });
      if (response && response.data) {
        this.showData = response.data.slice(0, 10);
        this.currentPageData = this.showData.sort(
          ({ rating: r1 }, { rating: r2 }) => {
            return r2.average - r1.average;
          }
        );
      }
    },
    getGenresSel(genre) {
      if (genre && this.currentPageData && this.currentPageData.length) {
        return (
          this.currentPageData.filter(data => data.genres.includes(genre)) || []
        );
      }
      return [];
    },
    validateImage(data) {
      return data.filter(ele => ele.image && ele.image.medium);
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
