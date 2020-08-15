import React from 'react';

export function Spinner() {
    return(
        <div className="spinner-wrapper">
            <i className= "fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
            <span className="sr-only">Loading...</span>
        </div>
    );
}