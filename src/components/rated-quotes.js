import React from 'react';
import '../css/rated-quotes.css';

const RatedQuotes = (props) => {

  if(!props.ratedQuotes.length) {
    return <p className="no-rate-quote">Be the first to rate a quote</p>
  } else {
  return (
      <div className="rated-quotes-wrap">
        <ul>
        {props.ratedQuotes.map(obj => {
          let totalRating = 0
          obj.userVotes.forEach(obj => totalRating += obj.rating)
          const avgRating = totalRating/obj.userVotes.length
          return (
          <li key={obj._id}>
            {obj.quote}
            <div className={`star rating-${Math.floor(avgRating)}`}>
              <span className="fa fa-star star1"></span>
              <span className="fa fa-star star2"></span>
              <span className="fa fa-star star3"></span>
              <span className="fa fa-star star4"></span>
              <span className="fa fa-star star5"></span>
              <span>{avgRating.toFixed(1)}</span>
            </div>
          </li>
        )})}
        </ul>
      </div>
    );
  }
};

export default RatedQuotes;