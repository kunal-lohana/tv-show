import {
  mount,
  shallowMount,
  config,
  createLocalVue,
  RouterLinkStub
} from "@vue/test-utils";
import TvShowComp from "@/components/TvShow/TvShow.vue";
import { homeShows } from "./testingData";
import Vuetify from "vuetify";
import Vue from "vue";
import VueRouter from "vue-router";
import { routes } from "@/router/index";
import { Constants } from "@/Constant/index";

config.showDeprecationWarnings = false;
Vue.config.slient = false;
describe("Tv Show Component", () => {
  const show = homeShows;
  const router = new VueRouter({
    routes
  });
  let wrapper;
  let localVue = createLocalVue();
  localVue.use(VueRouter);
  Vue.use(Vuetify);
  wrapper = mount(TvShowComp, {
    localVue,
    router,
    propsData: {
      showData: show
    },
    stubs: {
      RouterLink: RouterLinkStub
    }
  });

  it("should match snapshot", () => {
    const wrapper = shallowMount(TvShowComp, {
      localVue,
      router,
      propsData: {
        showData: show
      },
      stubs: {
        RouterLink: RouterLinkStub
      }
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("check default value of data and props", () => {
    const wrapper = shallowMount(TvShowComp, {
      localVue,
      router,
      propsData: {
        showData: show
      },
      stubs: {
        RouterLink: RouterLinkStub
      }
    });
    expect(wrapper.vm.showData).toEqual(show);
    expect(wrapper.vm.showGenre).toBeTruthy();
    expect(wrapper.vm.constant).toEqual(Constants);
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

  it("check genre class when it is not belong to genre category", async () => {
    await wrapper.setProps({ showGenre: true });
    const genre = await wrapper.find("#data-test-genre-class").classes()[2];
    expect(genre).toEqual("show_genre");
  });

  it("genre class not exist, when it is belong to genre category", async () => {
    await wrapper.setProps({ showGenre: false });
    const genre = await wrapper.find("#data-test-genre-class").classes()[2];
    expect(genre).not.toEqual("show_genre");
  });

  it("Doesn not display genre when it is belong to genre category", async () => {
    await wrapper.setProps({ showGenre: false });
    const genre = wrapper.find("#data-test-tv-genre");
    expect(genre.exists()).toBeFalsy();
  });

  it("Display Premiere", () => {
    const premiered = wrapper.find("#data-test-tv-premiered");
    expect(premiered.text()).toEqual(`, ${homeShows.premiered.split("-")[0]}`);
  });

  it("check router-link props", () => {
    const wrapper = shallowMount(TvShowComp, {
      localVue,
      router,
      propsData: {
        showData: show
      },
      stubs: {
        RouterLink: RouterLinkStub
      }
    });
    expect(wrapper.find(RouterLinkStub).props().to).toEqual({
      name: "showDetail",
      params: { showId: 1 }
    });
  });

  it("check text of constant show detail button", () => {
    const wrapper = mount(TvShowComp, {
      localVue,
      router,
      propsData: {
        showData: show
      },
      stubs: {
        RouterLink: RouterLinkStub
      }
    });
    const constantPagefound = wrapper.find(
      '[data-test="constant-showDetailBtn"]'
    );
    expect(constantPagefound.text()).toEqual(
      wrapper.vm.constant.SHOW_DETAILS_BTN
    );
  });

  it("check image url ", () => {
    const wrapper = shallowMount(TvShowComp, {
      localVue,
      router,
      propsData: {
        showData: show
      },
      stubs: {
        RouterLink: RouterLinkStub
      }
    });
    const imageUrl = wrapper
      .find('[data-test="tv-show-image"]')
      .attributes("src");
    expect(imageUrl).toEqual(show.image.medium);
  });

  it("check Icon text", () => {
    const wrapper = shallowMount(TvShowComp, {
      localVue,
      router,
      propsData: {
        showData: show
      },
      stubs: {
        RouterLink: RouterLinkStub
      }
    });
    const rating = wrapper.find('[data-test="rating-icon"]');
    expect(rating.text()).toEqual(wrapper.vm.ratingIcon);
  });
});
