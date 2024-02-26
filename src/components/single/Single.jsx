import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./single.scss";
import PropTypes from "prop-types";
import { nanoid } from "nanoid";
import Button from "../button/Button";

const Single = ({ img, title, info, chart, activities }) => {
  return (
    <div className="single">
      <div className="view">
        <div className="info">
          <div className="topInfo">
            {img && <img src={img} alt="user info" />}
            <h1>{title}</h1>
            <Button text="Update"></Button>
          </div>
          <div className="details">
            {Object.entries(info).map((item) => (
              <div className="item" key={nanoid()}>
                <span className="itemTitle">{item[0]}</span>
                <span className="itemValue">{item[1]}</span>
              </div>
            ))}
          </div>
        </div>
        <hr />
        {chart && (
          <div className="chart">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={500}
                height={300}
                data={chart.data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                {chart.dataKeys.map((dataKey) => (
                  <Line
                    key={nanoid()}
                    type="monotone"
                    dataKey={dataKey.name}
                    stroke={dataKey.color}
                    activeDot={{ r: 8 }}
                  />
                ))}
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
      <div className="activities">
        <h2>Last activities</h2>
        {activities && (
          <ul>
            {activities.map((activity) => (
              <li key={nanoid()}>
                <div>
                  <p>{activity.text}</p>
                  <time>{activity.time}</time>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

Single.propTypes = {
  id: PropTypes.number,
  img: PropTypes.string,
  title: PropTypes.string,
  slug: PropTypes.string,
  setOpen: PropTypes.func,
  columns: PropTypes.array,
  info: PropTypes.shape({
    productId: PropTypes.string,
    color: PropTypes.string,
    price: PropTypes.string,
    producer: PropTypes.string,
    export: PropTypes.string,
  }),
  chart: PropTypes.shape({
    dataKeys: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        color: PropTypes.string,
      })
    ),
    data: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        visits: PropTypes.number,
        orders: PropTypes.number,
      })
    ),
  }),
  activities: PropTypes.arrayOf(
    PropTypes.shape({
      time: PropTypes.string,
      text: PropTypes.string,
    })
  ),
};
export default Single;
