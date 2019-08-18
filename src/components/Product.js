import React from 'react';
// import Cola from "../img/cola.png";

class Product extends React.Component {


    render() {

        return(
            <div class={this.props.class}>
                <div>
                    {this.props.text}
                </div>
                <div class={this.props.imgCls}>
                   
                </div>
                <div>
                    {this.props.num}
                </div>
                <div>
                    {this.props.price}
                </div>
            </div>
        )
    }
}

export default Product;
