/** 3P imports **/
import {toast} from "react-toastify";

/** test function imports **/
import {authenticated, login, backendUrl, getLoanByStatus, logout} from '../auth';


/***PENDING:
 * logout() function - Keeping for original repository owner.
 */

/** test setup **/
const OLD_ENV = process.env;
jest.mock('react-toastify');

/** test clean up **/
afterEach(() => {
    jest.clearAllMocks();
    process.env = OLD_ENV; // restore old env
});
beforeEach(() => {
    jest.resetModules(); // most important - it clears the cache
    process.env = {...OLD_ENV}; // make a copy
});


/**
 * supply common values to login related tests
 * @param mockResponse
 * @returns {{setSubmitting: *, mockSuccessResponse, nav: {push: *}, values: {password: string, email: string}, backendUrl: *, mockFetchPromise: Promise<{json: (function(): Promise<any>)}>}}
 */
function getLoginMockValues(mockResponse = {}) {

    /** login function params **/
    const values = {email: "kalpesh.singh@foo.com", password: "1234"};
    const setSubmitting = jest.fn((val) => val);
    const nav = {
        push: jest.fn()
    };
    const fetchParams = {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(values)
    };

    /** mock login function response **/
    const mockSuccessResponse = mockResponse;
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
        json: () => mockJsonPromise
    });

    /** other dependent functions **/
    const backendUrl = jest.fn(() => {
        return process.env.REACT_APP_DEVELOPMENT_API;
    });

    /** localstorage spying **/
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
    jest.spyOn(Storage.prototype, 'setItem');
    jest.spyOn(Storage.prototype, 'removeItem');

    Storage.prototype.setItem = jest.fn();
    Storage.prototype.removeItem = jest.fn();

    return {
        values,
        setSubmitting,
        nav,
        fetchParams,
        mockFetchPromise,
        mockSuccessResponse,
        backendUrl
    }
}

/**
 * supply common values to getLoanStatus related tests
 * @param mockResponse
 * @returns {{fetchParams: {headers: {Authorization: string, "Content-Type": string}}, handleStateChange: *, mockFetchPromise: Promise<{json: (function(): Promise<any>)}>, status: string}}
 */
function getLoanStatusMockValues(mockResponse = {}) {

    /** getLoanStatus function params **/
    const mockJsonPromise = Promise.resolve(mockResponse);
    const mockFetchPromise = Promise.resolve({
        json: () => mockJsonPromise
    });
    const status = "1";
    const handleStateChange = jest.fn();

    /** localstorage spying **/
    jest.spyOn(Storage.prototype, 'getItem');
    jest.spyOn(Storage.prototype, 'setItem');

    Storage.prototype.getItem = jest.fn();
    Storage.prototype.setItem = jest.fn();

    /** fetch params **/
    const fetchParams = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    };

    return {
        mockFetchPromise,
        status,
        handleStateChange,
        fetchParams
    }
}


test('should return true if token from localstorage is valid', () => {

    /** mocks **/
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOiIxNTE2MjQwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.ervjmmR5MAjz-ZJpEO8nhQpptXclhoJJn1-iDMw6ULA';
    jest.spyOn(Storage.prototype, 'getItem');
    Storage.prototype.getItem = jest.fn(() => token);

    const mockDate = new Date(1516239020);
    const mockDateImplementation = jest.spyOn(global, 'Date').mockImplementation(() => mockDate);

    /** assertion of function **/
    expect(authenticated()).toBe(true);

    /** assertion of localstorage module **/
    expect(localStorage.getItem).toHaveBeenCalledWith('token');
    expect(localStorage.getItem).toHaveBeenCalledTimes(1);

    /** assertion of Date constructor **/
    expect(global.Date).toHaveBeenCalledTimes(1);
    expect(global.Date.mock.calls[0].length).toBe(0); // no param


    /** restore mock values **/
    mockDateImplementation.mockRestore();

});

test('should return false if localstorage dosn\'t have token', () => {

    /** mocks **/
    jest.spyOn(Storage.prototype, 'getItem');
    Storage.prototype.getItem = jest.fn();

    /** assertion of function **/
    expect(authenticated()).toBe(false);

});

