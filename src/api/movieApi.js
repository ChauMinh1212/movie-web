import axiosClient from "./axiosClient";
import { API_KEY } from "../app/constant";

const movieApi = {
  getAll(params) {
    const url = `/discover/movie?api_key=${API_KEY}&language=en-US`;
    return axiosClient.get(url, { params });
  },
  getDetail(params) {
    const url = `/movie/${params}?api_key=${API_KEY}&language=en-US`;
    return axiosClient.get(url);
  },
  getSearch(params) {
    const url = `/search/movie?api_key=${API_KEY}&language=en-US`;
    return axiosClient.get(url, { params });
  },
};

export default movieApi;
