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
      quoteLengthFilter: 'any',
    }
  }

  async componentDidMount() {
    // There are 58 quotes in this Api
    const quoteAmnt = 58;
    let filteredQuotes = await getQuoteFromApi(quoteAmnt, this.state.quoteLengthFilter);
    if(!filteredQuotes.length) {
      this.setState({
        quotes: ['Could not find a quote please try again']
      })
    } else {
      this.setState({
        quotes: filteredQuotes
      })
    }
  }

  onClickAdjustLength = (e) => {
    this.setState({
      quoteLengthFilter: e.target.value
    })
  }

  render() {
    const quotes = this.state.quotes;
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    // console.log('randomQuote:', randomQuote)
    return (
      <main className="App" role="main">
        <Giftro />
        <QuoteSize onClickChangeQuote={this.onClickAdjustLength}/>
        <Quote quote={randomQuote}/>
      </main>
    );
  }
}

export default App;
