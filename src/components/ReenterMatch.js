import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

class ReenterMatch extends Component{
    constructor(props){
        super(props);
        this.state = {
            redirectBack:false
        }
    }

    makeRedirectBackTrue(){
        this.setState({
            redirectBack:true
        })
    }

    renderRedirectBack(){
        if (this.state.redirectBack){
            return <Redirect to={`/setupplaymatch`}/>
        }
    }

    render(){
        return(
            <div>
                {this.renderRedirectBack()}
                <h4>this is Reenter Match</h4>
            <h4><button onClick={()=>this.makeRedirectBackTrue()}>Back</button></h4>
            </div>
        )
    }
}

export default ReenterMatch;