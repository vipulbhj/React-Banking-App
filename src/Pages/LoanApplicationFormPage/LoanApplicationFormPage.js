import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Persist } from 'formik-persist';
import FormNavigationControl from './FormNavigationControl/FormNavigationControl';
import './LoanApplicationFormPage.css';

const FormLayout = ({ isSubmitting, toggleInViewPart, isVisible }) => (
  <div className="formContent fadeIn fadeIn-first">
    <h2 className="active"> Loan Application Form </h2>
    <Form>
      <div id="firstStepLoanForm" className={isVisible.call(this, 1)}>
        <Field type="text" className="fadeIn fadeIn-second"
          name="firstname" placeholder="First Name" />
        <ErrorMessage name="firstname" component="div" />

        <Field type="text" className="fadeIn fadeIn-second"
          name="lastname" placeholder="Last Name" />
        <ErrorMessage name="lastname" component="div" />

        <Field type="text" className="fadeIn fadeIn-second"
          name="mobile" placeholder="Mobile Number" />
        <ErrorMessage name="mobile" component="div" />

        <Field type="email" className="fadeIn fadeIn-second"
          name="email" placeholder="Email" />
        <ErrorMessage name="email" component="div" />

        <Field type="text" className="fadeIn fadeIn-second"
          name="address" placeholder="Address - Country" />
        <ErrorMessage name="address" component="div" />
        <FormNavigationControl fTitle="Next" bTitle="" bClass="button-hidden" 
          fToggleFormView={toggleInViewPart.bind(this, 2)} />
      </div>
      <div id="secondStepLoanForm" className={isVisible.call(this, 2)}>
        <div className="container-application-form fadeIn fadeIn-second">
          <h2>Choose your Gender</h2>
          <ul>
            <li>
              <Field type="radio" id="f-option" name="gender" value="male" />
              <label htmlFor="f-option">Male</label>
              <div className="check"></div>
            </li>

            <li>
              <Field type="radio" id="s-option" name="gender" value="female" />
              <label htmlFor="s-option">Female</label>
              <div className="check"><div className="inside"></div></div>
            </li>

            <li>
              <Field type="radio" id="t-option" name="gender" value="other" />
              <label htmlFor="t-option">Other</label>
              <div className="check"><div className="inside"></div></div>
            </li>
          </ul>
        </div>
        <div className="form-group fadeIn fadeIn-second">
          <label htmlFor="DOB" className="label">Enter Date of Birth</label>
          <Field type="text" className="fadeIn-third"
            name="date" placeholder="Date" />
          <ErrorMessage name="date" component="div" />
          <Field type="text" className="fadeIn-third"
            name="month" placeholder="Month" />
          <ErrorMessage name="month" component="div" />
          <Field type="text" className="fadeIn-third"
            name="year" placeholder="year" />
          <FormNavigationControl fTitle="Next" bTitle="Back" 
            fToggleFormView={toggleInViewPart.bind(this, 3)}
            bToggleFormView={toggleInViewPart.bind(this, 1)} />
        </div>
      </div>
      <div id="thirdStepLoanForm" className={isVisible.call(this, 3)}>
        <Field type="text" className="fadeIn fadeIn-first"
          name="annualIncome" placeholder="Your Annual Income" />
        <ErrorMessage name="annualIncome" component="div" />

        <Field type="text" className="fadeIn fadeIn-second"
          name="loanAmount" placeholder="Loan Amount Required" />
        <ErrorMessage name="loanAmounte" component="div" />

        <Field type="text" className="fadeIn fadeIn-third"
          name="tenure" placeholder="Tenure" />
        <ErrorMessage name="tenure" component="div" />

        <button type="submit" className={`button button-large fadeIn-third`} 
          disabled={isSubmitting}>
          Login
        </button>
       
        <Persist name="loan-form" />
      </div>
    </Form>
  </div>
)

class LoanApplicationFormPage extends React.Component {

  state = {
    inViewPart: 1, 
  }

  componentDidMount() {
    if (this.props.location.state) {
      localStorage.setItem('loan-form-id', this.props.location.state.form_id)
    }
  }

  toggleInViewPart = (num) => {
    this.setState({
      inViewPart: num
    });
  }

  isVisible = (num) => {
    if(num === this.state.inViewPart) {
      return 'in-view';
    } 
    return 'off-view';
  }

  render() {
    return (
      <Formik
        initialValues={
          {
            firstname: '',
            lastname: '',
            mobile: '',
            email: '',
            address: '',
            gender: '',
            date: '',
            month: '',
            year: '',
            annualIncome: '',
            loanAmountRequired: '',
            tenure: ''
          }
        }
        
        validate={values => {
          let errors = {};
          if (!values.email) {
            errors.email = 'Email is Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          } if (values.annualIncome < 10) {
            errors.annualIncome = 'too low';
          }
          return errors;
        }}

        onSubmit={(values, { setSubmitting }) => {
          fetch(`${process.env.REACT_APP_PRODUCTION_API}/getloan`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({'data': localStorage.getItem('loan-form'), 'status': 1})
            })
            .then(res => res.json())
            .then(data => {
                if (data['success']) {
                    alert('Data Saved Successfully');
                    setSubmitting(false);
                    this.props.history.push('/');
                } else {
                    alert(`Error(${data['msg']}) in saving data`);
                    setSubmitting(false);
                }
              })
            .catch(err => {
              console.log('err', JSON.stringify(err));
              setSubmitting(false);
            });
        }}

        render={props => <FormLayout toggleInViewPart={this.toggleInViewPart}
          isVisible={this.isVisible} {...props} />}
      />
    )
  }
};


export default LoanApplicationFormPage;