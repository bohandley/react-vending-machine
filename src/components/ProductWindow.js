import React from 'react';
import Product from './Product';

import utils from "../scripts/utilities";



class ProductWindow extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            keys: ["Cola","Candy","Chips","Carrot","Cheetos","Twizzlers"],
            imgs: [
                
                "./img/candy.png",
                "./img/chips.png",
                "./img/carrot.png",
                "./img/cheetos.png",
                "./img/twizzlers.png"
            ]
        }
    }

    invSort(inventory) {
        // create an array of product names, not repeated
        let srtdInv = {},
            keys = this.state.keys,
            invCopy = utils.copy(inventory);

        for (var i = 0; i < keys.length; i++) {
            let key = keys[i];    
            srtdInv[key] = [];
        }

        invCopy.forEach(p => {
            srtdInv[p.name] = srtdInv[p.name].concat(p);
        });
        
        return srtdInv;
    }

    render() {
        const totalSpace = 12;
        let keys = this.state.keys;
        let imgs = this.state.imgs;
        let sortedInv = this.invSort(this.props.products);

        let fillerCount = totalSpace - this.state.keys.length;

        const products = keys.map((key, i) => {
            let num = sortedInv[key].length > 0 ? sortedInv[key].length : 
                "Sold Out";
            
            return (
                <div class="col-4">
                <Product
                    class="prod"
                    text={key}
                    num={num}
                    imgCls={"p" + i}
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