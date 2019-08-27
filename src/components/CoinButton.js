import React from 'react';

class CoinButton extends React.Component {
    select(obj) {
        this.props.onChoose(obj);
    }
    
    render() {
        let cls = this.props.name.includes("\u00A2") ? "coin-button" : "prod-button";
        return (
            <div className={this.props.class}>
                
                <button 
                    type="button"
                    class={cls}
                    onClick={() => this.select(this.props.obj)}
                >{this.props.name}
                </button>
                
            </div>
        );
    }
}

export default CoinButton;