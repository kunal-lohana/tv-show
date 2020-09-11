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

    <v-text-field
      name="search"
      label="Search..."
      v-model="searchInput"
      clearable
      prepend-inner-icon="mdi-magnify"
    ></v-text-field>
  </v-app-bar>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      searchInput: ""
    };
  }
};
</script>
