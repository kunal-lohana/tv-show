<template>
  <v-main app class="secondary" dark>
    <v-container grid-list-xs class="mt-5">
      <v-row>
        <v-col cols="12">
          <h1
            class="text-center font-weight-white white--text"
            data-test="constant-errorcode"
          >
            {{ constant.ERROR_CODE }}
          </h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <h1
            class="text-center font-weight-white white--text"
            data-test="constant-pagenotfound"
          >
            {{ constant.PAGE_NOT_FOUND }}
          </h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" align="center">
          <div class="pa-2">
            <v-btn x-large color="info" data-test="page-btn">
              <router-link
                text
                class="text-decoration-none"
                color="secondary"
                :to="{
                  path: '/'
                }"
              >
                {{ constant.HOME_PAGE }}
              </router-link>
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { Constants } from "@/Constant/index.js";
export default {
  name: "PageNotFound",
  data() {
    return {
      constant: Constants
    };
  }
};
</script>
