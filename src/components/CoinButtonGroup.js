import React from "react";
import CoinButton from "./CoinButton";

class CoinButtonGroup extends React.Component {
    render() {
        const coins = this.props.coins.map(coin => {
            return (
                <CoinButton
                    name={coin.name}
                    coin={coin}
                    onInsert={this.props.onInsert}
                />
            );
        });

        return (
            <div>
                {coins}
            </div>
        )
    }
}

export default CoinButtonGroup;