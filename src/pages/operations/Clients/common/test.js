import React, { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import {
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
  CircularProgress,
  Box,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import DashboardHeader from '../../../layouts/dashboard/DashboardHeader';
import {
  GeneralInput,
  HeadCard,
  Wrapper,
  FormCard,
  Button,
  Title,
  InputLabel,
  OutlinedButton,
} from '../../../styles/main';
import { TablePagination } from '../../../utils/memoPaginationUtil';
import SuccessCard from '../../../components/SuccessCard';
import ErrorCard from '../../../components/ErrorCard';
import { createClients, deleteClients, editClients, getAllClients } from '../../../redux/actions/ClientsAction';
import { capitalize } from '../../../utils/formatNumber';
import { GetStaffName } from '../../../utils/getValueById';
import { getAllStaffs } from '../../../redux/actions/StaffAction';

function Clients() {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const { clients, loading } = useSelector((state) => state.clients);
  const { staffs } = useSelector((state) => state.staff);
  const [deleting, setDeleting] = useState(false);
  const [editing, setEditing] = useState(false);
  const [deletingId, setDeletingId] = useState('');
  const [editId, setEditId] = useState('');
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(16);
  const [paginationPage, setPaginationPage] = React.useState(1);

  const [clientData, setClientData] = useState({
    email: '',
    phoneNumber: '',
    companyAddress: '',
    companyName: '',
  });

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
    setClientData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const tableHead = ['S/N', 'Company', ' Email Address', 'Company Address', 'Phone Number', 'Action'];

  const handleCreateClients = (e) => {
    e.preventDefault();
    if (editId === ' ') {
      dispatch(createClients(clientData, setErrorMessage, setSuccessMessage, setOpen, setError));
    } else {
      dispatch(editClients(editId, clientData, setErrorMessage, setSuccessMessage, setOpen, setError, setEditing));
      setEditId(' ');
      setClientData((prev) => ({
        ...prev,
        action: '',
      }));
    }
  };

  useEffect(() => {
    dispatch(getAllClients());
    dispatch(getAllStaffs());
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
        <title> Action |Relia Energy</title>
      </Helmet>

      <Wrapper>
        <DashboardHeader title={'Clients'} text={'Create a new action'} />
        <FormCard onSubmit={handleCreateClients}>
          <Title>Create Clients</Title>
          <Grid container sx={{ mt: 4 }}>
            <Grid item xs={12} md={4}>
              <Stack>
                <InputLabel id="email">Email Address</InputLabel>
                <GeneralInput
                  ref={inputRef}
                  variant="outlined"
                  fullWidth
                  onChange={(e) => handleFormChange(e.target)}
                  placeholder="Enter Client Email"
                  name="email"
                  value={clientData?.email}
                />
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Stack>
                <InputLabel id="phoneNumber">Phone Number</InputLabel>
                <GeneralInput
                  ref={inputRef}
                  variant="outlined"
                  fullWidth
                  onChange={(e) => handleFormChange(e.target)}
                  placeholder="Enter Client Phone Number"
                  name="phoneNumber"
                  value={clientData?.phoneNumber}
                />
              </Stack>
            </Grid>

            <Grid item xs={12} md={4}>
              <Stack>
                <InputLabel id="companyName">Company</InputLabel>
                <GeneralInput
                  ref={inputRef}
                  variant="outlined"
                  fullWidth
                  onChange={(e) => handleFormChange(e.target)}
                  placeholder="Enter Client Company"
                  name="companyName"
                  value={clientData?.companyName}
                />
              </Stack>
            </Grid>

            <Grid item xs={12} md={4}>
              <Stack>
                <InputLabel id="companyAddress">Company Address</InputLabel>
                <GeneralInput
                  ref={inputRef}
                  variant="outlined"
                  fullWidth
                  onChange={(e) => handleFormChange(e.target)}
                  placeholder="Enter Company Address"
                  name="companyAddress"
                  value={clientData?.companyAddress}
                />
              </Stack>
            </Grid>

            <Grid item xs={12} md={4} sx={{ pt: 4 }}>
              <Button type="submit" sx={{ width: '95%' }}>
                Create Clients
                {loading ? 'Loading...' : editId !== ' ' ? 'Edit Action' : 'Create'}
              </Button>
            </Grid>
          </Grid>
        </FormCard>

        <Box sx={{ my: 3 }}>
          <TableContainer component={Paper} sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 3 }}>
              <Typography sx={{ fontWeight: 'bold', fontSize: 20 }}> All Clients</Typography>
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
                {clients?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data, key) => (
                  <TableRow key={key} sx={{ ' td,  th': { borderBottom: '0.5px solid #D0D0D0', py: 0 } }}>
                    <TableCell component="th" scope="row">
                      {key + 1}
                    </TableCell>
                    <TableCell>{data?.companyName}</TableCell>
                    <TableCell>{data.email}</TableCell>
                    <TableCell>{data?.companyAddress}</TableCell>
                    <TableCell>{data.phoneNumber}</TableCell>

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
                          setClientData((prev) => ({
                            ...prev,
                            action: data?.action,
                          }));
                          setEditId(data?._id);
                        }}
                        role="presentation"
                      >
                        <Edit
                          sx={{
                            margin: ' 0px 10px',
                          }}
                        />
                        <p>{editing && data?._id === editId ? 'editing...' : 'Edit'}</p>
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          color: ' #eb5757',
                          cursor: 'pointer',
                        }}
                        onClick={() => {
                          dispatch(
                            deleteClients(data?._id, setErrorMessage, setSuccessMessage, setOpen, setError, setDeleting)
                          );
                          setDeletingId(key);
                        }}
                        role="presentation"
                      >
                        <Delete
                          sx={{
                            margin: ' 0px 10px',
                          }}
                        />
                        <p> {deleting && key === deletingId ? 'deleting...' : 'Delete'} </p>
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
              total={clients?.length}
              handleChangePage={handleChangePage}
              rowsPerPage={rowsPerPage}
            />
          </Stack>
        </Box>
      </Wrapper>
    </>
  );
}

export default Clients;
