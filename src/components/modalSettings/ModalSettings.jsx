import "./modalSettings.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { FiEyeOff } from "react-icons/fi";
import { FiEye } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { ErrorMessage, Form, Formik } from "formik";
import { Notify } from "notiflix";
import { validationUserChange } from "../../helpers/schemas";
import {
  changePasswordAsync,
  updateDisplayNameThunk,
  updateEmailThunk,
} from "../../redux/Auth/AuthThunk";
import { toggleModal } from "../../redux/Auth/AuthSlice";
import { selectAuthData, selectAuthId } from "../../redux/selectors";

const ModalSettings = () => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const userId = useSelector(selectAuthId);
  const userData = useSelector(selectAuthData);

  const dispatch = useDispatch();

  const backdropClick = (evt) => {
    if (evt.target === evt.currentTarget) dispatch(toggleModal());
  };

  const toggleOldPassword = () => {
    setShowOldPassword(!showOldPassword);
  };

  const toggleNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const initialValues = {
    email: "",
    displayName: "",
    oldPassword: "",
    newPassword: "",
  };
  const handleSubmit = async (values, { resetForm }) => {
    const { displayName, oldPassword, newPassword, email } = values;

    if (
      displayName.trim() === "" &&
      newPassword.trim() === "" &&
      email.trim() === ""
    ) {
      Notify.failure(
        "Please provide a display name, email or a new password.",
        {
          timeout: 2000,
        }
      );
      return;
    }

    if (displayName.trim() !== "") {
      dispatch(updateDisplayNameThunk({ userId, newDisplayName: displayName }));
    }

    if (email.trim() !== "" && email !== userData.email) {
      dispatch(updateEmailThunk({ userId, newEmail: email }))
        .then(() => {
          resetForm();
          Notify.success("Email updated successfully!", {
            timeout: 1000,
          });
        })
        .catch((error) => {
          Notify.failure(error, { timeout: 1000 });
        });
    }

    if (newPassword.trim() !== "" && newPassword !== oldPassword) {
      dispatch(changePasswordAsync({ userId, oldPassword, newPassword }))
        .unwrap()
        .then(() => {
          resetForm();
          Notify.success("Password updated successfully!", {
            timeout: 1000,
          });
        })
        .catch((error) => {
          Notify.failure(error, { timeout: 1000 });
        });
    } else {
      resetForm();
      Notify.success("Account updated successfully!", {
        timeout: 1000,
      });
    }
    dispatch(toggleModal());
  };

  useEffect(() => {
    const handleKeyDown = (evt) => {
      if (evt.code === "Escape") {
        dispatch(toggleModal());
      }
    };

    document.body.style.overflow = "hidden";

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "auto";

      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [dispatch]);

  return (
    <div className="modalSettings" onClick={backdropClick}>
      <div className="wrapper">
        <Formik
          initialValues={initialValues}
          validationSchema={validationUserChange}
          onSubmit={handleSubmit}
        >
          {({ handleChange, values, errors, touched }) => {
            return (
              <Form className="form">
                <h3>Settings</h3>
                <p>Your Name:</p>
                <div className="wrapperInput">
                  <input
                    type="text"
                    name="displayName"
                    placeholder="Enter Your Name"
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
                <p>Your Email:</p>
                <div className="wrapperInput">
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter Your Email"
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
                <p>Password:</p>
                <p className="passwords">Outdated password:</p>
                <div className="wrapperInput">
                  <input
                    type={showOldPassword ? "text" : "password"}
                    name="oldPassword"
                    placeholder="Enter old password"
                    onChange={handleChange}
                    value={values.oldPassword}
                  />
                  <button
                    className="toggle"
                    type="button"
                    onClick={toggleOldPassword}
                  >
                    {showOldPassword ? (
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
                  {errors && touched && (
                    <ErrorMessage
                      className="errorMessage"
                      name="oldPassword"
                      component="span"
                    />
                  )}
                </div>
                <p className="passwords">New password:</p>
                <div className="wrapperInput">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    name="newPassword"
                    placeholder="Enter new password"
                    onChange={handleChange}
                    value={values.newPassword}
                  />
                  <button
                    className="toggle"
                    type="button"
                    onClick={toggleNewPassword}
                  >
                    {showNewPassword ? (
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
                  {errors && touched && (
                    <ErrorMessage
                      className="errorMessage"
                      name="newPassword"
                      component="span"
                    />
                  )}
                </div>
                <button className="save" type="submit">
                  Save
                </button>
              </Form>
            );
          }}
        </Formik>
        <IoMdClose
          className="closeModal"
          aria-label="close_button"
          onClick={() => dispatch(toggleModal())}
        />
      </div>
    </div>
  );
};

export default ModalSettings;
