import Chart from 'react-google-charts';

const chartData = [
    ['year', 'a', 'b', 'c', 'd'],
    ['2023', 20, 298, 308, 405],
    ['2022', 31, 38, 55, 66],
    ['2021', 50, 55, 77, 80],
    ['2020', 77, 77, 66, 50],
    ['2018', 13, 234, 2, 46],
    ['2017', 456, 22, 345, 2],
    ['2016', 5, 45, 63, 12],
    ['2015', 123, 47, 24, 13],
    ['2014', 176, 46, 14, 96],
    ['2013', 87, 86, 15, 17],
    ['2012', 19, 15, 93, 85],
    ['2011', 234, 97, 76, 27],
    ['2010', 234, 75, 14, 73],
    ['2009', 15, 14, 267, 98],
    ['2008', 146, 14, 71, 74],
    ['2007', 91, 15, 33, 15],
  ];

export default function CandleStickChart() {
    return (
        <Chart width={'100%'} height={450} chartType='CandlestickChart' loader={<div>Loading chart</div>} data={chartData} options={{ legend: 'none' }} rootProps={{ 'data-testid': '1' }} />   
    )
}
