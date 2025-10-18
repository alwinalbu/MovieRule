import axios from "axios";
import { URL, config } from "../config/constants";

export const getCurrentAuth = async () => {
  try {
    const { data } = await axios.get(`${URL}/auth/current`, config);

    console.log(data.data, "USER data in frontend FROM CURRENT ");

    return data.data; // { _id, email, role }
  } catch (error) {
    console.log("Auth fetch failed:", error);
    return null;
  }
};
