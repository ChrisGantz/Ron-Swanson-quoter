import React, { Component } from 'react';
import Giftro from './components/giftro';
import './App.css'
import QuoteSize from './components/quote-size-button';
import { getQuotesFromApi } from "./actions/get-quote";
import { getRatedData, postQuoteRating, updateRating } from "./actions/rate-quote";
import Quote from './components/quote';
import RatedQuotes from './components/rated-quotes';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quotes: [],
      filteredQuotes: [],
      ratingValue: 5,
      randomQuote: '',
      ratedQuotes: []
    }
  }

  componentDidMount() {
    this.getQuotesFromSwansonAPI();
    this.getQuoteAndRatingFromMyDB();
  }

  async getQuotesFromSwansonAPI() {
    document.cookie = 'secret_code'
    localStorage.setItem('secret', 'code')
    // There are 58 quotes in this Api
    const quoteAmnt = 58;
    let allQuotes = await getQuotesFromApi(quoteAmnt);
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

async getQuoteAndRatingFromMyDB() {
    let ratedQuotesData = await getRatedData();
    this.setState({
      ratedQuotes: ratedQuotesData
    })
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

  handleSubmit = async (e) => {
    e.preventDefault();
    const localSession = localStorage.getItem('secret');
    const cookieSession = document.cookie.split(';').find(myCookie => myCookie.trim().startsWith('secret_code'));
    const rating = this.state.ratingValue;
    let quote = '';
    // Initially no vote in randomQuote it is set to the 11th passed in quote from Ron S API
    if (!this.state.randomQuote.length) { quote = this.state.quotes[11]}
    else { quote = this.state.randomQuote }; 
    const userVoteInfo = [{
      localSession: localSession,
      cookieSession: cookieSession,
      rating: rating
    }]
    console.log(this.checkIfVoted(quote))
    if(cookieSession !== 'secret_code' && localSession !== 'code') {
      alert('Have you tried refreshing?')
    } else if(this.checkIfVoted(quote)) {
      let resData = await updateRating(quote, userVoteInfo);
      if(resData.code === 422) {
        alert(resData.message)
      } else {
        this.setState(prevState => ({
          ratedQuotes: [resData, ...prevState.ratedQuotes]
        }))
    }
    } else {
      let resData = await postQuoteRating(quote, userVoteInfo);
        if (rating < 5) {
          alert('Doesn\'t matter it was saved as 5 anyways');
        }
      this.setState(prevState => ({
        ratedQuotes: [resData, ...prevState.ratedQuotes]
      }))
    }
  }

  checkIfVoted(quote) {
    console.log('ratedQuotes:', this.state.ratedQuotes);
    let val = this.state.ratedQuotes.find(obj => obj.quote === quote);
    return val ? true : false;
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
          handleSubmit={ this.handleSubmit }          
          />
        <RatedQuotes ratedQuotes={this.state.ratedQuotes}/>
      </main>
    );
  }
}

export default App;
