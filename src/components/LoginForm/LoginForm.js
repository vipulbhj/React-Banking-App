import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const FormLayout = ({ isSubmitting, animationToggle }) => (
  <div id="login" className="formContent">
    <h2 className="active"> Log In </h2>
    <Form>
      <Field type="email" className={`${animationToggle} fadeIn-second`}
        name="email" placeholder="Email" />
      <ErrorMessage name="email" component="div" />
      <Field type="password" className={`${animationToggle} fadeIn-third`}
        name="password" placeholder="Password" />
      <Field type="submit" className={`${animationToggle} fadeIn-fourth`}
        value="Log In" disabled={isSubmitting} />
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
      validate={values => {
        let errors = {};
        if (!values.email) {
          errors.email = 'Email is Required';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address';
        } else if (!values.password) {
          errors.password = 'Password is Required';
        } else if (values.password.length < 6) {
          errors.password = 'Password must be more than 6 characters';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting, setStatus }) => {
        fetch('https://arab-exercise-api.herokuapp.com/login', {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        })
          .then((response) => {
            return response.json();
          })
          .then((myJson) => {
            console.log(myJson);
            console.log(JSON.stringify(myJson));
          })
          .catch(err => {
            setSubmitting(false);
            setStatus({ msg: 'Set some arbitrary status or data' });
          });
      }}
      render={props => <FormLayout animationToggle={animationToggle} {...props} />}
    />
  )
};


export default LoginForm;
