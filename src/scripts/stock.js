import { Coin } from "./coin";
import { Product } from "./product";

import utils from "./utilities";

const weightHash = {
    772: 25,
    415: 10,
    630: 5,
    554: 1
};

let cola  = new Product({name: "Cola", price: 100}),
    chips = new Product({name: "Chips", price: 50}),
    candy = new Product({name: "Candy", price: 65}),
    cheetos = new Product({name: "Cheetos", price: 50}),
    twizzlers = new Product({name: "Twizzlers", price: 75}),
    carrot = new Product({name: "Carrot", price: 15});;

let nickel  = new Coin({name: "nickel"}), // size and weight set upon coin init
    dime    = new Coin({name: "dime"}),
    quarter = new Coin({name: "quarter"}),
    penny   = new Coin({name: "penny"});

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

const stock = {
    inventory: [
        utils.copy(cola),
        utils.copy(cola),
        utils.copy(chips),
        utils.copy(chips),
        utils.copy(candy),
        utils.copy(candy),
        utils.copy(cheetos),
        utils.copy(cheetos),
        utils.copy(twizzlers),
        utils.copy(twizzlers),
        utils.copy(carrot),
        utils.copy(carrot),
        
    ],
    selections: [
        utils.copy(cola),
        utils.copy(chips),
        utils.copy(candy),
        utils.copy(cheetos),
        utils.copy(twizzlers),
        utils.copy(carrot),
    ],
    coins: [
        utils.copy(nickel),
        utils.copy(dime),
        utils.copy(quarter),
        utils.copy(penny),
    ],
    totalCoins: coins
};

export default stock;
