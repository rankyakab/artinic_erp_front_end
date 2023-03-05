import React from 'react';
import { Box, Table, TableBody, TableRow, Paper, TableHead, TableCell, TableContainer } from '@mui/material';
// import { TablePagination } from '../../../../utils/memoPaginationUtil';
import { Title, Action, Button } from '../../../../styles/main';

export const ClientInvoice = () => {
  const tableHead = ['S/N', 'Invoice Title', 'Action'];

  const tableData = [
    {
      id: '01',
      invoice_title: 'Payment request for project xyz',
    },

    {
      id: '02',
      invoice_title: 'Payment request for system installation',
    },

    {
      id: '03',
      invoice_title: 'Payment request for office equipment supply',
    },

    {
      id: '04',
      invoice_title: 'Payment request for project xyz',
    },

    {
      id: '05',
      invoice_title: 'Payment request for project xyz',
    },
  ];

  return (
    <>
      <Box>
        <TableContainer component={Paper}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 3 }}>
            <Title>Client Invoices</Title>
            <Button
            //   onClick={() => {
            //     navigate('/dashboard/procurement_request');
            //   }}
            >
              View All
            </Button>
          </Box>
          <Table sx={{ minWidth: 450 }} aria-label="simple table">
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
              {tableData?.map((data, key) => (
                <TableRow key={key} sx={{ ' td,  th': { borderBottom: '0.5px solid #D0D0D0', py: 0 } }}>
                  <TableCell component="th" scope="row">
                    {key + 1}
                  </TableCell>
                  <TableCell sx={{ textAlign: 'left' }}>{data.invoice_title}</TableCell>
                  <TableCell>
                    <Action>View More</Action>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export const ClientReceipt = () => {
  const tableHead = ['S/N', 'Invoice Title', 'Action'];

  const tableData = [
    {
      id: '01',
      invoice_title: 'Payment request for project xyz',
    },

    {
      id: '02',
      invoice_title: 'Payment request for system installation',
    },

    {
      id: '03',
      invoice_title: 'Payment request for office equipment supply',
    },

    {
      id: '04',
      invoice_title: 'Payment request for project xyz',
    },

    {
      id: '05',
      invoice_title: 'Payment request for project xyz',
    },
  ];

  return (
    <>
      <Box>
        <TableContainer component={Paper}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 3 }}>
            <Title>Client Invoices</Title>
            <Button
            //   onClick={() => {
            //     navigate('/dashboard/procurement_request');
            //   }}
            >
              View All
            </Button>
          </Box>
          <Table sx={{ minWidth: 450 }} aria-label="simple table">
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
              {tableData?.map((data, key) => (
                <TableRow key={key} sx={{ ' td,  th': { borderBottom: '0.5px solid #D0D0D0', py: 0 } }}>
                  <TableCell component="th" scope="row">
                    {key + 1}
                  </TableCell>
                  <TableCell sx={{ textAlign: 'left' }}>{data.invoice_title}</TableCell>
                  <TableCell>
                    <Action>View More</Action>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};
