import React from 'react';

import PropTypes from 'prop-types';

import classes from './styles.module.scss';

export default function CustomTablePagination({
  count,
  pageNum,
  onPageNumChange,
  paging,
  onPagingChange,
  pagingOptions,
}) {
  const totalPages = Math.ceil(count / paging);

  const from = count === 0 ? 0 : pageNum * paging + 1;
  const to = Math.min(count, (pageNum + 1) * paging);
  const displayedRowsText = `${from}–${to} / ${count}`;

  return (
    <div className={classes.root}>
      <div className={classes.toolbar}>
        <p className={classes.selectLabel}>每頁顯示</p>
        <select
          className={classes.select}
          onChange={(e) => onPagingChange(Number.parseInt(e.target.value, 10))}
          value={paging}
        >
          {pagingOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <p className={classes.displayedRows}>{displayedRowsText}</p>

        <div className={classes.actions}>
          <button
            disabled={pageNum === 0}
            onClick={() => onPageNumChange(0)}
            title="第一頁"
            type="button"
          >
            «
          </button>
          <button
            disabled={pageNum === 0}
            onClick={() => onPageNumChange(pageNum - 1)}
            title="上一頁"
            type="button"
          >
            ‹
          </button>
          <button
            disabled={pageNum >= totalPages - 1 || totalPages === 0}
            onClick={() => onPageNumChange(pageNum + 1)}
            title="下一頁"
            type="button"
          >
            ›
          </button>
          <button
            disabled={pageNum >= totalPages - 1 || totalPages === 0}
            onClick={() => onPageNumChange(Math.max(0, totalPages - 1))}
            title="最後一頁"
            type="button"
          >
            »
          </button>
        </div>
      </div>
    </div>
  );
}

CustomTablePagination.propTypes = {
  count: PropTypes.number.isRequired,
  pageNum: PropTypes.number.isRequired,
  onPageNumChange: PropTypes.func.isRequired,
  paging: PropTypes.number.isRequired,
  onPagingChange: PropTypes.func.isRequired,
  pagingOptions: PropTypes.arrayOf(PropTypes.number),
};

CustomTablePagination.defaultProps = {
  pagingOptions: [10, 25, 50, 100],
};
