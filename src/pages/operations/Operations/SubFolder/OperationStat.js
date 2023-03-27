import React, { useState ,useEffect} from 'react';
import ReactApexChart from 'react-apexcharts';
import { useDispatch, useSelector } from 'react-redux';
import { FormCard, Title } from '../../../../styles/main';
import { getAllVoucher } from '../../../../redux/actions/VoucherAction';

const OperationStat = () => {
    const dispatch = useDispatch();
  const [graphData, setGraphData]= useState()
  const [options, setObject] = useState({
    colors: ['#FDCC1C', '#F29425', '#10A242', '#00008B'],
    chart: {
      type: 'bar',
      height: 350,
      //   stacked: true,
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: true,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom',
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '50%',
        endingShape: 'rounded',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
    legend: {
      position: 'right',
      offsetY: 40,
    },
    fill: {
      opacity: 1,
    },
  });
    const [pending , setPending] = useState([]);
    const [comment , setComment] = useState([]);
    const [rejected , setRejected] = useState([]);
    const [approved , setApproved] = useState([]);
      const { vouchers } = useSelector((state) => state?.voucher);
useEffect(()=>{
 dispatch(getAllVoucher())
},[])




  useEffect(() => {

    
  }, [dispatch]);



  const [series, setSeries] = useState([
    {
      name: 'Pending Approval',
      data:  pending
    },

    {
      name: 'Comment',
      data: comment
    },
     {
      name: 'Approved',
      data: approved
    },
    {
      name: 'Rejected',
      data: rejected
    },
  ]);

  return (
    <FormCard sx={{ mt: 0 }} id="chart">
      <ReactApexChart options={options} series={series} type="bar" height={240} />
    </FormCard>
  );
};

export default OperationStat;
