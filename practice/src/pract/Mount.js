import React from "react";

class mount extends React.Component {
    constructor() {
        super();
        this.state = {
            count: 0
        }
          }
          
    componentDidUpdate() {
        console.warn("ComponentDidUpdate",this.state.count)
    }
    shouldComponentUpdate(){
        if(this.state.count>3){
            console.warn("shouldComponentUpdate",this.state.count)
        return true;
        }else{
            return false;
        }
        
    }
    // componentDidMount() {
    //     console.warn("Component did mount")
    // }

    render() {
        console.warn("Render")
        return (
            <div>
                <h3>componentDidMount {this.setState.count}</h3>
                <button onClick={() => this.setState({ count: this.state.count+1 })}>Update Name</button>
            </div>

        );
    }
}
export default mount;