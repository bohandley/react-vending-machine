import React from 'react';

class VendingMachine extends React.Component {
    constructor(){
        super();
        this.state = {

        };
    };

    render(){
        return (
            <div>{this.props.name}</div>
        )
    }
}

export default VendingMachine;
