import React from 'react';

class Product extends React.Component {


    render() {

        return(
            <div class={this.props.class}>
                <div>{this.props.text}</div>
                <div>{this.props.num}</div>
            </div>
        )
    }
}

export default Product;
