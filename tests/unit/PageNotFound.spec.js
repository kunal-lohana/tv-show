import { shallowMount, config, createLocalVue } from "@vue/test-utils";
import Vuetify from "vuetify";
import Vue from "vue";
import PageNotFound from "@/components/PageNotFound.vue";
import { Constants } from "@/Constant/index";

config.showDeprecationWarnings = false;
Vue.config.slient = false;

jest.mock("@/api/fetchData.js", () => ({
  fetchData: jest.fn(() => true)
}));

describe("Page Not Found Component ", () => {
  let wrapper;
  let localVue = createLocalVue();
  Vue.use(Vuetify);
  let vuetify;
  beforeEach(() => {
    vuetify = new Vuetify();
    wrapper = shallowMount(PageNotFound, {
      localVue,
      vuetify,
      stubs: ["router-link"],
      data() {
        return {
          constant: Constants
        };
      }
    });
  });
  it("check constant of error code", () => {
    const constantErrorCode = wrapper.find('[data-test="constant-errorcode"]');
    expect(constantErrorCode.text()).toEqual(wrapper.vm.constant.ERROR_CODE);
  });

  it("check constant of pagenotfound", () => {
    const constantPagefound = wrapper.find(
      '[data-test="constant-pagenotfound"]'
    );
    expect(constantPagefound.text()).toEqual(
      wrapper.vm.constant.PAGE_NOT_FOUND
    );
  });
});
