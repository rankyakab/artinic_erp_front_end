import React from 'react';
import PropTypes from 'prop-types';
// import { styled } from '@mui/material/styles';
import { Box, Table, TableBody, TableRow, Paper, TableHead, TableCell, TableContainer, Stack } from '@mui/material';
import { TablePagination } from '../../../../utils/memoPaginationUtil';
import { Title, Success, Pending, Failed } from '../../../../styles/main';

export const StockLists = ({ stocks }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage] = React.useState(16);
  const [paginationPage, setPaginationPage] = React.useState(1);

  const handleChangePage = (event, newPage) => {
    const page = newPage - 1;
    setPaginationPage(newPage);
    setPage(page);
  };

  const tableHead = [
    'S/N',
    'Image',
    'Product Name',
    'Product ID',
    'Category',
    'QTY Purchased',
    'Unit Price',
    'Total Amount',
    'In Stock',
    'Supplier',
    'Status',
  ];

  const tableData = [
    {
      id: '01',
      image: 'Office chairs',
      product_name: 'Pen',
      product_id: '45656787',
      category: 'Stationaries',
      qty_purchased: '50pcs',
      unit_price: '₦100.00',
      total_amount: '₦5,000.00',
      in_stock: '40pcs',
      supplier: 'Big Ben’s Store',
      status: <Success>In Stock</Success>,
    },

    {
      id: '02',
      image: 'Office chairs',
      product_name: 'A4 Paper',
      product_id: '69956787',
      category: 'Stationaries',
      qty_purchased: '20pcs',
      unit_price: '₦3000.00',
      total_amount: '₦60,000.00',
      in_stock: '0pcs',
      supplier: 'Big Ben’s Store',
      status: <Failed>Out of Stock</Failed>,
    },

    {
      id: '03',
      image: 'Office chairs',
      product_name: 'Liquid wash',
      product_id: '36426787',
      category: 'Detergent',
      qty_purchased: '35pcs',
      unit_price: '₦175,000.00',
      total_amount: '₦5,000.00',
      in_stock: '10pcs',
      supplier: 'Quality wash',
      status: <Failed>Low in stock</Failed>,
    },
  ];

  return (
    <>
      <Box>
        <TableContainer component={Paper}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 3 }}>
            <Title>Stock List</Title>
          </Box>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
              {stocks?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data, key) => (
                <TableRow key={key} sx={{ ' td,  th': { borderBottom: '0.5px solid #D0D0D0', py: 2 } }}>
                  <TableCell component="th" scope="row">
                    {key + 1}
                  </TableCell>
                  <TableCell>{data.image}</TableCell>
                  <TableCell>{data.product_name}</TableCell>
                  <TableCell>{data?.productId}</TableCell>
                  <TableCell>{data.category}</TableCell>
                  <TableCell>{data?.quantity}</TableCell>
                  <TableCell>{data?.price}</TableCell>
                  <TableCell>{data.total_amount}</TableCell>
                  <TableCell>{data.in_stock}</TableCell>
                  <TableCell>{data.supplier}</TableCell>
                  <TableCell>{data.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Stack sx={{ my: 2 }}>
          <TablePagination
            paginationPage={paginationPage}
            total={tableData.length}
            handleChangePage={handleChangePage}
            rowsPerPage={rowsPerPage}
          />
        </Stack>
      </Box>
    </>
  );
};
StockLists.propTypes = {
  stocks:PropTypes.any,
  
 
  
};

export const InventoryLists = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage] = React.useState(16);
  const [paginationPage, setPaginationPage] = React.useState(1);

  const handleChangePage = (event, newPage) => {
    const page = newPage - 1;
    setPaginationPage(newPage);
    setPage(page);
  };

  const tableHead = [
    'S/N',
    'Image',
    'Product Name',
    'Product ID',
    'Category',
    'QTY Purchased',
    'Unit Price',
    'Total Amount',
    'In Stock',
    'Supplier',
    'Status',
  ];

  const tableData = [
    {
      id: '01',
      image: 'Office chairs',
      product_name: 'Pen',
      product_id: '45656787',
      category: 'Stationaries',
      qty_purchased: '50pcs',
      unit_price: '₦100.00',
      total_amount: '₦5,000.00',
      in_stock: '40pcs',
      supplier: 'Big Ben’s Store',
      status: <Success>All functioning</Success>,
    },

    {
      id: '02',
      image: 'Office chairs',
      product_name: 'A4 Paper',
      product_id: '69956787',
      category: 'Stationaries',
      qty_purchased: '20pcs',
      unit_price: '₦3000.00',
      total_amount: '₦60,000.00',
      in_stock: '0pcs',
      supplier: 'Big Ben’s Store',
      status: <Success>All functioning</Success>,
    },

    {
      id: '03',
      image: 'Office chairs',
      product_name: 'Liquid wash',
      product_id: '36426787',
      category: 'Detergent',
      qty_purchased: '35pcs',
      unit_price: '₦175,000.00',
      total_amount: '₦5,000.00',
      in_stock: '10pcs',
      supplier: 'Quality wash',
      status: <Pending>2 functioning</Pending>,
    },
  ];

  return (
    <>
      <Box>
        <TableContainer component={Paper}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 3 }}>
            <Title>Inventory List</Title>
          </Box>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
              {tableData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data, key) => (
                <TableRow key={key} sx={{ ' td,  th': { borderBottom: '0.5px solid #D0D0D0', py: 0 } }}>
                  <TableCell component="th" scope="row">
                    {key + 1}
                  </TableCell>
                  <TableCell>{data.image}</TableCell>
                  <TableCell>{data.product_name}</TableCell>
                  <TableCell>{data.product_id}</TableCell>
                  <TableCell>{data.category}</TableCell>
                  <TableCell>{data.qty_purchased}</TableCell>
                  <TableCell>{data.unit_price}</TableCell>
                  <TableCell>{data.total_amount}</TableCell>
                  <TableCell>{data.in_stock}</TableCell>
                  <TableCell>{data.supplier}</TableCell>
                  <TableCell>{data.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Stack sx={{ my: 2 }}>
          <TablePagination
            paginationPage={paginationPage}
            total={tableData.length}
            handleChangePage={handleChangePage}
            rowsPerPage={rowsPerPage}
          />
        </Stack>
      </Box>
    </>
  );
};
