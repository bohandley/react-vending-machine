import React from "react";
import ProductButton from "./ProductButton";

class ProductButtonGroup extends React.Component {
    render() {
        const products = this.props.products.map(product => {

            return (
                <ProductButton
                    name={product.name}
                    product={product}
                    onChoose={this.props.onChoose}
                />
            );
        });

        return (
            <div>
                {products}
            </div>
        );
    }
}

export default ProductButtonGroup;