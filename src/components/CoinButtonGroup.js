import React from "react";
import CoinButton from "./CoinButton";

class CoinButtonGroup extends React.Component {
    render() {
        const vls = {
            "dime": 10,
            "penny": 1,
            "nickel": 5,
            "quarter": 25,
        };

        let cls = this.props.class;

        // how to pull out the logic for one object, one button
        // where a product needs a combo of buttons
        const objects = this.props.objects.map(object => {
            let name = cls == "insert-coin col-7" ? vls[object.name] + "\u00A2" : object.name;

            return (
                <CoinButton
                    class="col-6"
                    name={name}
                    obj={object}
                    onChoose={this.props.onChoose}
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

export default CoinButtonGroup;
