import React, { useState, useEffect } from 'react';
import { Grid, Button, TextField, FormLabel, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
// import { useSettingsContext } from '../../../components/settings';
import DashboardHeader from '../../../layouts/dashboard/DashboardHeader';
import { StaffDetailsTable } from './common/PaySlipTable';
import { Wrapper, FormCard, Title } from '../../../styles/main';
import Back from '../../../assets/images/arrow_left.svg';
import { createEmployeeDeduction } from '../../../redux/actions/EmployeeDeductionAction';
import { getAllStaffs } from '../../../redux/actions/StaffAction';
import SuccessCard from '../../../components/SuccessCard';
import ErrorCard from '../../../components/ErrorCard';

const GenerateStaffDeduction = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { loading } = useSelector((state) => state.payroll);
  const { staffs } = useSelector((state) => state.staff);

  const [data, setData] = useState({
    staffId: '',
    deductionAmount: '',
    deductionDescription: '',
    deductionMonth: '',
  });

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

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

  const handleEmployeeDeduction = (e) => {
    e.preventDefault();
    console.log(data);
    dispatch(createEmployeeDeduction(data, setOpen, setError, setErrorMessage, setSuccessMessage));
  };

  useEffect(() => {
    dispatch(getAllStaffs());
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
        <title> Generate Staff Deduction | Relia Energy</title>
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

        <FormCard sx={{ mt: 4 }} onSubmit={handleEmployeeDeduction}>
          <Title>Generate Staff Deduction</Title>

          <Grid container sx={{ mt: 5 }}>
            <Grid xs={12} md={4}>
              <Stack>
                <FormLabel id="last_name" sx={{ width: '100%', color: 'black', pb: 1, fontSize: '14px' }}>
                  Staff
                </FormLabel>
                <TextField
                  sx={{ mb: 3, width: '95%' }}
                  variant="outlined"
                  value={data?.staffId}
                  onChange={(e) => handleFormChange(e.target)}
                  name="staffId"
                  className="generate-payroll-input"
                  placeholder="Enter name"
                  select
                  placeholder="Select month"
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option value="">Select staff</option>
                  {React.Children.toArray(
                    staffs?.map((staff) => (
                      <option value={staff?._id}>
                        {staff?.firstName} {staff?.lastName}
                      </option>
                    ))
                  )}
                </TextField>
              </Stack>
            </Grid>

            <Grid xs={12} md={4}>
              <Stack>
                <FormLabel id="last_name" sx={{ width: '100%', color: 'black', pb: 1, fontSize: '14px' }}>
                  Deduction Amount
                </FormLabel>
                <TextField
                  sx={{ mb: 3, width: '95%' }}
                  variant="outlined"
                  value={data?.deductionAmount}
                  name="deductionAmount"
                  fullWidth
                  onChange={(e) => handleFormChange(e.target)}
                  type="number"
                  placeholder="Enter rate"
                  className="generate-payroll-input"
                />
              </Stack>
            </Grid>

            <Grid xs={12} md={4}>
              <Stack>
                <FormLabel id="last_name" sx={{ width: '100%', color: 'black', pb: 1, fontSize: '14px' }}>
                  Deduction Description
                </FormLabel>
                <TextField
                  sx={{ mb: 3, width: '95%' }}
                  name="deductionDescription"
                  value={data?.deductionDescription}
                  variant="outlined"
                  onChange={(e) => handleFormChange(e.target)}
                  fullWidth
                  className="generate-payroll-input"
                />
              </Stack>
            </Grid>

            <Grid xs={12} md={4}>
              <Stack>
                <FormLabel id="last_name" sx={{ width: '100%', color: 'black', pb: 1, fontSize: '14px' }}>
                  Deduction Month
                </FormLabel>
                <TextField
                  sx={{ mb: 3, width: '95%' }}
                  variant="outlined"
                  name="deductionMonth"
                  value={data?.deductionMonth}
                  className="generate-payroll-input"
                  type="month"
                  placeholder="Select month"
                  onChange={(e) => handleFormChange(e.target)}
                  select
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option value="">Select month</option>
                  {months.map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
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
            {loading ? 'Loading...' : 'Generate Deduction'}
          </Button>
        </FormCard>
      </Wrapper>
    </>
  );
};

export default GenerateStaffDeduction;
