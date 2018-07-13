import React from 'react';

class ProductButton extends React.Component {
    select(product) {
        this.props.onChoose(product);
    }

    render() {
        return (
            <div className="product">
                <button 
                    type="button" 
                    onClick={() => this.select(this.props.product)}
                >{this.props.name}
                </button>
            </div>
        );
    }
}

export default ProductButton;
