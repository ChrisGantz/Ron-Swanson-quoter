const BASE_URL = 'https://ron-swanson-quotes.herokuapp.com/v2/quotes/'
export const getQuoteFromApi = async (amount, filter) => {
  try {
    const res = await fetch(BASE_URL + amount);
    const jsonedQuoteData = await res.json();
    let filteredQuoteData = jsonedQuoteData.filter(quote => {
      let quoteArr = quote.split(' ');
      if (filter === 'small') {
        return quoteArr.length <= 4;
      } else if (filter === 'medium') {
        return quoteArr.length >= 5 && quoteArr.length <= 12;
      } else if (filter === 'large') {
        return quoteArr.length >= 13;
      } else {
        return 0;
      }
    })
    return filteredQuoteData;
  } catch (error) {
    console.log('error:', error)
    return ['<iframe src="https://giphy.com/embed/vc0KiL9PrHzLMZpjyh" width="480" height="336" frameBorder="0" className="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/reaction-vc0KiL9PrHzLMZpjyh">via giphy</a></p>'];
  }
}