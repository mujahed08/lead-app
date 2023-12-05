import axios from "axios";
import { host } from "./constant";

const createLeadUrl = `${host}/api/v2/lead`;
const getLeadUrl = `${host}/api/v2/lead`;
const removeLeadUrl = `${host}/api/v2/lead`;

export const getAccessToken = () => {
  let str: any = localStorage.getItem("user");
  let user = JSON.parse(str);
  console.log(user);
  return user.accessToken;
};

export const leadCreate = async (payload: any) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getAccessToken()}`,
  };

  return axios.post(createLeadUrl, payload, {
    headers: headers,
  });
};

export const getLead = async (id: number) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getAccessToken()}`,
  };

  return axios.get(`${getLeadUrl}?id=${id}`, {
    headers: headers,
  });
};


export const removeLead = async (id: number) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getAccessToken()}`,
  };

  return axios.delete(`${removeLeadUrl}?id=${id}`, {
    headers: headers,
  });
};