import React from 'react';
import { Grid, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Dashlets } from './Dashlets';
import Categories from '../../../../assets/images/categories.svg';
import TotalItems from '../../../../assets/images/total_items.svg';
import TotalCost from '../../../../assets/images/total _cost.svg';
import ItemStock from '../../../../assets/images/item_stock.svg';
import { FormCard, Title, Button } from '../../../../styles/main';
import { InventoryLists, StockLists } from './stockTables';

const Inventory = () => {
  const navigate = useNavigate();

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Dashlets number={'10'} text={'Categories'} per={'50 more than last year'} img={Categories} />
        </Grid>
        <Grid item xs={12} md={3}>
          <Dashlets number={'300'} text={'Total items'} per={'50 more than last year'} img={TotalItems} />
        </Grid>
        <Grid item xs={12} md={3}>
          <Dashlets number={'250,000,000'} text={'Total item cost'} per={'50 more than last year'} img={TotalCost} />
        </Grid>
        <Grid item xs={12} md={3}>
          <Dashlets number={'20'} text={'Items low in stock'} per={'50 more than last year'} img={ItemStock} />
        </Grid>
      </Grid>

      <FormCard>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Title>Update Inventory Table</Title>
          <Button
            onClick={() => {
              navigate('/dashboard/update_inventory');
            }}
          >
            Update Inventory
          </Button>
        </Box>
      </FormCard>

      <FormCard>
        <InventoryLists />
      </FormCard>
    </>
  );
};

export default Inventory;
