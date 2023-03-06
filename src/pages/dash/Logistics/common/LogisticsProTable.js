import React from 'react';
import { Box, Table, TableBody, TableRow, Paper, TableHead, TableCell, TableContainer, Stack } from '@mui/material';
import { Title } from '../../../../styles/main';
import { TablePagination } from '../../../../utils/memoPaginationUtil';

const LogisticsTable = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(16);
  const [paginationPage, setPaginationPage] = React.useState(1);

  const handleChangePage = (event, newPage) => {
    const page = newPage - 1;
    setPaginationPage(newPage);
    setPage(page);
  };

  const tableHead = ['S/N', 'Request Title', 'Purpose', 'Date From', 'Date To', 'Amount (₦)?'];

  const tableData = [
    {
      title: 'Request for travel time',
      purpose: 'Training course',
      dateFrom: '22/11/2022',
      dataTo: '30/11/2022',
      amount: '360,000.00',
    },
  ];
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
              {tableData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data, key) => (
                <TableRow key={key} sx={{ ' td,  th': { borderBottom: '0.5px solid #D0D0D0', py: 0 } }}>
                  <TableCell component="th" scope="row">
                    {key + 1}
                  </TableCell>
                  <TableCell>{data.title}</TableCell>
                  <TableCell>{data.purpose}</TableCell>
                  <TableCell>{data.dateFrom}</TableCell>
                  <TableCell>{data.dateTo}</TableCell>
                  <TableCell>{data.amount}</TableCell>
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
export default LogisticsTable;
