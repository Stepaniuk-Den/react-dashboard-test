import * as yup from "yup";

export const validationSignIn = yup.object().shape({
  displayName: yup
    .string()
    .required("name is required")
    .max(12, "the name must contain max of 12 characters")
    .matches(
      /^[a-zA-Z0-9_]{3,20}$/,
      "Invalid username. Must be alphanumeric with underscores. Length between 3 and 12 characters."
    ),
  email: yup
    .string()
    .email("email is not valid")
    .min(6, "the email must contain min 6 letters")
    .max(64, "the email must contain max of 64 characters")
    .required("email is required")
    .trim()
    .matches(
      /^[a-zA-Z0-9]+[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9]+$/,
      "email is not valid"
    ),
  password: yup
    .string()
    .required("password is required")
    .min(6, "the password must contain min of 6 characters")
    .max(64, "the password must contain max of 64 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
      "Password must contain 1 lowercase, 1 uppercase letter and 1 number."
    ),
});

export const validationSignUp = yup.object().shape({
  email: yup
    .string()
    .email("email is not valid")
    .min(6, "the email must contain min 6 letters")
    .max(64, "the email must contain max of 64 characters")
    .required("email is required")
    .trim()
    .matches(
      /^[a-zA-Z0-9]+[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9]+$/,
      "email is not valid"
    ),
  password: yup
    .string()
    .required("password is required")
    .min(6, "the password must contain min of 6 characters")
    .max(64, "the password must contain max of 64 characters"),
});

export const validationUserChange = yup.object().shape({
  displayName: yup
    .string()
    .min(3, "The name must be at least 3 characters")
    .max(12, "The name must contain a max of 12 characters")
    .matches(
      /^[a-zA-Z0-9_]{3,12}$/,
      "Invalid username. Must be alphanumeric with underscores. Length between 3 and 12 characters."
    ),
  email: yup
    .string()
    .email("email is not valid")
    .min(6, "the email must contain min 6 letters")
    .max(64, "the email must contain max of 64 characters")
    .trim()
    .matches(
      /^[a-zA-Z0-9]+[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9]+$/,
      "email is not valid"
    ),
  oldPassword: yup
    .string()
    .when("newPassword", (newPassword, field) =>
      newPassword[0] ? field.required("Please enter your password.") : field
    ),
  newPassword: yup
    .string()
    .nullable()
    .min(6, "New password must be at least 6 characters")
    .test(
      "notSameAsOldPassword",
      "New password must be different from the old password",
      function (value) {
        const oldPassword = this.resolve(yup.ref("oldPassword"));
        return !oldPassword || String(value) !== String(oldPassword);
      }
    ),
});
