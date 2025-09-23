import React, { useEffect, useState } from 'react';
import Chart from 'react-google-charts';

const Linechart = ({ historicalData }) => {
  const [data, setData] = useState([["Date", "Price"]]);

  useEffect(() => {
    if (historicalData && historicalData.length > 0) {
      let datacopy = [["Date", "Price"]];
      historicalData.forEach((item) => {
        datacopy.push([
          new Date(item[0]).toLocaleDateString(), // format timestamp
          item[1], // price
        ]);
      });
      setData(datacopy);
    }
  }, [historicalData]);

  return (
    <Chart
      chartType="LineChart"
      data={data}
      height="400px"
      legendToggle
      options={{
        hAxis: { title: "Date" },
        vAxis: { title: "Price" },
        colors: ["#4285F4"],
      }}
    />
  );
};

export default Linechart;