test('should successfully make the login call', async () => {

    /** mocks **/
    const mockResponse = {success: true, token: 'abc', user_id: 'vipul'};
    const {values, setSubmitting, nav, backendUrl, fetchParams} = getLoginMockValues(mockResponse);

    await login(values, setSubmitting, nav);

    /** assertion of fetch module **/
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(`${backendUrl()}/login`, fetchParams);


    /** assertion of localstorage module **/
    expect(localStorage.setItem).toHaveBeenCalledWith('token', mockResponse.token);
    expect(localStorage.removeItem).toHaveBeenCalledWith('loan-form');
    expect(localStorage.setItem).toHaveBeenCalledWith('user_id', mockResponse.user_id);

    expect(localStorage.setItem).toHaveBeenCalledTimes(2);
    expect(localStorage.removeItem).toHaveBeenCalledTimes(1);

    /** assertion of nav module **/
    expect(nav.push).toHaveBeenCalledTimes(1);
    expect(nav.push).toHaveBeenCalledWith('/home');

    /** assertion of toast module **/
    expect(toast.success).toHaveBeenCalledTimes(1);
    expect(toast.success).toHaveBeenCalledWith('Login Successful');
    expect(toast.success.mock.calls[0].length).toBe(1);

    /** assertion of callback **/
    expect(setSubmitting).toHaveBeenCalledTimes(1);
    expect(setSubmitting.mock.calls[0].length).toBe(1);
    expect(setSubmitting).toHaveBeenCalledWith(false);
});

test('should successfully make the login call with error response', async () => {

    /** mocks **/
    const mockResponse = {
        success: false,
        msg: "You need to be admin to access this area."
    };
    const {values, setSubmitting, nav, mockSuccessResponse, backendUrl, fetchParams} = getLoginMockValues(mockResponse);


    await login(values, setSubmitting, nav);

    /** assertion of fetch module **/
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(`${backendUrl()}/login`, fetchParams);

    /** assertion of toast module **/
    expect(toast.error).toHaveBeenCalledTimes(1);
    expect(toast.error).toHaveBeenCalledWith(`Error: ${mockSuccessResponse.msg}`, {position: toast.POSITION.BOTTOM_CENTER});
    expect(toast.error.mock.calls[0].length).toBe(2);

    /** assertion of callback **/
    expect(setSubmitting).toHaveBeenCalledTimes(1);
    expect(setSubmitting.mock.calls[0].length).toBe(1);
    expect(setSubmitting).toHaveBeenCalledWith(false);
});

test('should fail the login call', async () => {

    /** mocks **/
    const mockFailureResponse = Promise.reject();
    const {values, setSubmitting, nav} = getLoginMockValues();
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFailureResponse);

    await login(values, setSubmitting, nav);

    /** assertion of toast module **/
    expect(toast).toHaveBeenCalledWith('Something went wrong, Internet might be down');
    expect(toast).toHaveBeenCalledTimes(1);
    expect(toast.mock.calls[0].length).toBe(1);

    /** assertion of callback **/
    expect(setSubmitting).toHaveBeenCalledTimes(1);
    expect(setSubmitting.mock.calls[0].length).toBe(1);
    expect(setSubmitting).toHaveBeenCalledWith(false);


});

test('should return local development url', () => {
    expect(backendUrl()).toBe(process.env.REACT_APP_DEVELOPMENT_API);
});


test('should return production development url', () => {
    process.env.NODE_ENV = 'production';
    expect(backendUrl()).toBe(process.env.REACT_APP_PRODUCTION_API);
});


test('should make loan status call', async () => {

    /** mocks **/
    const mockSuccessResponse = {success: true, token: 'abc', data: {}};
    const {mockFetchPromise, status, handleStateChange, fetchParams} = getLoanStatusMockValues(mockSuccessResponse);
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);


    await getLoanByStatus(status, handleStateChange);

    /** assertion of fetch module **/
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(`${backendUrl()}/loan/show?status=${status}&user_id=${localStorage.getItem('user_id')}`, fetchParams);

    /** assertion of localstorage module **/
    expect(localStorage.setItem).toHaveBeenCalledWith('token', mockSuccessResponse.token);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);

    /** assertion of callback **/
    expect(handleStateChange).toHaveBeenCalledTimes(1);
    expect(handleStateChange).toHaveBeenCalledWith(status, mockSuccessResponse.data);
    expect(handleStateChange.mock.calls[0].length).toBe(2);

});

