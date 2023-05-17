import React from 'react';

const WashHistory = ({ washDates }) => {
  return (
    <div className="wash-history">
      <div className="date-column">
        {washDates.map((date, index) => (
          <div className="date-item" key={index}>
            <div className="date-number">{index + 1}</div>
            <div className="date-text">{date}</div>
            {index + 1 === washDates.length && (
              <div className="status-text">
                {index + 1 === 6 ? 'Congratulations! You Earned a Free Wash' : 'Washed'}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WashHistory;
