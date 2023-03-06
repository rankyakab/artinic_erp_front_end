import { Helmet } from 'react-helmet-async';
// @mui
import { Container, Typography } from '@mui/material';
import AllCirculars from './AllCirculars';
// components
import { useSettingsContext } from '../../../components/settings';
import DashboardHeader from '../../../layouts/dashboard/DashboardHeader';
import { Wrapper } from '../../../styles/main';

// ----------------------------------------------------------------------

export default function PageFive() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> Circulars | Relia Energy</title>
      </Helmet>
      <Wrapper>
        <DashboardHeader title={'Circulars'} text={'Create and send office circulars.'} />
        <AllCirculars />
      </Wrapper>
    </>
  );
}
