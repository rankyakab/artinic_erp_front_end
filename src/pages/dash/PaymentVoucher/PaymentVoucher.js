import React, { useEffect ,useState} from 'react';
import { useNavigate,Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Box,
  Typography,
  FormLabel,
  Stack,
  TextField,
  Button,
  FormControl,
  Grid,
  Container,
  CircularProgress,
    Paper ,
    Badge
} from '@mui/material';
import { alpha } from '@mui/material/styles';
// the updated
import {
  Timeline,
  TimelineDot,
  TimelineItem,
  TimelineContent,
  TimelineSeparator,
  TimelineConnector,
  TimelineOppositeContent,
} from '@mui/lab';
import SignalWifiStatusbar4BarIcon from '@mui/icons-material/SignalWifiStatusbar4Bar';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import PreviewIcon from '@mui/icons-material/Preview';
import { useDispatch, useSelector } from 'react-redux';

import DashboardHeader from '../../../layouts/dashboard/DashboardHeader';
// import Iconify from '../../../components/iconify/Iconify';
import { AllPaymentVoucher } from './common/PaymentVoucherTable';
import { Wrapper, HeadCard, FormCard } from '../../../styles/main';
import { getAllVoucher } from '../../../redux/actions/VoucherAction';
import { getAllStaffs,getStaffById } from '../../../redux/actions/StaffAction';
import { Block } from '../../../sections/_examples/Block';

const PaymentVoucher = () => {
  const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
   
   
  const dispatch = useDispatch();

  const { vouchers, voucherLoading } = useSelector((state) => state?.voucher);
const [myVoucher, setMyVoucher] = useState([]);
  // console.log(vouchers);

  useEffect(() => {
    dispatch(getAllVoucher());
   //  dispatch(getAllStaffs());
   
      
  }, []);

  useEffect(() => {
    setMyVoucher(vouchers.filter(  voucher =>    voucher?.copies?.some( copy => copy===user?.user?.staffId) || voucher?.recipientId === user?.user?.staffId  || voucher?.preparedBy=== user?.user?.staffId))
           
        
  
  }, [vouchers]);






  const TIMELINES =vouchers?.trail ? vouchers?.trail: [];

 const sectionColor = (item) =>{
let color = "";
  // item = item.toLowerCase();
  if(item==="pending approval"){
    color = "#FFA500";
  } else if (item==="rejected") {
    color = "#ff0000";
  } else if (item==="comment") {
     color ="#0000ff";
  } else if (item==="approved"){
     color = "#008000";
  } else {
    color = "#FFA500";
  }
  return color;
 }
 
  const statuscolor = sectionColor("start")
  return (
    <>
      <Helmet>
        <title> Payment Voucher | Relia Energy</title>
      </Helmet>

      <Wrapper>
        <DashboardHeader
          title={'Payment Vouchers'}
          text={'View, payment Voucher histories and create payment vouchers'}
        />
        <HeadCard>
          <Grid item md={3} sx={{ display: 'flex', justifyContent: 'center ', alignItems: 'center' }}>
            <Box>
              <Typography sx={{ fontWeight: 'bold', fontSize: 30 }}>{myVoucher?.length}</Typography>
              <Typography variant="body2" noWrap sx={{ color: 'text.secondary' }}>
                Total number of vouchers
              </Typography>
            </Box>
          </Grid>
          <Grid item md={3} sx={{ display: 'flex', justifyContent: 'center ' }}>
            <Stack>
              <FormLabel id="last_name" sx={{ width: '100%', color: 'text.secondary', pb: 0.5, fontSize: '14px' }}>
                Filter Voucher
              </FormLabel>

              <Box sx={{ width: 200 }}>
                <FormControl variant="filled" sx={{ width: '100%' }}>
                  <TextField
                    sx={{
                      background: '#F2F7FF',
                      borderRadius: '10px',
                      height: 50,
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                    select
                    variant="outlined"
                    SelectProps={{ native: true }}
                  >
                    <option value="">Filter Voucher </option>
                    <option value="">Memo Voucher</option>
                    <option value="">Procurement Voucher </option>
                  </TextField>
                </FormControl>
              </Box>
            </Stack>
          </Grid>
          <Grid item md={3} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <Button
              onClick={() => {
                navigate('/dashboard/create_voucher');
              }}
              sx={{ color: 'white', background: 'linear-gradient(135deg, #14ADD6 0%, #384295 100%)', py: 1.5, px: 5 }}
            >
              Create New Voucher
            </Button>
          </Grid>
        </HeadCard>

        <FormCard sx={{ width: '100%', overflowY: 'hidden' }}>
          {voucherLoading ? (
            <Container sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', my: 3 }}>
              <CircularProgress />
            </Container>
          ) : (
            <>
            
            <AllPaymentVoucher vouchers={myVoucher} />
             
            </>

          )}
        </FormCard>
      </Wrapper>
    </>
  );
};

export default PaymentVoucher;
