import React from "react";
import ProductButtonGroup from "../components/ProductButtonGroup";
import CoinButtonGroup from "../components/CoinButtonGroup";

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
            inventory: inventory,
            display: "Have a Snack!",
            selections: [
                cola,
                chips,
                candy,
                cheetos,
                twizzlers
            ],
            coins: [
                penny, 
                nickel, 
                dime, 
                quarter
            ]
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
        let inv = this.state.inventory,
            prodIdx = this.findProdIdx(product),
            insertedCoins = this.state.insertedCoins,
            pdProd, 
            changeVal, 
            change, 
            totalCoins;

        if ( prodIdx == -1 )
            return this.setState({display: "Sold Out"})

        if ( this.sumInsertedCoins() < product.price )
            return this.setState({display: "Price: " + product.price})

        if ( this.sumInsertedCoins() >= product.price ) {
            pdProd = inv.splice(prodIdx, 1); 
            changeVal = this.sumInsertedCoins() - product.price;
            totalCoins = this.state.totalCoins;
            change = this.makeChange(changeVal, totalCoins);
            totalCoins = change[1];
            change = change[0];
            console.log(totalCoins.concat(insertedCoins))
            return this.setState({
                display: "Thank You",
                insertedCoins: [],
                coinReturn: this.state.coinReturn.concat(change),
                productReturn: this.state.productReturn.concat(pdProd),
                inventory: inv,
                totalCoins: totalCoins.concat(insertedCoins)
            })
        } else if ( this.sumInsertedCoins() < product.price )
            return this.setState({display: "Price: " + product.price})
    }

    makeChange(change, totalCoins) {
        let coinVals = [25,10,5],
            rtndCoins = [],
            cnIdx;

        coinVals.forEach(val => {
            let times = Math.floor(change / val);
            if ( times == 0 )
                return;

            for (var i = 0; i < times; i++) {
                cnIdx = totalCoins.findIndex(coin => coin.value == val)
                
                if ( cnIdx >= 0 ) {
                    rtndCoins.push(totalCoins.splice(cnIdx, 1)[0]);
                    change = change - val
                } else
                    return;
            }
        })
        return [rtndCoins, totalCoins];
    }

    productInStock(product) {
        let inStock = this.findProdIdx(product) >= 0 ? true : false;

        if ( inStock )
            return true;
        else if ( !inStock )
            return false;
    }

    deliverProduct(i) {
        let inv = this.state.inventory;
        let pdProd = inv.splice(i, 1);
        console.log(inv)
        console.log(pdProd)
        this.setState({
            inventory: inv, 
            productReturn: this.state.productReturn.concat([pdProd])
        });
    }

    findProdIdx(product) {
        let inventory = this.state.inventory;
        let idx = inventory.findIndex(prod => prod.name == product.name);
        return idx;
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
        this.setState({
            currentAmount: this.sumInsertedCoins()
        });
    }

    returnCoin(coin) {
        this.setState({
            coinReturn: this.state.coinReturn.concat([coin])
        });
    }

    depositCoin(coin) {
        this.setState({
            insertedCoins: this.state.insertedCoins.concat([coin])
        });
    }

    loadCoins() {
        this.setState({
            totalCoins: this.state.totalCoins.concat(coins)
        });
    }

    displayCoinReturn() {
        return this.state.coinReturn.map(coin => coin.name).join(', ');
    }

    displayProductReturn() {
        return this.state.productReturn.map(prod => prod.name).join(', ');
    }

    takeCoins() {
        this.setState({
            coinReturn: []
        });
    }

    takeProduct() {
        this.setState({
            productReturn: []
        });
    }

    render(){
        return (
            <div>
                <div>{this.state.display}</div>
                <div>{this.currentAmount()}</div>
                <ProductButtonGroup
                    products={this.state.selections}
                    onChoose={(product) => this.chooseProduct(product)}
                />
                <CoinButtonGroup
                    coins={this.state.coins}
                    onInsert={(coin) => this.insertCoin(coin)}
                />   
                <div>
                    <button 
                        type="button" 
                        onClick={() => this.loadCoins()}
                    >Load Coins</button>
                </div>
                <div>
                    Coin Return: {this.displayCoinReturn()}
                    {/* add button to remove coins in coin return */}
                </div>
                <div>
                    <button 
                        type="button" 
                        onClick={() => this.takeCoins()}
                    >Take Coins</button>
                </div>
                <div>
                    Product Return: {this.displayProductReturn()}
                    {/* add button to remove coins in coin return */}
                </div>
                <div>
                    <button 
                        type="button" 
                        onClick={() => this.takeProduct()}
                    >Take Product</button>
                </div>  
            </div>
        );
    }
}

export default VendingMachine;

// <div>              
//     <button 
//         type="button" 
//         onClick={() => this.chooseProduct(cola)}
//     >Cola</button>
//     <button 
//         type="button" 
//         onClick={() => this.chooseProduct(cheetos)}
//     >Cheetos</button>
//     <button 
//         type="button" 
//         onClick={() => this.chooseProduct(twizzlers)}
//     >Twizzlers</button>
// </div>

// <button 
//     type="button" 
//     onClick={() => this.insertCoin(nickel)}
// >Nickel</button>
// <button 
//     type="button" 
//     onClick={() => this.insertCoin(dime)}
// >Dime</button>
// <button 
//     type="button" 
//     onClick={() => this.insertCoin(quarter)}
// >Quarter</button>
// <button 
//     type="button" 
//     onClick={() => this.insertCoin(penny)}
// >Penny</button>
