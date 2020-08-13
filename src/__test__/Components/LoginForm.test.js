/** 3P imports **/
import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';

/** test function imports **/
import LoginForm from '../../components/LoginForm/LoginForm';


/**
 * Pending:
 * Need to learn and handle proper testing for Formik.
 */

test('should render correct fields and able to change value', () => {

    /** prepare routing and render LoginForm **/
    const history = createMemoryHistory({initialEntries: ['/something']});
    const {container} = render(<Router history={history}><LoginForm/></Router>);

    /** grab form fields **/
    const email = container.querySelector('input[name="email"]');
    const password = container.querySelector('input[name="password"]');

    /** mimic user input **/
    fireEvent.change(email, {
        target: {
            value: 'mockemail'
        }
    });

    fireEvent.change(password, {
        target: {
            value: 'mockPassword'
        }
    });

    expect(email).toHaveValue('mockemail');
    expect(password).toHaveValue('mockPassword');

});
