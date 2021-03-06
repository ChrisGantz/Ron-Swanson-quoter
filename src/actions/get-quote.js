const BASE_URL = 'https://ron-swanson-quotes.herokuapp.com/v2/quotes/'
export const getQuotesFromApi = async (amount) => {
  try {
    const res = await fetch(BASE_URL + amount);
    return await res.json();
  } catch (error) {
    console.log('error:', error)
    return ['<iframe src="https://giphy.com/embed/vc0KiL9PrHzLMZpjyh" width="480" height="336" frameBorder="0" className="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/reaction-vc0KiL9PrHzLMZpjyh">via giphy</a></p>'];
  }
}