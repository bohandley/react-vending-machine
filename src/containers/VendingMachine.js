import React from "react";

import ObjButtonGroup from "../components/ObjButtonGroup";
import ObjButton from "../components/ObjButton";
import ObjReturn from "../components/ObjReturn";
import ProductWindow from "../components/ProductWindow";

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
            image: "https://dallasnews.imgix.net/1467383389-liberty.png?w=724&h=500&auto=format&q=60&fit=clip",
            totalCoins: totalCoins,
            insertedCoins: [],
            currentAmount: 0,
            coinReturn: [],
            productReturn: [],
            inventory: inventory,
            display: "Deposit Coins",
            selections: stock.selections,
            coins: stock.coins
        };
    }

    display() {
        let coins = this.state.totalCoins;
        return this.sumCoins(coins) > 100 ? 'Insert Coin' : 'Exact Change';
    }

    sumCoins() {
        return this.state.totalCoins.reduce((acc, coin) => acc + coin.value, 0);
    }

    formatMoney(coins) {
        let money = "" + this.sumCoins(coins);
        
        return this.addDollarSign(money);
    }

    addDollarSign(money) {
        let l = money.length;

        if (l == 1)
            return "$0.0" + money;
        else if (l == 2)
            return "$0." + money;
        else if (l >= 3){
            return "$" + money.slice(0, l-2) + "." + money.slice(l-2);
        }
    }

    sumCoins(coins) {
        return coins.reduce((acc, coin) => acc + coin.value, 0);
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

        if ( this.sumCoins(insertedCoins) < product.price )
            return this.setState({display: "Price: " + this.addDollarSign(''+product.price)})

        if ( this.sumCoins(insertedCoins) >= product.price ) {
            pdProd = inv.splice(prodIdx, 1); 
            changeVal = this.sumCoins(insertedCoins) - product.price;
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
            });

        } else if ( this.sumCoins(insertedCoins) < product.price )
            return this.setState({display: "Price: " + product.price})
    }

    resetDisplay() {
        this.setState({display: "Deposit Coin"});
    }

    resetDisplayTimeout() {
        setTimeout(_=> this.resetDisplay(), 2000);
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

        if ( coin.value == 1 ) {
            this.setState({
                coinReturn: this.state.coinReturn.concat([coin])
            })
        } else 
            this.depositCoin(coin);
    }

    identifyValue(coin) {
        coin.value = weightHash[coin.weight];
        return coin;
    }

    updateCurrentAmount() {
        let coins = this.state.insertedCoins;
        this.setState({
            currentAmount: this.sumCoins(coins)
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
            <div class="row">
                <div class="col-lg-9 col-md-10 col-sm-11" id="vending-machine">
                    <div class="row">
                        <div class="col-lg-8 col-md-7 col-sm-7">
                            <div class="products">
                                <ProductWindow
                                    class="product-window row no-pad" 
                                    products={this.state.inventory}
                                    text="window"
                                />
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-5 col-sm-5">
                            <div class="interface">
                                <div class="row">
                                    <div class="center col-8">
                                        <div class ="money row">
                                            <div class="display col-6">
                                                <div class="message">{this.state.display}</div>
                                                <div class="amount">{this.formatMoney(this.state.insertedCoins)}</div>
                                            </div>
                                            <ObjButtonGroup
                                                class="insert-coin col-6"
                                                name="Coins"
                                                question=""
                                                objects={this.state.coins}
                                                onChoose={(coin) => this.insertCoin(coin)}
                                                onReturn={_=>this.returnCoin()}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <ObjButtonGroup
                                        class="product-selection col-8"
                                        name="Product"
                                        question="Which product will you choose?"
                                        objects={this.state.selections}
                                        onChoose={(product) => {
                                            this.chooseProduct(product);
                                            this.resetDisplayTimeout();
                                        }}
                                    />
                                </div>
                                <div class="row">
                                    <div class="admin col-8">

                                    <div class="row">
                                        <div class="coin-return col-6">
                                            <ObjReturn
                                                name=""
                                                display={this.formatMoney(this.state.coinReturn)}
                                                onTake={() => this.takeCoins()}
                                            />     
                                        </div>
                                        <div class="col-6">
                                            Admin
                                            <div>
                                                <button 
                                                    type="button" 
                                                    onClick={() => this.loadCoins()}
                                                >+Coins</button>
                                            </div>
                                            <div>
                                                <button 
                                                    type="button" 
                                                    onClick={() => this.restockProducts()}
                                                >+Products</button>
                                            </div>

                                        </div>
                                    </div>

                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <ObjReturn
                            class="col-lg-8 col-md-7 col-sm-7 product-return"
                            name="Product" 
                            display={this.displayProductReturn()}
                            onTake={() => this.takeProduct()}
                        />
                    </div>          
                </div>
            </div>
        );
    }
}

export default VendingMachine;

