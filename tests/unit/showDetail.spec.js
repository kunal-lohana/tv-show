import { shallowMount, mount, config, createLocalVue } from "@vue/test-utils";
import { showDescription, validateCaste, castDetails } from "./testingData";
import Vuetify from "vuetify";
import Vue from "vue";
import VueRouter from "vue-router";
import ShowDetailComponent from "@/components/ShowDetail/ShowDetail.vue";
import { Constants } from "@/Constant/index";
import { fetchData } from "@/api/fetchData.js";
import { routes } from "@/router/index.js";
import { TV_SHOW_DETAIL } from "@/api/apiName.js";

config.showDeprecationWarnings = false;
Vue.config.slient = false;

jest.mock("@/api/fetchData.js", () => ({
  fetchData: jest.fn(async () => {
    const showDescription = await require("./testingData").showDescription;
    return Promise.resolve({ data: showDescription });
  })
}));

describe("Show Detail Component ", () => {
  let wrapper;
  let localVue = createLocalVue();
  localVue.use(VueRouter);
  Vue.use(Vuetify);
  let vuetify= new Vuetify();

  const router = new VueRouter({
    routes
  });
  beforeEach(() => {
    wrapper = mount(ShowDetailComponent, {
      router,
      localVue,
      vuetify,
      data() {
        return {
          showDescription: showDescription,
          constant: Constants,
          loading: false
        };
      }
    });
  });
  it("should match snapshot", async () => {
    const wrapper = shallowMount(ShowDetailComponent, {
      router,
      localVue,
      vuetify
    });
    await wrapper.setData({
      showDescription: showDescription,
      constant: Constants,
      loading: false,
      castDetails: castDetails,
      episodeDetails: showDescription._embedded.episodes,
    })
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("check show name", async () => {
    const wrapper = shallowMount(ShowDetailComponent, {
      router,
      localVue,
      vuetify,
      data() {
        return {
          showDescription: showDescription
        };
      }
    });
    await wrapper.setData({
      loading: false
    });
    const showName = wrapper.find('[data-test="show-name"]');
    expect(showName.text()).toEqual(showDescription.name);
  });
  it("check rating", async () => {
    await wrapper.setData({
      loading: false
    });
    const rating = wrapper.find('[data-test="show-rating"]');
    expect(rating.text()).toEqual(`${showDescription.rating.average / 2} (5)`);
  });

  it("check genre", async () => {
    await wrapper.setData({
      loading: false
    });
    const genre = wrapper.find('[data-test="show-genre"]');
    expect(genre.text()).toEqual(showDescription.genres.join(","));
  });

  it("check language", async () => {
    await wrapper.setData({
      loading: false
    });
    const language = wrapper.find('[data-test="show-language"]');
    expect(language.text()).toEqual(showDescription.language);
  });

  it("check summary", async () => {
    await wrapper.setData({
      loading: false
    });
    const summary = wrapper.find('[data-test="show-summary"] > p');
    expect(summary.html()).toEqual(showDescription.summary);
  });

  it("check time", async () => {
    await wrapper.setData({
      loading: false
    });
    const time = wrapper.find('[data-test="show-time"]');
    expect(time.text()).toEqual(showDescription.schedule.time);
  });

  it("check days", async () => {
    await wrapper.setData({
      loading: false
    });
    const days = wrapper.find('[data-test="show-days"]');
    expect(days.text()).toEqual(showDescription.schedule.days.join(","));
  });

  it("check constant of offical site", async () => {
    await wrapper.setData({
      loading: false
    });
    const constantSite = wrapper.find('[data-test="constant-site"]');
    expect(constantSite.text()).toEqual(wrapper.vm.constant.OFFICIAL_SITE);
  });

  it("check constant of schedule", async () => {
    await wrapper.setData({
      loading: false
    });
    const constantSchedule = wrapper.find('[data-test="constant-schedule"]');
    expect(constantSchedule.text()).toEqual(
      wrapper.vm.constant.SCHEDULE_AVAILABILITY
    );
  });

  it("check constant of description", async () => {
    await wrapper.setData({
      loading: false
    });
    const constantDescription = wrapper.find(
      '[data-test="constant-description"]'
    );
    expect(constantDescription.text()).toEqual(wrapper.vm.constant.DESCRIPTION);
  });

  it("check constant of episodes", async () => {
    const constantEpisodes = wrapper.find('[data-test="constant-episodes"]');
    expect(constantEpisodes.text()).toEqual(wrapper.vm.constant.EPISODES);
  });

  it("check constant of cast", async () => {
    const constantCast = wrapper.find('[data-test="constant-cast"]');
    expect(constantCast.text()).toEqual(wrapper.vm.constant.CAST);
  });

  it("Created lifecycle hook called getShowDetails method", async () => {
    const getShowDetails = jest.spyOn(
      ShowDetailComponent.methods,
      "getShowDetails"
    );
    mount(ShowDetailComponent, {
      router,
      localVue,
      vuetify,
      data() {
        return {
          showDescription: showDescription
        };
      }
    });
    expect(getShowDetails).toHaveBeenCalled();
  });

  it("getShowDetails method execute fetchData", async () => {
    await fetchData.mockImplementationOnce(async () => {
      const showDescription = await require("./testingData").showDescription;
      return Promise.resolve({ data: showDescription });
    });
    const wrapper = mount(ShowDetailComponent, {
      router,
      localVue,
      vuetify
    });
    await wrapper.vm.getShowDetails(2);
    expect(fetchData).toHaveBeenCalled();
  });

  it("call fetchData will set showDescription, castDetail", async () => {
    await fetchData.mockImplementationOnce(async () => {
      const showDescription = await require("./testingData").showDescription;
      return Promise.resolve({ data: showDescription });
    });
    const wrapper = mount(ShowDetailComponent, {
      router,
      localVue,
      vuetify
    });
    const result = await fetchData({
      apiName: TV_SHOW_DETAIL,
      params: { id: 2 }
    });
    expect(fetchData).toHaveBeenCalled();
    expect(wrapper.vm.showDescription).toEqual(result.data);
  });

  it("getShowDetails method call and fetchData return blank array, navigate to pagenotfound", async () => {
    const spyMethod = jest.spyOn(ShowDetailComponent.methods, "getShowDetails")
    const wrapper = mount(ShowDetailComponent, {
      router,
      localVue,
      vuetify
    });
    await wrapper.setData({
      loading: false,
      showDescription: showDescription
    });
    await wrapper.vm.getShowDetails();
    expect(spyMethod).toHaveBeenCalled();
    expect(wrapper.vm.loading).toBeFalsy();
  });

  it("validateCasteDetails method unique cast object", async () => {
    expect(validateCaste.length).toBe(2);
    const result = await wrapper.vm.validateCasteDetails(validateCaste);
    expect(result.length).toBe(1);
  });
});
