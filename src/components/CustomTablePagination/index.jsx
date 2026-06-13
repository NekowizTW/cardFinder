import React from 'react';

import { TablePagination } from '@mui/base/TablePagination';
import PropTypes from 'prop-types';

import classes from './styles.module.scss';

export default function CustomTablePagination({
  count, pageNum, onPageNumChange, paging, onPagingChange, pagingOptions,
}) {
  return (
    <TablePagination
      count={count}
      labelRowsPerPage="每頁顯示"
      onPageChange={(_, value) => onPageNumChange(value)}
      onRowsPerPageChange={(e) => onPagingChange(Number.parseInt(e.target.value, 10))}
      page={pageNum}
      rowsPerPage={paging}
      rowsPerPageOptions={pagingOptions}
      slotProps={{
        root: { className: classes.root },
        spacer: { className: classes.spacer },
        toolbar: { className: classes.toolbar },
        selectLable: { className: classes.selectLable },
        select: { className: classes.select },
        displayedRows: { className: classes.displayedRows },
        actions: {
          className: classes.actions,
          showFirstButton: true,
          showLastButton: true,
        },
      }}
      slots={{
        root: 'div',
      }}
    />
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
