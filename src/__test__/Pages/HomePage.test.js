/** 3P imports **/
import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';

/** test function imports **/
import HomePage from '../../Pages/HomePage/HomePage';
import * as mockAuth from "../../auth";

test('render homepage component', () => {

    /** mocks **/
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({});
    jest.spyOn(mockAuth, 'getLoanByStatus').mockResolvedValueOnce({
        data: [{test: "test"}]
    });

    const loanStatus = "1";

    /** prepare routing and render homepage **/
    const history = createMemoryHistory({initialEntries: ['/something']});
    const {getByText, getByTestId} = render(<Router
        history={history}><HomePage/></Router>);

    expect(mockAuth.getLoanByStatus).toHaveBeenCalledTimes(1); // component did mount call
    expect(mockAuth.getLoanByStatus).toHaveBeenCalledWith(loanStatus, expect.any(Function)); //2nd arg: anonymous function
    expect(mockAuth.getLoanByStatus.mock.calls[0].length).toBe(2);

    const loanBtn = getByText('Apply for Loan');
    expect(loanBtn).toBeInTheDocument();

    fireEvent.click(loanBtn);
    expect(history.location.pathname).toBe("/loan"); // redirect to loan page

    jest.spyOn(mockAuth, 'getLoanByStatus').mockReset();

    const dropdown = getByTestId('dropdown');
    fireEvent.change(dropdown, {
        target: {value: "0"}
    });

    expect(mockAuth.getLoanByStatus).toHaveBeenCalledTimes(1); // dropdown select call
    expect(mockAuth.getLoanByStatus).toHaveBeenCalledWith("0", expect.any(Function));
    expect(mockAuth.getLoanByStatus.mock.calls[0].length).toBe(2);

    /** mocks restore **/
    jest.spyOn(global, 'fetch').mockRestore();
    jest.spyOn(mockAuth, 'getLoanByStatus').mockRestore();

});
