import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { useAppSelector } from '../hooks/storeHooks';
import { ApexOptions } from 'apexcharts';

const CandlestickGraph: React.FC = () => {
  const curInterval = useAppSelector(store => store.timeInterval.interval);
  const curSymbol = useAppSelector(store => store.symbol.symbolData?.["1. symbol"]);

  const curData = useAppSelector(store => {
    switch (curInterval) {
      case '1min':
        return store.symbol.data1min;
      case '5min':
        return store.symbol.data5min;
      case '15min':
        return store.symbol.data15min;
      case '30min':
        return store.symbol.data30min;
      case '60min':
        return store.symbol.data60min;
      case 'day':
        return store.symbol.dataDaily;
      case 'week':
        return store.symbol.dataWeekly;
      case 'month':
        return store.symbol.dataMonthly;
      default:
        return [];
    }
  });
  const label = (curSymbol == null || curInterval == "") ? "Search for a valid symbol & click on a time interval to view chart" :`Candlestick Chart for ${curSymbol} - ${curInterval}`;

  // Prepare data for candlestick chart
  const seriesData: { x: string; y: any[]; }[] = [];
  const timestampData: string[] = [];
  const volumeData: number[] = [];
  if (curData) {
    Object.entries(curData).map(([key, value]: [string, any]) => {
      seriesData.push({
        x: key,
        y: [
          value['1. open'],
          value['2. high'],
          value['3. low'],
          value['4. close'],
        ],
      });
      timestampData.push(key);
      volumeData.push(parseFloat(value['5. volume']));
    });
  }

  // Configure options for the candlestick chart
  const options: ApexOptions = {
    chart: {
      type: 'candlestick',
      height: 350
    },
    title: {
      text: label,
      align: 'left'
    },
    xaxis: {
      type: 'datetime'
    },
    plotOptions: {
      candlestick: {
          colors: {
              upward: '#00B746',
              downward: '#EF403C'
          },
          wick: {
              useFillColor: false
          }
      }
  }
  };

  // Configure options for the volume bar chart
  const volumeSeries = [{
    name: 'Volume',
    data: [...volumeData]
  }];

  // Configure options for the volume bar chart
  const volumeOptions: ApexOptions = {
    chart: {
      type: 'bar',
      height: 150
    },
    plotOptions: {
      bar: {
        columnWidth: '80%',
      }
    },
    dataLabels: {
      enabled: false,
    },
    yaxis: {
      title: {
        text: 'Volume',
      },
      labels: {
        formatter: function (y) {
          return y.toFixed(0);
        }
      }
    },
    xaxis: {
      type: 'datetime',
      categories: [
        ...timestampData
      ],
      labels: {
        rotate: -90
      }
    },
};


  return (
      <div id="chart">
        <ReactApexChart 
          options={options} 
          series={
                [
                    {
                        data: seriesData
                    }
                ]
            } 
          height={350}
          type="candlestick"
          />
          <ReactApexChart options={volumeOptions} series={volumeSeries} type="bar" height={200} />
      </div>
  );
};

export default CandlestickGraph;
