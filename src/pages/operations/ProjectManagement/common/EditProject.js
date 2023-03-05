import React, { useEffect, useState } from 'react';
import { Stack,  Box, Grid} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
// mimport { useNavigate } from 'react-router-dom';
// import { Helmet } from 'react-helmet-async';
// import DashboardHeader from '../../../../layouts/dashboard/DashboardHeader';
import { FormCard, Button, Title, GeneralInput, InputLabel } from '../../../../styles/main';
import SuccessCard from '../../../../components/SuccessCard';
import ErrorCard from '../../../../components/ErrorCard';
import { getAllProjects, editProjects } from '../../../../redux/actions/ProjectsAction';
import { getAllClients } from '../../../../redux/actions/ClientsAction';
import { getAllProtype } from '../../../../redux/actions/ProtypeAction';
import { getAllStaffs } from '../../../../redux/actions/StaffAction';

const EditProject = () => {
  const { clients } = useSelector((state) => state?.clients);
  const { protype } = useSelector((state) => state?.protype);
  const { staffs } = useSelector((state) => state?.staff);
  // const { projects, loading } = useSelector((state) => state.projects);

  const [projectStatus, setProjectStatus] = useState('');
  const [selectedClients, setSelectedClients] = useState('');
  const [selectedProtype, setSelectedProtype] = useState('');
  const [selectedManager, setSelectedManager] = useState('');

  // const [editing, setEditing] = useState(false);
  // const [editId, setEditId] = useState('');
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [projectsData, setProjectsData] = useState({
    projectName: '',
    clientId: selectedClients,
    status: projectStatus,
    projectType: selectedProtype,
    startDate: '',
    endDate: '',
    budget: '',
    description: '',
    projectManager: selectedManager,
  });

  const handleClose = () => {
    setOpen(false);
    setError(false);
  };

  const handleClick = () => {
    handleClose();
  };

  const handleFormChange = ({ name, value }) => {
    setProjectsData((prev) => ({
      ...prev,
      [name]: name === 'budget' ? Number(value) : value,
    }));
  };

  const dispatch = useDispatch();
 // const navigate = useNavigate();

  const handleEditProjects = (e) => {
    e.preventDefault();

    const payload = {
      ...projectsData,
      projectType: selectedProtype,
      clientId: selectedClients,
      status: projectStatus,
      projectManager: selectedManager,
    };
    delete payload.undefined;
    console.log(payload, 'edit project');
    dispatch(editProjects(payload, setErrorMessage, setSuccessMessage, setOpen, setError));
  };

  useEffect(() => {
    dispatch(getAllClients());
    dispatch(getAllProtype());
    dispatch(getAllStaffs());
    dispatch(getAllProjects());
  });

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1200,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    px: 4,
  };

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
      <Box sx={style}>
        {/* <FormCard onSubmit={handleCreateProtype}> */}
        <FormCard onSubmit={handleEditProjects}>
          <Title>Edit Projects</Title>
          <Grid container sx={{ mt: 4 }}>
            <Grid item xs={12} md={4}>
              <Stack>
                <InputLabel id="projectName">Project name</InputLabel>
                <GeneralInput
                  variant="outlined"
                  fullWidth
                  onChange={(e) => handleFormChange(e.target)}
                  placeholder="Enter title"
                  name="projectName"
                  value={projectsData?.projectName}
                />
              </Stack>
            </Grid>

            <Grid item xs={12} md={4}>
              <Stack>
                <InputLabel id="projectManager">Project Manager</InputLabel>
                <GeneralInput
                  select
                  name="projectManager"
                  value={selectedManager}
                  onChange={(e) => setSelectedManager(e.target.value)}
                  variant="outlined"
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option value="">Select Project Manager</option>

                  {staffs?.map((data) => (
                    <option value={data?._id} key={data._id}>
                      {data?.firstName} {data?.lastName}
                    </option>
                  ))}
                </GeneralInput>
              </Stack>
            </Grid>

            <Grid item xs={12} md={4}>
              <Stack>
                <InputLabel id="status">Status</InputLabel>
                <GeneralInput
                  select
                  name="status"
                  value={projectStatus}
                  variant="outlined"
                  onChange={(e) => setProjectStatus(e.target.value)}
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option value="">Select Status</option>
                  <option value={'Completed'}>Completed</option>
                  <option value={'Ongoing'}>On going</option>
                  <option value={'Failed'}>Failed</option>
                </GeneralInput>
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Stack>
                <InputLabel id="clientId">Clients</InputLabel>
                <GeneralInput
                  select
                  name="clientId"
                  value={selectedClients}
                  onChange={(e) => setSelectedClients(e.target.value)}
                  variant="outlined"
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option value="">Select Clients</option>

                  {clients?.map((data) => (
                    <option value={data?._id} key={data._id}>{data?.companyName}</option>
                  ))}
                </GeneralInput>
              </Stack>
            </Grid>

            <Grid item xs={12} md={4}>
              <Stack>
                <InputLabel id="projectType">Project Types</InputLabel>
                <GeneralInput
                  select
                  name="projectType"
                  value={selectedProtype}
                  onChange={(e) => setSelectedProtype(e.target.value)}
                  variant="outlined"
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option value="">Select Project type</option>
                  {protype?.map((data) => (
                    <option value={data?._id} key={data._id}>{data?.typeName}</option>
                  ))}
                </GeneralInput>
              </Stack>
            </Grid>

            <Grid item xs={12} md={4}>
              <Stack>
                <InputLabel id="budget"> Budget </InputLabel>
                <GeneralInput
                  variant="outlined"
                  fullWidth
                  type="number"
                  name="budget"
                  onChange={(e) => handleFormChange(e.target)}
                  placeholder="Add Budget"
                  value={projectsData?.budget}
                />
              </Stack>
            </Grid>

            <Grid item xs={12} md={4}>
              <Stack>
                <InputLabel id="startDate"> Start Date</InputLabel>
                <GeneralInput
                  variant="outlined"
                  fullWidth
                  onChange={(e) => handleFormChange(e.target)}
                  placeholder="DD/MM/YYYY"
                  value={projectsData?.startDate}
                  type="date"
                  name="startDate"
                />
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Stack>
                <InputLabel id="endDate"> End Date</InputLabel>
                <GeneralInput
                  variant="outlined"
                  fullWidth
                  onChange={(e) => handleFormChange(e.target)}
                  placeholder="DD/MM/YYYY"
                  value={projectsData?.endDate}
                  type="date"
                  name="endDate"
                />
              </Stack>
            </Grid>
          </Grid>
          <Grid item xs={12} md={4}>
            <Stack>
              <InputLabel id="description">Project Description</InputLabel>
              <GeneralInput
                sx={{ width: '65%' }}
                multiline
                rows={4}
                maxRows={4}
                name="description"
                value={projectsData?.description}
                variant="outlined"
                // fullWidth
                onChange={(e) => handleFormChange(e.target)}
                placeholder="Enter message..."
              />
            </Stack>
          </Grid>

          <Grid item xs={12} md={4}>
            <Button type="submit" sx={{ width: '31.7%' }}>
              Edit Project
            </Button>
          </Grid>
        </FormCard>
      </Box>
    </>
  );
};

export default EditProject;
