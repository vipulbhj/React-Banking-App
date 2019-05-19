import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { withRouter } from 'react-router-dom';
import { login } from '../../auth';

const ErrorChecker = (values) => {
  let errors = {};

  // Email Validation
  values.email = values.email.trim();
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  // Password Validation
  values.password = values.password.trim();
  if(!values.password) {
    errors.password = 'Required';
  } else if(values.password.search(/[^a-zA-Z0-9-_@#$]/g) !== -1) {
    errors.password = 'Only alphanumeric and _ - @ # $';
  } else if(values.password.length > 40) {
    errors.password = "Too big, only 40 characters allowed";
  }

  return errors;
}

const FormLayout = ({ isSubmitting, animationToggle }) => (
  <div className="formContent">
    <h2 className="active"> Log In </h2>
    <Form>
      <Field type="email" className={`${animationToggle} fadeIn-second`}
        name="email" placeholder="Email" />
      <ErrorMessage name="email" component="div" />
      <Field type="password" className={`${animationToggle} fadeIn-second`} 
        name="password" placeholder="Password" />
      <ErrorMessage name="password" component="div" />
      <button type="submit" className={`button button-large ${animationToggle} fadeIn-third`} 
        disabled={isSubmitting}>
          Login
      </button>
    </Form>
    <div className="formFooter">
      <a className="underlineHover" href="#signup">Register</a>
    </div>
  </div>
)

const LoginForm = (props) => {
  const animationToggle = props.inView ? 'fadeIn' : 'hidden';
  return (
  <Formik
    initialValues={{ email: '', password: '' }}
    validate={ErrorChecker}
    onSubmit={(values, { setSubmitting }) => {
      login(values, setSubmitting, props.history);
    }}
    render={props => <FormLayout animationToggle={animationToggle} {...props} />}
  />
)};

export default withRouter(LoginForm);
