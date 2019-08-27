import React from "react";
import ProdButton from "./ProdButton";

class ProdButtonGroup extends React.Component {
    constructor(props){
        super();
        this.state = {
            code: '',
            buttons: ['A','1','4','B','2','5','C','3','6']
        };
    }

    codeSelect(code){
        code = this.state.code + code;

        if(code.length < 2)
            this.setState({code: code});
        else if(code.length == 2){
            let objects = this.props.objects;

            let chosen = objects.find(prod => prod.code == code);
            
            this.props.onChoose(chosen);
            
            this.setState({code: ''});
        }  
    }
    render() {
        const objects = this.state.buttons.map(object => {
            return (
                <ProdButton
                    class="col-4"
                    name={object}
                    obj={object}
                    onChoose={(code)=>this.codeSelect(code)}
                />
            );
        });

        return (
            <div class={this.props.class}>
                {this.props.question}
                <div class="row no-pad">
                    {objects}
                </div>
            </div>
        );
    }
}

export default ProdButtonGroup;
