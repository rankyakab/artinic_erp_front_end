import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { FormCard, Title } from '../../../../styles/main';

const OperationStat = ({datas}) => {
  const [options, setObject] = useState({
    colors: ['#FDCC1C', '#F29425', '#10A242'],
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
  const pa = datas.map(dat => {
        dat?.filter(da => da.status ==="pending approval");
      return  dat?.length ?dat?.length : 0;
      })

 console.log("this is pa",pa)


 const co =datas.map(dat => {
        dat?.filter(da => da.status ==="comment");
      return  dat?.length ?dat?.length : 0;
      })

console.log("this is co",co)

const ap=datas.map(dat => {
        dat?.filter(da => da.status ==="approve");
      return  dat?.length ?dat?.length : 0;
      })
console.log("this is ap",ap)



const rj =datas.map(dat => {
        dat?.filter(da => da.status ==="reject");
      return  dat?.length ?dat?.length : 0;
      })
      console.log(rj)

      console.log("datas",datas)
  const [series, setSeries] = useState([
    {
      name: 'Pending Approval',
      data: pa
    },

    {
      name: 'Comment',
      data: co
    },
     {
      name: 'Approved',
      data: ap
    },
    {
      name: 'Rejected',
      data: rj
    },
  ]);

  return (
    <FormCard sx={{ mt: 0 }} id="chart">
      <ReactApexChart options={options} series={series} type="bar" height={240} />
    </FormCard>
  );
};

export default OperationStat;
