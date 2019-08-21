import React from 'react';

class ObjReturn extends React.Component {
    deliverProduct() {
        this.props.onTake();
    }

    render() {
        return (
            <div class={this.props.class}>
                <div>
                    {this.props.display} 
                </div>
                <div class="pr-button">
                    <button 
                        type="button" 
                        onClick={() => this.deliverProduct()}
                    >Take Coins{this.props.name}</button>
                </div>
            </div>
        )          
    }
}

export default ObjReturn;