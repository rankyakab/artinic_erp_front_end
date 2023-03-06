import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Box, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Dashlets } from '../../../components/dashlets';
import { FormCard, Title, Wrapper } from '../../../styles/main';
import DashboardHeader from '../../../layouts/dashboard/DashboardHeader';
import { ProjectCompletion, ProjectStat } from './common/Statistics';
import ProspectiveProject from '../../../assets/images/posp_project.svg';
import TotalProject from '../../../assets/images/total_project.svg';
import OngoingProject from '../../../assets/images/ongoing_project.svg';
import CompleteProject from '../../../assets/images/completed_project.svg';
import { AllProject } from './common/ProjectTable';
import { getAllProjects } from '../../../redux/actions/ProjectsAction';

const Projects = () => {
  const navigate = useNavigate();

  const { projects, loading } = useSelector((state) => state.projects);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProjects());
  }, []);

  console.log(projects, 'projects');

  return (
    <>
      <Helmet>
        <title> Projects | Relia Energy</title>
      </Helmet>
      <Wrapper>
        <DashboardHeader title={'Project'} text={'View, track project progress, and also create a new project'} />
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Dashlets
              number={'10'}
              text={'Total number of staff'}
              // per={'12 more than last quarter'}
              img={ProspectiveProject}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <Dashlets
              number={'50'}
              text={'Total application'}
              per={'0.2% lower than last quarter'}
              img={TotalProject}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <Dashlets
              number={'20'}
              text={'Total projects'}
              //  per={'2% more than last quarter'}
              img={OngoingProject}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <Dashlets
              number={'30'}
              text={'Total departments'}
              //  per={'50 more than last year'}
              img={CompleteProject}
            />
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ my: 3 }}>
          <Grid item xs={12} md={3}>
            <Box sx={{ background: 'white', p: 2, borderRadius: '10px' }}>
              <ProjectCompletion />
            </Box>
          </Grid>
          <Grid item xs={12} md={9}>
            <Box sx={{ background: 'white', p: 2, borderRadius: '10px' }}>
              <ProjectStat />
            </Box>
          </Grid>
        </Grid>

        <FormCard>
          <AllProject projects={projects} />
        </FormCard>
      </Wrapper>
    </>
  );
};

export default Projects;
