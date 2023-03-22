import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Document, Page } from 'react-pdf';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// Import { PDFDocument, PDFText, PDFTable, PDFTableRow, PDFTableColumn, PDFColumns, PDFColumn } from 'react-pdfmake';
import { useNavigate, useParams } from 'react-router';
import {
  Timeline,
  TimelineDot,
  TimelineItem,
  TimelineContent,
  TimelineSeparator,
  TimelineConnector,
  TimelineOppositeContent,
} from '@mui/lab';
import { alpha } from '@mui/material/styles';
import SignalWifiStatusbar4BarIcon from '@mui/icons-material/SignalWifiStatusbar4Bar';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
// import { Document, Page, pdfjs } from 'react-pdf';
// import pdfMake from 'pdfmake/build/pdfmake';
// import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';
// import pdfFonts from 'pdfmake/build/vfs_fonts';
import PreviewIcon from '@mui/icons-material/Preview';
import {  Button, Stack,TextField, Paper, Container, Grid,Badge,  Typography } from '@mui/material';
// import DashboardLayout from '../../../layouts/dashboard/DashboardLayout';
import Back from '../../../assets/images/arrow_left.svg';
// import ReliabuildInvoiceTemp from '../../../assets/images/ReliabuildInvoiceTemp.png';
import Invoice from '../../../assets/icons/Invoice.svg';
import { Block } from '../../../sections/_examples/Block';
import DashboardHeader from '../../../layouts/dashboard/DashboardHeader';
import {
  GeneralInput,
  HeadCard,
  InputLabel,
  MemoDetailsParagraph,
  MemoDetailsSpan,
  Wrapper,
} from '../../../styles/main';

// import { updateMemoStatus } from '../../../redux/actions/MemoAction';
import { capitalize } from '../../../utils/formatNumber';
import { updateMemoStatus , getSingleMemo} from '../../../redux/actions/MemoAction';
import SuccessCard from '../../../components/SuccessCard';
import ErrorCard from '../../../components/ErrorCard';

// pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;
// pdfMake.vfs = pdfFonts.pdfMake.vfs;

