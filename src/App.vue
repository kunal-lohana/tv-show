<template>
  <v-app>
    <v-main app class="secondary" dark>
      <Header @searchInput="updateSearchInput($event)" />
      <router-view :searchProp="searchInput" />
    </v-main>
  </v-app>
</template>

<script>
import Header from "@/components/Header/Header";
export default {
  name: "App",
  components: { Header },
  data() {
    return {
      searchInput: []
    };
  },
  methods: {
    updateSearchInput(searchResponse) {
      if (searchResponse && searchResponse.length) {
        this.searchInput = searchResponse.map(data => data.show);
      }
    }
  }
};
</script>
