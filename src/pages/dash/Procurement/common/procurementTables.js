import PropTypes from 'prop-types';
import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Table, TableBody, TableRow, Paper, TableHead, TableCell, TableContainer, Stack } from '@mui/material';
import { TablePagination } from '../../../../utils/memoPaginationUtil';
import { Title, Action } from '../../../../styles/main';

export const Pending = styled('p')(() => ({
  color: '#F29425',
}));

export const Approved = styled('p')(() => ({
  color: '#10A142',
}));

export const ProcurementRequests = ({ procurements }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage] = React.useState(16);
  const [paginationPage, setPaginationPage] = React.useState(1);

  const handleChangePage = (event, newPage) => {
    const page = newPage - 1;
    setPaginationPage(newPage);
    setPage(page);
  };

  const tableHead = ['S/N', 'Item', 'Qty', 'Amount', 'Requested By', 'Sent to', 'Date', 'Status', 'Action'];

  const tableData = [
    {
      id: '01',
      item: 'Office chairs',
      qty: '20',
      amount: '360,000.00',
      requested_by: 'Otor John',
      sent_to: 'Faruk Hashim',
      date: '21/11/2022',
      status: <Pending>Pending</Pending>,
    },

    {
      id: '02',
      item: 'Office chairs',
      qty: '20',
      amount: '360,000.00',
      requested_by: 'Otor John',
      sent_to: 'Faruk Hashim',
      date: '21/11/2022',
      status: <Approved>Approved</Approved>,
    },

    {
      id: '03',
      item: 'Office chairs',
      qty: '20',
      amount: '360,000.00',
      requested_by: 'Otor John',
      sent_to: 'Faruk Hashim',
      date: '21/11/2022',
      status: <Approved>Approved</Approved>,
    },
  ];

  console.log(procurements, 'hello');

  return (
    <>
      <Box>
        <TableContainer component={Paper}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 3 }}>
            <Title>Procurement request</Title>
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
              {procurements?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data, key) => (
                <TableRow key={key} sx={{ ' td,  th': { borderBottom: '0.5px solid #D0D0D0', py: 0 } }}>
                  <TableCell component="th" scope="row">
                    {key + 1}
                  </TableCell>
                  <TableCell>{data?.itemName}</TableCell>
                  <TableCell>{data?.itemQuantity}</TableCell>
                  <TableCell>{data.amount}</TableCell>
                  <TableCell>{data?.requestedBy}</TableCell>
                  <TableCell>{data?.sentTo}</TableCell>
                  <TableCell>{data?.createdAt}</TableCell>
                  <TableCell>{data?.status}</TableCell>
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
            total={tableData.length}
            handleChangePage={handleChangePage}
            rowsPerPage={rowsPerPage}
          />
        </Stack>
      </Box>
    </>
  );
};


ProcurementRequests.propTypes = {
  procurements:PropTypes.any,
  
 
  
};
