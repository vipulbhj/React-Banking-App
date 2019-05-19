import { toast } from 'react-toastify';
import { parseJwt } from './utils';

export const backendUrl = () => {
    if(process.env.NODE_ENV === 'production') return process.env.REACT_APP_PRODUCTION_API;
    return process.env.REACT_APP_DEVELOPMENT_API;
} 

export const login = (values, setSubmitting, nav) => {
    fetch(`${backendUrl()}/login`, {
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
            localStorage.setItem('user_id', data['user_id'])
            nav.push('/home');
            toast.success('Login Successful');
        } else {
            toast.error(`Error: ${data.msg}`, {
                position: toast.POSITION.BOTTOM_CENTER
            });            
        }
        setSubmitting(false)
    })
    .catch(err => {
        toast('Something went wrong, Internet might be down'); 
        setSubmitting(false) 
    });
}

export const logout = () => {
    let loanFormValues = localStorage.getItem('loan-form');
    if (loanFormValues) {
        let formId = localStorage.getItem('loan-form-id');
        if(formId) {
            fetch(`${backendUrl()}/updateloan`, {
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
                    toast.info('Data Saved Successfully', {
                        position: toast.POSITION.BOTTOM_CENTER
                    }); 
                } else {
                    toast.info(`Error(${data['msg']}) in saving data, you have been logged out`, {
                        position: toast.POSITION.BOTTOM_CENTER
                    });
                }
                localStorage.removeItem('token');
                localStorage.removeItem('loan-form');
            })
            .catch(err => {
                toast('Something went wrong, Internet might be down'); 
                localStorage.removeItem('token');
            });
        } else {
            fetch(`${backendUrl()}/getloan`, {
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
                    toast.info('Data Saved Successfully', {
                        position: toast.POSITION.BOTTOM_CENTER
                    });
                } else {
                    toast.error(`Error(${data['msg']}) in saving data, you have been logged out`);
                }
                localStorage.removeItem('token');
                localStorage.removeItem('loan-form');
            })
            .catch(err => {
                toast('Something went wrong, Internet might be down'); 
                localStorage.removeItem('token');
            });
        }
        toast.info('Saving current form state', {
            position: toast.POSITION.BOTTOM_CENTER
        });
    } else {
        localStorage.removeItem('token');
        localStorage.removeItem('loan-form')
        toast.info('successfully logged out', {
            position: toast.POSITION.BOTTOM_CENTER
        });
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
    fetch(`${backendUrl()}/loanshow?status=${status}`, {
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
            toast.info(JSON.stringify(data['msg']), {
                position: toast.POSITION.BOTTOM_CENTER
            });
        }
    })
    .catch(err => {
        toast.info(`Error ${JSON.stringify(err)} in saving data, you have been logged out`, {
            position: toast.POSITION.BOTTOM_CENTER
        });
    })
}
