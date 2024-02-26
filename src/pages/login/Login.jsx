import "./login.scss";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { FiEyeOff } from "react-icons/fi";
import { FiEye } from "react-icons/fi";
import { ErrorMessage, Form, Formik } from "formik";
import { Notify } from "notiflix";
import { loginThunk } from "../../redux/Auth/AuthThunk";
import { validationSignUp } from "../../helpers/schemas";
import { selectAuthLoading } from "../../redux/selectors";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const isLoading = useSelector(selectAuthLoading);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handlerSubmit = (values, { resetForm }) => {
    dispatch(loginThunk(values))
      .unwrap()
      .then(() => {
        navigate("/");
        resetForm();
        Notify.success("Welcome back! You're now logged in.", {
          timeout: 1000,
        });
      })
      .catch((error) => {
        Notify.failure(error, { timeout: 2000 });
      });
  };

  return (
    <div className="login">
      <Formik
        initialValues={initialState}
        validationSchema={validationSignUp}
        onSubmit={handlerSubmit}
      >
        {({ handleChange, values, errors, touched }) => {
          return (
            <Form className="form">
              <h3>Sign Up</h3>
              <div className="wrapperInput">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  value={values.email}
                />
                {errors && touched && (
                  <ErrorMessage
                    className="errorMessage"
                    name="email"
                    component="span"
                  />
                )}
              </div>
              <div className="wrapperInput">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  value={values.password}
                />
                <button
                  className="toggle"
                  type="button"
                  onClick={togglePassword}
                >
                  {showPassword ? (
                    <FiEye
                      style={{ stroke: "#ffa500" }}
                      aria-label="show-password"
                    />
                  ) : (
                    <FiEyeOff
                      style={{ stroke: "#c8c8c8" }}
                      aria-label="hide-password"
                    />
                  )}
                </button>
                {errors && (
                  <ErrorMessage
                    className="errorMessage"
                    name="password"
                    component="span"
                  />
                )}
                {touched && (
                  <ErrorMessage
                    className="errorMessage"
                    name="password"
                    component="span"
                  />
                )}
              </div>
              <button className="signUp" type="submit" disabled={isLoading}>
                {isLoading ? "Please wait ..." : "Sign Up"}
              </button>
              <a className="switchForm" href="/register">
                New user? Click here
              </a>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Login;
