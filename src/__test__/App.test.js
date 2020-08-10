import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {Routes} from '../App';
import {createMemoryHistory} from 'history';

test('landing on a bad page shows no match component', () => {
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
