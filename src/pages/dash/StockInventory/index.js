import React from 'react';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Tab, Box } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import DashboardHeader from '../../../layouts/dashboard/DashboardHeader';
import { Wrapper } from '../../../styles/main';
import Stocks from './common/Stocks';
import Inventory from './common/Inventory';

const StockInventory = () => {
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <>
      <Helmet>Stocks And Inventory | Relia Energy</Helmet>
      <Wrapper>
        <DashboardHeader title={'Stocks and Inventory'} text={'Update stoke and inventory table'} />

        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Stocks" value="1" />
                {/* <Tab label="Inventory" value="2" /> */}
              </TabList>
            </Box>
            <TabPanel value="1" sx={{ px: 0 }}>
              <Stocks />
            </TabPanel>
            <TabPanel value="2" sx={{ px: 0 }}>
              <Inventory />
            </TabPanel>
          </TabContext>
        </Box>
      </Wrapper>
    </>
  );
};

export default StockInventory;
