<template>
  <v-main app class="secondary" dark>
    <Header @searchInput="updateSearchInput($event)" />
    <router-view :searchProp="searchInput" />
  </v-main>
</template>

<script>
import Header from "@/components/Header/Header";
export default {
  name: "Home",
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
