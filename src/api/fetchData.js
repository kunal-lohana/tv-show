import axios from "axios";
import config from "../config/config";

export const fetchData = ({ apiName, params }) => {
  const requests = {
      get: url => axios.get(`${config.API_URL}${url}`),
      post: (url, body) => axios.post(`${config.API_URL}${url}`, body)
    },
    Api = {
      getTvShowList: params => requests.get(`shows`, params),
      getTvShowDetail: params => requests.get(`shows/${params.id}`, params),
      getCastDetail: params =>
        requests.get(`shows/${params.id}?embed=${params.embed}`, params),
      getEpisodesDetail: params =>
        requests.get(`shows/${params.id}/episodes`, params),
      searchShow: params =>
        requests.get(`/search/shows?q=${params.query}`, params)
    };
  return Api[apiName](params);
};
