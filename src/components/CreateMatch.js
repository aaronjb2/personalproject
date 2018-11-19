import React, { Component } from 'react';
import axios from 'axios';

class CreateMatch extends Component {
    constructor(props){
        super(props);
        this.state = {
          redirect:false,
          desiredName:''
        }
      }

    //   renderRedirect(){
    //     if (this.state.redirect){
    //       return <Redirect to={`/openingmenu`}/>
    //     }
    //   }
    handleDesiredNameChange(e){
        this.setState({
            desiredName:e.target.value
        })
    }

    createMatch(){
        console.log('entered function')
        axios.post('/api/creatematch',{matchName:this.state.desiredName}).then(res=>{
            if (res.data.message === 'successfullyCreated'){
                return(<div>
                    <h4>The game was successfully created</h4>
                    <h4><button>Proceed To Host Game</button></h4>
                </div>)
            }else{
                alert(res.data.message);
            }
        })
    }

render(){
    return(
        <div>
            <h3>Welcome to CreateMatch</h3>
            <h3>Name of Match to be Created:<input value={this.state.desiredName} onChange={e=>this.handleDesiredNameChange(e)}/><button onClick={()=>this.createMatch()}>Create Game</button></h3>
            </div>
    )
}
}

export default CreateMatch;