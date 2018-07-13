import React from "react";

class CoinButton extends React.Component {
    insert(coin) {
        this.props.onInsert(coin);
    }

    render() {
        return (
            <div>
                <button 
                    type="button"
                    onClick={() => this.insert(this.props.coin)}
                >{this.props.name}
                </button>
            </div>
        );
    }
}

export default CoinButton;