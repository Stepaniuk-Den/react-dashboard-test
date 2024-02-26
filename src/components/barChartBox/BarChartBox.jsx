import { Bar, BarChart, ResponsiveContainer, Tooltip } from "recharts";
import "./barChartBox.scss";
import PropTypes from "prop-types";

const BarChartBox = ({ title, chartData, dataKey, color }) => {
  return (
    <div className="barChartBox">
      <h1>{title}</h1>
      <div className="chart">
        <ResponsiveContainer width="99%" height={150}>
          <BarChart data={chartData}>
            <Tooltip
              contentStyle={{ background: "#2a3447", borderRadius: "5px" }}
              labelStyle={{ display: "none" }}
              cursor={{ fill: "none" }}
            />
            <Bar dataKey={dataKey} fill={color} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

BarChartBox.propTypes = {
  title: PropTypes.string,
  dataKey: PropTypes.string,
  color: PropTypes.string,
  chartData: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      visit: PropTypes.number,
    })
  ),
};

export default BarChartBox;
