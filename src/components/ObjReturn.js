import React from 'react';

class ObjReturn extends React.Component {
    deliverProduct() {
        this.props.onTake();
    }

    render() {
        return (
            <div class={this.props.class}>
                <div class="pr-header">
                    {this.props.name} Return: 
                    <div>
                        {this.props.display} 
                    </div>
                </div>
                <div class="pr-button">
                    <button 
                        type="button" 
                        onClick={() => this.deliverProduct()}
                    >Take {this.props.name}</button>
                </div>
            </div>
        )          
    }
}

export default ObjReturn;