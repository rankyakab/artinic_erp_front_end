import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Grid,FormLabel, Box, Button, Stack, Avatar, Typography } from '@mui/material';

// import { useSettingsContext } from '../../../components/settings';
import DashboardHeader from '../../../layouts/dashboard/DashboardHeader';
import Iconify from '../../../components/iconify/Iconify';
// import NewStaffForm from './common/NewStaffForm';
import { FormCard, Wrapper,GeneralInput } from '../../../styles/main';
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
  const errRef = useRef();

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
    propic:'',
     signature:''
  });
   const [phoneNumber, setPhoneNumber] = useState('');
  
  function handlePhoneChange(event) {
    setPhoneNumber(event.target.value);
    setUserData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));

  }
function isValidPhoneNumber() {
  const phoneNumberRegex = /^\d{11}$/;
  return phoneNumberRegex.test(phoneNumber);
}

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
    const [errMsg, setErrMsg] = useState('');
const maxDate = new Date().toISOString().split('T')[0];
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


  function handleBlur(event) {

    const phoneNumberRegex = /^\d{11}$/;
    if (!phoneNumberRegex.test(phoneNumber)) {
      setErrMsg('Please enter a valid 11-digit phone number.');
    } else {
      setErrMsg('');
    }
  }


  const handleFileDrop = (e) => {
    const { files ,name, value} = e.target;
     setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // console.log(files);
    setFilters(files[0]);
  
    const reader = new FileReader();

    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };

    reader.readAsDataURL(files[0]);
  };

  const handleSignatureDrop = (e) => {
    const { files,name, value } = e.target;

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

  const handleAddStaff = () => {

    if (!isValidPhoneNumber()) {
    alert('Please enter a valid 11-digit phone number.');
    return;
  }
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
       (userData?.propic || userData.signature) ? formData : userData,
        setOpen,
        setError,
        setErrorMessage,
     (userData?.propic || userData.signature) ? (isFormData = true) : (isFormData = false)
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
                onClick={handleAddStaff}
              >
                {loading ? 'Loading...' : 'Add Staff'}
              </Button>
            </Grid>
            <Grid items xs={12} md={8} sx={{ pl: 5 }}>
              {/*
              <NewStaffForm userData={userData} handleFormChange={handleFormChange} positions={positions} roles={roles} />

              */ }





                      <Grid container columnSpacing={4}>
                        <Grid item xs={12} md={6}>
                          <Stack>
                            <FormLabel id="first_name" sx={{ width: '100%', color: 'black', pb: 1, fontSize: '14px' }}>
                              First Name
                            </FormLabel>
                            <GeneralInput
                              placeholder="Enter First Name"
                              value={userData?.firstName}
                              name="firstName"
                              onChange={(e) => handleFormChange(e.target)}
                            />
                          </Stack>
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <Stack>
                            <FormLabel id="last_name" sx={{ width: '100%', color: 'black', pb: 1, fontSize: '14px' }}>
                              Last Name
                            </FormLabel>
                            <GeneralInput
                              placeholder="Enter Last Name"
                              value={userData?.lastName}
                              name="lastName"
                              onChange={(e) => handleFormChange(e.target)}
                            />
                          </Stack>
                        </Grid>

                        {/* <Grid item xs={12} md={6}>
                          <Stack>
                            <FormLabel id="last_name" sx={{ width: '100%', color: 'black', pb: 1, fontSize: '14px' }}>
                              Last Name
                            </FormLabel>
                            <GeneralInput
                              placeholder="Enter Last Name"
                              value={userData?.lastName}
                              name="lastName"
                              onChange={(e) => handleFormChange(e.target)}
                            />
                          </Stack>
                        </Grid> */}

                        {/* <Grid item xs={12} md={6}>
                          <Stack>
                            <FormLabel id="email_address" sx={{ width: '100%', color: 'black', pb: 1, fontSize: '14px' }}>
                              Email Address
                            </FormLabel>
                            <GeneralInput
                              value={userData?.personalEmail}
                              name="personalEmail"
                              onChange={(e) => handleFormChange(e.target)}
                              fullWidth
                              placeholder="Enter Email Address"
                            />
                          </Stack>
                        </Grid> */}

                        <Grid item xs={12} md={6}>
                          <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                          <Stack>
                            <FormLabel id="phone_number" sx={{ width: '100%', color: 'black', pb: 1, fontSize: '14px' }}>
                              Phone Number
                            </FormLabel>
                            <GeneralInput
                              value={userData?.phoneNumber}
                              name="phoneNumber"
                              type="number"
                              pattern="[0-9]{11}" 
                              onBlur={(e) => handleBlur(e)}
                              required
                              onChange={(e) => handlePhoneChange(e)}
                              fullWidth
                              placeholder="Enter Phone Number"
                            />
                          </Stack>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Stack>
                            <FormLabel
                              id="employmentDate "
                              sx={{ width: '100%', color: 'black', pb: 1, fontSize: '14px' }}
                            >
                              Employment Date
                            </FormLabel>
                            <GeneralInput
                              value={userData?.employmentDate}
                              name="employmentDate"
                              onChange={(e) => handleFormChange(e.target)}
                              fullWidth
                              type="date"
                              placeholder="Enter Date of Employment "
                               InputLabelProps={{
                                    shrink: true,
                                  }}
                                  inputProps={{
                                    max: maxDate,
                                  }}
                            />
                          </Stack>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Stack>
                            <FormLabel
                              id="employmentType
                "
                              sx={{ width: '100%', color: 'black', pb: 1, fontSize: '14px' }}
                            >
                              Employment Type
                            </FormLabel>
                            <GeneralInput
                              value={userData?.employmentType}
                              name="employmentType"
                              onChange={(e) => handleFormChange(e.target)}
                              fullWidth
                              select
                              SelectProps={{
                                native: true,
                              }}
                              placeholder="Enter employment type"
                            >
                              <option value="permanent staff">Select Option</option>
                              <option value="permanent staff">Permanent Staff</option>
                              <option value="temporary staff">Temporary Staff</option>
                              <option value="intern">Intern</option>
                              <option value="contract">Contract</option>
                            </GeneralInput>
                          </Stack>
                        </Grid>
                        

                        <Grid item xs={12} md={6}>
                          <Stack>
                            <FormLabel id="gender" sx={{ width: '100%', color: 'black', pb: 1, fontSize: '14px' }}>
                              Gender
                            </FormLabel>
                            <GeneralInput
                              select
                              variant="outlined"
                              SelectProps={{
                                native: true,
                              }}
                              value={userData?.gender}
                              name="gender"
                              onChange={(e) => handleFormChange(e.target)}
                            >
                              <option value="">Select Gender</option>
                              <option value="female">Female</option>
                              <option value="male">Male</option>
                            </GeneralInput>
                          </Stack>
                        </Grid>

                        {/* <Grid item xs={12} md={6}>
                          <Stack>
                            <FormLabel id="role" sx={{ width: '100%', color: 'black', pb: 1, fontSize: '14px' }}>
                              Role
                            </FormLabel>
                            <GeneralInput
                              select
                              variant="outlined"
                              SelectProps={{
                                native: true,
                              }}
                              // value={userData.lastName}
                              //     name="lastName"
                              onChange={(e) => handleFormChange(e.target)}
                            >
                              <option value="">Select Role</option>
                              <option value="staff">staff</option>
                              <option value="admin">Admin </option>
                              <option value="IT">I.T staff </option>
                              <option value="HR">Human Resources staff </option>
                            </GeneralInput>
                          </Stack>
                        </Grid> */}

                        {/* <Grid item xs={12} md={6}>
                          <Stack>
                            <FormLabel id="phone_number" sx={{ width: '100%', color: 'black', pb: 1, fontSize: '14px' }}>
                              Designation
                            </FormLabel>
                            <GeneralInput
                              select
                              variant="outlined"
                              SelectProps={{
                                native: true,
                              }}
                              // value={userData.lastName}
                              //     name="lastName"
                              onChange={(e) => handleFormChange(e.target)}
                            >
                              <option value="">Select Designation</option>
                              <option value="">Project Management</option>
                              <option value="">Operations </option>
                            </GeneralInput>
                          </Stack>
                        </Grid> */}

                        <Grid item xs={12} md={6}>
                          <Stack>
                            <FormLabel id="official_email" sx={{ width: '100%', color: 'black', pb: 1, fontSize: '14px' }}>
                              Official Email
                            </FormLabel>
                            <GeneralInput
                              value={userData?.personalEmail}
                              name="personalEmail"
                              onChange={(e) => handleFormChange(e.target)}
                              placeholder="Official Email "
                            />
                          </Stack>
                        </Grid>
           {/*           
                        <Grid item xs={12} md={6}>
                          <Stack>
                            <FormLabel id="gender" sx={{ width: '100%', color: 'black', pb: 1, fontSize: '14px' }}>
                              Designation
                            </FormLabel>
                            <GeneralInput
                              select
                              variant="outlined"
                              SelectProps={{
                                native: true,
                              }}
                              
                              value={userData?.designation}
                              name="designation"
                              onChange={(e) => handleFormChange(e.target)}
                            >
                              <option value={roles[0]?._id}>Select Role</option>
                          {React.Children.toArray(roles?.map(role=>(<option value={role?._id}>{role?.role}</option>))
                              )}
                              
                            
                            </GeneralInput>
                          </Stack>
                        </Grid>
*/}
                        <Grid item xs={12} md={6}>
                          <Stack>
                            <FormLabel
                              id="employmentType
                "
                              sx={{ width: '100%', color: 'black', pb: 1, fontSize: '14px' }}
                            >
                              Designation
                            </FormLabel>
                            <GeneralInput
                              value={userData?.staffPositionId}
                              name="staffPositionId"
                              onChange={(e) => handleFormChange(e.target)}
                              fullWidth
                              select
                              SelectProps={{
                                native: true,
                              }}
                              placeholder=""
                            >
                              <option value="">Select Option</option>
                              {React.Children.toArray(
                                positions?.map((position) => <option value={position?._id}>{position?.title}</option>)
                              )}
                            </GeneralInput>
                          </Stack>
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <Stack>
                            <FormLabel id="official_email" sx={{ width: '100%', color: 'black', pb: 1, fontSize: '14px' }}>
                              StaffId
                            </FormLabel>
                            <GeneralInput
                              value={userData?.staffNo}
                              name="staffNo"
                              onChange={(e) => handleFormChange(e.target)}
                              placeholder="Staff No"
                            />
                          </Stack>
                        </Grid>

                        <Grid item xs={12} md={12}>
                          <Stack>
                            <FormLabel id="homeAddress" sx={{ width: '100%', color: 'black', pb: 1, fontSize: '14px' }}>
                              Home Address
                            </FormLabel>
                            <GeneralInput
                              value={userData?.homeAddress}
                              name="homeAddress"
                              onChange={(e) => handleFormChange(e.target)}
                              placeholder="Home Address"
                            />
                          </Stack>
                        </Grid>
                      </Grid>











            </Grid>
          </Grid>
        </FormCard>
      </Wrapper>
    </>
  );
};

export default NewStaff;
