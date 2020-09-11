<template>
  <v-card class="mx-auto my-12" app color="secondary" dark>
    <div v-if="Object.keys(showDescription).length">
      <v-row justify="center" align="center">
        <v-col cols="12" md="4" align="center">
          <v-img
            class="d-flex d-md-none"
            height="300"
            :src="showDescription.image.medium"
          ></v-img>
          <v-img
            class="d-none d-md-flex"
            height="300"
            width="300"
            :src="showDescription.image.medium"
          ></v-img>
        </v-col>
        <v-col cols="12" md="8" align="center">
          <v-card-text>
            <v-card-title class=" justify-center">{{
              showDescription.name
            }}</v-card-title>
            <v-rating
              :value="showDescription.rating.average / 2"
              color="amber"
              dense
              half-increments
              readonly
              size="14"
            ></v-rating>
            <div class="grey--text ml-4">
              <span>{{ showDescription.rating.average / 2 }} (5)</span>
            </div>
            <div class="my-2 subtitle-1">
              {{ showDescription.genres.join(",") }}
            </div>
            <div class="my-2 subtitle-1">
              {{ showDescription.language }}
            </div>
          </v-card-text>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-divider class="mx-4"></v-divider>
          <v-card-text>
            <v-card-title class="pl-0">{{ constant.DESCRIPTION }}</v-card-title>
            <span v-html="showDescription.summary"></span>
          </v-card-text>
        </v-col>
      </v-row>

      <v-divider class="mx-4"></v-divider>
      <v-row>
        <v-col cols="6">
          <v-card-title max-width="100" class="d-inline-block text-truncate">{{
            constant.SCHEDULE_AVAILABILITY
          }}</v-card-title>
          <v-breadcrumbs divider="-">
            <v-breadcrumbs-item :items="showDescription.schedule.time">
              {{ showDescription.schedule.time }}
            </v-breadcrumbs-item>
            <v-breadcrumbs-item :items="showDescription.schedule.days">
              {{ showDescription.schedule.days.join(",") }}
            </v-breadcrumbs-item>
          </v-breadcrumbs>
        </v-col>
        <v-col cols="6">
          <v-card-title>
            {{ constant.OFFICIAL_SITE }}
            <a
              class="pl-2"
              d-inline
              target="_blank"
              :href="showDescription.officialSite"
            >
              {{ showDescription.name }}
            </a>
          </v-card-title>
        </v-col>
      </v-row>
    </div>
    <div v-else>
      <show-detail-skeleton />
    </div>

    <v-row>
      <v-col cols="12">
        <v-divider class="mx-4"></v-divider>
        <v-card-title>
          {{ constant.CAST }}
        </v-card-title>

        <div v-if="!castDetails.length">
          <v-container grid-list-xs>
            <v-layout row wrap>
              <showImageSkeleton v-for="i in 5" :key="i"></showImageSkeleton>
            </v-layout>
          </v-container>
        </div>
        <div v-else>
          <v-container grid-list-xs>
            <v-layout row wrap>
              <show-cast-detail
                v-for="castDetail in castDetails"
                :key="castDetail.id + constant.CAST"
                :data="castDetail"
              />
            </v-layout>
          </v-container>
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-divider class="mx-4"></v-divider>
        <v-card-title>
          {{ constant.EPISODES }}
        </v-card-title>
        <div v-if="!episodeDetails.length">
          <v-container grid-list-xs>
            <v-layout row wrap>
              <showImageSkeleton v-for="i in 5" :key="i"></showImageSkeleton>
            </v-layout>
          </v-container>
        </div>
        <div v-else>
          <v-container grid-list-xs>
            <v-layout row wrap>
              <show-cast-detail
                v-for="episode in episodeDetails"
                :key="episode.id + constant.EPISODES"
                :data="episode"
              />
            </v-layout>
          </v-container>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { fetchData } from "@/api/fetchData.js";
import {
  TV_SHOW_DETAIL,
  SHOW_CAST_DETAIL,
  EPISODES_DETAIL
} from "@/api/apiName.js";
import showCastDetail from "@/components/ShowImage&Detail/ShowImage&Detail.vue";
import ShowDetailSkeleton from "./ShowDetail.skeleton.vue";
import showImageSkeleton from "@/components/ShowImage&Detail/ShowImage&Detail.skeleton.vue";
import { Constants } from "@/Constant/index";
export default {
  name: "ShowDetail",
  components: {
    showCastDetail,
    ShowDetailSkeleton,
    showImageSkeleton
  },
  data() {
    return {
      showDescription: {},
      castDetails: [],
      episodeDetails: [],
      constant: Constants
    };
  },
  async created() {
    const showId = this.$route.params.showId;
    if (showId) {
      await this.getShowDetails(showId);
      await this.getShowCastDetials(showId);
      await this.getEpisodes(showId);
    }
  },
  methods: {
    async getShowDetails(id) {
      const response = await fetchData({
        apiName: TV_SHOW_DETAIL,
        params: { id: id }
      });
      if (response) {
        this.showDescription = response.data;
      }
    },
    async getShowCastDetials(id) {
      const response = await fetchData({
        apiName: SHOW_CAST_DETAIL,
        params: { id: id, embed: "cast" }
      });
      if (response.data._embedded.cast) {
        const casteData = response.data["_embedded"].cast;
        const uniquePerson = [];
        const map = new Map();
        for (const item of casteData) {
          if (!map.has(item.person.id)) {
            map.set(item.person.id, true);
            uniquePerson.push(item.person);
          }
        }
        this.castDetails = uniquePerson.slice(0, 10);
      }
    },
    async getEpisodes(id) {
      const response = await fetchData({
        apiName: EPISODES_DETAIL,
        params: { id: id }
      });
      if (response.data) this.episodeDetails = response.data.slice(0, 10);
    }
  }
};
</script>
