import axios from "axios";
import { BASE_URL as HOST_NAME } from "./WebServices";
export class AxiosBase {
  headers = {};

  constructor(url_prefix = "") {
    this.url_prefix = url_prefix;
  }

  async get(url, queryParams) {
    try {
      let response = await axios.get(
        HOST_NAME + this.url_prefix + url + this.mapQueryParams(queryParams)
      );

      return response;
    } catch (error) {
      return error;
    }
  }

  async post(url, body, queryParams = null) {
    try {
      let response = await axios.post(
        HOST_NAME + this.url_prefix + url + this.mapQueryParams(queryParams),
        body
      );

      return response;
    } catch (error) {
      console.log("error in response of axios is", error);
      // let res = handleResponse(error)
      return error; // null or object of msg
    }
  }

  async put(url, body, queryParams = null) {
    try {
      let response = await axios.put(
        HOST_NAME + this.url_prefix + url + this.mapQueryParams(queryParams),

        JSON.stringify(body)
      );

      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async remove(url, queryParams = null) {
    try {
      let response = await axios.delete(
        HOST_NAME + this.url_prefix + url + this.mapQueryParams(queryParams)
      );
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  mapQueryParams(queryParams) {
    return queryParams
      ? Object.keys(queryParams)
          .map(function (key) {
            return key + "=" + queryParams[key];
          })
          .join("&")
      : "";
  }
}
