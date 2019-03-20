import React from 'react';
import '../css/quote.css'

const Quote = (props) => {
  return (
    <div className="quote-wrap">
      <h1>{props.quote}</h1>
    </div>
  );
};

export default Quote;