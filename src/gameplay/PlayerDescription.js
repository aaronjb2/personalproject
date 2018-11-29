import React, {Component} from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import {Redirect} from 'react-router-dom';

const socket = io.connect();

class PlayerDescription extends Component{
constructor(props){
    super(props);

    this.state={
        assassin:false,
        morgana:false,
        mordred:false,
        oberon:false,
        merlin:false,
        percival:false,
        minionOfMordred:false,
        loyalServantOfKingArthur:false,
        playerInformation:'',
        identityInformation:'',
        dataArray:[],
        indexOfMerlin:-1,
        indexOfPercival:-1,
        indexOfAssassin:-1,
        indexOfMorgana:-1,
        indexOfMordred:-1,
        indexOfOberon:-1,
        indexOfMinionOfMordred1:-1,
        indexOfMinionOfMordred2:-1,
        indexOfMinionOfMordred3:-1,
        indexOfMinionOfMordred4:-1,
        propose:false,
        vote:false,
        execute:false,
        killmerlin:false
    }
}

    async componentDidMount() {
        socket.emit("join-room", { room: 'myroom' });
        let identities = await axios.get(`/api/getidentities/${this.props.match.params.matchName}`);
        console.log('identities:',identities)
        let players = await axios.get(`/api/getplayers/${this.props.match.params.matchName}`);
        this.setState({
            identityInformation: identities.data[0],
            playerInformation: players.data
        })
        console.log(this.state.identityInformation)
        let dataArray = [{ name: this.state.playerInformation.player1name, hash: this.state.playerInformation.player1hash, image: this.state.playerInformation.player1image, identity: this.state.identityInformation.player1identity, loyalty: this.state.identityInformation.player1loyalty }, { name: this.state.playerInformation.player2name, hash: this.state.playerInformation.player2hash, image: this.state.playerInformation.player2image, identity: this.state.identityInformation.player2identity, loyalty: this.state.identityInformation.player2loyalty }, { name: this.state.playerInformation.player3name, hash: this.state.playerInformation.player3hash, image: this.state.playerInformation.player3image, identity: this.state.identityInformation.player3identity, loyalty: this.state.identityInformation.player3loyalty }, { name: this.state.playerInformation.player4name, hash: this.state.playerInformation.player4hash, image: this.state.playerInformation.player4image, identity: this.state.identityInformation.player4identity, loyalty: this.state.identityInformation.player4loyalty }, { name: this.state.playerInformation.player5name, hash: this.state.playerInformation.player5hash, image: this.state.playerInformation.player5image, identity: this.state.identityInformation.player5identity, loyalty: this.state.identityInformation.player5loyalty }];
        if (this.state.playerInformation.numberofplayers > 5) dataArray.push({ name: this.state.playerInformation.player6name, hash: this.state.playerInformation.player6hash, image: this.state.playerInformation.player6image, identity: this.state.identityInformation.player6identity, loyalty: this.state.identityInformation.player6loyalty });
        if (this.state.playerInformation.numberofplayers > 6) dataArray.push({ name: this.state.playerInformation.player7name, hash: this.state.playerInformation.player7hash, image: this.state.playerInformation.player7image, identity: this.state.identityInformation.player7identity, loyalty: this.state.identityInformation.player7loyalty });
        if (this.state.playerInformation.numberofplayers > 7) dataArray.push({ name: this.state.playerInformation.player8name, hash: this.state.playerInformation.player8hash, image: this.state.playerInformation.player8image, identity: this.state.identityInformation.player8identity, loyalty: this.state.identityInformation.player8loyalty });
        if (this.state.playerInformation.numberofplayers > 8) dataArray.push({ name: this.state.playerInformation.player9name, hash: this.state.playerInformation.player9hash, image: this.state.playerInformation.player9image, identity: this.state.identityInformation.player9identity, loyalty: this.state.identityInformation.player9loyalty });
        if (this.state.playerInformation.numberofplayers > 9) dataArray.push({ name: this.state.playerInformation.player10name, hash: this.state.playerInformation.player10hash, image: this.state.playerInformation.player10image, identity: this.state.identityInformation.player10identity, loyalty: this.state.identityInformation.player10loyalty });
        this.setState({ dataArray });
        let indexOfMerlin = this.state.dataArray.findIndex(element => element.identity == "Merlin");
        let indexOfPercival = this.state.dataArray.findIndex(element => element.identity == "Percival");
        let indexOfAssassin = this.state.dataArray.findIndex(element => element.identity == "Assassin");
        let indexOfMorgana = this.state.dataArray.findIndex(element => element.identity == "Morgana");
        let indexOfMordred = this.state.dataArray.findIndex(element => element.identity == "Mordred");
        let indexOfOberon = this.state.dataArray.findIndex(element => element.identity == "Oberon");
        let indexOfMinionOfMordred1 = this.state.dataArray.findIndex(element => element.identity == "Minion of Mordred");
        let indexOfMinionOfMordred2 = this.state.dataArray.findIndex((element, index) => element.identity == "Minion of Mordred" && index != indexOfMinionOfMordred1);
        let indexOfMinionOfMordred3 = this.state.dataArray.findIndex((element, index) => element.identity == "Minion of Mordred" && index != indexOfMinionOfMordred1 && index != indexOfMinionOfMordred2);
        let indexOfMinionOfMordred4 = this.state.dataArray.findIndex((element, index) => element.identity == "Minion of Mordred" && index != indexOfMinionOfMordred1 && index != indexOfMinionOfMordred2 && index != indexOfMinionOfMordred3);
        this.setState({ indexOfMerlin, indexOfPercival, indexOfAssassin, indexOfMorgana, indexOfMordred, indexOfOberon, indexOfMinionOfMordred1, indexOfMinionOfMordred2, indexOfMinionOfMordred3, indexOfMinionOfMordred4 });
        switch (this.state.dataArray[this.props.match.params.playerNumber - 1].identity) {
            case "Loyal Servant of King Arthur":
                this.setState({ loyalServantOfKingArthur: true })
                break;
            case "Minion of Mordred":
                this.setState({ minionOfMordred: true })
                break;
            case "Merlin":
                this.setState({ merlin: true })
                break;
            case "Assassin":
                this.setState({ assassin: true })
                break;
            case "Percival":
                this.setState({ percival: true })
                break;
            case "Morgana":
                this.setState({ morgana: true })
                break;
            case "Mordred":
                this.setState({ mordred: true })
                break;
            case "Oberon":
                this.setState({ oberon: true })
                break;
            default:
                break;
        }
    }

makeAssassinTrue(){
    this.setState({
        assassin:true
    })
}

async redirectToCorrectDestination(){
    let a = await axios.get(`/api/getphase/${this.props.match.params.matchName}`)
    if (a.data[0].phase == "propose"){
        this.setState({propose:true})
    }else if (a.data[0].phase == "vote"){
        this.setState({vote:true})
    }else if (a.data[0].phase == "execute"){
        this.setState({execute:true})
    }else if (a.data[0].phase == "killmerlin"){
        this.setState({killmerlin:true})
    }
}

displayAssassinDescription(){
    if (this.state.assassin){
        return (
            <div>
                <h1>Your Identity: Assassin</h1>
                <h3>Your Loyalty: Evil</h3>
                <h5>You and the other evil characters seek to sabatoge the Quests of the Knights of King Arthur.  If 3 out of 5 quests succeed, you can still make evil win if you correctly guess which good character is Merlin</h5>
                <h5>Here are the other evil characters to your knowledge:</h5>
                {this.displayMinionOfMordred1()}
                {this.displayMinionOfMordred2()}
                {this.displayMinionOfMordred3()}
                {this.displayMinionOfMordred4()}
                {this.displayMorgana()}
                {this.displayMordred()}
                {this.displayOberon()}
            </div>)
    }
}

makeMorganaTrue(){
    this.setState({
        morgana:true
    })
}

displayMorganaDescription(){
    if (this.state.morgana){
        return (
            <div>
                <h1>Your Identity: Morgana</h1>
                <h3>Your Loyalty: Evil</h3>
                <h5>You and the other evil characters seek to sabatoge the Quests of the Knights of King Arthur.  Percival thinks you might be Merlin</h5>
                <h5>Here are the other evil characters to your knowledge:</h5>
                {this.displayMinionOfMordred1()}
                {this.displayMinionOfMordred2()}
                {this.displayMinionOfMordred3()}
                {this.displayMinionOfMordred4()}
                {this.displayAssassin()}
                {this.displayMordred()}
                {this.displayOberon()}
            </div>)
    }
}

makeMordredTrue(){
    this.setState({
        mordred:true
    })
}

displayMordredDescription(){
    if (this.state.mordred){
        return (
            <div>
                <h1>Your Identity: Mordred</h1>
                <h3>Your Loyalty: Evil</h3>
                <h5>You and the other evil characters seek to sabatoge the Quests of the Knights of King Arthur.  You have a tremendous advantage in being the one evil character that Merlin does not know</h5>
                <h5>Here are the other evil characters to your knowledge:</h5>
                {this.displayMinionOfMordred1()}
                {this.displayMinionOfMordred2()}
                {this.displayMinionOfMordred3()}
                {this.displayMinionOfMordred4()}
                {this.displayAssassin()}
                {this.displayMorgana()}
                {this.displayOberon()}
            </div>)
    }
}

makeOberonTrue(){
    this.setState({
        oberon:true
    })
}

displayOberonDescription(){
    if (this.state.oberon){
        return (<div>
            <h1>Your Identity: Oberon</h1>
            <h3>Your Loyalty: Evil</h3>
            <h5>You and the other evil characters seek to sabatoge the Quests of the Knights of King Arthur.</h5>
            <h5>You are the one evil character that does not get to know who any other evil characters are.</h5>
            {this.listMinionsOfMordredForOberon()}
            {this.listAssassinForOberon()}
            {this.listMorganaForOberon()}
            {this.listMordredForOberon()}
        </div>)
    }
}

makeMerlinTrue(){
    this.setState({
        merlin:true
    })
}

displayMerlinDescription(){
    if (this.state.merlin){
        return (<div>
            <h1>Your Identity: Merlin</h1>
            <h3>Your Loyalty: Good</h3>
            <h5>You know who the evil characters are, except Mordred when he's playing.  The catch is that if the evil characters guess which good character is Merlin at the end of the game, good loses.  Therefore let strategy decide whether you vote and advocate what you actually want or not</h5>
            <h5>Here are the evil characters according to your knowledge:</h5>
            {this.listEvilCharactersForMerlin()}
            {this.listMordredForMerlin()}
        </div>)
    }
}

makePercivalTrue(){
    this.setState({
        percival:true
    })
}

displayPercivalDescription(){
    if (this.state.percival){
        return (<div>
            <h1>Your Identity: Percival</h1>
            <h3>Your Loyalty: Good</h3>
            <h5>You are supposed to know who Merlin is so that you can protect him.  However if Morgana is in the game, she will pretend to be Merlin to trick you.</h5>
            <h5>Here is Merlin:</h5>
            {this.displayMerlin()}
        </div>)
    }
}

displayMerlin(){
    if (this.state.indexOfMerlin != -1 && this.state.indexOfMorgana != -1){
        if (this.state.indexOfMerlin < this.state.indexOfMorgana){
            return (
                <div>
                <h4>{this.state.indexOfMerlin+1} {this.state.dataArray[this.state.indexOfMerlin].name}</h4>
                <h4>{this.state.indexOfMorgana+1} {this.state.dataArray[this.state.indexOfMorgana].name}</h4>
                </div>
            )
        }else{
            return (
                <div>
                <h4>{this.state.indexOfMorgana+1} {this.state.dataArray[this.state.indexOfMorgana].name}</h4>
                <h4>{this.state.indexOfMerlin+1} {this.state.dataArray[this.state.indexOfMerlin].name}</h4>
                </div>
            )
        }
    }else if (this.state.indexOfMerlin != -1){
        return (
            <div>
            <h4>{this.state.indexOfMerlin+1} {this.state.dataArray[this.state.indexOfMerlin].name}</h4>
            </div>
        )
    }
}

makeMinionOfMordredTrue(){
    this.setState({
        minionOfMordred:true
    })
}

displayMinionOfMordredDescription(){
    if (this.state.minionOfMordred){
        return (
        <div>
            <h1>Your Identity: Minion of Mordred</h1>
            <h3>Your Loyalty: Evil</h3>
            <h5>You and the other evil characters seek to sabatoge the Quests of the Knights of King Arthur</h5>
            <h5>Here are the other evil characters to your knowledge:</h5>
            {this.displayMinionOfMordred1()}
            {this.displayMinionOfMordred2()}
            {this.displayMinionOfMordred3()}
            {this.displayMinionOfMordred4()}
            {this.displayAssassin()}
            {this.displayMorgana()}
            {this.displayMordred()}
            {this.displayOberon()}
        </div>)
    }
}

displayMinionOfMordred1(){
    if (this.props.match.params.playerNumber != this.state.indexOfMinionOfMordred1 && this.state.indexOfMinionOfMordred1 != -1){
        return (
            <div>
                <h4>{this.state.indexOfMinionOfMordred1+1} {this.state.dataArray[this.state.indexOfMinionOfMordred1].name} {this.state.dataArray[this.state.indexOfMinionOfMordred1].identity}</h4>
            </div>
        )
    }
}

displayMinionOfMordred2(){
    if (this.props.match.params.playerNumber != this.state.indexOfMinionOfMordred2 && this.state.indexOfMinionOfMordred2 != -1){
        return (
            <div>
                <h4>{this.state.indexOfMinionOfMordred2+1} {this.state.dataArray[this.state.indexOfMinionOfMordred2].name} {this.state.dataArray[this.state.indexOfMinionOfMordred2].identity}</h4>
            </div>
        )
    }
}

displayMinionOfMordred3(){
    if (this.props.match.params.playerNumber != this.state.indexOfMinionOfMordred3 && this.state.indexOfMinionOfMordred3 != -1){
        return (
            <div>
                <h4>{this.state.indexOfMinionOfMordred3+1} {this.state.dataArray[this.state.indexOfMinionOfMordred3].name} {this.state.dataArray[this.state.indexOfMinionOfMordred3].identity}</h4>
            </div>
        )
    }
}

displayMinionOfMordred4(){
    if (this.props.match.params.playerNumber != this.state.indexOfMinionOfMordred4 && this.state.indexOfMinionOfMordred4 != -1){
        return (
            <div>
                <h4>{this.state.indexOfMinionOfMordred4+1} {this.state.dataArray[this.state.indexOfMinionOfMordred4].name} {this.state.dataArray[this.state.indexOfMinionOfMordred4].identity}</h4>
            </div>
        )
    }
}

displayAssassin(){
    if (this.state.indexOfAssassin != -1){
        return (
            <div>
                <h4>{this.state.indexOfAssassin+1} {this.state.dataArray[this.state.indexOfAssassin].name} {this.state.dataArray[this.state.indexOfAssassin].identity}</h4>
            </div>
        )
    }
}

displayMorgana(){
    if (this.state.indexOfMorgana != -1){
        return (
            <div>
                <h4>{this.state.indexOfMorgana+1} {this.state.dataArray[this.state.indexOfMorgana].name} {this.state.dataArray[this.state.indexOfMorgana].identity}</h4>
            </div>
        )
    }
}

displayMordred(){
    if (this.state.indexOfMordred != -1){
        return (
            <div>
                <h4>{this.state.indexOfMordred+1} {this.state.dataArray[this.state.indexOfMordred].name} {this.state.dataArray[this.state.indexOfMordred].identity}</h4>
            </div>
        )
    }
}

displayOberon(){
    if (this.state.indexOfOberon != -1){
        return (
            <div>
                <h4>? Some unknown player {this.state.dataArray[this.state.indexOfOberon].identity}</h4>
            </div>
        )
    }
}

listEvilCharactersForMerlin(){
    return this.state.dataArray.map((element,index)=>{
        if (element.loyalty == "evil" && element.identity != "Mordred"){
            return (
                <div>
                    <h4>{index+1} {element.name}</h4>
                </div>
            )
        }
    })
}

listMinionsOfMordredForOberon(){
    return this.state.dataArray.map((element,index)=>{
        if (element.loyalty == "evil" && element.identity == "Minion of Mordred"){
            return (
                <div>
                    <h4>? unknown player Minion of Mordred</h4>
                </div>
            )
        }
    })
}

listAssassinForOberon(){
    if (this.state.indexOfAssassin){
        return (
            <div>
                <h4>? unknown player Assassin</h4>
            </div>
        )
    }
}

listMorganaForOberon(){
    if (this.state.indexOfMorgana){
        return (
            <div>
                <h4>? unknown player Morgana</h4>
            </div>
        )
    }
}

listMordredForOberon(){
    if (this.state.indexOfMordred){
        return (
            <div>
                <h4>? unknown player Mordred</h4>
            </div>
        )
    }
}

listMordredForMerlin(){
    if (this.state.indexOfMordred != -1){
        return(
            <div>
                <h4>? unknown player</h4>
            </div>
        )
    }
}

makeLoyalServantOfKingArthurTrue(){
    this.setState({
        loyalServantOfKingArthur:true
    })
}

displayLoyalServantOfKingArthurDescription(){
    if (this.state.loyalServantOfKingArthur){
        return (<div>
            <h1>Your Identity: Loyal Servant of King Arthur</h1>
            <h3>Your Loyalty: Good</h3>
            <h5>You seek the success of the Knights of King Arthur</h5>
            <h5>You start off the game not knowing the loyalty of anyone else</h5>
        </div>)
    }
}

renderRedirectPropose(){
    if (this.state.propose){
        return <Redirect to={`/makeproposal/${this.props.match.params.matchName}/${this.props.match.params.playerName}/${this.props.match.params.playerNumber}`}/>
    }
}

renderRedirectVote(){
    if (this.state.vote){
        return <Redirect to={`/vote/${this.props.match.params.matchName}/${this.props.match.params.playerName}/${this.props.match.params.playerNumber}`}/>
    }
}

renderRedirectExecute(){
    if (this.state.execute){
        return <Redirect to={`/executemission/${this.props.match.params.matchName}/${this.props.match.params.playerName}/${this.props.match.params.playerNumber}`}/>
    }
}

    render(){
        return(
            <div>
            <h4>PlayerDescription</h4>
            {this.displayLoyalServantOfKingArthurDescription()}
            {this.displayMinionOfMordredDescription()}
            {this.displayMerlinDescription()}
            {this.displayAssassinDescription()}
            {this.displayPercivalDescription()}
            {this.displayMorganaDescription()}
            {this.displayMordredDescription()}
            {this.displayOberonDescription()}
            <h4><button onClick = {()=>this.redirectToCorrectDestination()}>Enter Game</button></h4>
            {this.renderRedirectPropose()}
            {this.renderRedirectVote()}
            {this.renderRedirectExecute()}
            </div>
        )
    }
}

export default PlayerDescription