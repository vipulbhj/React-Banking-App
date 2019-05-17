import { parseJwt } from './utils';

const DUMMY_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1NTgwOTQzMDQsImV4cCI6MTU4OTYzMDMwNCwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.Rhm1sGX0X7xkr16FWfrOPG8Ser8RzDsGRn7OELiUR5Y';

export const login = () => {
    localStorage.setItem('token', DUMMY_TOKEN);
}

export const logout = () => {
    let loanFormValues = localStorage.getItem('loan-form');
    if(loanFormValues) {
        setTimeout(() => {
            alert('DOne');
            console.log(JSON.parse(loanFormValues).values);
            localStorage.removeItem('token');
        },400);
        alert('Saving current form state');
    } else {
        localStorage.removeItem('token');
    }
}

export const authenticated = () => {
    const token = localStorage.getItem('token');
    if(token) {
        console.log('Parsed token', parseJwt(token));
        return true;
    }
    return false;
}