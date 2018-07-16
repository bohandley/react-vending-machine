import React from "react";
import ObjButton from "./ObjButton";

class ObjButtonGroup extends React.Component {
    render() {
        const objects = this.props.objects.map(object => {

            return (
                <ObjButton
                    class={this.props.name}
                    name={object.name}
                    obj={object}
                    onChoose={this.props.onChoose}
                />
            );
        });

        return (
            <div>
                {this.props.question}
                {objects}
            </div>
        );
    }
}

export default ObjButtonGroup;