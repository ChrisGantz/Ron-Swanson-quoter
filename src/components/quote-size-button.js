import React from 'react';
import '../css/quote-size-button.css';

const QuoteSize = (props) => {
  return (
    <div className="quote-buttons-wrap">
      {console.log(props)}
      <button className="quote-size-button" onClick={(e) => props.onClickChangeQuote(e)} value="any">Any quote</button>
      <button className="quote-size-button" onClick={(e) => props.onClickChangeQuote(e)} value="large">Large quote</button>
      <button className="quote-size-button" onClick={(e) => props.onClickChangeQuote(e)} value="medium">Medium quote</button>
      <button className="quote-size-button" onClick={(e) => props.onClickChangeQuote(e)} value="small">Small quote</button>
    </div>
  );
};

export default QuoteSize;