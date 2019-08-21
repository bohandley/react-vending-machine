import React from 'react';

class ObjReturn extends React.Component {
    deliverProduct() {
        this.props.onTake();
    }

    render() {
        return (
            <div class={this.props.class}>
                <button 
                    type="button" 
                    onClick={() => this.deliverProduct()}
                >{this.props.display}</button>
            </div>
        )          
    }
}

export default ObjReturn;