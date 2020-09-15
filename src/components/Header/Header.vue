<template>
  <v-app-bar app color="secondary" dark>
    <div class="d-flex align-center">
      <v-icon @click="$route.path != '/' ? $router.push('/') : true"
        >mdi-home</v-icon
      >
      <v-img
        alt="Tvm Logo"
        class="shrink ml-3"
        contain
        :src="require('@/assets/tvm-header-logo.png')"
        transition="scale-transition"
        width="40"
      />
    </div>

    <v-spacer></v-spacer>
    <v-container>
      <v-row class="justify-end">
        <v-col cols="8">
          <v-text-field
            max-width="50"
            name="search"
            label="Search..."
            v-model="searchInput"
            clearable
            prepend-inner-icon="mdi-magnify"
            @keyup.enter="getSearchQuery()"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script>
import { fetchData } from "@/api/fetchData.js";
import { SEARCH_SHOW } from "@/api/apiName.js";
export default {
  name: "Header",
  data() {
    return {
      searchInput: "",
      searchedData: []
    };
  },
  methods: {
    async getSearchQuery() {
      if (this.searchInput) {
        const response = await fetchData({
          apiName: SEARCH_SHOW,
          params: { query: this.searchInput }
        });
        if (response.data.length) {
          this.searchedData = response.data;
          this.$emit("searchInput", this.searchedData);
          this.searchInput="";
        }
      }
    }
  }
};
</script>
