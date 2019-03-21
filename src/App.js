import React, { Component } from 'react';
import Giftro from './components/giftro';
import './App.css'
import QuoteSize from './components/quote-size-button';
import { getQuoteFromApi } from "./actions/get-quote";
import { postQuoteRating } from "./actions/rate-quote";
import Quote from './components/quote';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quotes: [],
      filteredQuotes: [],
      ratingValue: 5,
      randomQuote: ''
    }
  }

  async componentDidMount() {
    document.cookie = 'secret_code'
    localStorage.setItem('secret', 'code')
    // There are 58 quotes in this Api
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
    const randQuote = filteredQuoteData[Math.floor(Math.random() * filteredQuoteData.length)];
    if(!filteredQuoteData.length) {
      this.setState({
        filteredQuotes: ['<iframe src="https://giphy.com/embed/vc0KiL9PrHzLMZpjyh" width="480" height="336" frameBorder="0" className="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/reaction-vc0KiL9PrHzLMZpjyh">via giphy</a></p>'],
        randomQuote: randQuote
      })
    } else {
      this.setState({
        filteredQuotes: filteredQuoteData,
        randomQuote: randQuote
      })
    }
  }

  handleRadioButtonChange = (e) => {
    let rating = e.target.value;
    this.setState({
      ratingValue: rating
    })
  }

  handleSubmitRating = (quote, rating) => {
    const localSession = localStorage.get('secret');
    console.log('localSession:', localSession)
    const cookieSession = document.cookie;
    console.log('cookieSession:', cookieSession)
    if(rating < 5) {
      alert('Your opinion didnt matter it was saved as 5 anyways');
    }
    if(cookieSession !== 'secret_code' || localSession !== 'code') {
      alert('Have you tried refreshing?')
    } else {
      postQuoteRating(quote, rating, localSession, cookieSession)
    }
  }
  
  render() {
    const initialQuote = this.state.quotes[11]
    return (
      <main className="App" role="main">
        <Giftro />
        <QuoteSize onClickChangeQuote={this.onClickChangeFilter}/>
        <Quote 
          quote={ !this.state.randomQuote.length ? initialQuote : this.state.randomQuote}
          handleRadioButtonChange={this.handleRadioButtonChange}
          handleSubmitRating={ this.handleSubmitRating }          
          />
      </main>
    );
  }
}

export default App;
