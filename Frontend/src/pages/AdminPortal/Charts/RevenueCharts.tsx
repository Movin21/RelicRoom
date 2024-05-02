import React, { PureComponent } from "react";
import axios from "axios";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export default class RevenueChart extends PureComponent {
  state = {
    data: [],
    loading: true,
    error: null,
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    axios
      .get("http://localhost:3000/admin/revenue/chart")
      .then((response) => {
        this.setState({
          data: response.data,
          loading: false,
          error: null,
        });
      })
      .catch((error) => {
        this.setState({
          loading: false,
          error: error.message,
        });
      });
  };

  render() {
    const { data, loading, error } = this.state;

    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error}</div>;
    }

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
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="revenue"
            stackId="1"
            stroke="#8884d8"
            fill="#8884d8"
          />
          <Area
            type="monotone"
            dataKey="cost"
            stackId="1"
            stroke="#FF8F6D"
            fill="#FF8F6D"
          />
        </AreaChart>
      </div>
    );
  }
}
