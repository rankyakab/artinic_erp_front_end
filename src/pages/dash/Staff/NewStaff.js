import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Grid, Box, Button, Stack, Avatar, Typography } from '@mui/material';
// import { useSettingsContext } from '../../../components/settings';
import DashboardHeader from '../../../layouts/dashboard/DashboardHeader';
import Iconify from '../../../components/iconify/Iconify';
import NewStaffForm from './common/NewStaffForm';
import { FormCard, Wrapper } from '../../../styles/main';
import Back from '../../../assets/images/arrow_left.svg';
import { createStaff } from '../../../redux/actions/StaffAction';
import SuccessCard from '../../../components/SuccessCard';
import ErrorCard from '../../../components/ErrorCard';
import { getAllPositions } from '../../../redux/actions/PositionAction';
import { getAllRole } from '../../../redux/actions/RoleAction';

const NewStaff = () => {
  // const { themeStretch } = useSettingsContext();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const signatureInputRef = useRef(null);
  const [filters, setFilters] = useState({});

  const [selectedSignature, setSelectedSignature] = useState({});
  const [signaturePreviewUrl, setSignaturePreviewUrl] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [errorMsg, setErrorMsg] = useState(false);

  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    homeAddress: '',
    phoneNumber: '',
    gender: '',
    personalEmail: '',
    designation: '',
    employmentType: '',
    employmentDate: '',
    staffNo: '',
    staffPositionId: '',
    propic:''
  });

  const handleBack = () => {
    navigate('/dashboard/staff');
  };

  const { loading } = useSelector((state) => state.staff);
  const { positions } = useSelector((state) => state.payroll);
  const { roles } = useSelector((state) => state.role);
  console.log(positions);
  console.log("these are the roles",roles);

  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleClose = () => {
    setOpen(false);
    setError(false);
  };

  const dispatch = useDispatch();

  const handleFormChange = ({ name, value }) => {
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileDrop = (e) => {
    const { files ,name, value} = e.target;
    // console.log(files);
    setFilters(files[0]);
 userData((prev) => ({
      ...prev,
      [name]: value,
    }));
    const reader = new FileReader();

    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };

    reader.readAsDataURL(files[0]);
  };

  const handleSignatureDrop = (e) => {
    const { files } = e.target;
    // console.log(files);
    setSelectedSignature(files[0]);

    const reader = new FileReader();

    reader.onloadend = () => {
      setSignaturePreviewUrl(reader.result);
    };

    reader.readAsDataURL(files[0]);
  };

  const handleAddStaff = () => {
    // const MAX_FILE_SIZE = 2000; // 2MB

    // const fileSizeKiloBytes = filters.size / 2048;

    // console.log(fileSizeKiloBytes);
    // console.log(filters);

    // if (fileSizeKiloBytes > MAX_FILE_SIZE) {
    //   setErrorMsg('File size is greater than maximum limit');
    //   console.log('first');
    //   return;
    // }
    const formData = new FormData();

    if (filters?.name) formData.append('propic', filters);

    // if (selectedSignature?.name) formData.append('signature', selectedSignature);

    Object.keys(userData).forEach((e) => {
      // console.log(e, userData[e]);
      formData.append(e, userData[e]);
    });

    let isFormData;

    dispatch(
      createStaff(
        filters?.name ? formData : userData,
        setOpen,
        setError,
        setErrorMessage,
        filters?.name ? (isFormData = true) : (isFormData = false)
      )
    );
  };
  const handleClick = () => {
    handleClose();
  };

  useEffect(() => {
    dispatch(getAllPositions());
    dispatch(getAllRole());
  }, [dispatch]);

  return (
    <>
      <SuccessCard
        open={open}
        handleClose={handleClose}
        message="You have successfully added a new staff"
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
        <title> New Staff |Relia Energy</title>
      </Helmet>

      <Wrapper>
        <DashboardHeader title={'New Staff'} text={'Create account for a new staff'} />

        <Stack>
          <Typography
            sx={{ color: 'primary.main', cursor: 'pointer', display: 'flex' }}
            onClick={() => {
              handleBack();
            }}
          >
            <img src={Back} alt="back" style={{ marginRight: '0.5rem' }} />
            Back
          </Typography>
        </Stack>

        <FormCard>
          <Typography sx={{ fontSize: 20, fontWeight: 'bold', mb: 5 }}>Add a New Staff</Typography>

          <Grid container>
            <Grid items xs={12} md={4}>
              <Box
                sx={{
                  border: '0.5px solid #E8E8E8',
                  borderRadius: '10px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  py: 8,
                }}
              >
                {previewUrl === '' ? (
                  <Avatar sx={{ width: 150, height: 150, cursor: 'pointer' }}>
                    <Stack sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <Iconify icon={'eva:camera-fill'} sx={{ width: 40, height: 40 }} />
                      <p style={{ fontSize: '12px' }}> {filters?.name ? filters?.name : 'upload Photo'}</p>
                    </Stack>
                  </Avatar>
                ) : (
                  <img
                    src={previewUrl}
                    alt=""
                    style={{ width: 150, height: 150, cursor: 'pointer', borderRadius: '100%' }}
                  />
                )}

                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                  width="100%"
                  sx={{ marginTop: '.5rem' }}
                >
                  <input
                    // hidden
                    onChange={(e) => handleFileDrop(e)}
                    ref={fileInputRef}
                    name="propic"
                    accept="image/*"
                    multiple
                    type="file"
                    style={{ width: '50%' }}
                  />{' '}
                </Stack>
               
                <Stack sx={{ mt: '2rem' }} position={'center'} alignItems="center" width={'100%'}>
                  {signaturePreviewUrl !== '' ? (
                    <Box sx={{ padding: '2rem' }}>
                      <img src={signaturePreviewUrl} alt="" />
                    </Box>
                  ) : (
                    <p>Upload Signature</p>
                  )}
                  <input
                    // hidden
                    onChange={(e) => handleSignatureDrop(e)}
                    ref={signatureInputRef}
                    name="propic"
                    accept="image/*"
                    multiple
                    type="file"
                    style={{ width: '50%' }}
                  />{' '}
                </Stack>
                <Stack sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pt: 5 }}>
                  <p style={{ fontSize: '12px' }}>Allowed Format</p>
                  <p style={{ fontSize: '14px', marginTop: '-0.5rem' }}>JPG, JPEG, and PNG</p>
                </Stack>
                <Stack sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pt: 1 }}>
                  <p style={{ fontSize: '12px' }}> Max file size</p>
                  <p style={{ fontSize: '14px', marginTop: '-0.5rem' }}>2MB</p>
                </Stack>

                */
              </Box>
              <Button
                sx={{
                  color: 'white',
                  background: 'linear-gradient(135deg, #14ADD6 0%, #384295 100%)',
                  width: '100%',
                  py: 1.5,
                  px: 5,
                  mt: 5,
                  mb: 2,
                }}
                onClick={handleAddStaff}
              >
                {loading ? 'Loading...' : 'Add Staff'}
              </Button>
            </Grid>
            <Grid items xs={12} md={8} sx={{ pl: 5 }}>
              <NewStaffForm userData={userData} handleFormChange={handleFormChange} positions={positions} roles={roles} />
            </Grid>
          </Grid>
        </FormCard>
      </Wrapper>
    </>
  );
};

export default NewStaff;
