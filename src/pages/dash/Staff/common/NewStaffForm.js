import React, { useState } from 'react';
import { Grid, FormLabel, Stack } from '@mui/material';
import { GeneralInput } from '../../../../styles/main';

const NewStaffForm = ({ handleFormChange, userData, positions ,roles}) => {
  console.log(userData);

  return (
    <>
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
          <Stack>
            <FormLabel id="phone_number" sx={{ width: '100%', color: 'black', pb: 1, fontSize: '14px' }}>
              Phone Number
            </FormLabel>
            <GeneralInput
              value={userData?.phoneNumber}
              name="phoneNumber"
              onChange={(e) => handleFormChange(e.target)}
              fullWidth
              placeholder="Enter Phone Number"
            />
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
            </FormLabel>
            <GeneralInput
              value={userData?.employmentDate}
              name="employmentDate"
              onChange={(e) => handleFormChange(e.target)}
              fullWidth
              type="date"
              placeholder="Enter Phone Number"
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
              <option value="">Select Option</option>
              <option value="permanent staff">Permanent Staff</option>
              <option value="temporary staff">Temporary Staff</option>
              <option value="intern">Intern</option>
              <option value="contract">Contract</option>
            </GeneralInput>
          </Stack>
        </Grid>
        {/* <Grid item xs={12} md={6}>
          <Stack>
            <FormLabel
              id="ipPhone

"
              sx={{ width: '100%', color: 'black', pb: 1, fontSize: '14px' }}
            >
              Ip Phone
            </FormLabel>
            <GeneralInput
              value={userData?.ipPhone}
              name="ipPhone"
              onChange={(e) => handleFormChange(e.target)}
              fullWidth
              placeholder="Enter number "
            />
          </Stack>
        </Grid> */}
        {/* <Grid item xs={12} md={6}>
          <Stack>
            <FormLabel
              id="staffNo
"
              sx={{ width: '100%', color: 'black', pb: 1, fontSize: '14px' }}
            >
              Staff ID
            </FormLabel>
            <GeneralInput
              value={userData?.staffNo}
              name="staffNo"
              onChange={(e) => handleFormChange(e.target)}
              fullWidth
            />
          </Stack>
        </Grid> */}

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
              <option value={roles[0]?._id}>Select Gender</option>
           {React.Children.toArray(roles?.map(role=>(<option value={role?._id}>{role?.role}</option>))
              )}
              
              <option value="male">Male</option>
            </GeneralInput>
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

export default NewStaffForm;
