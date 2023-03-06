import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Table, TableBody, TableRow, Paper, TableHead, TableCell, TableContainer, Stack } from '@mui/material';
import { TablePagination } from '../../../../utils/memoPaginationUtil';
import { Title, Action, Button } from '../../../../styles/main';

export const AllReports = () => {
  const navigate = useNavigate();

  const tableHead = [
    'S/N',
    'Project Name',
    'Project Manager',
    'Prepared By',
    'Report Type',
    'Project Status',
    'Action',
  ];

  const tableData = [
    {
      id: '01',
      project_name: 'Fintech Mobile App Development',
      project_manager: 'Abubakar Sadiq',
      prepared_by: 'Fatima Mohammed',
      report_type: 'Quarterly',
      project_status: 'Ongoing',
    },

    {
      id: '02',
      project_name: 'Fintech Mobile App Development',
      project_manager: 'Abubakar Sadiq',
      prepared_by: 'Fatima Mohammed',
      report_type: 'Quarterly',
      project_status: 'Ongoing',
    },

    {
      id: '03',
      project_name: 'Fintech Mobile App Development',
      project_manager: 'Abubakar Sadiq',
      prepared_by: 'Fatima Mohammed',
      report_type: 'Quarterly',
      project_status: 'Ongoing',
    },

    {
      id: '04',
      project_name: 'Fintech Mobile App Development',
      project_manager: 'Abubakar Sadiq',
      prepared_by: 'Fatima Mohammed',
      report_type: 'Quarterly',
      project_status: 'Ongoing',
    },

    {
      id: '05',
      project_name: 'Fintech Mobile App Development',
      project_manager: 'Abubakar Sadiq',
      prepared_by: 'Fatima Mohammed',
      report_type: 'Quarterly',
      project_status: 'Ongoing',
    },
  ];

  return (
    <>
      <Box>
        <TableContainer component={Paper}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 3 }}>
            <Title>All Reports</Title>
            <Button
              onClick={() => {
                navigate('/dashboard/create-reports');
              }}
            >
              Generate Report
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
                  <TableCell>{data.project_name}</TableCell>
                  <TableCell>{data.project_manager}</TableCell>
                  <TableCell>{data.prepared_by}</TableCell>
                  <TableCell>{data.report_type}</TableCell>
                  <TableCell>{data.project_status}</TableCell>
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
