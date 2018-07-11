import React from "react";

import { Coin } from "../scripts/coin";
import { Product } from "../scripts/product";
// import { Machine } from "../scripts/machine";

import utils from "../scripts/utilities";

var cola  = new Product({name: "Cola", price: 100});
var chips = new Product({name: "Chips", price: 50});
var candy = new Product({name: "Candy", price: 65});
var cheetos = new Product({name: "Cheetos", price: 50});
var twizzlers = new Product({name: "Twizzlers", price: 75});

var nickel  = new Coin({name: "nickel", value: 5});
var dime    = new Coin({name: "dime", value: 10});
var quarter = new Coin({name: "quarter", value: 25});
var penny   = new Coin({name: "penny", value: 1});

let inventory = [
        utils.copy(cola),
        utils.copy(cola),
        utils.copy(chips),
        utils.copy(chips),
        utils.copy(candy),
        utils.copy(candy),
        utils.copy(cheetos)
];

let coins = [
    utils.copy(nickel),
    utils.copy(nickel),
    utils.copy(nickel),
    utils.copy(dime),
    utils.copy(dime),
    utils.copy(dime),
    utils.copy(quarter),
    utils.copy(quarter),
    utils.copy(quarter)
];

class VendingMachine extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            totalCoins: coins,
            insertedCoins: [],
            currentAmount: 0,
            coinReturn: [],
            productReturn: [],
            inventory: inventory,
            weightHash: {
                772: 25,
                415: 10,
                630: 5,
                554: 1
            }
        };
    }

    display() {
        // console.log(this.sumCoins())
        return this.sumCoins() > 100 ? 'Insert Coin' : 'Exact Change'
    }

    currentAmount() {
        // console.log(this.state.insertedCoins)
        return this.sumInsertedCoins()
    }

    sumInsertedCoins() {
        return this.state.insertedCoins.reduce((acc, coin) => acc + coin.value, 0);
    }

    sumCoins() {
        return this.state.totalCoins.reduce((acc, coin) => acc + coin.value, 0)
    }

    chooseProduct(product) {
        console.log(product)
        // this.state.selectProduct(prod)
        this.setState({display: "You got " + product.name + "!"})
    }

    insertCoin(coin) {
        coin = this.identifyValue(coin);

        if ( coin.value == 1 )
            this.returnCoin(coin);
        else 
            this.depositCoin(coin);
    }

    identifyValue(coin) {
        coin.value = this.state.weightHash[coin.weight];
        return coin;
    }

    updateCurrentAmount() {
        this.setState({currentAmount: this.sumInsertedCoins()})
    }

    returnCoin(coin) {
        this.setState({coinReturn: this.state.coinReturn.concat([coin])})   
    }

    depositCoin(coin) {
        this.setState({insertedCoins: this.state.insertedCoins.concat([coin])})
    }

    machineDisplay() {
        return this.state.display;
    }

    render(){
        return (
            <div>
                <div>{this.display()}</div>
                <div>{this.currentAmount()}</div>
                <div>
                    <button 
                        type="button" 
                        onClick={() => this.chooseProduct(cola)}
                    >Cola</button>
                    <button 
                        type="button" 
                        onClick={() => this.chooseProduct(cheetos)}
                    >Cheetos</button>
                    <button 
                        type="button" 
                        onClick={() => this.chooseProduct(twizzlers)}
                    >Twizzlers</button>
                </div>
                    <button 
                        type="button" 
                        onClick={() => this.insertCoin(nickel)}
                    >Nickel</button>
                    <button 
                        type="button" 
                        onClick={() => this.insertCoin(dime)}
                    >Dime</button>
                    <button 
                        type="button" 
                        onClick={() => this.insertCoin(quarter)}
                    >Quarter</button>
                    <button 
                        type="button" 
                        onClick={() => this.insertCoin(penny)}
                    >Penny</button>
                <div>

                </div>    
            </div>
        );
    }
}

export default VendingMachine;
