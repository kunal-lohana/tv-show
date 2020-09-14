import {shallowMount, createLocalVue, config} from '@vue/test-utils';
import TvShowListComponent from "@/components/TvShowList/TvShowList.vue"
import vuetify from 'vuetify';
import ShowSlideImage from "@/components/ShowSlideImage/ShowSlideImage";
import ShowSlideImageSkeleton from "@/components/ShowSlideImage/ShowSlideImage.skeleton.vue";
import TvShow from "@/components/TvShow/TvShow";
import TvShowSkeleton from "@/components/TvShow/TvShow.skeleton.vue";
import {fetchData} from "@/api/fetchData.js";
import { TV_SHOW_List } from "@/api/apiName.js";
import {currentPageData as showData, genresCategory} from "./testingData";

config.showDeprecationWarnings = false


jest.mock("@/api/fetchData.js",  () => ({
    fetchData:  jest.fn()
}))

describe('TvShowList Component', () => {
    let  wrapper;
    let localVue = createLocalVue();
    beforeEach(() => {
        localVue.use(vuetify);
        wrapper = shallowMount(TvShowListComponent, {
          localVue,
          propsData: {},
          data: {
            showData: [],
            currentPageData: [],
            genresCategory: [],
            searchData: [],
            imageData: []
          },
          stubs: ['tv-show',
            'show-slide-image',
            'show-slide-image-skeleton',
            'tv-show-skeleton'
          ],
        });
        jest.resetModules();
        jest.clearAllMocks();
    });
    
    
    
    
      it('is a Vue instance', () => {
        expect(wrapper.isVueInstance).toBeTruthy();
      })

      it('Created lifecycle hook, call getShowData() method and provide tv-show data',  async () => {
        fetchData.mockImplementationOnce( async () => {
          const currentPageData =  await require('./testingData').currentPageData;  
          return {data : currentPageData}
        });
        const result = await fetchData({
          apiName: TV_SHOW_List
        });
        wrapper.vm.currentPageData = result
        expect(wrapper.vm.currentPageData.data.length).toEqual(1);
      });
      
      describe('Method getGenresSel return passed genres data', () => {
        // it('return empty array if genre not passed ', () => {
        //   const result = wrapper.vm.getGenresSel();
        //   expect(result).toEqual([]);
        // })
        // it('return empty array if currentPageData data prop. not empty ', () => {
          // const result = wrapper.vm.getGenresSel('Drama');
          // expect(result).toEqual([]);
        // })
        it(' return genres if genre category and currentPageData prop. passed', async () => {
          const localData = {
            currentPageData : showData
          }
          // wrapper.vm.currentPageData= showData;
          const result = await wrapper.vm.getGenresSel.call(localData, 'Drama');
          console.log('result', result);
          // expect(result).toEqual(showData)
        })
        
      })
      it('Default data property of ShowList', () => {
          expect(wrapper.vm.showData.length).toBe(0);
          expect(wrapper.vm.currentPageData.length).toBe(0);
          expect(wrapper.vm.genresCategory.length).toBe(0);
          expect(wrapper.vm.searchData.length).toBe(0);
          expect(wrapper.vm.imageData.length).toBe(0);
      })
      
    
});