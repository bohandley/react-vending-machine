import React from 'react';
import Product from './Product';

import utils from "../scripts/utilities";



class ProductWindow extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            keys: [
                "Cola",
                "Candy",
                "Chips",
                "Carrot",
                "Cheetos",
                "Twizzlers"
            ],
            imgs: [
                "./img/candy.png",
                "./img/chips.png",
                "./img/carrot.png",
                "./img/cheetos.png",
                "./img/twizzlers.png"
            ],
            prices: [
                "$1.00",
                "$0.65",
                "$0.50",
                "$0.15",
                "$0.50",
                "$0.75"
            ]

        }
    }

    invSort(inventory) {
        // create an array of product names, not repeated
        let srtdInv = {},
            keys = this.state.keys,
            prices = this.state.prices,
            invCopy = utils.copy(inventory);

        for (var i = 0; i < keys.length; i++) {
            let key = keys[i];
            let price = prices[i];    
            srtdInv[key] = {prods: [], price: price};
        }

        invCopy.forEach(p => {
            srtdInv[p.name].prods.push(p);
        });

        return srtdInv;
    }

    render() {
        
        const totalSpace = 12;
        let keys = this.state.keys;
        // let imgs = this.state.imgs;
        let sortedInv = this.invSort(this.props.products);

        let fillerCount = totalSpace - this.state.keys.length;

        const products = keys.map((key, i) => {
            let num = sortedInv[key].prods.length > 0 ? sortedInv[key].prods.length : 
                "Sold Out";
            
            let price = sortedInv[key].price;

            return (
                <div class="col-4">
                    <Product
                        class="prod"
                        text={key}
                        num={"("+num+")"}
                        imgCls={"p" + i}
                        price={price}
                    />
                </div>
            );
        });

        let filler = [];

        while (fillerCount != 0){
            filler.push((
                <div class="col-4">
                <Product
                    class="prod"
                    text="Out of stock"
                    price="$0.00"
                />
                </div>
            ));

            fillerCount = fillerCount - 1;
        }

        const prodSpace = products.concat(filler);

        return (
            <div class={this.props.class}>
                {prodSpace}
            </div>
        )
    }
}

export default ProductWindow;