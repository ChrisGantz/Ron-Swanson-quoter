import React from 'react';
import '../css/quote.css'

const Quote = (props) => {
  return (
    <div className="quote-wrap">
      <h1>{props.quote}</h1>
      <form>
        <legend>Any rating less than 5 wont be counted</legend>
        <input type="radio" id="rating-1" name="rating" value="1" />
        <label htmlFor="rating-1">1</label>
        <input type="radio" id="rating-2" name="rating" value="2" />
        <label htmlFor="rating-2">2</label>
        <input type="radio" id="rating-3" name="rating" value="3" />
        <label htmlFor="rating-3">3</label>
        <input type="radio" id="rating-4" name="rating" value="4" />
        <label htmlFor="rating-4">4</label>
        <input type="radio" id="rating-5" name="rating" value="5" defaultChecked="checked" />
        <label htmlFor="rating-5">5</label>
      </form>
    </div>
  );
};

export default Quote;