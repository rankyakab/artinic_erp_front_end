import React, { useEffect, useState } from 'react';
import { Stack, Box, Grid } from '@mui/material';
import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { Helmet } from 'react-helmet-async';
// import DashboardHeader from '../../../../layouts/dashboard/DashboardHeader';
import { FormCard, Button, Title, GeneralInput, InputLabel } from '../../../../styles/main';
import { editClients, getAllClients } from '../../../../redux/actions/ClientsAction';
import SuccessCard from '../../../../components/SuccessCard';
import ErrorCard from '../../../../components/ErrorCard';

const EditClients = () => {
  const dispatch = useDispatch();
 // const navigate = useNavigate();
  // const { clients, loading } = useSelector((state) => state.clients);
  const [editing, setEditing] = useState(false);
  console.log(editing);
  const [editId, setEditId] = useState('');
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
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

  const handleFormChange = ({ name, value }) => {
    setClientData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditClients = (e) => {
    e.preventDefault();
    dispatch(editClients(editId, clientData, setErrorMessage, setSuccessMessage, setOpen, setError, setEditing));
    setEditId(' ');
    setClientData((prev) => ({
      ...prev,
      email: '',
      phoneNumber: '',
      companyAddress: '',
      companyName: '',
    }));
  };

  useEffect(() => {
    dispatch(getAllClients());
  });

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 900,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    px: 4,
  };

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
      <Box sx={style}>
        <FormCard onSubmit={handleEditClients}>
          <Title>Edit Clients</Title>
          <Grid container sx={{ mt: 2 }}>
            <Grid item xs={12} md={4}>
              <Stack>
                <InputLabel id="email">Email Address</InputLabel>
                <GeneralInput
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
                Edit
              </Button>
            </Grid>
          </Grid>
        </FormCard>
      </Box>
    </>
  );
};

export default EditClients;
