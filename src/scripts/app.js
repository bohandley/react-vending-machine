import React from 'react';
import ReactDOM from 'react-dom';
import VendingMachine from '../containers/VendingMachine';
import SayHello from './SayHello';

let prep = {
    name: "Insert Coin",
    job:  "Fire Hose"
};

ReactDOM.render(<VendingMachine prep />,
    document.getElementById("app"));