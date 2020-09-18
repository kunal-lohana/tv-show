import { mount, config, createLocalVue } from "@vue/test-utils";
import { searchData } from "./testingData";
import Vuetify from "vuetify";
import Vue from "vue";
import VueRouter from "vue-router";
import HeaderComponent from "@/components/Header/Header.vue";
import { fetchData } from "@/api/fetchData.js";
import { routes } from "@/router/index";

config.showDeprecationWarnings = false;
Vue.config.slient = false;

jest.mock("@/api/fetchData.js", () => ({
  fetchData: jest.fn(() => true)
}));

describe("Header Component ", () => {
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

  it("click on home icon naviagte to home page", async () => {
    const HomeRouterSpy = jest.spyOn(HeaderComponent.methods, "homeRoute");
    const wrapper = mount(HeaderComponent, {
      router,
      localVue,
      vuetify
    });
    const homeIcon = wrapper.find(".data-test-home-btn");
    await homeIcon.trigger("click");
    expect(HomeRouterSpy).toHaveBeenCalled();
    const result = await wrapper.vm.homeRoute();
    expect(result).toBeTruthy();
  });

  it("watch $route.params, when router params changes and set data props", async () => {
    const wrapper = mount(HeaderComponent, {
      router,
      localVue,
      vuetify
    });
    await router.push("/2");
    expect(wrapper.vm.searchData).toBeFalsy();
  });

  it("check the input value in search input box", async () => {
    const wrapper = mount(HeaderComponent, {
      localVue,
      vuetify
    });
    expect(wrapper.contains('[data-test="SearchText"]')).toBe(true);
    const input = wrapper.find('[data-test="SearchText"]');
    await input.setValue("Grimm");
    expect(input.element.value).toBe("Grimm");
  });

  it("called getSearchQuery method and emit searchData", async () => {
    const wrapper = mount(HeaderComponent, {
      localVue,
      vuetify
    });
    await wrapper.setData({
      searchInput: "Grimm"
    });
    fetchData.mockImplementationOnce(async () => {
      return { data: searchData };
    });
    await wrapper.vm.getSearchQuery();
    expect(wrapper.emitted("searchInput")).toHaveLength(1);
    expect(wrapper.vm.searchInput).toBe("");
  });
});
