import React, { Fragment } from 'react'
import ReactApexChart from 'react-apexcharts'

import { ChartContainer, StyledHeader } from './Chart.styles'

interface Props {
  data: any
  token?: string
}

const seriesData = [
  {
    x: new Date(2016, 1, 1),
    y: [51.98, 56.29, 51.59, 53.85],
  },
  {
    x: new Date(2016, 2, 1),
    y: [53.66, 54.99, 51.35, 52.95],
  },
  {
    x: new Date(2016, 3, 1),
    y: [52.96, 53.78, 51.54, 52.48],
  },
  {
    x: new Date(2016, 4, 1),
    y: [52.54, 52.79, 47.88, 49.24],
  },
  {
    x: new Date(2016, 5, 1),
    y: [49.1, 52.86, 47.7, 52.78],
  },
  {
    x: new Date(2016, 6, 1),
    y: [52.83, 53.48, 50.32, 52.29],
  },
  {
    x: new Date(2016, 7, 1),
    y: [52.2, 54.48, 51.64, 52.58],
  },
  {
    x: new Date(2016, 8, 1),
    y: [52.76, 57.35, 52.15, 57.03],
  },
  {
    x: new Date(2016, 9, 1),
    y: [57.04, 58.15, 48.88, 56.19],
  },
  {
    x: new Date(2016, 10, 1),
    y: [56.09, 58.85, 55.48, 58.79],
  },
  {
    x: new Date(2016, 11, 1),
    y: [58.78, 59.65, 58.23, 59.05],
  },
  {
    x: new Date(2017, 0, 1),
    y: [59.37, 61.11, 59.35, 60.34],
  },
  {
    x: new Date(2017, 1, 1),
    y: [60.4, 60.52, 56.71, 56.93],
  },
  {
    x: new Date(2017, 2, 1),
    y: [57.02, 59.71, 56.04, 56.82],
  },
  {
    x: new Date(2017, 3, 1),
    y: [56.97, 59.62, 54.77, 59.3],
  },
  {
    x: new Date(2017, 4, 1),
    y: [59.11, 62.29, 59.1, 59.85],
  },
  {
    x: new Date(2017, 5, 1),
    y: [59.97, 60.11, 55.66, 58.42],
  },
  {
    x: new Date(2017, 6, 1),
    y: [58.34, 60.93, 56.75, 57.42],
  },
  {
    x: new Date(2017, 7, 1),
    y: [57.76, 58.08, 51.18, 54.71],
  },
  {
    x: new Date(2017, 8, 1),
    y: [54.8, 61.42, 53.18, 57.35],
  },
  {
    x: new Date(2017, 9, 1),
    y: [57.56, 63.09, 57.0, 62.99],
  },
  {
    x: new Date(2017, 10, 1),
    y: [62.89, 63.42, 59.72, 61.76],
  },
  {
    x: new Date(2017, 11, 1),
    y: [61.71, 64.15, 61.29, 63.04],
  },
]

const seriesDataLinear = [
  {
    x: new Date(2016, 1, 1),
    y: 3.85,
  },
  {
    x: new Date(2016, 2, 1),
    y: 2.95,
  },
  {
    x: new Date(2016, 3, 1),
    y: -12.48,
  },
  {
    x: new Date(2016, 4, 1),
    y: 19.24,
  },
  {
    x: new Date(2016, 5, 1),
    y: 12.78,
  },
  {
    x: new Date(2016, 6, 1),
    y: 22.29,
  },
  {
    x: new Date(2016, 7, 1),
    y: -12.58,
  },
  {
    x: new Date(2016, 8, 1),
    y: -17.03,
  },
  {
    x: new Date(2016, 9, 1),
    y: -19.19,
  },
  {
    x: new Date(2016, 10, 1),
    y: -28.79,
  },
  {
    x: new Date(2016, 11, 1),
    y: -39.05,
  },
  {
    x: new Date(2017, 0, 1),
    y: 20.34,
  },
  {
    x: new Date(2017, 1, 1),
    y: 36.93,
  },
  {
    x: new Date(2017, 2, 1),
    y: 36.82,
  },
  {
    x: new Date(2017, 3, 1),
    y: 29.3,
  },
  {
    x: new Date(2017, 4, 1),
    y: 39.85,
  },
  {
    x: new Date(2017, 5, 1),
    y: 28.42,
  },
  {
    x: new Date(2017, 6, 1),
    y: 37.42,
  },
  {
    x: new Date(2017, 7, 1),
    y: 24.71,
  },
  {
    x: new Date(2017, 8, 1),
    y: 37.35,
  },
  {
    x: new Date(2017, 9, 1),
    y: 32.99,
  },
  {
    x: new Date(2017, 10, 1),
    y: 31.76,
  },
  {
    x: new Date(2017, 11, 1),
    y: 43.04,
  },
]

const series = [
  {
    data: seriesData,
  },
]
const seriesBar = [
  {
    name: 'volume',
    data: seriesDataLinear,
  },
]
const options = {
  chart: {
    type: 'candlestick',
    height: 290,
    id: 'candles',
    toolbar: {
      autoSelected: 'pan',
      show: false,
    },
    zoom: {
      enabled: false,
    },
    foreColor: '#2A7597',
    redrawOnParentResize: true,
  },
  plotOptions: {
    candlestick: {
      colors: {
        upward: '#39C3E6',
        downward: '#F89D28',
      },
    },
  },
  xaxis: {
    type: 'datetime',
    axisBorder: {
      show: false,
    },
    axisTicks: {
      color: '#436779',
    },
  },
  grid: {
    borderColor: '#436779',
    strokeDashArray: 2,
  },
}

const optionsBar = {
  chart: {
    height: 160,
    type: 'bar',
    brush: {
      enabled: true,
      target: 'candles',
    },
    redrawOnParentResize: true,
    selection: {
      enabled: true,
      xaxis: {
        min: new Date('20 Jan 2017').getTime(),
        max: new Date('10 Dec 2017').getTime(),
      },
      fill: {
        color: '#C4C4C4',
        opacity: 0.1,
      },
      stroke: {
        color: '#0D47A1',
      },
    },
    foreColor: '#2A7597',
  },
  dataLabels: {
    enabled: false,
  },
  plotOptions: {
    bar: {
      columnWidth: '80%',
      colors: {
        ranges: [
          {
            from: -1000,
            to: 0,
            color: '#F89D28',
          },
          {
            from: 1,
            to: 10000,
            color: '#39C3E6',
          },
        ],
      },
    },
  },
  stroke: {
    width: 0,
  },
  xaxis: {
    type: 'datetime',
    axisBorder: {
      offsetX: 13,
      color: '#436779',
      show: false,
    },
    axisTicks: {
      show: false,
    },
    labels: {
      show: false,
    },
  },
  yaxis: {
    labels: {
      show: false,
    },
  },
  grid: {
    borderColor: '#436779',
    strokeDashArray: 1,
  },
}
export const Chart: React.FunctionComponent<Props> = ({ data, token }) => {

  return (
    <Fragment>
      <StyledHeader>Price of {token}</StyledHeader>
      <ChartContainer className="BondsWrapper_panel__chrome hide-on-mobile">
        <div className="BondsWrapper_panel__content">
          <ReactApexChart
            options={options}
            series={series}
            type="candlestick"
            height={290}
          />
          <ReactApexChart
            options={optionsBar}
            series={seriesBar}
            type="bar"
            height={160}
          />
        </div>
      </ChartContainer>
    </Fragment>
  )
}

Chart.defaultProps = {
  token: 'EDU'
}