import React from "react";

import ObjButtonGroup from "../components/ObjButtonGroup";
import ObjButton from "../components/ObjButton";
import ObjReturn from "../components/ObjReturn";

import { Coin } from "../scripts/coin";
import { Product } from "../scripts/product";

import utils from "../scripts/utilities";
import stock from "../scripts/stock";

const weightHash = {
    772: 25,
    415: 10,
    630: 5,
    554: 1
};

let inventory = utils.copy(stock.inventory);
let totalCoins = utils.copy(stock.totalCoins);

class VendingMachine extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            totalCoins: totalCoins,
            insertedCoins: [],
            currentAmount: 0,
            coinReturn: [],
            productReturn: [],
            inventory: inventory,
            display: "Have a Snack!",
            selections: stock.selections,
            coins: stock.coins
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
                if ( cnIdx == -1 )
                    return 

                rtndCoins.push(totalCoins.splice(cnIdx, 1)[0]);
                change = change - val
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
            totalCoins: this.state.totalCoins.concat(stock.totalCoins)
        });
    }

    restockProducts() {
        this.setState({
            display: this.display(),
            inventory: this.state.inventory.concat(stock.inventory)
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

    returnCoin() {
        let coins = this.state.insertedCoins;
        this.setState({
            insertedCoins: [],
            coinReturn: this.state.coinReturn.concat(coins)
        })
    }

    render(){
        return (
            <div id="vending-machine">
                
                <div>
                    <div class="products">
                    </div>
                    <div class="interface">
                        <div class="display">
                            <div class="message">{this.state.display}</div>
                            <div class="amount">{this.currentAmount()}</div>
                        </div>
                        <ObjButtonGroup
                            class="product-selection"
                            name="Product"
                            question="Which product will you choose?"
                            objects={this.state.selections}
                            onChoose={(product) => this.chooseProduct(product)}
                        />
                        <div class="insert-coin">
                            <ObjButtonGroup
                                class="coins"
                                name="Coins"
                                question="Insert Coin"
                                objects={this.state.coins}
                                onChoose={(coin) => this.insertCoin(coin)}
                            />
                            <button 
                                type="button"
                                onClick={()=> this.returnCoin()}
                            >
                                Coin Return
                            </button>
                        </div>
                        <div class="coin-return">
                            <ObjReturn
                                name=""
                                display={this.displayCoinReturn()}
                                onTake={() => this.takeCoins()}
                            />     
                        </div>
                        <div class="admin">
                            Administrative Buttons
                            <div>
                                <button 
                                    type="button" 
                                    onClick={() => this.loadCoins()}
                                >Load Coins</button>
                            </div>
                            <div>
                                <button 
                                    type="button" 
                                    onClick={() => this.restockProducts()}
                                >Restock Products</button>
                            </div>
                        </div>
                    </div>
                </div>   
                <ObjReturn
                    class="product-return"
                    name="Product" 
                    display={this.displayProductReturn()}
                    onTake={() => this.takeProduct()}
                />             
            </div>
        );
    }
}

export default VendingMachine;

