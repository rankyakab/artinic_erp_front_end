import React, { useEffect, useRef, useState } from 'react';
import {
  Button,
  Grid,
  Table,
  TableBody,
  TableRow,
  Paper,
  TableHead,
  TableCell,
  TableContainer,
  Typography,
  Stack,
  Box,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import DashboardHeader from '../../../layouts/dashboard/DashboardHeader';
import {  HeadCard, Wrapper } from '../../../styles/main';
import { TablePagination } from '../../../utils/memoPaginationUtil';
import SuccessCard from '../../../components/SuccessCard';
import ErrorCard from '../../../components/ErrorCard';
import { createRole, deleteRole, getAllRole } from '../../../redux/actions/RoleAction';
import { capitalize } from '../../../utils/formatNumber';
import { checkPrivilege } from '../../../utils/checkPrivilege';
import * as rolePrivilege from '../../../utils/privilege/role';

function Roles() {
  const dispatch = useDispatch();
  const { roles, loading } = useSelector((state) => state.role);
  const inputRef = useRef();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(16);
  const [paginationPage, setPaginationPage] = React.useState(1);

  const [roleData, setRoleData] = useState({
    role: '',
  });

  console.log(roles);

  const handleClose = () => {
    setOpen(false);
    setError(false);
  };

  const handleClick = () => {
    handleClose();
  };
  const handleChangePage = (event, newPage) => {
    const page = newPage - 1;
    setPaginationPage(newPage);
    setPage(page);
  };

  const handleFormChange = ({ name, value }) => {
    console.log("role name",  {name, value});
    setRoleData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const tableHead = ['S/N', 'Roles', 'Action'];

  const handleCreateRole = (e) => {
    e.preventDefault();
    dispatch(createRole(roleData, setErrorMessage, setSuccessMessage, setOpen, setError));
  };

  useEffect(() => {
    dispatch(getAllRole());
  }, []);
  return (
    <>
      <SuccessCard
        open={open}
        handleClose={handleClose}
        message={successMessage}
        btnText={'Continue'}
        handleClick={handleClick}
      />
      <ErrorCard
        open={error}
        handleClose={handleClose}
        message={errorMessage}
        btnText={'Continue'}
        handleClick={handleClick}
      />
      <Helmet>
        <title> Roles |Relia Energy</title>
      </Helmet>

      <Wrapper>
        <DashboardHeader title={'Roles'} text={'Create a new role'} />

        <HeadCard>
          <Stack
            direction={'row'}
            justifyContent="space-between"
            alignItems={'center'}
            width="100%"
            component={'form'}
            onSubmit={handleCreateRole}
            spacing={6}
          >
            
          
                 <input
              ref={inputRef}
              //   fullWidth
              placeholder="Enter action"
              name="role"
              value={roleData?.role}
              onChange={(e) => handleFormChange(e.target)}
              style={{
                marginBottom: 0,
                display: 'flex',
                justifyContent: 'center',
                border: '1px solid #d0d0d0',
                borderRadius: '10px',
                width: '50%',
                height: '55px',
                outline: 'none',
                padding: '1rem',
              }}
            />
            <Button
              type="submit"
              sx={{ color: 'white', background: 'linear-gradient(135deg, #14ADD6 0%, #384295 100%)', py: 1.5, px: 5 }}
            >
              {loading ? 'Loading...' : 'Create'}
            </Button>
           
          
           
          </Stack>
        </HeadCard>

        <Box sx={{ my: 3 }}>
          <TableContainer component={Paper} sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 3 }}>
              <Typography sx={{ fontWeight: 'bold', fontSize: 20 }}> All Roles</Typography>
              <p>
                Showing <span>13</span> per page
              </p>
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
                {roles?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data, key) => (
                  <TableRow key={key} sx={{ ' td,  th': { borderBottom: '0.5px solid #D0D0D0', py: 0 } }}>
                    <TableCell component="th" scope="row">
                      {key + 1}
                    </TableCell>
                    <TableCell>{capitalize(data?.role)}</TableCell>

                    <TableCell
                      sx={{
                        display: 'flex !important',
                        alignItems: 'center !important',
                      }}
                    >
                     
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: ' #2d9cdb !important',
                          cursor: 'pointer',
                        }}
                        onClick={() => {
                          inputRef.current.focus();
                          console.log('click');
                          console.log(inputRef.current);
                        }}
                        role="presentation"
                      >
                        <Edit
                          sx={{
                            margin: ' 0px 10px',
                          }}
                        />
                        <p>Edit</p>
                      </div>
                      
                     
                        <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          color: ' #eb5757',
                          cursor: 'pointer',
                        }}
                        onClick={() => {
                          dispatch(deleteRole(data?._id, setErrorMessage, setSuccessMessage, setOpen, setError));
                        }}
                        role="presentation"
                      >
                        <Delete
                          sx={{
                            margin: ' 0px 10px',
                          }}
                        />
                        <p>Delete</p>
                      </div>
                     
                      
                    </TableCell>
                    
                  </TableRow>
                  
                  
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Stack sx={{ my: 5 }}>
            <TablePagination
              paginationPage={paginationPage}
              total={roles?.length}
              handleChangePage={handleChangePage}
              rowsPerPage={rowsPerPage}
            />
          </Stack>
        </Box>
      </Wrapper>
    </>
  );
}

export default Roles;
