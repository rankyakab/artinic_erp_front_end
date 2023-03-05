import PropTypes from 'prop-types';
import React from 'react';
import { Grid, FormLabel, Stack, Button } from '@mui/material';
import { GeneralInput } from '../../../../styles/main';

const AssignRoleForm = ({ handleFormChange, roles, filterStaff, userRole, handleEditRole }) => (
    <>
    
      <Grid container columnSpacing={4}>
        <Grid item xs={12} md={6}>
          <Stack>
            <FormLabel id="first_name" sx={{ width: '100%', color: 'black', pb: 1, fontSize: '14px' }}>
              User ID
            </FormLabel>
            <GeneralInput
              value={filterStaff[0]?.firstName}
              name="userId"
              onChange={(e) => handleFormChange(e.target)}
              disabled
            />
          </Stack>
        </Grid>

        <Grid item xs={12} md={6}>
          <Stack>
            <FormLabel id="last_name" sx={{ width: '100%', color: 'black', pb: 1, fontSize: '14px' }}>
              Role
            </FormLabel>
            <GeneralInput
              placeholder="Enter Last Name"
              value={userRole?.role}
              name="role"
              onChange={(e) => handleFormChange(e.target)}
              select
              SelectProps={{
                native: true,
              }}
              placeholder="Enter employment type"
            >
              <option value="">Select Option</option>
              {React.Children.toArray(roles?.map((role) => <option value={role?._id}>{role?.role}</option>))}
            </GeneralInput>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack>
            <Button
              sx={{
                color: 'white',
                background: 'linear-gradient(135deg, #14ADD6 0%, #384295 100%)',
                width: '30%',
                py: 1.5,
                px: 5,
                mt: 5,
                mb: 2,
              }}
              onClick={handleEditRole}
            >
              {/* {loading ? 'Loading...' : 'Edit Staff'} */}
              Edit User
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </>
  )

AssignRoleForm.propTypes = {
 handleFormChange:PropTypes.func , 
 roles:PropTypes.any, 
 filterStaff:PropTypes.array,
  userRole:PropTypes.any,
   handleEditRole:PropTypes.func,
  
 
  
};


export default AssignRoleForm;
