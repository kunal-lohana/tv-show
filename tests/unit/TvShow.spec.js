import { shallowMount, mount, config, createLocalVue } from "@vue/test-utils";
import TvShowComp from "../../src/components/TvShow/TvShow.vue";
import { homeShows } from "./testingData";
import Vuetify from "vuetify";
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/components/Home";

config.showDeprecationWarnings = false;
Vue.config.slient = false;
describe("Tv Show Component", () => {
  const show = homeShows;
  const routes = [
    {
      path: "/",
      name: "Home",
      component: Home
    }
  ];
  const router = new VueRouter({
    routes
  });
  let wrapper;
  let localVue = createLocalVue();
  localVue.use(VueRouter);
  Vue.use(Vuetify);
  wrapper = shallowMount(TvShowComp, {
    propsData: {
      showData: show
    }
  });

  it("display TvShow name", () => {
    const name = wrapper.find("#data-test-tvshow-name").text();
    expect(name).toBe("Cops");
  });

  it("Display Rating", () => {
    const rating = wrapper.find("#data-test-tv-rating");
    expect(rating.text()).toEqual(homeShows.rating.average.toString());
  });
  it("Display Language", () => {
    const language = wrapper.find("#data-test-tv-language");
    expect(language.text()).toEqual(`, ${homeShows.language}`);
  });

  it("display genre when it is not belong to genre category", async () => {
    await wrapper.setProps({ showGenre: true });
    const genre = await wrapper.find("#data-test-tv-genre").text();
    expect(genre).toEqual(homeShows.genres.join(","));
  });

  it("Doesn not display genre when it is belong to genre category", async () => {
    await wrapper.setProps({ showGenre: false });
    const genre = wrapper.find("#data-test-tv-genre");
    expect(genre.exists()).toBeFalsy();
  });
  it("call showDetail when Show Detail button clicked", async () => {
    const showDetail = jest.spyOn(TvShowComp.methods, "showDetail");
    // const localThis = {$route}
    const wrapper = mount(TvShowComp, {
      localVue,
      router,
      propsData: {
        showData: show
      }
    });
    wrapper.find(".tvshow-detail-btn").trigger("click");
    expect(wrapper.find(".tvshow-detail-btn").text()).toContain("Show Detail");
    expect(showDetail).toHaveBeenCalled();
  });
});
