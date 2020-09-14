import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/components/Home.vue";
import TvShowList from "@/components/TvShowList/TvShowList.vue";
import ShowDetail from "@/components/ShowDetail/ShowDetail.vue";
import PageNotFound from "@/components/PageNotFound";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "Home"
    },
    children: [
      {
        path: "/",
        component: TvShowList,
        meta: {
          title: "Tv Show"
        }
      },
      {
        path: ":showName/:showId",
        component: ShowDetail,
        name: "showDetail",
        meta: {
          title: "Show Detail"
        }
      }
    ]
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

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.afterEach(to => {
  document.title = to.meta.title || "Home";
});

export default router;
