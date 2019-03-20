import React, { Component } from 'react';
import Giftro from './components/giftro';
import './App.css'
import QuoteSize from './components/quote-size-button';

const BASE_URL = 'https://ron-swanson-quotes.herokuapp.com/v2/quotes/'
const getQuoteFromApi = async (amount, filter) => {
  try {
    const res = await fetch(BASE_URL+amount);
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
    let count = 0
    if(!filteredQuoteData.length) {
      count++;
      console.log('times run', count);
      if(count === 10) {
        throw new Error('Timed out')
      }
      else { getQuoteFromApi(amount, filter) };
    }
    console.log('filteredQuoteData:', filteredQuoteData)
    return filteredQuoteData;
  } catch (error) {
    console.log('Friends: one to three is sufficient.')
    console.log('error:', error)
  }
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: [],
      quoteLengthFilter: 'medium',
      quoteAmnt: 1
    }
  }

  componentDidMount() {
    // getQuoteFromApi(this.state.quoteAmnt, this.state.quoteLengthFilter);
    console.log('getQuoteFromApi:', getQuoteFromApi(this.state.quoteAmnt, this.state.quoteLengthFilter))
  }

  onClickAdjustLength(lnth) {
    this.setState({
      quoteLengthFilter: `${lnth}`
    })
  }

  render() {
    return (
      <main className="App" role="main">
        <Giftro />
        <QuoteSize />
      </main>
    );
  }
}

export default App;
