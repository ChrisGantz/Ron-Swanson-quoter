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

export const postQuoteRating = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/quotes`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({})
    })
  } catch (error) {
    console.log('error:', error)
  }
}