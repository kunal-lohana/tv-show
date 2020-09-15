import { shallowMount, createLocalVue, config } from "@vue/test-utils";
import TvShowListComponent from "@/components/TvShowList/TvShowList.vue";
import Vue from "vue";
import Vuetify from "vuetify";
import { fetchData } from "@/api/fetchData.js";
import { TV_SHOW_List } from "@/api/apiName.js";
import {
  currentPageData,
  genresCategory,
  searchData,
  showData
} from "./testingData";

config.showDeprecationWarnings = false;

Vue.config.slient = false;

jest.mock("@/api/fetchData.js", () => ({
  fetchData: jest.fn(() => true)
}));
Vue.use(Vuetify);
describe("TvShowList Component", () => {
  let wrapper;
  let localVue = createLocalVue();

  const spyGetGenresSel = jest.spyOn(
    TvShowListComponent.methods,
    "getGenresSel"
  );
  beforeEach(() => {
    wrapper = shallowMount(TvShowListComponent, {
      localVue,
      propsData: {},
      data() {
        return {
          showData: [],
          currentPageData: [],
          genresCategory: [],
          searchData: [],
          imageData: []
        };
      }
    });
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("is a Vue instance", () => {
    expect(wrapper.isVueInstance).toBeTruthy();
  });

  it("Created lifecycle hook, call getShowData() method and provide tv-show data", async () => {
    fetchData.mockImplementationOnce(async () => {
      const currentPageData = await require("./testingData").currentPageData;
      return { data: currentPageData };
    });
    const result = await fetchData({
      apiName: TV_SHOW_List
    });
    wrapper.vm.currentPageData = result;
    expect(wrapper.vm.currentPageData.data.length).toEqual(1);
  });

  describe("Method getGenresSel return passed genres data", () => {
    it("getGenresSel return empty array if genre not passed ", () => {
      const localThis = {
        currentPageData: []
      };
      expect(spyGetGenresSel.call(localThis)).toEqual([]);
    });
    it("getGenresSel return empty array if currentPageData data prop is empty ", () => {
      const localThis = {
        currentPageData: []
      };
      const result = spyGetGenresSel.call(localThis, "Drama");
      expect(result).toEqual([]);
    });
    it("getGenresSel return genres if genre category and currentPageData prop. passed", async () => {
      await wrapper.setData({
        currentPageData: currentPageData
      });
      const result = await wrapper.vm.getGenresSel("Action");
      expect(result).toEqual(currentPageData);
    });
    it("validateImage method return object which has medium attr in image", async () => {
      const result = wrapper.vm.validateImage(showData);
      expect(result).toEqual(currentPageData);
    });
  });

  describe("watch Property - searchProp", () => {
    it("searchProp watcher update currentPageData data prop.", async () => {
      await wrapper.setProps({
        searchProp: searchData
      });
      const result = await wrapper.vm.validateImage(wrapper.vm.searchProp);
      expect(wrapper.vm.currentPageData).toEqual(result);
    });

    it("currentPageData watcher update carosuel imageData and filter out images", done => {
      wrapper.setData({
        currentPageData: currentPageData
      });
      wrapper.vm.$nextTick(() => {
        expect(wrapper.vm.imageData.length).toBe(1);
        done();
      });
    });
  });

  describe("computed Property", () => {
    it("compute genre title", () => {
      wrapper.setData({
        currentPageData: currentPageData
      });
      expect(wrapper.vm.genres).toStrictEqual(genresCategory);
    });

    it("compute genre title return blank array if currentPageData data prop. is empty", () => {
      wrapper.setData({
        currentPageData: []
      });
      expect(wrapper.vm.genres).toStrictEqual([]);
    });
  });
});
