/** 3P imports **/
import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';

/** test function imports **/
import Navbar from "../../components/NavBar/Navbar";
import * as mockAuth from "../../auth";


test('should render Logout button when authenticated true in Navbar', () => {

    /** mocks **/
    jest.spyOn(mockAuth, 'authenticated').mockImplementation(() => true);
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({});

    /** prepare routing and render navbar **/
    const history = createMemoryHistory({initialEntries: ['/something']});
    const {getByTestId, queryByTestId, rerender} = render(<Router history={history}><Navbar/></Router>);


    expect(history.location.pathname).toBe("/something");
    expect(getByTestId('logout-btn')).toBeInTheDocument();

    fireEvent.click(getByTestId('logout-btn')); // should trigger logout function
    expect(history.location.pathname).toBe("/"); // redirect to index page

    jest.spyOn(mockAuth, 'authenticated').mockImplementation(() => false); // logout function removes token so we should get false value
    rerender(<Router history={history}><Navbar/></Router>); // re-render to see if logout button is removed from DOM
    expect(queryByTestId('logout-btn')).not.toBeInTheDocument();

    /** mocks restore **/
    jest.spyOn(global, 'fetch').mockRestore();
    jest.spyOn(mockAuth, 'authenticated').mockRestore();
});
