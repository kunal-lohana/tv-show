<template>
  <v-card class="mx-auto my-12" app color="secondary" dark>
    <div v-if="loading">
      <show-detail-skeleton />
    </div>
    <div v-else-if="!loading">
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
          <v-card-title class="d-inline-block text-truncate"
            >{{ constant.SCHEDULE_AVAILABILITY }}
          </v-card-title>
          <v-breadcrumbs divider="-">
            <v-breadcrumbs-item :items="showDescription.schedule.time">
              {{ showDescription.schedule.time }}
            </v-breadcrumbs-item>
            <v-breadcrumbs-item :items="showDescription.schedule.days">
              {{ showDescription.schedule.days.join(",") }}
            </v-breadcrumbs-item>
          </v-breadcrumbs>
        </v-col>
        <v-divider class="my-4" inset vertical></v-divider>

        <v-col cols="5">
          <v-card-title>
            {{ constant.OFFICIAL_SITE }}
          </v-card-title>
          <v-card-actions class="pa-4 ">
            <a
              class="pl-2"
              d-inline
              target="_blank"
              :href="showDescription.officialSite"
            >
              {{ showDescription.name }}
            </a>
          </v-card-actions>
        </v-col>
      </v-row>
    </div>

    <v-row>
      <v-col cols="12">
        <v-divider class="mx-4"></v-divider>
        <v-card-title>
          {{ constant.CAST }}
        </v-card-title>

        <div v-if="loading">
          <v-container grid-list-xs>
            <v-layout row wrap>
              <showImageSkeleton v-for="i in 5" :key="i"></showImageSkeleton>
            </v-layout>
          </v-container>
        </div>
        <div v-else-if="castDetails.length">
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
        <div v-if="loading">
          <v-container grid-list-xs>
            <v-layout row wrap>
              <showImageSkeleton v-for="i in 5" :key="i"></showImageSkeleton>
            </v-layout>
          </v-container>
        </div>
        <div v-else-if="episodeDetails.length">
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
import { TV_SHOW_DETAIL } from "@/api/apiName.js";
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
      constant: Constants,
      loading: false
    };
  },
  async created() {
    const showId = this.$route.params.showId;
    if (showId) {
      await this.getShowDetails(showId);
    }
  },
  methods: {
    async getShowDetails(id) {
      this.loading = true;
      try {
        const response = await fetchData({
          apiName: TV_SHOW_DETAIL,
          params: { id: id }
        });

        if (response && response.data) {
          this.showDescription = response.data;
          this.castDetails =
            (await this.validateCasteDetails(response.data._embedded.cast)) ||
            [];
          this.episodeDetails =
            response.data._embedded.episodes.slice(0, 10) || [];
          this.loading = false;
        } else {
          this.$router.push({ name: "PageNotFound" });
        }
      } catch (error) {
        console.log("Network Error:", error);
        this.$router.push({ name: "PageNotFound" });
      }
    },
    validateCasteDetails(caste) {
      if (caste && caste.length) {
        const uniquePerson = [];
        const map = new Map();
        for (const item of caste) {
          if (!map.has(item.person.id)) {
            map.set(item.person.id, true);
            uniquePerson.push(item.person);
          }
        }
        return uniquePerson.slice(0, 10);
      }
      return [];
    }
  }
};
</script>
