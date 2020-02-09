import React from "react";

export default function FeedbacksList({ feedbacks }) {
  return (
    <React.Fragment>
      {feedbacks && (
        <div
          id="demo"
          className="col-12 mt-3 carousel slide"
          data-ride="carousel"
        >
          <ul className="carousel-indicators z-index-0">
            {feedbacks.map(item => (
              <li
                data-target="#demo"
                key={item._id}
                data-slide-to={feedbacks.indexOf(item)}
              ></li>
            ))}
          </ul>
          <div className="carousel-inner">
            {feedbacks.map(item => (
              <div
                key={feedbacks.indexOf(item)}
                className={
                  feedbacks.indexOf(item) === 0
                    ? "carousel-item mb-5 active"
                    : "carousel-item mb-5"
                }
              >
                <h3 className="text-white">{item.feedback}</h3>
              </div>
            ))}
          </div>
          <a className="carousel-control-prev" href="#demo" data-slide="prev">
            <span className="carousel-control-prev-icon"></span>
          </a>
          <a className="carousel-control-next" href="#demo" data-slide="next">
            <span className="carousel-control-next-icon"></span>
          </a>
        </div>
      )}
    </React.Fragment>
  );
}
