import axios from "axios";
import { url } from "inspector";

const BASE_URL = "http://localhost:3010/api/v1/";
export const POST = async (url: string, data: any) => {
  return await axios.post(BASE_URL + url, data);
};

export const GET = async (url: string, queryParam: Object = {}) => {
  return await axios.get(BASE_URL + url, {
    params: queryParam,
  });
};

export const DELETE = async (url: string, id: number) => {
  return await axios.delete(BASE_URL + url + id);
};

export const PATCH = async (url: string, id: number, data: any) => {
  return await axios.patch(BASE_URL + url + "/" + id, data);
};