test('should make loan status call with error response', async () => {

    /** mocks **/
    const mockSuccessResponse = {
        success: false,
        token: 'abc',
        data: {},
        msg: "You need to be admin to access this area."
    };
    const {mockFetchPromise, status, handleStateChange, fetchParams} = getLoanStatusMockValues(mockSuccessResponse);
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);


    await getLoanByStatus(status, handleStateChange);

    /** assertion of fetch module **/
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(`${backendUrl()}/loan/show?status=${status}&user_id=${localStorage.getItem('user_id')}`, fetchParams);

    /** assertion of toast module **/
    expect(toast.info).toHaveBeenCalledTimes(1);
    expect(toast.info).toHaveBeenCalledWith(JSON.stringify(`${mockSuccessResponse.msg}`), {position: toast.POSITION.BOTTOM_CENTER});
    expect(toast.info.mock.calls[0].length).toBe(2);

});

test('should fail loan status call', async () => {

    /** mocks **/
    const mockFailureResponse = Promise.reject();
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFailureResponse);

    const {status, handleStateChange} = getLoanStatusMockValues();

    await getLoanByStatus(status, handleStateChange);

    /** assertion of toast module **/
    expect(toast.info).toHaveBeenCalledTimes(1);
    expect(toast.info).toHaveBeenCalledWith('Error something went wrong, check your internet status', {position: toast.POSITION.BOTTOM_CENTER});
    expect(toast.info.mock.calls[0].length).toBe(2);

});

test('should render toast if loan-form is absent from localstorage', async () => {

    /** mocks **/
    jest.spyOn(Storage.prototype, 'getItem');
    jest.spyOn(Storage.prototype, 'removeItem');
    Storage.prototype.getItem = jest.fn(() => '');

    await logout();

    /** assertion of toast module **/
    expect(toast.info).toHaveBeenCalledTimes(1);
    expect(toast.info).toHaveBeenCalledWith('successfully logged out', {position: toast.POSITION.BOTTOM_CENTER});
    expect(toast.info.mock.calls[0].length).toBe(2);

});


