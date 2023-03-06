import { useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import {
  Button,
  Container,
  Grid,
  Typography,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Table,
} from '@mui/material';
import { Stack } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import DashboardHeader from '../../../layouts/dashboard/DashboardHeader';
import { HeadCard } from '../../../styles/main';
import { useSettingsContext } from '../../../components/settings';
import Maintenance from '../../../assets/images/maintenance.svg';
import { getAllAssets, getAllScheduledMaintenance, getAllvendors } from '../../../redux/actions/MaintenanceAction';
import { capitalize } from '../../../utils/formatNumber';
import { GetStaffName, GetVendor, GetAssetName } from '../../../utils/getValueById';

function ScheduledMaintenance() {
  const [item, setItem] = useState([]);
  const navigate = useNavigate();
  const { themeStretch } = useSettingsContext();

  const params = useParams();
  const dispatch = useDispatch();

  const tableHead = ['Item name', 'Vendor', 'Date', 'Staff Assigned', 'Action', 'Status'];

  const { maintenance, vendors, assets } = useSelector((state) => state.maintenance);

  const { staffs } = useSelector((state) => state.staff);

  console.log(staffs);

  const maintenanceFilter = maintenance.filter((main) => main?._id === params?.id);

  // const getVendor = (id) => {
  //   const filteredVendor = vendors.filter((vendor) => vendor?._id === id);

  //   return <p>{capitalize(filteredVendor[0]?.accountName ? filteredVendor[0]?.accountName : 'Nill')}</p>;
  // };

  // const getStaffName = (id) => {
  //   const filterStaff = staffs?.filter((staff) => staff?._id === id);

  //   return (
  //     <p>
  //       {capitalize(filterStaff[0]?.firstName ? filterStaff[0]?.firstName : 'Nill')}{' '}
  //       {capitalize(filterStaff[0]?.lastName ? filterStaff[0]?.lastName : 'Nill')}
  //     </p>
  //   );
  // };

  // const getAssetName = (id) => {
  //   const filterAssets = assets?.filter((asset) => asset?._id === id);

  //   return <p>{capitalize(filterAssets[0]?.assetName ? filterAssets[0]?.assetName : 'Nill')}</p>;
  // };

  useEffect(() => {
    dispatch(getAllScheduledMaintenance());
    dispatch(getAllvendors());
    dispatch(getAllAssets());
    // dispatch(getAl());
  }, []);

  return (
    <>
      <Helmet>
        <title> Schedule Maintenance | Minimal UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <DashboardHeader
          title={'Schedule Maintenance'}
          icon={Maintenance}
          text={'Schedule a maintenance for future use.'}
        />
        <Typography
          sx={{ color: 'primary.main', cursor: 'pointer' }}
          onClick={() => {
            navigate('/dashboard/maintenance');
          }}
        >
          Back
        </Typography>

        <HeadCard sx={{ width: '100%', mt: '16px' }}>
          <Stack sx={{ width: '100%' }} spacing={{ xs: 1, sm: 2, md: 8 }}>
            <Grid>
              <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}>Scheduled Maintenance</Typography>
            </Grid>

            <TableContainer sx={{ maxHeight: '550px', width: '100%' }} className="memo-table_paper">
              <Table>
                <TableHead>
                  <TableRow>
                    {tableHead.map((td, key) => (
                      <TableCell
                        key={key}
                        style={{
                          minWidth: 80,
                          fontWeight: 800,
                          fontSize: '12px',
                          lineHeight: '16px',
                          color: '#515151',
                        }}
                      >
                        {td}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {maintenanceFilter?.map((data, key) => (
                    <TableRow key={key}>
                      <TableCell
                        style={{
                          minWidth: 80,
                          fontSize: '16px',
                          fontWeight: '800',
                        }}
                      >
                        {GetAssetName(data?.assetId, assets)}
                      </TableCell>
                      <TableCell
                        style={{
                          minWidth: 80,
                          fontSize: '16px',
                          fontWeight: '800',
                        }}
                      >
                        {GetVendor(data?.vendorId, vendors)}
                      </TableCell>

                      <TableCell
                        style={{
                          minWidth: 80,
                          fontSize: '16px',
                          fontWeight: '800',
                        }}
                      >
                        {moment(data?.createdAt).format('L')}
                      </TableCell>

                      <TableCell
                        style={{
                          minWidth: 80,
                          fontSize: '16px',
                          fontWeight: '800',
                        }}
                      >
                        {GetStaffName(data?.staffAssigned, staffs)}
                      </TableCell>
                      <TableCell
                        style={{
                          minWidth: 80,
                          fontSize: '16px',
                          fontWeight: '800',
                        }}
                      >
                        {data?.actionRequired}
                      </TableCell>
                      <TableCell
                        style={{
                          minWidth: 80,
                          fontSize: '16px',
                          fontWeight: '800',
                        }}
                      >
                        {data?.status}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Grid xs={12} md={4}>
              <Button
                sx={{
                  color: 'white',
                  background: 'linear-gradient(135deg, #14ADD6 0%, #384295 100%)',
                  py: 1,
                  px: 5,
                  width: '30%',
                }}
                onClick={() => navigate('/dashboard/schedule-maintenance')}
              >
                Schedule Maintenance
              </Button>
            </Grid>
          </Stack>
        </HeadCard>
        {/* <HeadCard sx={{ width: '100%', mt: '1rem' }}>
          <Stack sx={{ width: '100%' }} spacing={{ xs: 1, sm: 2, md: 12 }}>
            <Grid>
              <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}>Payment Invoice</Typography>
            </Grid>

            <Grid xs={12} md={4}>
              <Button
                sx={{
                  color: 'white',
                  background: 'linear-gradient(135deg, #14ADD6 0%, #384295 100%)',
                  py: 1,
                  px: 5,
                  width: '30%',
                }}
                onClick={() => navigate('/dashboard/schedule-maintenance')}
              >
                Submit
              </Button>
            </Grid>
          </Stack>
        </HeadCard> */}
      </Container>
    </>
  );
}

export default ScheduledMaintenance;
