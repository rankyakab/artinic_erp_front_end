import React, {  useState } from 'react';
import { Stack,  Grid } from '@mui/material';
import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { Helmet } from 'react-helmet-async';
// import DashboardHeader from '../../../../layouts/dashboard/DashboardHeader';
import { FormCard,  Button, Title, GeneralInput, InputLabel } from '../../../../styles/main';
// import Back from '../../../../assets/images/arrow_left.svg';
import SuccessCard from '../../../../components/SuccessCard';
import ErrorCard from '../../../../components/ErrorCard';
import { createClients } from '../../../../redux/actions/ClientsAction';
// import { createCircular } from '../../../redux/actions/CircularAction';

const CreateClient = () => {
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

  const dispatch = useDispatch();
 // const navigate = useNavigate();

  const handleCreateClients = (e) => {
    e.preventDefault();
    dispatch(createClients(clientData, setErrorMessage, setSuccessMessage, setOpen, setError));
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

      <FormCard onSubmit={handleCreateClients}>
        <Title>Create Clients</Title>
        <Grid container sx={{ mt: 4 }}>
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
              Create Clients
            </Button>
          </Grid>
        </Grid>
      </FormCard>
    </>
  );
};

export default CreateClient;
