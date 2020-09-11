<template>
  <v-main app class="secondary" dark>
    <Header />
    <router-view />
  </v-main>
</template>

<script>
import Header from "@/components/Header/Header";
export default {
  name: "Home",
  components: { Header }
};
</script>
