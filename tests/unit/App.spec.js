import { shallowMount, config, createLocalVue } from "@vue/test-utils";
import { searchData } from "./testingData";
import Vuetify from "vuetify";
import Vue from "vue";
import VueRouter from "vue-router";
import AppComponent from "../../src/App.vue";
import { routes } from "@/router/index";

config.showDeprecationWarnings = false;
Vue.config.slient = false;

describe("App Component ", () => {
  let localVue = createLocalVue();
  localVue.use(VueRouter);
  Vue.use(Vuetify);
  let vuetify;
  const router = new VueRouter({
    routes
  });
  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it("should match snapshot", () => {
    const wrapper = shallowMount(AppComponent, {
      router,
      localVue,
      vuetify
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("Emit searchInput event will call updateSearchInput method", async () => {
    const wrapper = shallowMount(AppComponent, {
      router,
      localVue,
      vuetify
    });
    wrapper.vm.$emit("searchInput", searchData);
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("searchInput")).toBeTruthy();
  });

  it("Execute updateSearchInput method will set searchInput data prop.", async () => {
    const wrapper = shallowMount(AppComponent, {
      router,
      localVue,
      vuetify
    });
    await wrapper.vm.updateSearchInput(searchData);
    const filterData = searchData.map(data => data.show);
    expect(wrapper.vm.searchInput).toEqual(filterData);
  });
});
