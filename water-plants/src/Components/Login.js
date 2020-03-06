import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
const LoginForm = ({ values, errors, touched, status }) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    console.log("status has changed", status);
    status && setUsers(users => [...users, status]);
  }, [status]);
  return (
    <div className="form">
      <Form className="Log">
        <h2 className="login">Login</h2>
        <div className="loginLabels">
        <label htmlFor="username">
          Username
          <Field id="username" type="text" name="username" placeholder="Your username" />
          {touched.username && errors.username && (
            <p className="errors">{errors.username}</p>
          )}
        </label>
        <label htmlFor="password">
          Password
          <Field id="password" name="password" placeholder="Enter password"/>
          {touched.password && errors.password && (
            <p className="errors">{errors.password}</p>
          )}
        </label>
        </div>
        <button type="submit">Login</button>
        <br></br>
        <br></br>
        <a href="https://dearselfskincare.com/"> Forgot Password?</a>
      </Form>
    </div>
  );
};
const FormikUserForm = withFormik({
  mapPropsToValues(props) {
    return {
      username: props.username || "",
      password: props.password || "",
    };
  },
  validationSchema: Yup.object().shape({
    username: Yup.string().required("Please enter your username"),
    password: Yup.string().required("Please enter your password")
  }),
  handleSubmit(values, { setStatus, resetForm }) {
    console.log("submitting", values);
    axios
      .post("https://wmpbackend.herokuapp.com/api/auth/login", values)
      .then(res => {
        console.log("success", res);
        setStatus(res.data);
        resetForm();
      })
      .catch(err => console.log(err.response));
  }
})(LoginForm);
export default FormikUserForm;