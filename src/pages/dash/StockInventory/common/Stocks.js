import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Dashlets } from './Dashlets';
import Categories from '../../../../assets/images/categories.svg';
import TotalItems from '../../../../assets/images/total_items.svg';
import TotalCost from '../../../../assets/images/total _cost.svg';
import ItemStock from '../../../../assets/images/item_stock.svg';
import { FormCard, Title, Button } from '../../../../styles/main';
import { StockLists } from './stockTables';
import { getAllStocks } from '../../../../redux/actions/StocksAction';

const Stocks = () => {
  const navigate = useNavigate();

  const { stocks } = useSelector((state) => state.stocks);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllStocks());
  }, [dispatch]);

  console.log(stocks, 'stock');

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Dashlets number={'15'} text={'Categories'} per={'50 more than last year'} img={Categories} />
        </Grid>
        <Grid item xs={12} md={3}>
          <Dashlets number={'800'} text={'Total items'} per={'50 more than last year'} img={TotalItems} />
        </Grid>
        <Grid item xs={12} md={3}>
          <Dashlets number={'5,000,000'} text={'Total item cost'} per={'50 more than last year'} img={TotalCost} />
        </Grid>
        <Grid item xs={12} md={3}>
          <Dashlets number={'200'} text={'Items low in stock'} per={'50 more than last year'} img={ItemStock} />
        </Grid>
      </Grid>

      <FormCard>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Title>Update Stock List</Title>

          <Button
            onClick={() => {
              navigate('/dashboard/update_stocks');
            }}
          >
            Update Stock
          </Button>
        </Box>
      </FormCard>

      <FormCard>
        <StockLists stocks={stocks} />
      </FormCard>
    </>
  );
};

export default Stocks;
