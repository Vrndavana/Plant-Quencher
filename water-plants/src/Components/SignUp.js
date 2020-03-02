import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import PasswordMask from "react-password-mask";

const UserForm = ({ values, errors, touched, status }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    console.log("status has changed", status);
    status && setUsers(users => [...users, status]);
  }, [status]);
  return (
    <div className="form">
      <Form>
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
          <PasswordMask
            id="password"
            name="password"
            placeholder="Enter password"
          />
        </label>
        <label htmlFor="plants">
          How Many Plants Do You Have?
          <Field as="select" className="food-select" name="plants">
            <option>Select</option>
            <option value="least">1-5 Plants</option>
            <option value="average">5-10 Plants</option>
            <option value="most">10+ Plants</option>
          </Field>
        </label>
        </div>

        <div className="termsBox">
          <Field type="checkbox" name="terms" checked={values.terms} />
          <span className="checkmark" />
          <p>By checking this box, you agree to our Terms of Service.</p>
        </div>

        <button type="submit">Sign Up</button>
      </Form>
    </div>
  );
};

const FormikUserForm = withFormik({
  mapPropsToValues(props) {
    return {
      name: props.name || "",
      number: props.number || "",
      password: props.password || "",
      plants: props.plants || "",
      terms: props.terms || false
    };
  },

  validationSchema: Yup.object().shape({
    name: Yup.string().required("Please enter your name"),
    number: Yup.number().required("Please enter your number")
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