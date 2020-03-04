import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
const UserForm = ({ values, errors, touched, status }) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    console.log("status has changed", status);
    status && setUsers(users => [...users, status]);
  }, [status]);
  return (
    <div className="form">
      <Form className="Sign">
        <h1 className="signup">Sign Up</h1>
        <div className="signupLabels">
        <label htmlFor="name">
          Name
          <Field id="name" type="text" name="name" placeholder="Your name" />
          {touched.name && errors.name && (
            <p className="errors">{errors.name}</p>
          )}
        </label>
        <label htmlFor="number">
          Phone Number
          <Field id="number" type="text" name="number" placeholder="Your phone number" />
          {touched.number && errors.number && (
            <p className="errors">{errors.number}</p>
          )}
        </label>
        <label htmlFor="password">
          Password
          <Field id="password" type="text" name="password" placeholder="Enter password"/> 
          {touched.password && errors.password && (
            <p className="errors">{errors.password}</p>
          )}
        </label>
        <label htmlFor="repassword">
          Repeat Password
        <Field id="repassword" type="text" name="repassword" placeholder="Repeat Password" />
          {touched.repassword && errors.repassword && (
            <p className="errors">{errors.repassword}</p>
          )}
        </label>
        </div>
        {/* <div className="termsBox">
          <Field type="checkbox" name="terms" checked={values.terms} />
          <span className="checkmark" />
          <p>By checking this box, you agree to our Terms of Service.</p>
        </div> */}
        <button type="submit">Sign Up</button>
      </Form>
    </div>
  );
};
const FormikUserForm = withFormik({
  mapPropsToValues(props) {
    return {
      name: props.name || "",
      password: props.password || "",
      repassword: props.repassword || "",
      number: props.number || "",
    };
  },
  // Declare shape and requirement of values object (form state )
  validationSchema: Yup.object().shape({
    // passing a string in required makes a custom inline error msg
    name: Yup.string().required("Create Username"),
    password: Yup.string().required("Create Password"),
    repassword: Yup.string().required("Re-Enter Password"),
    number: Yup.string().required("Enter Phone Number")
  }),
  handleSubmit(values, { setStatus, resetForm }) {
    console.log("submitting", values);
    axios
      .post("https://reqres.in/api/users/", values)
      .then(res => {
        console.log("success", res);
        setStatus(res.data);
        resetForm();
      })
      .catch(err => console.log(err.response));
  }
})(UserForm);
export default FormikUserForm;