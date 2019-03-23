import React from 'react';
import '../css/quote.css'

const Quote = (props) => {
  return (
    <div className="quote-wrap">
      <h1>{props.quote}</h1>
      <form onSubmit={(e) => props.handleSubmit(e)}>
        <legend>I'll give you bacon if you rate only 5's</legend>
        <div onChange={(e) => props.handleRadioButtonChange(e)}>
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
        </div>
        <div>
          <button type="submit">submit</button>
        </div>
      </form>
    </div>
  );
};

export default Quote;