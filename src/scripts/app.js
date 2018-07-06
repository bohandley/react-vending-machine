import React from 'react';
import ReactDOM from 'react-dom';
import VendingMachine from '../containers/VendingMachine';
import SayHello from './SayHello';

ReactDOM.render(<VendingMachine name="Insert Coin" />,
    document.getElementById("app"));