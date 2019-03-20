import React, { Component } from 'react';
import Giftro from './components/giftro';
import './App.css'
import QuoteSize from './components/quote-size-button';
import { getQuoteFromApi } from "./actions/get-quotes";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quotes: [],
      quoteLengthFilter: 'small',
      quoteAmnt: 1
    }
  }

  async componentDidMount() {
    let filteredQuotes = await getQuoteFromApi(this.state.quoteAmnt, this.state.quoteLengthFilter);
    let count = 0;
    while(!filteredQuotes.length && count < 50) {
      // Could also create try catch but for development purposes I will set max calls to 50
      count++;
      console.log('count:', count)
      filteredQuotes = await getQuoteFromApi(this.state.quoteAmnt, this.state.quoteLengthFilter);
    }
    console.log('filteredQuotes:', filteredQuotes)
    this.setState({
      quotes: filteredQuotes
    })
  }

  onClickAdjustLength(lnth) {
    this.setState({
      quoteLengthFilter: `${lnth}`
    })
  }

  render() {
    console.log(this.state.quotes);
    return (
      <main className="App" role="main">
        <Giftro />
        <QuoteSize />
      </main>
    );
  }
}

export default App;
