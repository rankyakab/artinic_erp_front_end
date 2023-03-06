import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { CircularProgress, Container } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
// components
import DashboardHeader from '../../../layouts/dashboard/DashboardHeader';
import HeaderCard from '../../../components/HeaderCard';
import { Wrapper } from '../../../styles/main';
import { StaffTable } from './common/StaffTable';
import { getAllStaffs } from '../../../redux/actions/StaffAction';
import SuccessCard from '../../../components/SuccessCard';
// ----------------------------------------------------------------------

export default function Staff() {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(16);
  const [paginationPage, setPaginationPage] = React.useState(1);

  const [search, setSearch] = useState([]);

  const [keyword, setKeyword] = useState('');

  const { staffs, loading } = useSelector((state) => state.staff);

  console.log(staffs);

  const dispatch = useDispatch();

  const handleSearch = (e) => {
    console.log(keyword);
    e.preventDefault();
    setSearch(
      staffs?.filter(
        (staff) =>
          staff?.firstName?.toLowerCase() === keyword.toLowerCase() ||
          staff?.lastName?.toLowerCase() === keyword.toLowerCase()
      )
    );
  };

  const handleChangePage = (event, newPage) => {
    const page = newPage - 1;
    setPaginationPage(newPage);
    setPage(page);
  };

  useEffect(() => {
    dispatch(getAllStaffs());
  }, []);

  return (
    <>
      <Helmet>
        <title> Staff | Relia Energy</title>
      </Helmet>

      <Wrapper>
        <DashboardHeader title={'All Staff'} text={'View, search for and add new staff'} />

        <HeaderCard
          searchLabel={'Quick search a staff'}
          totalNumber={staffs?.length}
          totalNumberLabel={'Total number of staff'}
          filterLabel={'Filter staff'}
          filterText={'All Staff'}
          buttonLabel={'Add New Staff'}
          onClick={() => {
            navigate('/dashboard/new-staff');
          }}
          handleSearch={handleSearch}
          keyword={keyword}
          setKeyword={setKeyword}
        />

        {/* table */}
        {loading ? (
          <Container sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', my: 3 }}>
            <CircularProgress />
          </Container>
        ) : (
          <StaffTable
            staffs={staffs}
            paginationPage={paginationPage}
            rowsPerPage={rowsPerPage}
            handleChangePage={handleChangePage}
            page={page}
            search={search}
          />
        )}
      </Wrapper>
    </>
  );
}
