import { Grid, Stack, Box, Button, Typography, InputAdornment, IconButton } from '@mui/material';
import React, { useState } from 'react';
import { GeneralInput, InputLabel, HeadCard } from '../styles/main';
import Iconify from './iconify/Iconify';

const HeaderCard = ({
  searchLabel,
  totalNumberLabel,
  totalNumber,
  filterLabel,
  filterText,
  buttonLabel,
  onClick,
  handleSearch,
  keyword,
  setKeyword,
  filterOptions,
}) => {
  console.log(keyword);
  return (
    <HeadCard>
      {/* <Grid container> */}
      <Grid item md={3} component="form" onSubmit={handleSearch}>
        <Stack>
          <InputLabel sx={{ color: 'text.secondary' }}>{searchLabel}</InputLabel>
          <GeneralInput
            fullWidth
            placeholder="Search"
            name="search"
            sx={{ width: '100%', mb: 0, display: 'flex', justifyContent: 'center' }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" type="submit">
                    <Iconify icon={'eva:search-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </Stack>
      </Grid>

      <Grid item md={3}>
        <Box>
          <Typography sx={{ fontWeight: 'bold', fontSize: 30 }}>{totalNumber}</Typography>
          <Typography variant="body2" noWrap sx={{ color: 'text.secondary' }}>
            {totalNumberLabel}
          </Typography>
        </Box>
      </Grid>

      <Grid item md={3}>
        <Stack>
          <InputLabel sx={{ color: 'text.secondary' }}>{filterLabel}</InputLabel>
          <GeneralInput
            sx={{
              width: '12rem',
              mb: 0,
              display: 'flex',
              justifyContent: 'center',
              backgroundColor: '#F2F7FF',
            }}
            select
            variant="outlined"
            SelectProps={{
              native: true,
            }}
          >
            <option value="">All</option>

            {React.Children.toArray(
              filterOptions && filterOptions?.map((option) => <option value={option}>{option}</option>)
            )}
          </GeneralInput>
        </Stack>
      </Grid>

      <Grid item md={3}>
        <Button
          onClick={onClick}
          sx={{ color: 'white', background: 'linear-gradient(135deg, #14ADD6 0%, #384295 100%)', py: 1.5, px: 5 }}
        >
          {buttonLabel}
        </Button>
      </Grid>
      {/* </Grid> */}
    </HeadCard>
  );
};

export default HeaderCard;
