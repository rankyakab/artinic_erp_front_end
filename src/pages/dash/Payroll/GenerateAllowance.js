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
import { createAllowance } from '../../../redux/actions/AllowanceAction';
import { getAllPositions } from '../../../redux/actions/PositionAction';

const GenerateAllowance = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { loading } = useSelector((state) => state.payroll);
  const { positions } = useSelector((state) => state.payroll);

  console.log(positions);

  const [data, setData] = useState({
    allowanceName: '',
    allowanceAmount: '',
    positionTreeId: '',
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

  const handleAllowance = (e) => {
    e.preventDefault();
    console.log(data);
    dispatch(createAllowance(data, setOpen, setError, setErrorMessage, setSuccessMessage));
  };

  useEffect(() => {
    dispatch(getAllPositions());
  }, [dispatch]);

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
        <title> Generate Allowance | Relia Energy</title>
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

        <FormCard sx={{ mt: 4 }} onSubmit={handleAllowance}>
          <Title>Generate Allowance</Title>

          <Grid container sx={{ mt: 5 }}>
            <Grid xs={12} md={4}>
              <Stack>
                <FormLabel id="last_name" sx={{ width: '100%', color: 'black', pb: 1, fontSize: '14px' }}>
                  Allowance Name
                </FormLabel>
                <TextField
                  sx={{ mb: 3, width: '95%' }}
                  variant="outlined"
                  value={data?.allowanceName}
                  onChange={(e) => handleFormChange(e.target)}
                  name="allowanceName"
                  className="generate-payroll-input"
                  placeholder="Enter name"
                />
              </Stack>
            </Grid>

            <Grid xs={12} md={4}>
              <Stack>
                <FormLabel id="last_name" sx={{ width: '100%', color: 'black', pb: 1, fontSize: '14px' }}>
                  Allowance Amount
                </FormLabel>
                <TextField
                  sx={{ mb: 3, width: '95%' }}
                  variant="outlined"
                  value={data?.allowanceAmount}
                  onChange={(e) => handleFormChange(e.target)}
                  name="allowanceAmount"
                  fullWidth
                  placeholder="Enter amount"
                  className="generate-payroll-input"
                />
              </Stack>
            </Grid>

            <Grid xs={12} md={4}>
              <Stack>
                <FormLabel id="last_name" sx={{ width: '100%', color: 'black', pb: 1, fontSize: '14px' }}>
                  Position
                </FormLabel>
                <TextField
                  sx={{ mb: 3, width: '95%' }}
                  variant="outlined"
                  value={data?.positionTreeId}
                  onChange={(e) => handleFormChange(e.target)}
                  name="positionTreeId"
                  fullWidth
                  className="generate-payroll-input"
                  select
                  placeholder="Input Basic"
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option value="">Select Position</option>
                  {React.Children.toArray(
                    positions?.map((staff) => <option value={staff?._id}>{staff?.title}</option>)
                  )}
                </TextField>
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
            {loading ? 'Loading...' : ' Generate  Allowance'}
          </Button>
        </FormCard>
      </Wrapper>
    </>
  );
};

export default GenerateAllowance;
