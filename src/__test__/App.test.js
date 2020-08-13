/** 3P imports **/
import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';

/** test function imports **/
import {Routes} from '../App';
import * as mockAuth from "../auth";


test('landing on a bad page shows no match component', () => {

    /** prepare routing and render page **/
    const history = createMemoryHistory({initialEntries: ['/something']});
    const {getByText} = render(
        <Router history={history}>
            <Routes/>
        </Router>
    );

    expect(getByText('404 - Page Not Found')).toBeInTheDocument();
    fireEvent.click(getByText(/home page/i));

    expect(history.location.pathname).toBe("/");
    expect(getByText('Apply For Loan In 4 Easy Steps')).toBeInTheDocument();
});

test('landing on root page shows index page component', () => {

    /** prepare routing and render page **/
    const history = createMemoryHistory({initialEntries: ['/']});
    const {getByText, queryByText} = render(
        <Router history={history}>
            <Routes/>
        </Router>
    );

    expect(history.location.pathname).toBe("/");
    expect(getByText('Apply For Loan In 4 Easy Steps')).toBeInTheDocument();
    expect(queryByText('404 - Page Not Found')).not.toBeInTheDocument();
});

test('should render home page if authenticated', () => {

    /** mocks **/
    jest.spyOn(mockAuth, 'authenticated').mockImplementation(() => true);
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({});

    /** prepare routing and render page **/
    const history = createMemoryHistory({initialEntries: ['/home']});
    const {getByText, queryByText} = render(
        <Router history={history}>
            <Routes/>
        </Router>
    );

    expect(history.location.pathname).toBe("/home");
    expect(getByText('Choose Application Type')).toBeInTheDocument();
    expect(queryByText('Apply For Loan In 4 Easy Steps')).not.toBeInTheDocument();

    /** mocks restore **/
    jest.spyOn(global, 'fetch').mockRestore();
    jest.spyOn(mockAuth, 'authenticated').mockRestore();
});

test('should render loan page if authenticated', () => {

    /** mocks **/
    jest.spyOn(mockAuth, 'authenticated').mockImplementation(() => true);
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({});

    /** prepare routing and render page **/
    const history = createMemoryHistory({initialEntries: ['/loan']});
    const {getByText, queryByText} = render(
        <Router history={history}>
            <Routes/>
        </Router>
    );

    expect(history.location.pathname).toBe("/loan");
    expect(getByText('Loan Application Form')).toBeInTheDocument();
    expect(queryByText('Apply For Loan In 4 Easy Steps')).not.toBeInTheDocument();

    /** mocks restore **/
    jest.spyOn(global, 'fetch').mockRestore();
    jest.spyOn(mockAuth, 'authenticated').mockRestore();
});

test('landing on home page without authenticated redirects to index page', () => {

    /** mocks **/
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({});

    /** prepare routing and render page **/
    const history = createMemoryHistory({initialEntries: ['/home']});
    const {getByText, queryByText} = render(
        <Router history={history}>
            <Routes/>
        </Router>
    );

    expect(history.location.pathname).toBe("/");
    expect(getByText('Apply For Loan In 4 Easy Steps')).toBeInTheDocument();
    expect(queryByText('Choose Application Type')).not.toBeInTheDocument();

    /** mocks restore **/
    jest.spyOn(global, 'fetch').mockRestore();
});

test('landing on loan page without authenticated redirects to index page', () => {

    /** mocks **/
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({});

    /** prepare routing and render page **/
    const history = createMemoryHistory({initialEntries: ['/loan']});
    const {getByText, queryByText} = render(
        <Router history={history}>
            <Routes/>
        </Router>
    );

    expect(history.location.pathname).toBe("/");
    expect(getByText('Apply For Loan In 4 Easy Steps')).toBeInTheDocument();
    expect(queryByText('Choose Application Type')).not.toBeInTheDocument();

    /** mocks restore **/
    jest.spyOn(global, 'fetch').mockRestore();
});
