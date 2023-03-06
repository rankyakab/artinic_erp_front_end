import { Stack, Typography, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import DashboardHeader from '../../../layouts/dashboard/DashboardHeader';
import { FormCard, Wrapper, Button, Title, GeneralInput, InputLabel } from '../../../styles/main';
// import { PaymentVoucher } from './common/procurementTables';
import Back from '../../../assets/images/arrow_left.svg';
import { createProcurements } from '../../../redux/actions/ProcurementsAction';
import { getAllUser } from '../../../redux/actions/UserAction';

const ProcurementRequest = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state?.user);

  const [selectedSentTo, setSelectedSentTo] = useState('');
  const [selectedRequestedBy, setSelectedRequestedBy] = useState('');

  const [procurementsData, setProcurementsData] = useState({
    itemName: '',
    itemQuantity: '',
    requestDate: '',
    unitPrice: '',
    totalPrice: '',
    requestedBy: selectedRequestedBy,
    sentTo: selectedSentTo,
  });

  const handleFormChange = ({ name, value }) => {
    setProcurementsData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const dispatch = useDispatch();

  const handleCreateProcurements = (e) => {
    e.preventDefault();
    dispatch(createProcurements(setProcurementsData));
    console.log('sent');
  };

  useEffect(() => {
    dispatch(getAllUser());
  }, []);

  return (
    <>
      <Helmet>Procurement Request | Relia Energy</Helmet>
      <Wrapper>
        <DashboardHeader title={'Procurement Request'} text={'Request for, and view all requested procurements.'} />

        <Stack>
          <Typography
            sx={{ color: 'primary.main', cursor: 'pointer', display: 'flex' }}
            onClick={() => {
              navigate('/dashboard/procurement');
            }}
          >
            <img src={Back} alt="back" style={{ marginRight: '0.5rem' }} />
            Back
          </Typography>
        </Stack>

        <FormCard onClick={handleCreateProcurements}>
          <Title>Procurement Request</Title>
          <Grid container sx={{ mt: 4 }}>
            <Grid item xs={12} md={4}>
              <Stack>
                <InputLabel id="itemName">Item</InputLabel>
                <GeneralInput
                  variant="outlined"
                  fullWidth
                  placeholder="Enter Item"
                  name="itemName"
                  value={procurementsData?.itemName}
                  onChange={(e) => handleFormChange(e.target)}
                />
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Stack>
                <InputLabel id="itemQuantity">Quantity</InputLabel>
                <GeneralInput
                  variant="outlined"
                  fullWidth
                  name="itemQuantity"
                  placeholder="Enter Quantity"
                  value={procurementsData?.itemQuantity}
                  onChange={(e) => handleFormChange(e.target)}
                />
              </Stack>
            </Grid>

            <Grid item xs={12} md={4}>
              <Stack>
                <InputLabel id="requestDate"> Request Date</InputLabel>
                <GeneralInput
                  variant="outlined"
                  fullWidth
                  onChange={(e) => handleFormChange(e.target)}
                  placeholder="DD/MM/YYYY"
                  value={procurementsData?.requestDate}
                  type="date"
                />
              </Stack>
            </Grid>

            <Grid item xs={12} md={4}>
              <Stack>
                <InputLabel id="unitPrice">Unit price</InputLabel>
                <GeneralInput
                  variant="outlined"
                  fullWidth
                  placeholder="Unit price"
                  value={procurementsData?.unitPrice}
                  onChange={(e) => handleFormChange(e.target)}
                  name="unitPrice"
                />
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Stack>
                <InputLabel id="totalPrice">Total price</InputLabel>
                <GeneralInput
                  variant="outlined"
                  fullWidth
                  placeholder="Enter Amount"
                  value={procurementsData?.totalPrice}
                  onChange={(e) => handleFormChange(e.target)}
                  name="totalPrice"
                />
              </Stack>
            </Grid>

            <Grid item xs={12} md={4}>
              <Stack>
                <InputLabel id="requestBy">Requested By</InputLabel>
                <GeneralInput
                  select
                  value={selectedRequestedBy}
                  onChange={(e) => setSelectedRequestedBy(e.target.value)}
                  variant="outlined"
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option value="">Select User</option>

                  {user?.map((data) => (
                    <option value={data?._id}>{data?._id}</option>
                  ))}
                </GeneralInput>
              </Stack>
            </Grid>

            <Grid item xs={12} md={4}>
              <Stack>
                <InputLabel id="sentTo">SentTo</InputLabel>
                <GeneralInput
                  select
                  value={selectedSentTo}
                  onChange={(e) => setSelectedSentTo(e.target.value)}
                  variant="outlined"
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option value="">Select User</option>

                  {user?.map((data) => (
                    <option value={data?._id}>{data?._id}</option>
                  ))}
                </GeneralInput>
              </Stack>
            </Grid>
          </Grid>
          <Grid item xs={12} md={4}>
            <Button sx={{ width: '31.7%' }} type="submit">
              Send Request
            </Button>
          </Grid>
        </FormCard>
      </Wrapper>
    </>
  );
};

export default ProcurementRequest;
