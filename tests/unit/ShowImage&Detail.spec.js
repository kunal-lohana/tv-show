import { shallowMount, mount, config, createLocalVue } from "@vue/test-utils";
import { showImageDetail } from "./testingData";
import Vuetify from "vuetify";
import Vue from "vue";
import ShowImageDetail from "@/components/ShowImage&Detail/ShowImage&Detail.vue";

config.showDeprecationWarnings = false;
Vue.config.slient = false;

describe("Show Image and Detail Component ", () => {
  let localVue = createLocalVue();
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
        data: showImageDetail
      }
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("set prop. data", async () => {
    const wrapper = shallowMount(ShowImageDetail, {
      localVue
    });
    await wrapper.setProps({
      data: showImageDetail
    });
    expect(wrapper.vm.data.length).toBe(showImageDetail.length);
  });

  it("validate name ", () => {
    const wrapper = mount(ShowImageDetail, {
      localVue,
      propsData: {
        data: showImageDetail
      }
    });
    const name = wrapper.find('[data-test="show-name"]');
    expect(name.text()).toBe(showImageDetail.name);
  });

  it("check summary of show ", () => {
    const wrapper = shallowMount(ShowImageDetail, {
      localVue,
      propsData: {
        data: showImageDetail
      }
    });
    const summary = wrapper.find('[data-test="show-summary"]');
    expect(summary.text()).toBe("Good to Go");
  });

  it("check data prop. data", () => {
    const wrapper = shallowMount(ShowImageDetail, {
      localVue,
      propsData: {
        data: showImageDetail
      }
    });
    expect(wrapper.vm.data.length).toBe(showImageDetail.length);
  });
});
