import React from "react";
import ObjButton from "./ObjButton";

class ObjButtonGroup extends React.Component {
    render() {
        const objects = this.props.objects.map(object => {

            return (
                <ObjButton
                    class="col-6"
                    name={object.name}
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