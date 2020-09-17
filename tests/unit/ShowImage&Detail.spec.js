import { shallowMount, config, createLocalVue } from "@vue/test-utils";
import { imageData } from "./testingData";
import Vuetify from "vuetify";
import Vue from "vue";
import ShowImageDetail from "@/components/ShowImage&Detail/ShowImage&Detail.vue";

config.showDeprecationWarnings = false;
Vue.config.slient = false;

describe("Show Image and Detail Component ", () => {
  let localVue = createLocalVue();
  localVue.use(Vuetify);
  Vue.use(Vuetify);
  let vuetify;
  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it("should match snapshot", () => {
    const wrapper = shallowMount(ShowImageDetail, {
      localVue,
      vuetify,
      propsData: {
        data: imageData
      }
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("set prop. data", async () => {
    const wrapper = shallowMount(ShowImageDetail, {
      localVue,
      vuetify
    });
    await wrapper.setProps({
      data: imageData
    });
    expect(wrapper.vm.data.length).toBe(imageData.length);
  });

  it("check data prop. data", () => {
    const wrapper = shallowMount(ShowImageDetail, {
      localVue,
      vuetify,
      propsData: {
        data: imageData
      }
    });
    expect(wrapper.vm.data.length).toBe(imageData.length);
  });

  it("check image url ", () => {
    const wrapper = shallowMount(ShowImageDetail, {
      localVue,
      vuetify,
      propsData: {
        data: imageData
      }
    });
    const imageUrl = wrapper
      .find('[data-test="show-slide-image"]')
      .attributes("src");
    expect(imageUrl).toEqual(imageData[0].image);
  });
});
