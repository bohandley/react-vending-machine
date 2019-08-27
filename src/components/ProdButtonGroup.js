import React from "react";
import ProdButton from "./ProdButton";

class ProdButtonGroup extends React.Component {
    constructor(props){
        super();
        this.state = {
            selection: '',
            code: '',
            buttons: ['A','1','4','B','2','5','C','3','6']
        };
    }

    codeSelect(code){
        code = this.state.code + code;
    
        if(code.length < 2){
            this.setState({selection: code});
            this.setState({code: code});
        } else if(code.length == 2){
            let objects = this.props.objects;

            let chosen = objects.find(prod => prod.code == code);
            
            if(chosen != null){
                this.props.onChoose(chosen);
                this.setState({selection: code});

                setTimeout(_=> {
                    this.clearSelection();
                    this.clearCode();
                },1000);
            } else {
                this.stars();
                
                setTimeout(_=> {
                    this.clearSelection();
                    this.clearCode();
                },1000);
            }
            
        }  
    }

    stars(){
        this.setState({selection: "**"})
    }

    clearCode(){
        this.setState({code: ''});
    }

    clearSelection(){
        this.setState({selection: ''})
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
                <div class="row no-pad">
                    <div class="col-6">
                        {this.props.question}
                    </div>
                    <div class="choice col-1">
                        {this.state.selection}
                    </div>
                </div>
                
                <div class="row no-pad">
                    {objects}
                </div>
            </div>
        );
    }
}

export default ProdButtonGroup;
