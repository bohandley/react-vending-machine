import React from 'react';

class Product extends React.Component {


    render() {
        return(
            <div class={this.props.class}>
                <div class="prod-wrapper">
                    <div>
                        {this.props.text}<br/>{this.props.price}
                    </div>
                    <div>
                        <img class="prod-img" src="https://vending-machine-bjo.s3.us-east-2.amazonaws.com/products/twizzlers.png"/>
                    </div>
                    <div>
                        Qty. {this.props.num}
                    </div>
                    <div>
                        {this.props.code}
                    </div>
                </div>
            </div>
        )
    }
}

export default Product;
