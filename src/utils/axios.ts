import axios from "axios";

const BASE_URL = "http://localhost:3010/api/v1/";
export const POST = async (url: string, data: any) => {
  return await axios.post(BASE_URL + url, data);
};
