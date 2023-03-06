import { capitalize } from './formatNumber';

const GetVendor = (id, vendors) => {
  //   const { vendors } = useSelector((state) => state.maintenance);

  console.log(vendors);

  const filteredVendor = vendors.filter((vendor) => vendor?._id === id);

  return <p>{capitalize(filteredVendor[0]?.accountName ? filteredVendor[0]?.accountName : 'Nill')}</p>;
};

const GetStaffName = (id, staffs) => {
  const filterStaff = staffs?.filter((staff) => staff?._id === id);

  return (
    <p>
      {capitalize(filterStaff[0]?.firstName ? filterStaff[0]?.firstName : '--')}{' '}
      {capitalize(filterStaff[0]?.lastName ? filterStaff[0]?.lastName : '--')}
    </p>
  );
};

const GetAssetName = (id, assets) => {
  //   const { assets } = useSelector((state) => state?.maintenance);

  const filterAssets = assets?.filter((asset) => asset?._id === id);

  return <p>{capitalize(filterAssets[0]?.assetName ? filterAssets[0]?.assetName : '--')}</p>;
};

const GetActionName = (id, actions) => {
  const filterAction = actions?.filter((action) => action?._id === id);

  return <p>{capitalize(filterAction[0]?.action ? filterAction[0]?.action : '--')}</p>;
};

const GetPositionName = (id, positions) => {
  const filterPosition = positions?.filter((position) => position?._id === id);

  return <p>{capitalize(filterPosition[0]?.title ? filterPosition[0]?.title : '--')}</p>;
};

export { GetVendor, GetStaffName, GetAssetName, GetActionName, GetPositionName };
