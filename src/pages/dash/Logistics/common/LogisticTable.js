import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import { Box, Table, TableBody, TableRow, Paper, TableHead, TableCell, TableContainer, Stack } from '@mui/material';
import { TablePagination } from '../../../../utils/memoPaginationUtil';
import { Title, Action } from '../../../../styles/main';
import { GetStaffName } from '../../../../utils/getValueById';

export const Pending = styled('p')(() => ({
  color: '#F29425',
}));

export const Approved = styled('p')(() => ({
  color: '#10A142',
}));

export const LogisticsTable = ({ logistics }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage] = React.useState(16);
  const [paginationPage, setPaginationPage] = React.useState(1);

  console.log(logistics);

  const handleChangePage = (event, newPage) => {
    const page = newPage - 1;
    setPaginationPage(newPage);
    setPage(page);
  };

  const { staffs } = useSelector((state) => state.staff);
  // const { user } = useSelector((state) => state.auth);

  const tableHead = ['S/N', 'Title', 'Purpose', 'Amount', 'Requested By', 'Sent To', 'Date', 'Status', 'Action'];

  return (
    <>
      <Box>
        <TableContainer component={Paper} sx={{ p: 4, my: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 3 }}>
            <Title>Logistic Table</Title>
          </Box>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow
                sx={{
                  ' td,  th': {
                    borderBottom: '0.5px solid #D0D0D0',
                    fontWeight: 800,
                    fontSize: '14px',
                    lineHeight: '16px',
                    color: '#515151',
                    background: 'white',
                    py: 1,
                  },
                }}
              >
                {tableHead.map((td, key) => (
                  <TableCell key={key}>{td}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {logistics?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data, key) => (
                <TableRow key={key} sx={{ ' td,  th': { borderBottom: '0.5px solid #D0D0D0', py: 0 } }}>
                  <TableCell component="th" scope="row">
                    {key + 1}
                  </TableCell>
                  <TableCell>{data?.requestTitle}</TableCell>
                  <TableCell>{data?.purpose}</TableCell>
                  <TableCell>{data?.amount}</TableCell>
                  <TableCell>{GetStaffName(data?.sentFrom, staffs)}</TableCell>
                  <TableCell>
                    {data?.sentTo?.map((item, i) => (
                      <Fragment key={i}>{GetStaffName(item?.recipientId, staffs)}</Fragment>
                    ))}
                  </TableCell>
                  <TableCell>{moment(data?.createdAt).format('L')}</TableCell>
                  <TableCell>Pending</TableCell>
                  <TableCell>
                    <Action>View More</Action>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Stack sx={{ my: 2 }}>
          <TablePagination
            paginationPage={paginationPage}
            total={logistics?.length}
            handleChangePage={handleChangePage}
            rowsPerPage={rowsPerPage}
          />
        </Stack>
      </Box>
    </>
  );
};
LogisticsTable.propTypes = {
  logistics:PropTypes.any,
  
 
  
};

