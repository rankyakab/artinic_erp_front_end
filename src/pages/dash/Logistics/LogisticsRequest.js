import React, { useState, Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Stack, Typography, Box, Grid, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useForm, useFieldArray, Control, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import DashboardHeader from '../../../layouts/dashboard/DashboardHeader';
import { FormCard, Wrapper, Button, Title, GeneralInput, InputLabel, OutlinedButton } from '../../../styles/main';
import Back from '../../../assets/images/arrow_left.svg';
import { createLogistics } from '../../../redux/actions/LogisticsAction';
import SuccessCard from '../../../components/SuccessCard';
import ErrorCard from '../../../components/ErrorCard';
import { GetStaffName } from '../../../utils/getValueById';
import { getAllStaffs } from '../../../redux/actions/StaffAction';
import { capitalize } from '../../../utils/formatNumber';

const LogisticsRequest = () => {
  const navigate = useNavigate();

  const [successMessage, setSuccessMessage] = useState('');
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [staffName, setStaffName] = useState('');

  const { staffs } = useSelector((state) => state.staff);
  const { user } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.logistics);

  const getName = (id) => {
    const filterStaff = staffs?.filter((staff) => staff?._id === id);

    console.log(filterStaff);
    console.log(id);

    setStaffName(capitalize(filterStaff[0]?.firstName) + capitalize(filterStaff[0]?.lastName));

    return <p>{filterStaff[0]?.firstName}</p>;
  };

  const schema = yup.object().shape({
    requestTitle: yup.string().required(),
    sentFrom: yup.string().required(),
    purpose: yup.string().required(),
    amount: yup.number().required(),
    dateFrom: yup.date().required(),
    dateTo: yup.date().required(),
    sentTo: yup.object().required(),
    recipientId: yup.string().required(),
  });

  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
  } = useForm({
    defaultValues: {
      resolver: yupResolver(schema),
      sentTo: [
        {
          recipientId: '',
          action: 'None',
          status: 'true',
          remarks: '',
        },
      ],
    },
  });

  const { fields, append, prepend, remove } = useFieldArray({
    name: 'sentTo',
    control,
  });

  const [logisticsData, setLogisticsData] = useState({
    requestTitle: '',
    purpose: '',
    amount: '',
    dateFrom: '',
    dateTo: '',
  });

  const handleFormChange = ({ name, value }) => {
    setLogisticsData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const dispatch = useDispatch();

  const handleCreateLogistics = (data) => {
    const selected = {
      ...logisticsData,
      sentTo: data?.sentTo,
      sentFrom: user?.user?._id,
    };

    dispatch(createLogistics(selected, setOpen, setError, setErrorMessage, setSuccessMessage));
  };

  const handleClose = () => {
    setOpen(false);
    setError(false);
  };

  const handleClick = () => {
    handleClose();
  };

  useEffect(() => {
    dispatch(getAllStaffs());
    getName(user?.user?.staffId);
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
      <Helmet>Logistics Request | Relia Energy</Helmet>
      <Wrapper>
        <DashboardHeader title={'Logistics Request'} text={'Make and send logistics request.'} />

        <Stack>
          <Typography
            sx={{ color: 'primary.main', cursor: 'pointer', display: 'flex' }}
            onClick={() => {
              navigate('/dashboard/logistics');
            }}
          >
            <img src={Back} alt="back" style={{ marginRight: '0.5rem' }} />
            Back
          </Typography>
        </Stack>

        <form
          style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '20px', marginTop: '2rem' }}
          onSubmit={handleSubmit((data) => {
            console.log(data);
            handleCreateLogistics(data);
          })}
        >
          <Title>Logistics Request</Title>
          <Grid container sx={{ mt: 4 }}>
            <Grid item xs={12} md={4}>
              <Stack>
                <InputLabel id="requestTitle">Request title</InputLabel>
                <GeneralInput
                  variant="outlined"
                  fullWidth
                  required
                  value={logisticsData?.requestTitle}
                  name="requestTitle"
                  onChange={(e) => handleFormChange(e.target)}
                  placeholder="Enter title"
                />
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Stack>
                <InputLabel id="purpose">Purpose</InputLabel>
                <GeneralInput
                  variant="outlined"
                  fullWidth
                  required
                  value={logisticsData?.purpose}
                  name="purpose"
                  onChange={(e) => handleFormChange(e.target)}
                  placeholder="Enter purpose"
                />
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Stack>
                <InputLabel id="amount">Amount</InputLabel>
                <GeneralInput
                  variant="outlined"
                  fullWidth
                  required
                  value={logisticsData?.amount}
                  name="amount"
                  onChange={(e) => handleFormChange(e.target)}
                  placeholder="Enter Amount"
                />
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Stack>
                <InputLabel id="sentFrom">Requested by</InputLabel>
                <GeneralInput
                  variant="outlined"
                  fullWidth
                  required
                  placeholder={staffName}
                  name="sentFrom"
                  onChange={(e) => handleFormChange(e.target)}
                  disabled
                />
              </Stack>
            </Grid>
            {fields?.map((field, index) => (
              <Fragment key={field?.id}>
                <Grid item xs={12} md={4}>
                  <Stack>
                    <InputLabel id="sentTo"> {`Sent to ${index + 1}`}</InputLabel>
                    <GeneralInput
                      select
                      variant="outlined"
                      SelectProps={{
                        native: true,
                      }}
                      name="sentTo"
                      // value={logisticsData?.sentTo}
                      {...register(`sentTo.${index}.recipientId`)}
                    >
                      <option value="">Select Option</option>
                      {React.Children.toArray(
                        staffs?.map((staff) => (
                          <option value={staff?._id}>
                            {staff?.firstName} {staff?.lastName}
                          </option>
                        ))
                      )}
                    </GeneralInput>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={2} sx={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <button
                    style={{
                      width: '55px',
                      height: '55px',
                      border: '1px solid #D0D0D0',
                      borderRadius: '11px',
                      background: '#fff',
                      cursor: 'pointer',
                      fontSize: '30px',
                      // marginLeft: '1rem',
                    }}
                    disabled={fields?.length <= 1}
                    onClick={(e) => {
                      e.preventDefault();
                      if (fields?.length > 1) remove(index);
                    }}
                  >
                    -
                  </button>
                  <button
                    style={{
                      width: '55px',
                      height: '55px',
                      border: '1px solid #D0D0D0',
                      borderRadius: '11px',
                      background: '#fff',
                      cursor: 'pointer',
                      fontSize: '30px',
                    }}
                    disabled={fields?.length >= 3}
                    onClick={(e) => {
                      e.preventDefault();
                      if (fields?.length < 3) append();
                    }}
                  >
                    +
                  </button>
                </Grid>
              </Fragment>
            ))}

            <Grid item xs={12} md={4}>
              <Stack>
                <InputLabel id="dateFrom">Date From</InputLabel>
                <GeneralInput
                  variant="outlined"
                  fullWidth
                  required
                  value={logisticsData?.dateFrom}
                  name="dateFrom"
                  onChange={(e) => handleFormChange(e.target)}
                  type="date"
                  placeholder="DD/MM/YYYY"
                />
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Stack>
                <InputLabel id="dateTo">Date to</InputLabel>
                <GeneralInput
                  variant="outlined"
                  fullWidth
                  required
                  value={logisticsData?.dateTo}
                  name="dateTo"
                  onChange={(e) => handleFormChange(e.target)}
                  type="date"
                  placeholder="DD/MM/YYYY"
                />
              </Stack>
            </Grid>
          </Grid>

          <Grid item xs={12} md={4}>
            <Button type="submit" sx={{ width: '31.7%' }}>
              {loading ? 'Loading...' : 'Make Request'}
            </Button>
          </Grid>
        </form>
      </Wrapper>
    </>
  );
};

export default LogisticsRequest;
