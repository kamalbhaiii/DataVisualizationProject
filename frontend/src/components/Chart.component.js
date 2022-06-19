import { Chart } from "react-google-charts";
import { useState } from 'react';
import { useEffect } from "react";

const ChartC = (props) => {
  const [data, setData] = useState([])

  useEffect(() =>{
    setData(props.filterData.map((res,key)=> {
      return [String(res),props.variableData[key]]
    }))
  }, [props])

  return (
    <>
    <div className="row border">
        <Chart
            chartType="Bar"
            data = {
              [
                [`${props.filter}`, `${props.variable}`],
                ...data
              ]
          }
            width="100%"
            height="400px"
            legendToggle
        />
    </div>
    <div className="row">
      <div className="col-12 col-md-6 border">
      <Chart
            chartType="PieChart"
            data = {
              [
                [`${props.filter}`, `${props.variable}`],
                ...data
              ]
          }
            width="100%"
            height="400px"
            legendToggle
        />
      </div>
      <div className="col-12 col-md-6 border">
      <Chart
            chartType="ComboChart"
            data = {
              [
                [`${props.filter}`, `${props.variable}`],
                ...data
              ]
          }
            width="100%"
            height="400px"
            legendToggle
        />
      </div>
    </div>
    </>
  )
}

export default ChartC