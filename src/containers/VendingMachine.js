import React from 'react';

import { Coin } from '../scripts/coin';
import { Product } from '../scripts/product';
import { Machine } from '../scripts/machine';

import utils from '../scripts/utilities';

var cola  = new Product({name: 'Cola', price: 100});
var chips = new Product({name: 'Chips', price: 50});
var candy = new Product({name: 'Candy', price: 65});

var nickel  = new Coin({name: 'nickel'});
var dime    = new Coin({name: 'dime'});
var quarter = new Coin({name: 'quarter'});
var penny   = new Coin({name: 'penny'});
let machine = new Machine({
    totalCoins: [
        utils.copy(nickel),
        utils.copy(nickel),
        utils.copy(nickel),
        utils.copy(dime),
        utils.copy(dime),
        utils.copy(dime),
        utils.copy(quarter),
        utils.copy(quarter),
        utils.copy(quarter)
    ],
    inventory: [
        utils.copy(cola),
        utils.copy(cola),
        utils.copy(chips),
        utils.copy(chips),
        utils.copy(candy),
        utils.copy(candy),
    ]
});
// import VendingMachine from '../scripts/machine';

class VendingMachine extends React.Component {
    constructor(props){
        super(props);
        this.state = machine;
        // {
        //     game: props.name,
        //     fame: props.job
        //     // this.display = vendingMachine.display;
        //     // this.currentAmount = vendingMachine.currentAmount;
        // };
    };

    render(){
        return (
            <div>{this.state.display}</div>
        )
    }
}

export default VendingMachine;
