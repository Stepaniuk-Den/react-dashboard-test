import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectIsLoggedIn } from "../redux/selectors";

export default function PrivateRoute({ children }) {
  const userIsAuth = useSelector(selectIsLoggedIn);
  return userIsAuth ? children : <Navigate to="/login" />;
}

PrivateRoute.propTypes = {
  children: PropTypes.node,
};
