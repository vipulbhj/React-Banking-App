/** 3P imports **/
import React from 'react';
import {Router} from 'react-router-dom';
import {render, fireEvent} from '@testing-library/react';
import {createMemoryHistory} from 'history';

/** test function imports **/
import NavbarModal from "../../components/NavBar/NavbarModal/NavbarModal";
import * as mockAuth from "../../auth";

/** test clean up **/
afterEach(() => {
    jest.clearAllMocks();
});

const toggleModal = jest.fn((event, cb) => {
    if (cb) cb();
});

test('should render Logout button when authenticated true in NavbarModal', () => {

    /** mocks **/
    jest.spyOn(mockAuth, 'authenticated').mockImplementation(() => true);
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({});

    /** render navbar modal **/
    const history = createMemoryHistory({initialEntries: ['/something']});
    const navbarModalWrapper = render(<Router history={history}><NavbarModal modalOpen={true}
                                                                             toggleModal={toggleModal}
                                                                             history={history}/></Router>);
    const {getByTestId, queryByTestId, rerender} = navbarModalWrapper;
    expect(getByTestId('logout-btn-navbar-modal')).toBeInTheDocument();


    fireEvent.click(getByTestId('logout-btn-navbar-modal')); // should trigger logout function
    expect(history.location.pathname).toBe("/"); // redirect to index page

    jest.spyOn(mockAuth, 'authenticated').mockImplementation(() => false); // logout function removes token so we should get false value
    rerender(<NavbarModal/>); // re-render to see if logout button is removed from DOM
    expect(queryByTestId('logout-btn-navbar-modal')).not.toBeInTheDocument();

    /** mocks restore **/
    jest.spyOn(global, 'fetch').mockRestore();
    jest.spyOn(mockAuth, 'authenticated').mockRestore();
});

test('should go to /home when click on home button', () => {

    /** render navbar modal **/
    const history = createMemoryHistory({initialEntries: ['/something']});
    const {getByTestId} = render(<Router history={history}><NavbarModal modalOpen={true} toggleModal={toggleModal}
                                                                        history={history}/></Router>);
    expect(getByTestId('home-btn-navbar-modal')).toBeInTheDocument();

    fireEvent.click(getByTestId('home-btn-navbar-modal')); // should push /home to history
    expect(history.location.pathname).toBe("/home"); // redirect to home page

});

test('should go to #signup when click on signup button', () => {

    /** render navbar modal **/
    const history = createMemoryHistory({initialEntries: ['/something']});
    const {getByTestId} = render(<Router history={history}><NavbarModal modalOpen={true} toggleModal={toggleModal}
                                                                        history={history}/></Router>);
    expect(getByTestId('signup-btn-navbar-modal')).toBeInTheDocument();

    fireEvent.click(getByTestId('signup-btn-navbar-modal')); // should assign href to #signup
    expect(window.location.href).toContain("/#signup"); // anchor to #signup

});

test('should go to #login when click on login button', () => {

    /** render navbar modal **/
    const history = createMemoryHistory({initialEntries: ['/something']});
    const {getByTestId} = render(<Router history={history}><NavbarModal modalOpen={true} toggleModal={toggleModal}
                                                                        history={history}/></Router>);
    expect(getByTestId('login-btn-navbar-modal')).toBeInTheDocument();

    fireEvent.click(getByTestId('login-btn-navbar-modal')); // should assign href to #login
    expect(window.location.href).toContain("/#login"); // anchor to #login

});

test('should trigger callback when click on close button', () => {

    /** render navbar modal **/
    const history = createMemoryHistory({initialEntries: ['/something']});
    const {getByLabelText} = render(<Router history={history}><NavbarModal modalOpen={true} toggleModal={toggleModal}
                                                                           history={history}/></Router>);
    expect(getByLabelText('close')).toBeInTheDocument();

    fireEvent.click(getByLabelText('close')); // should trigger callback
    expect(toggleModal).toHaveBeenCalledTimes(1);

});
