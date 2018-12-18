import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

class Host extends Component{
constructor(props){
    super(props);
    this.state={
        room:'',
        redirect:false
    }
}



handleChange(e){
    this.setState({
        room:e.target.value
    })
}

async makeRedirectTrue(){
    await axios.post(`/api/makeit`,{room:this.state.room});
    this.setState({
        redirect: true
    })
}

redirect(){
    if (this.state.redirect){
        return <Redirect to={`/awaitplayer/${this.state.room}`}/>
    }
}

render(){
    return(<div>
        <h4>Host</h4>
        {this.redirect()}
        <h4><input value = {this.state.room} onChange={e=>this.handleChange(e)}/><button onClick = {()=>this.makeRedirectTrue()}>Set Room Code</button></h4>
    </div>)
}
}

const mapStateToProps = state => {const {room} = state; return state;};

export default connect(mapStateToProps)(Host);