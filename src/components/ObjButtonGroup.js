import React from "react";
import ObjButton from "./ObjButton";

class ObjButtonGroup extends React.Component {
    render() {
        const vls = {
            "dime": 10,
            "penny": 1,
            "nickel": 5,
            "quarter": 25,
        };

        let cls = this.props.class;

        const objects = this.props.objects.map(object => {
            let name = cls == "insert-coin col-7" ? vls[object.name] + "\u00A2" : object.name;

            return (
                <ObjButton
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

export default ObjButtonGroup;