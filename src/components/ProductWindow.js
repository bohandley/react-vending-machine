import React from 'react';
import Product from './Product';

class ProductWindow extends React.Component {


    render() {

        const products = this.props.products.map((prod, i) => {
            let cls = prod.name + i
            return (
                <Product
                    class={cls}
                    text={prod.name}
                />
            );
        });

        return (
            <div>
                {products}
            </div>
        )
    }
}

export default ProductWindow;