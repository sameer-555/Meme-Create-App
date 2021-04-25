import React,{Component} from 'react';
import axios from 'axios'

const activity_type = ["education", "recreational", "social", "diy", "charity", "cooking", "relaxation", "music", "busywork"]
const participants = [1,2,3,4,5,6,7,8,9,10]
export class ActivityForBoredPeople extends Component{
    constructor(props){
        super(props);
        this.state = {
            selectActivity : activity_type[0],
            accessbility : 0,
            participants: participants[0],
            you_can : "?",
            chances: 0,
            link: "",
        }


    }
    createSelectList = () =>{
        let options = [];
        for(let i = 0; i < activity_type.length; i++){
            options.push(<option value={activity_type[i]}>{activity_type[i]}</option>);
        }
        return options;
    }

    createParticipantsList = () =>{
        let options = [];
        for(let i = 0; i < participants.length; i++){
            options.push(<option value={participants[i]}>{participants[i]}</option>);
        }
        return options;
    }

    linkIfAny = () =>{
        let options = [];
        if(this.state.link !== "" && this.state.you_can !== '?'){
            options.push(<p class ='field_padding'><b>Below link might help:</b></p>)
            options.push(<a href={this.state.link} target="_blank" rel="noopener noreferrer">{this.state.you_can}</a>)
        }
        
        return options
    }

    handleSelectChange =(event) =>{
        this.setState({selectActivity:event.target.value})
    }

    handlePartipantsChange =(event) =>{
        this.setState({participants:event.target.value})
    }


    handleCreateActivity =(event) =>{
        let url = "http://www.boredapi.com/api/activity/"
        url = url + `?type=${this.state.selectActivity}` + `&participants=${this.state.participants}`
        axios.get(url)
        .then((response) => {
                this.setState({you_can:response.data.activity});
                let chance = response.data.accessibility * 100
                this.setState({link:response.data.link})
                this.setState({chances:chance});
                if(response.data.error){
                    this.setState({you_can:response.data.error});
                    this.setState({link:""})
                    this.setState({chances:"None -100"});
                }
            },(error) =>{
                console.log("sorry for that baby")
            }
        );
        // furesponse => ()=>this.setState({you_can:response.data.activity} console.log())
    }

 
    render(){
        return(
            <div>
                <form>
                    <p>
                    Select the parameters and Generate(more parameters will be added):-
                    </p>
                        <select class='select-thing'  value={this.state.selectActivity} onChange={this.handleSelectChange} required>
                            {this.createSelectList()}
                        </select>

                        <select class='select-thing'  value={this.state.participants} onChange={this.handlePartipantsChange} required>
                            {this.createParticipantsList()}
                        </select>
                    
                    <button class='Button' type='button' onClick={this.handleCreateActivity}>Create Activity</button>
                </form>

                <p class='activity'><b>You can</b>: {this.state.you_can}</p>
                <br></br>
                <p class='activity'><b>Accessibility</b>:</p>
                <div class="activity_container">
                   <p>{this.state.chances}%</p>
                </div>
                {this.linkIfAny()}
            </div>
        )
    }
}

export default ActivityForBoredPeople