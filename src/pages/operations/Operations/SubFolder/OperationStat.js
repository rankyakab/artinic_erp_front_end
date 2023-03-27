import React, { useState ,useEffect} from 'react';
import ReactApexChart from 'react-apexcharts';
import { FormCard, Title } from '../../../../styles/main';

const OperationStat = ({datas}) => {
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

  
 
 console.log("this is the datas sent to us", datas)


  const [series, setSeries] = useState([
    {
      name: 'Pending Approval',
      data:  datas.pending
    },

    {
      name: 'Comment',
      data: datas.comment
    },
     {
      name: 'Approved',
      data: datas.approved
    },
    {
      name: 'Rejected',
      data: datas.rejected
    },
  ]);

  return (
    <FormCard sx={{ mt: 0 }} id="chart">
      <ReactApexChart options={options} series={series} type="bar" height={240} />
    </FormCard>
  );
};

export default OperationStat;
