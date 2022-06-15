import axiosClient from "./axiosClient";
import { API_KEY } from "../app/constant";

const categoryApi = {
  getCategory() {
    const url = `/genre/movie/list?api_key=${API_KEY}&language=en-US`;
    return axiosClient.get(url);
  },
};

export default categoryApi;
