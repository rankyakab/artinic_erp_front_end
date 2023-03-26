import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Grid,FormLabel, Box, Button, Stack, Avatar, Typography } from '@mui/material';

// import { useSettingsContext } from '../../../components/settings';
import DashboardHeader from '../../../layouts/dashboard/DashboardHeader';
import Iconify from '../../../components/iconify/Iconify';
// import NewStaffForm from './common/NewStaffForm';
import { FormCard, Wrapper,GeneralInput } from '../../../styles/main';
import Back from '../../../assets/images/arrow_left.svg';
import { createStaff,getStaffById, editStaff, getAllStaffs } from '../../../redux/actions/StaffAction';
import SuccessCard from '../../../components/SuccessCard';
import ErrorCard from '../../../components/ErrorCard';
import { getAllPositions } from '../../../redux/actions/PositionAction';
import EditStaffForm from './common/EditStaffForm';
import { getAllRole } from '../../../redux/actions/RoleAction';
import { EditUser } from '../../../redux/actions/UserAction';
import {getAllDepartment}from '../../../redux/actions/DepartmentsAction';

const EditStaff = () => {
  // const { themeStretch } = useSettingsContext();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const signatureInputRef = useRef(null);
   
  const [filters, setFilters] = useState({});

  const [selectedSignature, setSelectedSignature] = useState({});
  const [signaturePreviewUrl, setSignaturePreviewUrl] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
   const [errMsg, setErrMsg] = useState('');

  const params = useParams();

  console.log("these are the param parameters",params);
  const { loading } = useSelector((state) => state.staff);
  const { positions } = useSelector((state) => state.payroll);
  const { roles } = useSelector((state) => state.role);
      const { departments } = useSelector((state) => state.department);

  console.log(positions);
  console.log(roles);

  const { staffs } = useSelector((state) => state.staff);

  console.log("these are the staffs",staffs);

  const filterStaff = staffs?.filter((staff) => staff?._id === params?.id);

  // console.log(filterStaff);

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
  const [errorMsgs, setErrorMsgs] = useState(false);
     const [phoneNumber, setPhoneNumber] = useState('');
     const maxDate = new Date().toISOString().split('T')[0];
   const errRef = useRef();
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
  function handlePhoneChange(event) {
    setPhoneNumber(event.target.value);
    setUserData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
    setErrMsg("")

  }
function isValidPhoneNumber() {
  const phoneNumberRegex = /^\d{11}$/;
  return phoneNumberRegex.test(phoneNumber);
}
  function handleBlur(event) {

    const phoneNumberRegex = /^\d{11}$/;
    if (!phoneNumberRegex.test(phoneNumber)) {
      setErrMsg('Please enter a valid 11-digit phone number.');
    } else {
      setErrMsg('');
    }
  }

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
 useEffect(() => {
getAllDepartment()
  }, []);

useEffect(()=>{ 

  const fStaff = staffs?.filter((staff) => staff?._id === params?.id);

 

  setUserData({
    firstName: fStaff[0]?.firstName,
    lastName: fStaff[0]?.lastName,
    middleName: fStaff[0]?.middleName,
    homeAddress: fStaff[0]?.homeAddress,
    phoneNumber: fStaff[0]?.phoneNumber,
    gender: fStaff[0]?.gender,
    personalEmail: fStaff[0]?.personalEmail,
    designation: fStaff[0]?.designation,
    employmentType: fStaff[0]?.employmentType,
    employmentDate: fStaff[0]?.employmentDate,
    staffNo: fStaff[0]?.staffNo,
    staffPositionId: fStaff[0]?.staffPositionId,
    department: fStaff[0]?.department,
    oldpropic: fStaff[0]?.propic,
    oldsignature: fStaff[0]?.signature,
  });
},[staffs])

  /*
useEffect(() => {
  getStaffById(params?.id)
    .then((ata) => {
      console.log("this is the staffsssss", ata);
      const st = ata;
      setUserData({
        ...st,
        propic: "",
        signature: "",
        oldpropic: st?.propic,
        oldsignature: st.signature,
      });
    })
    .catch((error) => {
      console.error(error);
    });

  // Code to run on every page refresh or load goes here

}, []);
*/

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
                


     
                {filterStaff[0]?.propic !== ''&&previewUrl!=='' ? (
                  <img  
                    src={previewUrl}
                    alt="profile"
                    style={{ width: 150, height: 150, cursor: 'pointer', borderRadius: '100%' }}
                  />
                ) : previewUrl === '' && filterStaff[0]?.propic === '' ? (
                  <Avatar sx={{ width: 150, height: 150, cursor: 'pointer' }}>
                    <Stack sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <Iconify icon={'eva:camera-fill'} sx={{ width: 40, height: 40 }} />
                      <p style={{ fontSize: '12px' }}> { 'upload Photo'}</p>
                    </Stack>
                  </Avatar>
                ) : (
                  <img
                    src={previewUrl||filterStaff[0]?.propic}
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
                  {filterStaff[0]?.signature !== ''&&signaturePreviewUrl!==''  ? (
                    <img
                      src={signaturePreviewUrl}
                      alt="profile"
                      style={{ width: 150, height: 150, cursor: 'pointer', borderRadius: '100%' }}
                    />
                  ) :  signaturePreviewUrl === '' && filterStaff[0]?.signature === ''  ? (
                    <Avatar sx={{ width: 150, height: 150, cursor: 'pointer' }}>
                    <Stack sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <Iconify icon={'eva:camera-fill'} sx={{ width: 40, height: 40 }} />
                      <p style={{ fontSize: '12px' }}> {'upload Signature'}</p>
                    </Stack>
                  </Avatar>
                  ) : (
                  <img
                    src={signaturePreviewUrl||filterStaff[0]?.signature}
                    alt=""
                    style={{ width: 150, height: 150, cursor: 'pointer', borderRadius: '100%' }}
                  />
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
                  

                        <Grid item xs={12} md={6}>
                          <Stack>
                            <FormLabel
                              id="employmentType "
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
        <Grid item xs={12} md={6}>
          <Stack>
            <FormLabel id="gender" sx={{ width: '100%', color: 'black', pb: 1, fontSize: '14px' }}>
              Department
            </FormLabel>
            <GeneralInput
              select
              variant="outlined"
              SelectProps={{
                native: true,
              }}
              
              value={userData?.department}
              name="department"
              onChange={(e) => handleFormChange(e.target)}
            >
              <option value={departments[0]?._id}>Select Department</option>
           {React.Children.toArray(departments?.map(department=>(<option value={department?._id}>{department?.department}</option>))
              )}
              
             
            </GeneralInput>
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

export default EditStaff;
