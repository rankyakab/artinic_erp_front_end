import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Grid, Box, Button, Stack, Avatar, Typography } from '@mui/material';
// import { useSettingsContext } from '../../../components/settings';
import DashboardHeader from '../../../layouts/dashboard/DashboardHeader';
import Iconify from '../../../components/iconify/Iconify';
import NewStaffForm from './common/NewStaffForm';
import { FormCard, Wrapper } from '../../../styles/main';
import Back from '../../../assets/images/arrow_left.svg';
import { createStaff, editStaff, getAllStaffs } from '../../../redux/actions/StaffAction';
import SuccessCard from '../../../components/SuccessCard';
import ErrorCard from '../../../components/ErrorCard';
import { getAllPositions } from '../../../redux/actions/PositionAction';
import EditStaffForm from './common/EditStaffForm';
import { getAllRole } from '../../../redux/actions/RoleAction';
import { EditUser } from '../../../redux/actions/UserAction';

const EditStaff = () => {
  // const { themeStretch } = useSettingsContext();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const signatureInputRef = useRef(null);
  const [filters, setFilters] = useState({});

  const [selectedSignature, setSelectedSignature] = useState({});
  const [signaturePreviewUrl, setSignaturePreviewUrl] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [errorMsg, setErrorMsg] = useState(false);

  const params = useParams();

  console.log(params);
  const { loading } = useSelector((state) => state.staff);
  const { positions } = useSelector((state) => state.payroll);
  const { roles } = useSelector((state) => state.role);

  console.log(positions);
  console.log(roles);

  const { staffs } = useSelector((state) => state.staff);

  console.log("these are the staffs",staffs);

  const filterStaff = staffs?.filter((staff) => staff?._id === params?.id);

  console.log(filterStaff);

  const [userData, setUserData] = useState({
    firstName: filterStaff[0]?.firstName,
    lastName: filterStaff[0]?.lastName,
    middleName: filterStaff[0]?.middleName,
    homeAddress: filterStaff[0]?.homeAddress,
    phoneNumber: filterStaff[0]?.phoneNumber,
    gender: filterStaff[0]?.gender,
    personalEmail: filterStaff[0]?.personalEmail,
    designation: filterStaff[0]?.designation,
    employmentType: filterStaff[0]?.employmentType,
    employmentDate: filterStaff[0]?.employmentDate,
    staffNo: filterStaff[0]?.staffNo,
    staffPositionId: filterStaff[0]?.staffPositionId,
    oldpropic: filterStaff[0]?.propic,
    oldsignature: filterStaff[0]?.signature,
  });
  const [userRole, setUserRole] = useState({
    role: '',
  });

  console.log(userData);

  const handleBack = () => {
    navigate('/dashboard/staff');
  };

  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleClose = () => {
    setOpen(false);
    setError(false);
    navigate('/dashboard/staff');
  };

  const dispatch = useDispatch();

  const handleFormChange = ({ name, value }) => {
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRoleFormChange = ({ name, value }) => {
    setUserRole((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileDrop = (e) => {
    const { files, name, value } = e.target;
    // console.log(files);
    setFilters(files[0]);
    setUserData((prev) => ({
      ...prev,
      [name]: files[0],
    }));

    const reader = new FileReader();

    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };

    reader.readAsDataURL(files[0]);
  };

  const handleSignatureDrop = (e) => {
    const { files  ,name, value} = e.target;
     setUserData((prev) => ({
      ...prev,
      [name]: files[0],
    }));
    // console.log(files);
    setSelectedSignature(files[0]);

    const reader = new FileReader();

    reader.onloadend = () => {
      setSignaturePreviewUrl(reader.result);
    };

    reader.readAsDataURL(files[0]);
  };

  const handleEditRole = () => {
    dispatch(EditUser(userRole, filterStaff[0]?.userId, setErrorMessage, setSuccessMessage, setOpen, setError));
  };
  const handleClick = () => {
    handleClose();
  };

  const handleEditStaff = () => {
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

    // if (filters?.name) formData.append('propic', filters);

    // if (selectedSignature?.name) formData.append('signature', selectedSignature);

    Object.keys(userData).forEach((e) => {
      // console.log(e, userData[e]);
      formData.append(e, userData[e]);
    });
   console.log("this is the form data", userData)
    let isFormData;

    dispatch(
      editStaff(
        (userData?.propic || userData.signature)  ? formData : userData,
        filterStaff[0]?._id,
        setOpen,
        setError,
        setErrorMessage,
        setSuccessMessage,
        (userData?.propic || userData.signature)  ? (isFormData = true) : (isFormData = false)
      )
    );
  };
  
  useEffect(() => {
    dispatch(getAllPositions());
    dispatch(getAllStaffs());
    dispatch(getAllRole());
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
        <title> Edit Staff |Relia Energy</title>
      </Helmet>

      <Wrapper>
        <DashboardHeader title={'Edit Staff'} text={'Edit staff'} />

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
          <Typography sx={{ fontSize: 20, fontWeight: 'bold', mb: 5 }}>Edit Staff</Typography>

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
                {filterStaff[0]?.propic !== '' ? (
                  <img
                    src={filterStaff[0]?.propic}
                    alt="profile"
                    style={{ width: 150, height: 150, cursor: 'pointer', borderRadius: '100%' }}
                  />
                ) : previewUrl === '' && filterStaff[0]?.propic === '' ? (
                  <Avatar sx={{ width: 150, height: 150, cursor: 'pointer' }}>
                    <Stack sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <Iconify icon={'eva:camera-fill'} sx={{ width: 40, height: 40 }} />
                      <p style={{ fontSize: '12px' }}> {filters?.name ? filters?.name : 'upload Photo'}</p>
                    </Stack>
                  </Avatar>
                ) : (
                  <img
                    src={filterStaff[0]?.propic}
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
                  {filterStaff[0]?.signature !== '' ? (
                    <img
                      src={filterStaff[0]?.signature}
                      alt="profile"
                      style={{ width: 150, height: 150, cursor: 'pointer', borderRadius: '100%' }}
                    />
                  ) : signaturePreviewUrl !== '' && filterStaff[0]?.signature === '' ? (
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
                    name="signature"
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
                onClick={handleEditStaff}
              >
                {loading ? 'Loading...' : 'Edit Staff'}
              </Button>
            </Grid>
            <Grid items xs={12} md={8} sx={{ pl: 5 }}>
              <EditStaffForm
                filterStaff={filterStaff}
                userData={userData}
                handleFormChange={handleFormChange}
                positions={positions}
              />
            </Grid>
          </Grid>
        </FormCard>

       
      </Wrapper>
    </>
  );
};

export default EditStaff;
