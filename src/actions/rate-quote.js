import { API_BASE_URL } from "../config";

export const getRatedData = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/quotes`);
    const jsonRes = await res.json();
    console.log('jsonRes:', jsonRes);
  } catch (error) {
    console.log(error);
  }
}