function MemoDetails() {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [pageNumber, setPageNumber] = useState(1);


  
const { user } = useSelector((state) => state.auth);
  const { memo, loading } = useSelector((state) => state.memo);
   const { staffs } = useSelector((state) => state.staff);
  const [numPages, setNumPages] = useState(null);
  // const [scale, setScale] = useState(1.0);
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

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

  const statuscolor = sectionColor(memo.status)

    const getCcName = (id) => {
    const filterStaff = staffs?.filter((staff) => staff?._id === id);

   // console.log(filterStaff);
   // console.log(id);
     // return "Hello dear";
 return capitalize(filterStaff[0]?.firstName) + capitalize(filterStaff[0]?.lastName);

  };

 

 // console.log(staffs);

  const getName = (id) => {
    const filterStaff = staffs?.filter((staff) => staff?._id === id);

   // console.log(id);

   // console.log(filterStaff);

    return (
      
        <>
         { capitalize(filterStaff[0]?.firstName)} {capitalize(filterStaff[0]?.lastName)
         }
      </>
    );
  };

 // console.log(params);
 // console.log("this is all memeo",allMemo)

 // const memo = allMemo?.filter((item) => item?._id === params?.id);

 
 const TIMELINES =memo?.trail ? memo?.trail: [];

  const handleFormChange = ({ name, value }) => {
    setMemoData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  /*

  const [recipient, setRecipient] = useState({
    recipientId: memo?.recipientId,
    action: '',
    status: '',
    remarks: '',
    _id: memo?._id,
  });
  */
const [memoData, setMemoData] = useState({
    // memoDate: moment(memo[0]?.createdAt).format('L'),
    memoTitle: memo?.memoTitle,
    memoBody: memo?.memoBody,
    ownerId: user?.user?.staffId,
    memoId: params?.id,
    attachment:"",
    status:"",
    remark:""
  });
  
  
  // const memoCopies = memo?.copies;

  // console.log(memoCopies);

  const handleMemoAction = (e) => {
    e.preventDefault();
    const selected = {
             
            
              
              

      memoId: params?.id,
      ownerId: user?.user?.staffId,
      ...memoData,
    };
    // console.log(selected);
    const header = {
         
             'Access-Control-Allow-Origin': '*',
              'mode': 'no-cors',
              'Content-Type': 'application/json',
          };
    dispatch(updateMemoStatus(selected, setOpen, setError, setErrorMessage, setSuccessMessage,header,false));
  };

  const handleClose = () => {
    setOpen(false);
    setError(false);
    navigate(-1)
  };

  const handleClick = () => {
    handleClose();
  };
   useEffect(() => {

    dispatch(getSingleMemo(params.id));
    
  }, []);
  
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
      <Helmet>Memo Detail | Relia Energy</Helmet>
      <Wrapper>
        <DashboardHeader title={'MEMO    Details'} text={'View Staff’s memo details'} icon={Invoice} />
        <Stack>
          <Typography
            sx={{ color: 'primary.main', cursor: 'pointer', display: 'flex', mt: '42px', mb: '32px' }}
            onClick={() => {
              navigate(-1);
            }}
          >
            <img src={Back} alt="back" style={{ marginRight: '0.5rem' }} />
            Back
          </Typography>
        </Stack>
        <HeadCard
          sx={{
            justifyContent: 'flex-start',
            gap: '170px',
          }}
        >
          <Stack spacing={2}>
            {/* <Box
          style={{
            margin: '24px 0px 0px 0px',
            width: '100%',
          }}
        >
          <Document
            file={pdfToView}
            onLoadSuccess={onDocumentLoadSuccess}
            onSourceError={() => {
              console.log('error retrieving document');
            }}
            error={() => {
              return 'Failed to load PDF file.';
            }}
          >
            <Page pageNumber={numPages} scale={scale} />
          </Document>
        </Box> */}
            <Stack spacing={6} sx={{ mb: '50px' }}>
              <Typography variant="h4">{memo?.memoType}</Typography>
              <Stack spacing={4} sx={{ gap: '30px' }}>
                <MemoDetailsParagraph variant="h5">
                  Date: <MemoDetailsSpan>{moment(memo?.createdAt).format('L')}</MemoDetailsSpan>
                </MemoDetailsParagraph>
                <MemoDetailsParagraph variant="h5">
                  From: <MemoDetailsSpan> {getName(memo?.ownerId)}</MemoDetailsSpan>
                </MemoDetailsParagraph>
                <MemoDetailsParagraph variant="h5">
                  To: <MemoDetailsSpan> {getName(memo?.recipientId)}</MemoDetailsSpan>
                </MemoDetailsParagraph>

                <Stack sx={{ marginTop: '0px !important' }}>
                  {React.Children.toArray(
                    memo?.copies?.map((copy, index) => (
                      <Stack direction={'row'} alignItems="center">
                        <MemoDetailsParagraph>{`CC${index + 1}:`} </MemoDetailsParagraph>
                        <MemoDetailsSpan>{getName(copy)}</MemoDetailsSpan>
                      </Stack>
                    ))
                  )}
                </Stack>

                <MemoDetailsParagraph>
                  Attachment:
                  <MemoDetailsSpan>{memo?.attachment === '' ? 'No' : 'Yes'}</MemoDetailsSpan>
                </MemoDetailsParagraph>
                <MemoDetailsParagraph>
                  Memo Message:
                  <MemoDetailsSpan>{memo?.memoBody}</MemoDetailsSpan>
                </MemoDetailsParagraph>
                {console.log("This is the memo attachment",memo?.attachment)}
              </Stack>
            </Stack>
            {
            /* <img
              src={memo[0]?.attachment}
              alt="invoice"
              style={{
                margin: '24px 0px 0px 0px',
              }}
            /> */
            }
            {memo.attachment &&(
 <Grid
              xs={12}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '800px',
                width: '100%',
                overflowX: 'hidden',
                margin: '3rem 1rem',
              }}
            >
              
       <iframe
        src={memo.attachment}
        width="100%"
        height="700px"
        title=" "
       />

            </Grid>
            )}
           
            <Stack direction={'row'} sx={{ mt: '3rem' }} alignItems="center" spacing={4} width="100%">
              <Typography
                variant="h5"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  fontWeight: '600',
                  fontSize: '16px !important',
                  lineHeight: '22px',
                  color: '#272525',
                }}
              >
                Action:{' '}
                <span
                  style={{
                    marginLeft: '10px',
                    fontWeight: '400',
                    fontSize: '14px !important',
                    lineHeight: '22px',
                    color: '#272525',
                  }}
                >
                  Recommended for approval
                </span>
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  fontWeight: '600',
                  fontSize: '16px !important',
                  lineHeight: '22px',
                  color: '#272525',
                }}
              >
                By:{' '}
                <span
                  style={{
                    marginLeft: '10px',
                    fontWeight: '400',
                    fontSize: '14px !important',
                    lineHeight: '22px',
                    color: '#272525',
                  }}
                >
                  Fatimah Mohammed
                </span>
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  fontWeight: '600',
                  fontSize: '16px !important',
                  lineHeight: '22px',
                  color: '#272525',
                }}
              >
                Signature:{' '}
                <span
                  style={{
                    marginLeft: '10px',
                    fontWeight: '400',
                    fontSize: '14px',
                    lineHeight: '22px',
                    color: '#272525',
                  }}
                />
              </Typography>
            </Stack>
            <Grid container sx={{ mt: 4 }} component="form" onSubmit={handleMemoAction}>
              <Grid item xs={12} md={4}>
                <Stack>
                  <InputLabel id="action">Action</InputLabel>
                  <GeneralInput
                    select
                    variant="outlined"
                    SelectProps={{
                      native: true,
                    }}
                    value={memoData?.status}
                    name="status"
                    onChange={(e) => handleFormChange(e.target)}
                  >
                    <option value="">Select action</option>
                    <option value="approve">Approve</option>
                    <option value="comment">Comment</option>
                    <option value="reject">Reject</option>
                  </GeneralInput>
                </Stack>
              </Grid>
              <Grid item xs={12} md={12}>
                <Stack>
                  <InputLabel id="date">Remarks</InputLabel>
                  
                <TextField
                  multiline
                  rows={8}
                  required
                  variant="outlined"
                  fullWidth
                   value={memoData?.remarks}
                    name="remarks"
                    onChange={(e) => handleFormChange(e.target)}
                  
               //   onChange={(e) => handleFormChange(e.target)}
                  // {...register('memoTitle')}
                />


                </Stack>
              </Grid>
              <Grid
                item
                xs={12}
                md={4}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Button type="submit" sx={{ width: '100%', height: '55px', margin: '16px'  }}>
                  {loading ? 'Please wait...' : ' Submit'}
                </Button>
              </Grid>
            </Grid>
          </Stack>
        </HeadCard>
         <Container sx={{ my: 10 }}>
         <Block title="Memo Trail">
           <Timeline position="">
            
            {TIMELINES.map((item) => (
              
                 <TimelineItem key={item._id} >
                  
                <TimelineOppositeContent>
                  
                 
                  <Typography variant="body2" sx={{ color: 'primary' }}>
                    {item.ownerId===user?.user?.staffId?(
                 
                  <>
                  <Badge color="secondary" badgeContent={0} >
                    
                      <SignalWifiStatusbar4BarIcon color={statuscolor}/>
                      {item.status}
                  
                  </Badge>
                  <Typography variant="body2" sx={{ color: statuscolor }}>
                    <Badge color="secondary" badgeContent={0} >
                    
                      <AccessTimeFilledIcon color={statuscolor} />
                     {memo.updatedAt}
                  
                  </Badge>
                    
                  </Typography>
                  </>
                  
                  ):(
                      <Paper
                    sx={{
                      p: 3,
                      bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
                    }}
                  >
                    <Typography variant="subtitle2">{item?.memoTitle?.toUpperCase()}</Typography>
                   
                    <Typography variant="body2" sx={{ color: 'secondary' }}>
                      {item?.momoBody?.toUpperCase()}
                    </Typography>
                     <Button variant="outlined" startIcon={<PreviewIcon /> }>
                      <Link to="/newpage">View Details</Link>
                    </Button>
                     
                       
                    
                     
                      
                    
                  </Paper>
                  )}
                  
                 
                  </Typography>
                </TimelineOppositeContent>


                <TimelineSeparator>
                  <TimelineDot  />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  {item.ownerId===user?.user?.staffId?(
                  <Paper
                    sx={{
                      p: 3,
                      bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
                    }}
                  >
                      <Typography variant="body2" sx={{ color: statuscolor }}>
                      {item.remarks}
                    </Typography>
                    
                       
                        <Typography variant="body2" sx={{ color: 'secondary' }}>
                      {getCcName(item.ownerId)}
                    </Typography>
                     
                  </Paper>
                  ):(
                     
                  <>
                  <Badge color="secondary" badgeContent={0} >
                    
                      <SignalWifiStatusbar4BarIcon color={statuscolor} />
                      {item.status}
                  
                  </Badge>
                  <Typography variant="body2" sx={{ color: 'primary' }}>
                    <Badge color="secondary" badgeContent={0} >
                    
                      <AccessTimeFilledIcon color={statuscolor} />
                     {memo.updatedAt}
                  
                  </Badge>
                      
                     

                  </Typography>
                  </>
                  )}
                  
                </TimelineContent>
              </TimelineItem>
  
            
             
            ))}

          </Timeline>
        </Block>
      </Container>
      </Wrapper>
    </>
  );
}

export default MemoDetails;
