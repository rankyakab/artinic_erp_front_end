import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Table,
  TableBody,
  TableRow,
  Paper,
  TableHead,
  TableCell,
  TableContainer,
  Typography,
  Button,
  Stack,
} from '@mui/material';
import { TablePagination } from '../../../../utils/memoPaginationUtil';
import { Title } from '../../../../styles/main';

export const DeliveryTimeline = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(16);
  const [paginationPage, setPaginationPage] = React.useState(1);

  const handleChangePage = (event, newPage) => {
    const page = newPage - 1;
    setPaginationPage(newPage);
    setPage(page);
  };

  const tableHead = ['S/N', 'Project Name', 'TimeLine', 'Milestone', 'Status'];

  const tableData = [
    {
      id: '01',
      project_name: 'NNPC',
      timeline: '6months',
      milestone: '70% done',
      status: 'Ongoing',
    },

    {
      id: '02',
      project_name: 'NLNG',
      timeline: '3months',
      milestone: '30% done',
      status: 'Ongoing',
    },

    {
      id: '03',
      project_name: 'PPMC',
      timeline: '8months',
      milestone: '100% done',
      status: 'Ongoing',
    },
    {
      id: '04',
      project_name: 'NNPC',
      timeline: '4months',
      milestone: '95% done',
      status: 'Ongoing',
    },
  ];

  return (
    <div>
      <Box sx={{ py: 2 }}>
        <TableContainer component={Paper} sx={{ p: 2 }}>
          <Box sx={{ pb: 3 }}>
            <Title sx={{ fontWeight: 'bold', fontSize: 20 }}>Project Delivery Timeline</Title>
          </Box>
          <Table sx={{ minWidth: 350 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {tableHead.map((td, key) => (
                  <TableCell
                    key={key}
                    sx={{
                      fontWeight: 800,
                      fontSize: '14px',
                      lineHeight: '16px',
                      color: '#515151',
                      background: 'white',
                    }}
                  >
                    {td}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data, key) => (
                <TableRow key={key} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {key + 1}
                  </TableCell>
                  <TableCell>{data.project_name}</TableCell>
                  <TableCell>{data.timeline}</TableCell>
                  <TableCell>{data.milestone}</TableCell>
                  <TableCell>{data.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

export const BudgetPerformance = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(16);
  const [paginationPage, setPaginationPage] = React.useState(1);

  const handleChangePage = (event, newPage) => {
    const page = newPage - 1;
    setPaginationPage(newPage);
    setPage(page);
  };
  const tableHead = ['S/N', 'Project Name', 'Budget', 'Amount Used', 'Performance'];

  const tableData = [
    {
      id: '01',
      project_name: 'NNPC',
      budget: '₦‎3,000,000',
      amount_used: '₦‎5,000,000',
      performances: 'Under',
    },

    {
      id: '02',
      project_name: 'NLNG',
      budget: '₦‎8,000,000',
      amount_used: '₦‎3,000,000',
      performances: 'Normal',
    },

    {
      id: '03',
      project_name: 'PPMC',
      budget: '₦‎5,000,000',
      amount_used: '₦‎2,000,000',
      performances: 'Over',
    },
    {
      id: '04',
      project_name: 'NNPC',
      budget: '₦‎2,000,000',
      amount_used: '₦‎1,500,000',
      performances: 'Normal',
    },
  ];

  return (
    <div>
      <Box sx={{ py: 2 }}>
        <TableContainer component={Paper} sx={{ p: 2 }}>
          <Box sx={{ pb: 3 }}>
            <Title sx={{ fontWeight: 'bold', fontSize: 20 }}>Project Delivery budget</Title>
          </Box>
          <Table sx={{ minWidth: 350 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {tableHead.map((td, key) => (
                  <TableCell
                    key={key}
                    sx={{
                      fontWeight: 800,
                      fontSize: '14px',
                      lineHeight: '16px',
                      color: '#515151',
                      background: 'white',
                      borderoBottom: '1px solid #DDDDDD',
                    }}
                  >
                    {td}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data, key) => (
                <TableRow key={key} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {key + 1}
                  </TableCell>
                  <TableCell>{data.project_name}</TableCell>
                  <TableCell>{data.budget}</TableCell>
                  <TableCell>{data.amount_used}</TableCell>
                  <TableCell>{data.performances}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};
