import React from 'react';
import Product from './Product';

class ProductWindow extends React.Component {


    render() {

        const products = this.props.products.map((prod, i) => {
            return (
                <Product
                    class="prod"
                    text={prod.name}
                />
            );
        });

        return (
            <div class={this.props.class}>
                {products}
            </div>
        )
    }
}

export default ProductWindow;