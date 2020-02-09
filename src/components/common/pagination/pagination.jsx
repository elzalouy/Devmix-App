import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);
  return (
    <nav>
      <ul className="pagination brd-1 overflow_hidden">
        {pages.map(page => (
          <li
            key={page}
            className={
              page === currentPage
                ? "page-item active cursor-p"
                : "page-item cursor-p"
            }
          >
            <div className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default Pagination;
