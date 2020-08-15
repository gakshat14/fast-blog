import React from 'react';

interface IProps {
    errorMessage: string;
}

export function Error({errorMessage}: IProps) {
return(<p>{errorMessage}</p>);
}