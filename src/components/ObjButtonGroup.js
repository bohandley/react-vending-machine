import React from "react";
import ObjButton from "./ObjButton";

class ObjButtonGroup extends React.Component {
    render() {
        const objects = this.props.objects.map(object => {

            return (
                <ObjButton
                    class={object.name}
                    name={object.name}
                    obj={object}
                    onChoose={this.props.onChoose}
                />
            );
        });

        return (
            <div class={this.props.class} >
                {this.props.question}
                {objects}
            </div>
        );
    }
}

export default ObjButtonGroup;