import axios from "axios";
import { host } from "./constant";

const createLeadUrl = `${host}/api/v2/lead`;

const getAccessToken = () => {
  let str: any = localStorage.getItem("user");
  let user = JSON.parse(str);
  return user.accessToken;
};

export const leadCreate = async (payload: any) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: getAccessToken(),
  };

  return axios.post(createLeadUrl, payload, {
    headers: headers,
  });
};
