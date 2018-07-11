import React from "react";

import { Coin } from "../scripts/coin";
import { Product } from "../scripts/product";
// import { Machine } from "../scripts/machine";

import utils from "../scripts/utilities";

const weightHash = {
    772: 25,
    415: 10,
    630: 5,
    554: 1
};

let cola  = new Product({name: "Cola", price: 100});
let chips = new Product({name: "Chips", price: 50});
let candy = new Product({name: "Candy", price: 65});
let cheetos = new Product({name: "Cheetos", price: 50});
let twizzlers = new Product({name: "Twizzlers", price: 75});

let nickel  = new Coin({name: "nickel"}); // size and weight set upon coin init
let dime    = new Coin({name: "dime"});
let quarter = new Coin({name: "quarter"});
let penny   = new Coin({name: "penny"});

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

coins = coins.map(coin => { // set value for pre loaded coins
    coin.value = weightHash[coin.weight];
    return coin;
})

// x load coins 
// Cola - 1.00
// Chips - 0.50
// Candy - 0.65 If enough coins have been inserted
// Display THANK YOU
// Remove product from inventory
// Dispense product if user inserts less than the cost of the chosen product
// Machine displays 'PRICE: (cost of product)'

class VendingMachine extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            totalCoins: coins,
            insertedCoins: [],
            currentAmount: 0,
            coinReturn: [],
            productReturn: [],
            inventory: inventory
        };
    }

    display() {
        return this.sumCoins() > 100 ? 'Insert Coin' : 'Exact Change'

    }

    sumCoins() {
        return this.state.totalCoins.reduce((acc, coin) => acc + coin.value, 0)
    }

    currentAmount() {
        return this.sumInsertedCoins()
    }

    sumInsertedCoins() {
        return this.state.insertedCoins.reduce((acc, coin) => acc + coin.value, 0);
    }
    // reconsider the display...
    chooseProduct(product) {
        console.log(product)
        console.log(this.sumInsertedCoins())
        console.log(this.sumCoins())
        // Display THANK YOU
        // Remove product from inventory
        // Dispense product if user inserts less than the cost of the chosen product
        // Machine displays 'PRICE: (cost of product)'
        if ( this.sumInsertedCoins() > this.sumCoins() ) {
            // remove the first product from inventory 
            // that matches some property of the chosen product
            this.setState({display: "Thank You"})
        } else if ( this.sumInsertedCoins() < this.sumCoins() )
            this.setState({display: "Price: " + product.cost})
    }

    insertCoin(coin) {
        coin = this.identifyValue(coin);

        if ( coin.value == 1 )
            this.returnCoin(coin);
        else 
            this.depositCoin(coin);
    }

    identifyValue(coin) {
        coin.value = weightHash[coin.weight];
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

    loadCoins() {
        this.setState({totalCoins: this.state.totalCoins.concat(coins)})
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
                    <button 
                        type="button" 
                        onClick={() => this.loadCoins()}
                    >Load Coins</button>

                </div>    
            </div>
        );
    }
}

export default VendingMachine;
