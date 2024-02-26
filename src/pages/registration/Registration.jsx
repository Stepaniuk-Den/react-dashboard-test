import "./registration.scss";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ErrorMessage, Form, Formik } from "formik";
import { Notify } from "notiflix";
import { FiEyeOff } from "react-icons/fi";
import { FiEye } from "react-icons/fi";
import { registerThunk } from "../../redux/Auth/AuthThunk";
import { validationSignIn } from "../../helpers/schemas";
import { selectAuthLoading } from "../../redux/selectors";

const initialState = {
  displayName: "",
  email: "",
  password: "",
};

const Registration = () => {
  const [showPassword, setShowPassword] = useState(false);
  const isLoading = useSelector(selectAuthLoading);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handlerSubmit = (values, { resetForm }) => {
    dispatch(registerThunk(values))
      .unwrap()
      .then(() => {
        navigate("/");
        resetForm();
        Notify.success("Welcome!", {
          timeout: 1000,
        });
      })
      .catch((error) => {
        Notify.failure(error, { timeout: 2000 });
      });
  };

  return (
    <div className="registration">
      <Formik
        initialValues={initialState}
        validationSchema={validationSignIn}
        onSubmit={handlerSubmit}
      >
        {({ handleChange, values, errors, touched }) => {
          return (
            <Form className="form">
              <h3>Sign In</h3>
              <div className="wrapperInput">
                <input
                  type="name"
                  name="displayName"
                  placeholder="Name"
                  onChange={handleChange}
                  value={values.displayName}
                />
                {errors && touched && (
                  <ErrorMessage
                    className="errorMessage"
                    name="displayName"
                    component="span"
                  />
                )}
              </div>
              <div className="wrapperInput">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  value={values.email}
                />
                {errors && (
                  <ErrorMessage
                    className="errorMessage"
                    name="email"
                    component="span"
                  />
                )}
                {touched && (
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
              <button className="signIn" type="submit" disabled={isLoading}>
                {isLoading ? "Please wait ..." : "Sign In"}
              </button>
              <a className="switchForm" href="/login">
                Have account? Click here
              </a>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Registration;
