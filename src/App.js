import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import ReCAPTCHA from "react-google-recaptcha";
import Navbar from './components/NavBar/Navbar';
import './App.css';


const Basic = () => (
  <div>
    <Formik
      initialValues={{ email: '', password: '' }}
      validate={values => {
        let errors = {};
        if (!values.email) {
          errors.email = 'Required';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address';
        } else if (!values.password) {
          errors.password = 'Required';
        } else if (values.password.length < 6) {
          errors.password = 'Password must be more than 6 characters';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className="field">
            <div className="control">
              <Field type="text" placeholder="Username" className="input" name="username" />
            </div>
          </div>
          <ErrorMessage name="username" component="div" />
          <div className="field">
            <div className="control">
              <Field type="email" placeholder="Email" className="input" name="email" />
            </div>
          </div>
          <ErrorMessage name="email" component="div" />
          <div className="field">
            <div className="control">
              <Field type="password" placeholder="Password" className="input" name="password" />
            </div>
          </div>
          <ErrorMessage name="password" component="div" />
          <ReCAPTCHA
            size="compact"
            sitekey="6LdSZqMUAAAAANrFaG3t7bf5RRb-gz6-DgbEGoQO"
            onChange={(value) => console.log(value)}
          />
          <button className="button is-success is-fullwidth is-medium"
            type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  </div>
);

const App = () => {
  return (
    <div className="app-container">
      <Navbar logo="BULMA" />
      
    </div>
  )
}

export default App;
