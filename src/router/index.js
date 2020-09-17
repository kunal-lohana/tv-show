import Vue from "vue";
import VueRouter from "vue-router";
import TvShowList from "@/components/TvShowList/TvShowList.vue";
import ShowDetail from "@/components/ShowDetail/ShowDetail.vue";
import PageNotFound from "@/components/PageNotFound";

Vue.use(VueRouter);

export const routes = [
  {
    path: "/",
    component: TvShowList,
    meta: {
      title: "Tv Show"
    }
  },
  {
    path: "/:showId",
    component: ShowDetail,
    name: "showDetail",
    meta: {
      title: "Show Detail"
    }
  },
  {
    path: "*",
    name: "PageNotFound",
    component: PageNotFound,
    meta: {
      title: "Page-not-found"
    }
  }
];

export const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.afterEach(to => {
  document.title = to.meta.title || "Home";
});
