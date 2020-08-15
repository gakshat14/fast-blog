import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { GlobalContext } from './context/GlobalContext';
import './css/style.css';

ReactDOM.render(<GlobalContext><App /></GlobalContext>, document.getElementById('root'));

if ((module as any).hot) {
    (module as any).hot.accept();
}
