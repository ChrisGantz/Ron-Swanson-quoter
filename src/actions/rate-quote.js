import { API_BASE_URL } from "../config";

export const getRatedData = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/quotes`);
    const jsonRes = await res.json();
    return jsonRes;
  } catch (error) {
    console.log(error);
  }
}

export const postQuoteRating = async (quote, userVotes) => {
  try {
    const res = await fetch(`${API_BASE_URL}/quotes`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ quote, userVotes })
    })
    return await res.json();
  } catch (error) {
    console.log('error:', error)
  }
}

export const updateRating = async (quote, newVote) => {
  try {
    const res = await fetch(`${API_BASE_URL}/quotes`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({quote, newVote})
    })
    let json = await res.json();
    return json;
  } catch (error) {
    console.log('error:', error)
    
  }
}