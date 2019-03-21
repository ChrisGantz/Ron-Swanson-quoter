import React, { Component } from 'react';
import Giftro from './components/giftro';
import './App.css'
import QuoteSize from './components/quote-size-button';
import { getQuoteFromApi } from "./actions/get-quote";
import Quote from './components/quote';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quotes: [],
      filteredQuotes: [],
    }
  }

  async componentDidMount() {
    // There are 58 quotes in this Api
    document.cookie = 'secret_code'
    // console.log('document.cookie:', document.cookie)
    localStorage.setItem('secret', 'code')
    // console.log('localStorage:', localStorage.getItem('secret'))
    const quoteAmnt = 58;
    let allQuotes = await getQuoteFromApi(quoteAmnt);
    if (!allQuotes.length) {
      this.setState({
        quotes: ['Could not find a quote please try again']
      })
    } else {
      this.setState({
        quotes: allQuotes,
        filteredQuotes: allQuotes
      })
    }
  }

  onClickChangeFilter = (e) => {
    const filter  = e.target.value
    let filteredQuoteData = this.state.quotes.filter(quote => {
      let quoteArr = quote.split(' ');
      if (filter === 'small') {
        return quoteArr.length <= 4;
      } else if (filter === 'medium') {
        return quoteArr.length >= 5 && quoteArr.length <= 12;
      } else if (filter === 'large') {
        return quoteArr.length >= 13;
      } else if (filter === 'any') {
        return 1;
      } else {
        return 0;
      }
    })
    if(!filteredQuoteData.length) {
      this.setState({
        filteredQuotes: ['<iframe src="https://giphy.com/embed/vc0KiL9PrHzLMZpjyh" width="480" height="336" frameBorder="0" className="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/reaction-vc0KiL9PrHzLMZpjyh">via giphy</a></p>']
      })
    } else {
      this.setState({
        filteredQuotes: filteredQuoteData,
      })
    }
  }
  
  render() {
    const quotes = this.state.filteredQuotes;
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    // console.log('randomQuote:', randomQuote)
    return (
      <main className="App" role="main">
        <Giftro />
        <QuoteSize onClickChangeQuote={this.onClickChangeFilter}/>
        <Quote quote={randomQuote}/>
      </main>
    );
  }
}

export default App;
