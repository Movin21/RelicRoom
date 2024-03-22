import React, { PureComponent } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,

} from "recharts";

const data = [
  {
    name: "Oct",
    Revenue: 4000,
    Cost: 2400,
  },
  {
    name: "Nov",
    Revenue: 3000,
    Cost: 1398,
  },
  {
    name: "Dec",
    Revenue: 2000,
    Cost: 9800,
  },
  {
    name: "Jan",
    Revenue: 5780,
    Cost: 2908,
  },
  {
    name: "Feb",
    Revenue: 4890,
    Cost: 1800,
  },
  {
    name: "Mar",
    Revenue: 3390,
    Cost: 1800,
  },
  {
    name: "Apr",
    Revenue: 3490,
    Cost: 2300,
  },
];

export default class RevenueChart extends PureComponent {
  static demoUrl = "https://codesandbox.io/s/stacked-area-chart-ix341";

  render() {
    return (
      <div>
        <AreaChart
          width={1050}
          height={400}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Revenue"
            stackId="1"
            stroke="#8884d8"
            fill="#8884d8"
          />
          <Area
            type="monotone"
            dataKey="Cost"
            stackId="1"
            stroke="#FF8F6D"
            fill="#FF8F6D"
          />
        </AreaChart>
      </div>
    );
  }
}
