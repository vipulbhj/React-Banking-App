import { parseJwt } from './utils';

export const login = (values, setSubmitting, nav) => {
    fetch(`${process.env.REACT_APP_PRODUCTION_API}/login`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(values)
    })
    .then(res => res.json())
    .then(data => {
        if (data['success']) {
            localStorage.setItem('token', data['token']);
            localStorage.removeItem('loan-form');
            nav.push('/home');
        } else {
            alert(`Error: ${data.msg}`);
        }
        setSubmitting(false)
    })
    .catch(err => { console.log('err', JSON.stringify(err)); setSubmitting(false) });
}

export const logout = () => {
    let loanFormValues = localStorage.getItem('loan-form');
    if (loanFormValues) {
        let formId = localStorage.getItem('loan-form-id');
        if(formId) {
            fetch(`${process.env.REACT_APP_PRODUCTION_API}/updateloan`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({'data': loanFormValues, 'status': 0, 'id': formId})
            })
            .then(res => res.json())
            .then(data => {
                if (data['success']) {
                    alert('Data Saved Successfully');
                } else {
                    alert(`Error(${data['msg']}) in saving data, you have been logged out`);
                }
                localStorage.removeItem('token');
                localStorage.removeItem('loan-form');
            })
            .catch(err => {console.log('err', JSON.stringify(err));localStorage.removeItem('token');});
        } else {
            fetch(`${process.env.REACT_APP_PRODUCTION_API}/getloan`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({'data': loanFormValues, 'status': 0})
            })
            .then(res => res.json())
            .then(data => {
                if (data['success']) {
                    alert('Data Saved Successfully');
                } else {
                    alert(`Error(${data['msg']}) in saving data, you have been logged out`);
                }
                localStorage.removeItem('token');
                localStorage.removeItem('loan-form');
            })
            .catch(err => {console.log('err', JSON.stringify(err));localStorage.removeItem('token');});
        }
        alert('Saving current form state');
    } else {
        localStorage.removeItem('token');
        localStorage.removeItem('loan-form')
    }
}

export const authenticated = () => {
    const token = localStorage.getItem('token');
    if (token) {
        if((new Date().getTime() / 1000) < parseJwt(token).exp) {
            return true;
        }
    }
    return false;
}


export const getLoanByStatus = (status, handleStateChange) => {
    fetch(`${process.env.REACT_APP_PRODUCTION_API}/loanshow?status=${status}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(res => res.json())
    .then(data => {
        if (data['success']) {
            handleStateChange(status, data['data']);
        } else {
            console.log(JSON.stringify(data['msg']));
        }
    })
    .catch(err => {console.log('err', JSON.stringify(err));});
}
