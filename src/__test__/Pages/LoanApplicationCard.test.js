/** 3P imports **/
import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';

/** test function imports **/
import LoanApplicationCard from '../../Pages/HomePage/LoanApplicationCard/LoanApplicationCard';

test('render LoanApplicationCard component', () => {

    /** mocks **/
    const props = {
        title: 'Title test',
        content: 'Content test',
        handleClick: jest.fn()
    };

    /** prepare routing and render loan application **/
    const history = createMemoryHistory({initialEntries: ['/something']});
    const {getByText, getByTestId} = render(<Router
        history={history}><LoanApplicationCard {...props} /></Router>);

    expect(getByText(props.title)).toBeInTheDocument();
    expect(getByText(props.content)).toBeInTheDocument();

    const applicationElem = getByTestId('application-card');
    fireEvent.click(applicationElem);

    expect(props.handleClick).toHaveBeenCalledTimes(1);

});
