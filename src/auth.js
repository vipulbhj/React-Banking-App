const login = () => {
    localStorage.setItem('token', 'ABCDEF');
}

const logout = () => {
    localStorage.removeItem('token');
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
