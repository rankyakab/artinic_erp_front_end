import PropTypes from 'prop-types';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import { Pagination, PaginationItem } from '@mui/material';

export const paginationCurrentPage = (total, rowsPerPage = 10) => {
  const reminder = total % rowsPerPage;

  const pages = total - reminder;
  const pagesDiv = pages / rowsPerPage;

  return reminder > total ? pagesDiv + 2 : pagesDiv + 1;
};

export const TablePagination = ({
  paginationPage,
  total,
  handleChangePage,
 
}) => (
    <div
      style={{
        display: 'flex',
        width: '100%',
      }}
    >
      <Pagination
        onChange={handleChangePage}
        page={paginationPage}
        count={paginationCurrentPage(total)}
        variant="outlined"
        shape="rounded"
        renderItem={(item) => (
          <PaginationItem
            components={{
              previous: KeyboardDoubleArrowLeftIcon,
              next: KeyboardDoubleArrowRightIcon,
            }}
            {...item}
            sx={{
              '&.Mui-selected': {
                background: 'linear-gradient(135deg, #14ADD6 0%, #384295 100%)',
                color: '#fff',
                border: 'none',
              },
            }}
          />
        )}
      />
    </div>
  )

  TablePagination.propTypes = {
   paginationPage:PropTypes.any,
  total:PropTypes.any,
  handleChangePage:PropTypes.any
  
 
  
};
