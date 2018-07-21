import React from 'react';

class Product extends React.Component {


    render() {

        return(
            <div class={this.props.class}>
                {this.props.text}
            </div>
        )
    }
}

export default Product;
