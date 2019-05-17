const login = () => {
    localStorage.setItem('token', 'ABCDEF');
}

const logout = () => {
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

const authenticated = () => {
    const token = localStorage.getItem('token');
    if(token) return true;
    return false;
}

module.exports = {
    login, 
    logout,
    authenticated
}
