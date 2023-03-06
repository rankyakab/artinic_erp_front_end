import { Grid, Stack, Typography, TextField, FormLabel, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router';
import { useSettingsContext } from '../../../components/settings';
import DashboardHeader from '../../../layouts/dashboard/DashboardHeader';
import { Wrapper, FormCard, HeadCard } from '../../../styles/main';
import Back from '../../../assets/images/arrow_left.svg';
import { createMaintenance, getAllAssets, getAllvendors } from '../../../redux/actions/MaintenanceAction';
import { getAllStaffs } from '../../../redux/actions/StaffAction';
import SuccessCard from '../../../components/SuccessCard';
import ErrorCard from '../../../components/ErrorCard';
import { GetStaffName } from '../../../utils/getValueById';

function ScheduleMaintenance() {
  const navigate = useNavigate();
  const { themeStretch } = useSettingsContext();
  const [successMessage, setSuccessMessage] = useState('');
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state?.memo);
  const { staffs } = useSelector((state) => state?.staff);
  const { user } = useSelector((state) => state?.auth);
  console.log(user);
  const { assets, vendors } = useSelector((state) => state?.maintenance);

  console.log(assets);
  console.log(vendors);
  console.log(staffs);
  console.log(user);
  const [maintenanceData, setMaintenanceData] = useState({
    assetId: '',
    staffAssigned: '',
    vendorId: '',
    actionRequired: '',
    lastMaintenance: '',
    nextMaintenance: '',
    status: '',
    createdBy: user?.user?._id,
  });

  const handleFormChange = ({ name, value }) => {
    setMaintenanceData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateMaintenance = (e) => {
    e.preventDefault();
    dispatch(createMaintenance(maintenanceData, setOpen, setError, setErrorMessage, setSuccessMessage));
  };

  const handleClose = () => {
    setOpen(false);
    setError(false);
  };

  const handleClick = () => {
    handleClose();
  };

  useEffect(() => {
    dispatch(getAllAssets());
    dispatch(getAllvendors());
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
        <title> Schedule Maintenance | Minimal UI</title>
      </Helmet>
      <Wrapper>
        <DashboardHeader title={'Schedule Maintenance'} text={'Schedule a maintenance for future use.'} />
        <Stack sx={{ mb: 4 }}>
          <Typography
            sx={{ color: 'primary.main', cursor: 'pointer', display: 'flex' }}
            onClick={() => {
              navigate('/dashboard/maintenance');
            }}
          >
            <img src={Back} alt="back" style={{ marginRight: '0.5rem' }} />
            Back
          </Typography>
        </Stack>

        <HeadCard sx={{ width: '100%' }}>
          <Stack sx={{ width: '100%' }}>
            <Grid>
              <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}>Schedule Maintenance</Typography>

              <Typography
                sx={{
                  fontWeight: '400',
                  fontSize: '14px',
                  lineHeight: '24px',
                }}
              >
                Kindly fill in the form below to schedule a maintenance.
              </Typography>
            </Grid>

            <FormCard onSubmit={handleCreateMaintenance}>
              <Grid container>
                <Grid xs={12} md={4}>
                  <Stack>
                    <FormLabel id="Item name" sx={{ width: '100%', color: 'black', pb: 1, fontSize: '14px' }}>
                      Item name
                    </FormLabel>
                    <TextField
                      sx={{ mb: 3, width: '95%' }}
                      select
                      variant="outlined"
                      className="generate-payroll-input"
                      onChange={(e) => handleFormChange(e.target)}
                      name=""
                      value={maintenanceData?.assetId}
                      SelectProps={{
                        native: true,
                      }}
                    >
                      <option value="">Enter item</option>
                      {React.Children.toArray(
                        assets?.map((asset) => <option value={asset?._id}>{asset?.assetName}</option>)
                      )}
                    </TextField>
                  </Stack>
                </Grid>

                <Grid xs={12} md={4}>
                  <Stack>
                    <FormLabel id="Number" sx={{ width: '100%', color: 'black', pb: 1, fontSize: '14px' }}>
                      Vendor
                    </FormLabel>
                    <TextField
                      sx={{ mb: 3, width: '95%' }}
                      select
                      variant="outlined"
                      fullWidth
                      className="generate-payroll-input"
                      SelectProps={{
                        native: true,
                      }}
                      onChange={(e) => handleFormChange(e.target)}
                      name=""
                      value={maintenanceData?.vendorId}
                    >
                      <option value="">Select option</option>
                      {React.Children.toArray(
                        vendors?.map((vendor) => <option value={vendor?._id}>{vendor?.accountName}</option>)
                      )}
                    </TextField>
                  </Stack>
                </Grid>

                <Grid xs={12} md={4}>
                  <Stack>
                    <FormLabel id="Number" sx={{ width: '100%', color: 'black', pb: 1, fontSize: '14px' }}>
                      Staff Assigned
                    </FormLabel>
                    <TextField
                      sx={{ mb: 3, width: '95%' }}
                      select
                      variant="outlined"
                      fullWidth
                      className="generate-payroll-input"
                      SelectProps={{
                        native: true,
                      }}
                      onChange={(e) => handleFormChange(e.target)}
                      name=""
                      value={maintenanceData?.staffAssigned}
                    >
                      <option value="">Select option</option>

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
                    <FormLabel id="Date" sx={{ width: '100%', color: 'black', pb: 1, fontSize: '14px' }}>
                      Action Required
                    </FormLabel>
                    <TextField
                      sx={{ mb: 3, width: '95%' }}
                      variant="outlined"
                      fullWidth
                      className="generate-payroll-input"
                      placeholder="DD/MM/YYY"
                      onChange={(e) => handleFormChange(e.target)}
                      name=""
                      value={maintenanceData?.actionRequired}
                      onChange={(e) => handleFormChange(e.target)}
                    />
                  </Stack>
                </Grid>

                <Grid xs={12} md={4}>
                  <Stack>
                    <FormLabel id="last_name" sx={{ width: '100%', color: 'black', pb: 1, fontSize: '14px' }}>
                      Last Maintenance
                    </FormLabel>
                    <TextField
                      sx={{ mb: 3, width: '95%' }}
                      variant="outlined"
                      fullWidth
                      className="generate-payroll-input"
                      type="date"
                      onChange={(e) => handleFormChange(e.target)}
                      name="lastMaintenance"
                      value={maintenanceData?.lastMaintenance}
                    />
                  </Stack>
                </Grid>
                <Grid xs={12} md={4}>
                  <Stack>
                    <FormLabel id="last_name" sx={{ width: '100%', color: 'black', pb: 1, fontSize: '14px' }}>
                      Next Maintenance
                    </FormLabel>
                    <TextField
                      sx={{ mb: 3, width: '95%' }}
                      variant="outlined"
                      fullWidth
                      className="generate-payroll-input"
                      type="date"
                      onChange={(e) => handleFormChange(e.target)}
                      name="nextMaintenance"
                      value={maintenanceData?.nextMaintenance}
                    />
                  </Stack>
                </Grid>
                <Grid xs={12} md={4}>
                  <Stack>
                    <FormLabel id="last_name" sx={{ width: '100%', color: 'black', pb: 1, fontSize: '14px' }}>
                      Created by
                    </FormLabel>
                    <TextField
                      sx={{ mb: 3, width: '95%' }}
                      variant="outlined"
                      fullWidth
                      className="generate-payroll-input"
                      onChange={(e) => handleFormChange(e.target)}
                      name="createdBy"
                      // value={}
                      // // placeholder={user?.user?.firstName}
                      disabled
                    />
                  </Stack>
                </Grid>

                <Grid xs={12} md={4}>
                  <Stack>
                    <FormLabel id="last_name" sx={{ width: '100%', color: 'black', pb: 1, fontSize: '14px' }}>
                      Status
                    </FormLabel>
                    <TextField
                      sx={{ mb: 3, width: '95%' }}
                      select
                      variant="outlined"
                      fullWidth
                      className="generate-payroll-input"
                      SelectProps={{
                        native: true,
                      }}
                      onChange={(e) => handleFormChange(e.target)}
                      name="status"
                      value={maintenanceData?.status}
                    >
                      <option value="">Select option</option>
                      <option value="Awaiting Maintenance">Awaiting Maintenance</option>
                      <option value="Awaiting Maintenance">Awaiting Maintenance</option>
                    </TextField>
                  </Stack>
                </Grid>
              </Grid>
              <Grid xs={12} md={4}>
                <Button
                  sx={{
                    color: 'white',
                    background: 'linear-gradient(135deg, #14ADD6 0%, #384295 100%)',
                    py: 1,
                    px: 5,
                    width: '30%',
                  }}
                  type="submit"
                  onClick={() => navigate('/dashboard/schedule-maintenance')}
                >
                  Schedule Maintenance
                </Button>
              </Grid>
            </FormCard>
          </Stack>
        </HeadCard>
      </Wrapper>
      {/* </Container> */}
    </>
  );
}

export default ScheduleMaintenance;
