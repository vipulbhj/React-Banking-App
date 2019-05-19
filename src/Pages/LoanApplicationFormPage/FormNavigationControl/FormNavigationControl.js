import React from 'react';
import './FormNavigationControl.css';

const FormNavigationControl = (
    {
        fTitle, 
        fClass="", 
        bTitle, 
        bClass="", 
        fToggleFormView=() => {}, 
        bToggleFormView=() => {}
    }) => {
    return (
        <div className="fnc">
            <button type="button" className={`button is-medium ${bClass}`} onClick={bToggleFormView}>
                <span className="icon">
                    <i className="fas fa-arrow-left"></i>
                </span>
                <span>{bTitle}</span>
            </button>
            <button type="button" className={`button is-medium ${fClass}`} onClick={fToggleFormView}>
                <span className="icon">
                    <i className="fas fa-arrow-right"></i>
                </span>
                <span>{fTitle}</span>
            </button>
        </div>
    )
}

export default FormNavigationControl;