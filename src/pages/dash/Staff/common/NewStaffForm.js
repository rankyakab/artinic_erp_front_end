/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid, FormLabel, Stack } from '@mui/material';
import { GeneralInput } from '../../../../styles/main';

const NewStaffForm = ({ handleFormChange, userData, positions }) => {
// const first = userData.firstname
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PHONE_REGEX = /^\+234[0-9]{10}$/;
const DATE_REGEX =/^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}$/;

 // eslint-disable-next-line react-hooks/exhaustive-deps
 const EMAIL_REGEX =/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/ ;
// const PWD_REGEX =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
;
// const REGISTER_URL = '/register';

   const firstNameRef = useRef();
    // for first name
  const [validFirstName, setValidFirstName] = useState(false);
  const [firstNameFocus, setFirstNameFocus] = useState(false);

  // for last Name
  const [validLastName, setValidLastName] = useState(false);
  const [lastNameFocus, setLastNameFocus] = useState(false);

     // for phone Number
  const [validPhoneNumber, setValidPhoneNumber] = useState(false);
  const [phoneNumberFocus, setPhoneNumberFocus] = useState(false);

   // for Employment Date
  const [validEmploymentDate, setValidEmploymentDate] = useState(false);
  const [employmentDateFocus, setEmploymentDateFocus] = useState(false);

   // for Employment Type
  const [validEmploymentType, setValidEmploymentType] = useState(false);
  const [employmentTypeFocus, setEmploymentTypeFocus] = useState(false);


    // for gender
  const [validGender, setValidGender] = useState(false);
  const [genderFocus, setGenderFocus] = useState(false);

     // for personal email
  const [validPersonalEmail, setValidPersonalEmail] = useState(false);
  const [personalEmailFocus, setPersonalEmailFocus] = useState(false);

     // for official designation
  // const [designation, setDesignation] = useState(false);
  // const [designationFocus, setDesignationFocus] = useState(false);

  
       // for staffPositionId
  // const [staffPositionId, setStaffPositionId] = useState(false);
  // const [staffPositionIdFocus, setStaffPositionIdFocus] = useState(false);

   useEffect(() => {
        firstNameRef.current.focus();
    }, [])
   


    useEffect(() => {
        setValidFirstName(USER_REGEX.test(userData?.firstName));
         setValidLastName(USER_REGEX.test(userData?.lastName));
          setValidPhoneNumber(PHONE_REGEX.test(userData?.phoneNumber));
         setValidEmploymentDate(DATE_REGEX.test(userData?.employmentDate));
         setValidEmploymentType(userData?.employmentType!=="");
         setValidGender(userData?.gender!=="");
          setValidPersonalEmail(EMAIL_REGEX.test(userData?.personalEmail));

    },[USER_REGEX, userData.firstName, userData.lastName, userData.phoneNumber, userData.employmentDate, userData.employmentType, userData.gender, userData.personalEmail, PHONE_REGEX, DATE_REGEX, EMAIL_REGEX])
 




  return (
    <>
      <Grid container columnSpacing={4}>
        <Grid item xs={12} md={6}>
          <Stack>
             
            <FormLabel id="first_name" sx={{ width: '100%', color: 'black', pb: 1, fontSize: '14px' }}>
              First Name
              <FontAwesomeIcon icon={faCheck} className={validFirstName ? "valid" : "hide"} />
                <FontAwesomeIcon icon={faTimes} className={validFirstName || !userData.firstName ? "hide" : "invalid"} />
                      
            </FormLabel>
            <GeneralInput
              placeholder="Enter First Name"
              value={userData?.firstName}
               ref={firstNameRef}
              name="firstName"
              onChange={(e) => handleFormChange(e.target)}

              required
               aria-invalid={validFirstName ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setFirstNameFocus(true)}
                onBlur={() => setFirstNameFocus(false)}
            />
            
             <p id="uidnote" className={firstNameFocus && userData?.firstName && !validFirstName ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            4 to 24 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed.
             </p>

          </Stack>
        </Grid>

        <Grid item xs={12} md={6}>
          <Stack>
            <FormLabel id="last_name" sx={{ width: '100%', color: 'black', pb: 1, fontSize: '14px' }}>
              Last Name
              <FontAwesomeIcon icon={faCheck} className={validLastName ? "valid" : "hide"} />
                <FontAwesomeIcon icon={faTimes} className={validLastName || !userData.lastName ? "hide" : "invalid"} />
                 
            </FormLabel>
            <GeneralInput
              placeholder="Enter Last Name"
              value={userData?.lastName}
              name="lastName"
              onChange={(e) => handleFormChange(e.target)}
              required
               aria-invalid={validLastName ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setLastNameFocus(true)}
                onBlur={() => setLastNameFocus(false)}
            />
             <p id="uidnote" className={lastNameFocus && userData?.lastName && !validLastName ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            4 to 24 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed.
             </p>
          </Stack>
        </Grid>


        <Grid item xs={12} md={6}>
          <Stack>
            <FormLabel id="phone_number" sx={{ width: '100%', color: 'black', pb: 1, fontSize: '14px' }}>
              Phone Number
              <FontAwesomeIcon icon={faCheck} className={validPhoneNumber ? "valid" : "hide"} />
                <FontAwesomeIcon icon={faTimes} className={validPhoneNumber || !userData?.phoneNumber ? "hide" : "invalid"} />
                 
            </FormLabel>
            <GeneralInput
              value={userData?.phoneNumber}
              name="phoneNumber"
              onChange={(e) => handleFormChange(e.target)}
              fullWidth
              placeholder="Enter Phone Number"
              required
              aria-invalid={validPhoneNumber ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setPhoneNumberFocus(true)}
                onBlur={() => setPhoneNumberFocus(false)}

            />
             <p id="uidnote" className={phoneNumberFocus && userData?.phoneNumber && !validPhoneNumber ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Phone number must be of format:<br />
                            +234 XXXXXXXXXX<br />
                            
             </p>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack>
            <FormLabel
              id="employmentDate
"
              sx={{ width: '100%', color: 'black', pb: 1, fontSize: '14px' }}
            >
              Employment Date 
              <FontAwesomeIcon icon={faCheck} className={validEmploymentDate ? "valid" : "hide"} />
                <FontAwesomeIcon icon={faTimes} className={validEmploymentDate || !userData?.employmentDate ? "hide" : "invalid"} />
                 
            </FormLabel>
            <GeneralInput
              value={userData?.employmentDate}
              name="employmentDate"
              onChange={(e) => handleFormChange(e.target)}
                required
              aria-invalid={validEmploymentDate ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setEmploymentDateFocus(true)}
                onBlur={() => setEmploymentDateFocus(false)}
              
              fullWidth
              type="date"
              placeholder="Enter Phone Number"
            />
             <p id="uidnote" className={employmentDateFocus && userData?.employmentDate && !validEmploymentDate ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Input the Right Date format dd-mm-yyyy<br />
                            Must begin with a letter.<br />
                            
             </p>
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
              <FontAwesomeIcon icon={faCheck} className={validEmploymentType ? "valid" : "hide"} />
                <FontAwesomeIcon icon={faTimes} className={validEmploymentType || !userData?.employmentType ? "hide" : "invalid"} />
                 
            </FormLabel>
            <GeneralInput
              value={userData?.employmentType}
              name="employmentType"
              onChange={(e) => handleFormChange(e.target)}
              fullWidth
              select

                 required
              aria-invalid={validEmploymentDate ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setEmploymentTypeFocus(true)}
                onBlur={() => setEmploymentTypeFocus(false)}
              SelectProps={{
                native: true,
              }}
              placeholder="Enter employment type"
            >
              <option value="">Select Option</option>
              <option value="permanent staff">Permanent Staff</option>
              <option value="temporary staff">Temporary Staff</option>
              <option value="intern">Intern</option>
              <option value="contract">Contract</option>
            </GeneralInput>
            <p id="uidnote" className={employmentTypeFocus && userData?.employmentType && !validEmploymentDate ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Employment Type must be selected from the dropdown<br />
                            
                            
             </p>
          </Stack>
        </Grid>
     
        <Grid item xs={12} md={6}>
          <Stack>
            <FormLabel id="gender" sx={{ width: '100%', color: 'black', pb: 1, fontSize: '14px' }}>
              Gender
               <FontAwesomeIcon icon={faCheck} className={validGender ? "valid" : "hide"} />
                <FontAwesomeIcon icon={faTimes} className={validGender || !userData?.gender ? "hide" : "invalid"} />
                 
            </FormLabel>
            <GeneralInput
              select
              variant="outlined"
              required
              aria-invalid={validGender ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setGenderFocus(true)}
                onBlur={() => setGenderFocus(false)}
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
             <p id="uidnote" className={genderFocus && userData?.gender && !validGender ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Gender must be selected from the dropdown<br />
                            
                            
             </p>
          </Stack>
        </Grid>

        


        <Grid item xs={12} md={6}>
          <Stack>
            <FormLabel id="official_email" sx={{ width: '100%', color: 'black', pb: 1, fontSize: '14px' }}>
              Official Email
              <FontAwesomeIcon icon={faCheck} className={validPersonalEmail ? "valid" : "hide"} />
                <FontAwesomeIcon icon={faTimes} className={validPersonalEmail || !userData?.personalEmail ? "hide" : "invalid"} />
                 
            </FormLabel>
            <GeneralInput
              value={userData?.personalEmail}
              name="personalEmail"
              onChange={(e) => handleFormChange(e.target)}
              placeholder="Official Email "
                required
              aria-invalid={validPersonalEmail ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setPersonalEmailFocus(true)}
                onBlur={() => setPersonalEmailFocus(false)}
            />
            <p id="uidnote" className={personalEmailFocus && userData?.personalEmail && !validPersonalEmail ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Personal Email formart is not correct<br />
                            
                            
             </p>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack>
            <FormLabel id="official_email" sx={{ width: '100%', color: 'black', pb: 1, fontSize: '14px' }}>
              Designation
            </FormLabel>
            <GeneralInput
              value={userData?.designation}
              name="designation"
              onChange={(e) => handleFormChange(e.target)}
              placeholder="Designation"
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
              Positions
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
    </>
  );
};

  NewStaffForm.propTypes = {
 handleFormChange:PropTypes.func , 
 userData:PropTypes.any, 
 positions:PropTypes.array,
  
 
  
};
export default NewStaffForm;
