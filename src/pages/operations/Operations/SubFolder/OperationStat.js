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




  useEffect(()=>{

console.log("datvoucheriw", vouchers)
const datiw = [...vouchers];
console.log("datiw", datiw)
// Initialize an array with 12 subarrays, one for each month
const monthlyData = [...Array(12)].map(() => []);


datiw.forEach((item) => {
  const month = new Date(item.createdAt).getMonth();
  monthlyData[month].push(item);
});
console.log("monthly data",monthlyData)
 
 const workingData = {pending:[],approved:[], comment:[], rejected:[]};
console.log("this is themontyly data",monthlyData)
monthlyData.forEach((item,index)=> {
  let pending = 0;
  let approve = 0;
  let comment = 0;
  let reject = 0;
  
  item.forEach((element )=> {
    
    if(element.status==="pending approval"){
      pending+=1
    }
    if(element.status==="approve"){
     approve+=1
    }
    if(element.status==="comment"){
    comment+=1
    }
    if(element.status==="reject"){
   reject+=1
    }
   
   

  })
   workingData.pending[index]=pending;
    workingData.approved[index]=approve;
    workingData.comment[index]=comment;
    workingData.rejected[index]=reject;
})
setPending(workingData.pending)
setComment(workingData.comment)
setRejected(workingData.rejected)
setApproved(workingData.approved)




  },[vouchers])
 



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
