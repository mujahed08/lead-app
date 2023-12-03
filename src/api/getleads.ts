import axios from "axios";
import { host } from "./constant";
import {getAccessToken} from './lead'

const status = "New"
const getLeadUrl = `${host}/api/v2/lead?status=${status}`;



export const getLeads = async () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAccessToken()}`,
    };

  
    // return await 
    const data = await axios.get(getLeadUrl,{
        headers: headers,
      })
      return data
      
  };