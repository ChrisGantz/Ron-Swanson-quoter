import React from 'react';
import '../css/rated-quotes.css';

const RatedQuotes = (props) => {

  if(!props.ratedQuotes.length) {
    return <p>Rate a quote</p>
  } else {
  return (
      <div className="rated-quotes-wrap">
        <ul>
        {props.ratedQuotes.map(obj => (
          <li key={obj._id}>
            {obj.quote}
            <div className={`star rating-${obj.rating}`}>
              <span className="fa fa-star star1"></span>
              <span className="fa fa-star star2"></span>
              <span className="fa fa-star star3"></span>
              <span className="fa fa-star star4"></span>
              <span className="fa fa-star star5"></span>
            </div>
          </li>
        ))}
        </ul>
      </div>
    );
  }
};

export default RatedQuotes;