describe('should call update loan api if form id is present in localstorage', () => {

    // common code through out describe
    const fetchParams = {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer abc`
        },
        body: JSON.stringify({'data': 'abc', 'status': 0, 'id': 'abc'})
    };

    jest.spyOn(Storage.prototype, 'getItem');
    jest.spyOn(Storage.prototype, 'removeItem');

    test('should show data saved toast if api return "success" field as true', async () => {

        /** mocks **/
        Storage.prototype.getItem = jest.fn(() => 'abc');

        const mockResponse = {
            success: true
        };

        /** mock login function response **/
        const mockJsonPromise = Promise.resolve(mockResponse);
        const mockFetchPromise = Promise.resolve({
            json: () => mockJsonPromise
        });

        jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

        await logout();

        /** assertion of fetch module **/
        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(global.fetch).toHaveBeenCalledWith(`${backendUrl()}/loan/update`, fetchParams);

        /** assertion of toast module **/
        expect(toast.info).toHaveBeenCalledTimes(2);
        expect(toast.info).toHaveBeenCalledWith('Data Saved Successfully', {position: toast.POSITION.BOTTOM_CENTER});
        expect(toast.info.mock.calls[0].length).toBe(2);

    });

    test('should show error message toast if api return "success" field as false', async () => {

        /** mocks **/
        Storage.prototype.getItem = jest.fn(() => 'abc');

        const mockResponse = {
            success: false,
            msg: 'test msg'
        };

        /** mock login function response **/
        const mockJsonPromise = Promise.resolve(mockResponse);
        const mockFetchPromise = Promise.resolve({
            json: () => mockJsonPromise
        });

        jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

        await logout();

        /** assertion of fetch module **/
        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(global.fetch).toHaveBeenCalledWith(`${backendUrl()}/loan/update`, fetchParams);

        /** assertion of toast module **/
        expect(toast.info).toHaveBeenCalledTimes(2);
        expect(toast.info).toHaveBeenCalledWith(`Error(${mockResponse.msg}) in saving data, you have been logged out`, {position: toast.POSITION.BOTTOM_CENTER});
        expect(toast.info.mock.calls[0].length).toBe(2);

    });

    test('should fail loan update call', async () => {

        /** mocks **/
        const mockFailureResponse = Promise.reject();
        jest.spyOn(global, 'fetch').mockImplementation(() => mockFailureResponse);
        Storage.prototype.getItem = jest.fn(() => 'abc');

        await logout();

        /** assertion of toast module **/
        expect(toast).toHaveBeenCalledTimes(1);
        expect(toast).toHaveBeenCalledWith('Something went wrong, Internet might be down');
        expect(toast.mock.calls[0].length).toBe(1);

    });

});

describe('should call update loan api if form id is absent in localstorage', () => {

    // common code through out describe
    const fetchParams = {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer abc`
        },
        body: JSON.stringify({
            'data': 'abc',
            'status': 0,
            'user_id': 'abc'
        })
    };

    jest.spyOn(Storage.prototype, 'getItem');
    jest.spyOn(Storage.prototype, 'removeItem');

    test('should show data saved toast if api return "success" field as true', async () => {

        /** mocks **/
        Storage.prototype.getItem = jest.fn((item) => {
            if (item === 'loan-form') {
                return 'abc'
            } else if (item === 'loan-form-id') {
                return ''
            } else {
                return 'abc'
            }
        });

        const mockResponse = {
            success: true
        };

        /** mock login function response **/
        const mockJsonPromise = Promise.resolve(mockResponse);
        const mockFetchPromise = Promise.resolve({
            json: () => mockJsonPromise
        });

        jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

        await logout();

        /** assertion of fetch module **/
        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(global.fetch).toHaveBeenCalledWith(`${backendUrl()}/loan/apply`, fetchParams);

        /** assertion of toast module **/
        expect(toast.info).toHaveBeenCalledTimes(2);
        expect(toast.info).toHaveBeenCalledWith('Data Saved Successfully', {position: toast.POSITION.BOTTOM_CENTER});
        expect(toast.info.mock.calls[0].length).toBe(2);

        expect(toast.info).toHaveBeenCalledWith('Saving current form state', {position: toast.POSITION.BOTTOM_CENTER});
        expect(toast.info.mock.calls[0].length).toBe(2);

    });

    test('should show error toast if api return "success" field as false', async () => {

        /** mocks **/
        Storage.prototype.getItem = jest.fn((item) => {
            if (item === 'loan-form') {
                return 'abc'
            } else if (item === 'loan-form-id') {
                return ''
            } else {
                return 'abc'
            }
        });

        const mockResponse = {
            success: false,
            msg: 'abc'
        };

        /** mock login function response **/
        const mockJsonPromise = Promise.resolve(mockResponse);
        const mockFetchPromise = Promise.resolve({
            json: () => mockJsonPromise
        });

        jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

        await logout();

        /** assertion of fetch module **/
        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(global.fetch).toHaveBeenCalledWith(`${backendUrl()}/loan/apply`, fetchParams);

        /** assertion of toast module **/
        expect(toast.error).toHaveBeenCalledTimes(1);
        expect(toast.error).toHaveBeenCalledWith(`Error(${mockResponse['msg']}) in saving data, you have been logged out`);
        expect(toast.error.mock.calls[0].length).toBe(1);

        expect(toast.info).toHaveBeenCalledTimes(1);
        expect(toast.info).toHaveBeenCalledWith('Saving current form state', {position: toast.POSITION.BOTTOM_CENTER});
        expect(toast.info.mock.calls[0].length).toBe(2);

    });

    test('should fail loan apply call', async () => {

        /** mocks **/
        const mockFailureResponse = Promise.reject();
        jest.spyOn(global, 'fetch').mockImplementation(() => mockFailureResponse);
        Storage.prototype.getItem = jest.fn((item) => {
            if (item === 'loan-form') {
                return 'abc'
            } else {
                return ''
            }
        });

        await logout();

        /** assertion of toast module **/
        expect(toast).toHaveBeenCalledTimes(1);
        expect(toast).toHaveBeenCalledWith('Something went wrong, Internet might be down');
        expect(toast.mock.calls[0].length).toBe(1);

    });

});

