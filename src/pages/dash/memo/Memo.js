import { Helmet } from 'react-helmet-async';

import AllMemoComponet from './AllMemoComponet';

// import CreateMemoComponent from './CreateMemoComponent';
// components
// import { useSettingsContext } from '../../../components/settings';
import DashboardHeader from '../../../layouts/dashboard/DashboardHeader';
import { Wrapper } from '../../../styles/main';
// ----------------------------------------------------------------------

export default function PageFour() {
  // const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> Memo| Artinic App</title>
      </Helmet>
      <Wrapper>
        <DashboardHeader title={'Memo'} text={'Create and send memos to designated offices.'} />

        <AllMemoComponet />
           
        
      </Wrapper>
    </>
  );
}
