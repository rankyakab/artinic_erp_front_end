import React,{useState,useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Table, TableBody, TableRow, Paper, TableHead, TableCell, TableContainer, Stack } from '@mui/material';
import { TablePagination } from '../../../../utils/memoPaginationUtil';
import { getAllVoucher } from '../../../../redux/actions/VoucherAction';
import { getAllMemo } from '../../../../redux/actions/MemoAction';

import { Title, Action, Button } from '../../../../styles/main';


export const ClientInvoice = () => {
  const tableHead = ['S/N', 'Client Invoice Under Construction', 'Action'];

  const tableData = [
    {
      id: '01',
      invoice_title: 'Payment request for project xyz',
    },

   
  ];

  return (
    <>
      <Box>
        <TableContainer component={Paper}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 3 }}>
            <Title>Client Invoices Under Construction</Title>
            <Button
            //   onClick={() => {
            //     navigate('/dashboard/procurement_request');
            //   }}
            >
              View All
            </Button>
          </Box>
          <Table sx={{ minWidth: 450 }} aria-label="simple table">
            <TableHead>
              <TableRow
                sx={{
                  ' td,  th': {
                    borderBottom: '0.5px solid #D0D0D0',
                    fontWeight: 800,
                    fontSize: '14px',
                    lineHeight: '16px',
                    color: '#515151',
                    background: 'white',
                    py: 1,
                  },
                }}
              >
                {tableHead.map((td, key) => (
                  <TableCell key={key}>{td}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData?.map((data, key) => (
                <TableRow key={key} sx={{ ' td,  th': { borderBottom: '0.5px solid #D0D0D0', py: 0 } }}>
                  <TableCell component="th" scope="row">
                    {key + 1}
                  </TableCell>
                  <TableCell sx={{ textAlign: 'left' }}>{data.invoice_title}</TableCell>
                  <TableCell>
                    <Action>View More</Action>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};
export const VoucherList = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
        const { vouchers } = useSelector((state) => state?.voucher);
        const [tableVouchers, setTableVouchers] = useState([])
  useEffect(()=>{
    dispatch(getAllVoucher());
      const displayeVouchers = vouchers?.slice(0, 4);
      setTableVouchers(displayeVouchers)
  },[])

  
  const tableHead = ['S/N', " Raised Voucher's", 'Action'];

  

  return (
    <>
      <Box>
        <TableContainer component={Paper}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 3 }}>
            <Title>Voucher List</Title>
            <Button
              onClick={() => {
                 navigate('/dashboard/payment_voucher');
              }}
            >
              View All
            </Button>
          </Box>
          <Table sx={{ minWidth: 450 }} aria-label="simple table">
            <TableHead>
              <TableRow
                sx={{
                  ' td,  th': {
                    borderBottom: '0.5px solid #D0D0D0',
                    fontWeight: 800,
                    fontSize: '14px',
                    lineHeight: '16px',
                    color: '#515151',
                    background: 'white',
                    py: 1,
                  },
                }}
              >
                {tableHead.map((td, key) => (
                  <>                  { console.log({td, key})}

                  <TableCell key={key}>{td}</TableCell>
                  </>

                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableVouchers?.map((data, key) => (
                <TableRow key={data._id} sx={{ ' td,  th': { borderBottom: '0.5px solid #D0D0D0', py: 0 } }}>
                  <TableCell component="th" scope="row">
                  {key+1}
                  </TableCell>
                  <TableCell sx={{ textAlign: 'left' }}>{data.subject}</TableCell>
                  <TableCell>
                    <Action onclick={()=> navigate(`dashboard/payment_voucher/${data._id}`)} >View More</Action>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};
export const MemoList = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
        const { allMemo } = useSelector((state) => state?.memo);
        const [tableMemo, setTableMemo] = useState([])
  useEffect(()=>{
    dispatch(getAllMemo());
      const displayedMemo = allMemo?.slice(0, 4);
      setTableMemo(displayedMemo)
  },[])

  useEffect(() => {

    
  }, [dispatch]);
  
  const tableHead = ['S/N', " Raised Memo's", 'Action'];

  

  return (
    <>
      <Box>
        <TableContainer component={Paper}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 3 }}>
            <Title>Memo List</Title>
            <Button
              onClick={() => {
                 navigate('/dashboard/memo');
              }}
            >
              View All
            </Button>
          </Box>
          <Table sx={{ minWidth: 450 }} aria-label="simple table">
            <TableHead>
              <TableRow
                sx={{
                  ' td,  th': {
                    borderBottom: '0.5px solid #D0D0D0',
                    fontWeight: 800,
                    fontSize: '14px',
                    lineHeight: '16px',
                    color: '#515151',
                    background: 'white',
                    py: 1,
                  },
                }}
              >
                {tableHead.map((td, key) => (
                  <>           

                  <TableCell key={key}>{td}</TableCell>
                  </>

                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableMemo?.map((data, key) => (
                <TableRow key={data._id} sx={{ ' td,  th': { borderBottom: '0.5px solid #D0D0D0', py: 0 } }}>
                  <TableCell component="th" scope="row">
                  {key+1}
                  </TableCell>
                  <TableCell sx={{ textAlign: 'left' }}>{data.title || data.memoTitle}</TableCell>
                  <TableCell>
                    <Action onclick={()=> navigate(`dashboard/memo-details/${data._id}`)} >View More</Action>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};
export const ClientReceipt = () => {
  const tableHead = ['S/N', 'Procurement Invoices Under Construction', 'Action'];

  const tableData = [
    {
      id: '01',
      invoice_title: 'Payment request for project xyz',
    },

   
    
  ];

  return (
    <>
      <Box>
        <TableContainer component={Paper}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 3 }}>
            <Title>Procurement Invoices Under Construction</Title>
            <Button
            //   onClick={() => {
            //     navigate('/dashboard/procurement_request');
            //   }}
            >
              View All
            </Button>
          </Box>
          <Table sx={{ minWidth: 450 }} aria-label="simple table">
            <TableHead>
              <TableRow
                sx={{
                  ' td,  th': {
                    borderBottom: '0.5px solid #D0D0D0',
                    fontWeight: 800,
                    fontSize: '14px',
                    lineHeight: '16px',
                    color: '#515151',
                    background: 'white',
                    py: 1,
                  },
                }}
              >
                {tableHead.map((td, key) => (
                  <TableCell key={key}>{td}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData?.map((data, key) => (
                <TableRow key={key} sx={{ ' td,  th': { borderBottom: '0.5px solid #D0D0D0', py: 0 } }}>
                  <TableCell component="th" scope="row">
                    {key + 1}
                  </TableCell>
                  <TableCell sx={{ textAlign: 'left' }}>{data.invoice_title}</TableCell>
                  <TableCell>
                    <Action>View More</Action>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};
