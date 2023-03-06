import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Table, TableBody, TableRow, Paper, TableHead, TableCell, TableContainer, Stack } from '@mui/material';
import { TablePagination } from '../../../../utils/memoPaginationUtil';
import { Title, Button } from '../../../../styles/main';

export const Failed = styled('p')(() => ({
  color: '#B93B3F',
}));

export const Approved = styled('p')(() => ({
  color: '#10A142',
}));

export const BudgetHistory = ({ budgets }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(16);
  const [paginationPage, setPaginationPage] = React.useState(1);

  const handleChangePage = (event, newPage) => {
    const page = newPage - 1;
    setPaginationPage(newPage);
    setPage(page);
  };

  const tableHead = [
    'S/N',
    'Budget No.',
    'Budget Description',
    'Budgeted Amunt (₦)',
    'Actual Amount (₦)',
    'Variance (₦)',
    'Date',
  ];

  const tableData = [
    {
      id: '01',
      budget_no: '00211235',
      budget_description: 'Purchase of 10 units, 2Hp Hisense Air Conditions',
      budget_amount: '400,000.00',
      actual_amount: '1,380,000.00',
      variance: <Failed>-100,000.00</Failed>,
      date: '21/11/2022',
    },

    {
      id: '02',
      budget_no: '00211235',
      budget_description: 'Purchase of office equipments',
      budget_amount: '360,000.00',
      actual_amount: '1,380,000.00',
      variance: <Approved>+20,000.00</Approved>,
      date: '21/11/2022',
    },

    {
      id: '03',
      budget_no: '00211235',
      budget_description: 'Purchase of 10 units, 2Hp Hisense Air Conditions',
      budget_amount: '1,400,000.00',
      actual_amount: '1,380,000.00',
      variance: <Approved>+20,000.00</Approved>,
      date: '21/11/2022',
    },
  ];

  return (
    <>
      <Box>
        <TableContainer component={Paper}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 3 }}>
            <Title>Budget History</Title>
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
              {budgets?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data, key) => (
                <TableRow key={key} sx={{ ' td,  th': { borderBottom: '0.5px solid #D0D0D0', py: 2 } }}>
                  <TableCell component="th" scope="row">
                    {key + 1}
                  </TableCell>
                  <TableCell>{data?.budgetNumber}</TableCell>
                  <TableCell>{data?.budgetDescription}</TableCell>
                  <TableCell>{data?.budgetAmount}</TableCell>
                  <TableCell>{data?.actualAmount}</TableCell>
                  <TableCell>{data?.variance}</TableCell>
                  <TableCell>{data?.createdAt}</TableCell>
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

export const RequestTable = () => {
  const tableHead = ['S/N', 'Budget No.', 'Budget Description', 'Budget Amunt (₦)', 'Date'];

  const tableData = [
    {
      id: '01',
      budget_no: '00211235',
      budget_description: 'Purchase of 10 units, 2Hp Hisense Air Conditions',
      budget_amount: '1,400,000.00',
      date: '21/11/2022',
    },
  ];

  return (
    <>
      <Box>
        <TableContainer component={Paper}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 3 }}>
            <Title>Budget Request</Title>
          </Box>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow
                sx={{
                  'td,  th': {
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
                <TableRow key={key} sx={{ ' td,  th': { borderBottom: '0.5px solid #D0D0D0', py: 2 } }}>
                  <TableCell component="th" scope="row">
                    {key + 1}
                  </TableCell>
                  <TableCell>{data.budget_no}</TableCell>
                  <TableCell>{data.budget_description}</TableCell>
                  <TableCell>{data.budget_amount}</TableCell>
                  <TableCell>{data.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Box sx={{ my: 5 }}>
            <Button>Submit for Approval</Button>
          </Box>
        </TableContainer>
      </Box>
    </>
  );
};
