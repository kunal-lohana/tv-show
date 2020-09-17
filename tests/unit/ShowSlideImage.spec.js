import {
  shallowMount,
  config,
  createLocalVue,
  RouterLinkStub
} from "@vue/test-utils";
import { imageData } from "./testingData";
import Vuetify from "vuetify";
import Vue from "vue";
import VueRouter from "vue-router";
import showSlideImage from "@/components/ShowSlideImage/ShowSlideImage.vue";
import { routes } from "@/router/index";

config.showDeprecationWarnings = false;
Vue.config.slient = false;

describe("Show Image Component ", () => {
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
    const wrapper = shallowMount(showSlideImage, {
      router,
      localVue,
      vuetify,
      propsData: {
        showImage: imageData
      },
      stubs: {
        RouterLink: RouterLinkStub
      }
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("set prop. showImage data", async () => {
    const wrapper = shallowMount(showSlideImage, {
      router,
      localVue,
      vuetify
    });
    await wrapper.setProps({
      showImage: imageData
    });
    expect(wrapper.vm.showImage.length).toBe(imageData.length);
  });

  it("check showImage prop. data", () => {
    const wrapper = shallowMount(showSlideImage, {
      router,
      localVue,
      vuetify,
      propsData: {
        showImage: imageData
      }
    });
    expect(wrapper.vm.showImage.length).toBe(imageData.length);
  });

  it("check image url ", () => {
    const wrapper = shallowMount(showSlideImage, {
      router,
      localVue,
      vuetify,
      propsData: {
        showImage: imageData
      },
      stubs: {
        RouterLink: RouterLinkStub
      }
    });
    const imageUrl = wrapper
      .find('[data-test="show-slide-image"]')
      .attributes("src");
    expect(imageUrl).toEqual(imageData[0].image);
  });

  it("check router-link props", () => {
    const wrapper = shallowMount(showSlideImage, {
      router,
      localVue,
      vuetify,
      propsData: {
        showImage: imageData
      },
      stubs: {
        RouterLink: RouterLinkStub
      }
    });
    expect(wrapper.find(RouterLinkStub).props().to).toEqual({
      name: "showDetail",
      params: { showId: 123 }
    });
  });
});
