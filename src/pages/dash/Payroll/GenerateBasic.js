import React, { useState, useEffect } from 'react';
import { Grid, Button, TextField, FormLabel, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import DashboardHeader from '../../../layouts/dashboard/DashboardHeader';
import { StaffDetailsTable } from './common/PaySlipTable';
import { Wrapper, FormCard, Title } from '../../../styles/main';
import Back from '../../../assets/images/arrow_left.svg';
import SuccessCard from '../../../components/SuccessCard';
import ErrorCard from '../../../components/ErrorCard';
import { createPosition } from '../../../redux/actions/PositionAction';

const GenerateBasic = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { loading } = useSelector((state) => state.payroll);

  const [data, setData] = useState({
    title: '',
    level: '',
    basic: '',
  });

  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
    setError(false);
  };

  const handleClick = () => {
    handleClose();
  };

  const handleFormChange = ({ name, value }) => {
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBasic = (e) => {
    e.preventDefault();
    console.log(data);
    dispatch(createPosition(data, setOpen, setError, setErrorMessage, setSuccessMessage));
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
      <Helmet>
        <title> Generate Basic | Relia Energy</title>
      </Helmet>

      <Wrapper>
        <DashboardHeader title={'Payroll'} icon={'eva:dollar-fill'} text={'Generate and send payroll to account.'} />

        <Stack>
          <Typography
            sx={{ color: 'primary.main', cursor: 'pointer', display: 'flex' }}
            onClick={() => {
              navigate('/dashboard/payroll');
            }}
          >
            <img src={Back} alt="back" style={{ marginRight: '0.5rem' }} />
            Back
          </Typography>
        </Stack>

        <FormCard sx={{ mt: 4 }} onSubmit={handleBasic}>
          <Title>Generate Basic</Title>

          <Grid container sx={{ mt: 5 }}>
            <Grid xs={12} md={4}>
              <Stack>
                <FormLabel id="last_name" sx={{ width: '100%', color: 'black', pb: 1, fontSize: '14px' }}>
                  Title
                </FormLabel>
                <TextField
                  sx={{ mb: 3, width: '95%' }}
                  variant="outlined"
                  value={data?.title}
                  onChange={(e) => handleFormChange(e.target)}
                  name="title"
                  className="generate-payroll-input"
                  placeholder="Enter Title"
                />
              </Stack>
            </Grid>

            <Grid xs={12} md={4}>
              <Stack>
                <FormLabel id="last_name" sx={{ width: '100%', color: 'black', pb: 1, fontSize: '14px' }}>
                  Level
                </FormLabel>
                <TextField
                  sx={{ mb: 3, width: '95%' }}
                  variant="outlined"
                  value={data?.level}
                  onChange={(e) => handleFormChange(e.target)}
                  name="level"
                  fullWidth
                  placeholder="Enter Level"
                  className="generate-payroll-input"
                />
              </Stack>
            </Grid>

            <Grid xs={12} md={4}>
              <Stack>
                <FormLabel id="last_name" sx={{ width: '100%', color: 'black', pb: 1, fontSize: '14px' }}>
                  Basic
                </FormLabel>
                <TextField
                  sx={{ mb: 3, width: '95%' }}
                  variant="outlined"
                  fullWidth
                  value={data?.basic}
                  onChange={(e) => handleFormChange(e.target)}
                  name="basic"
                  className="generate-payroll-input"
                  placeholder="Input Basic"
                  type={'number'}
                />
              </Stack>
            </Grid>
          </Grid>

          <Button
            sx={{
              color: 'white',
              background: 'linear-gradient(135deg, #14ADD6 0%, #384295 100%)',
              py: 1,
              px: 5,
            }}
            type="submit"
          >
            {loading ? 'Loading...' : ' Generate Basic'}
          </Button>
        </FormCard>
      </Wrapper>
    </>
  );
};

export default GenerateBasic;
