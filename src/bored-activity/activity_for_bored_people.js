import React,{Component} from 'react';
import axios from 'axios'
import { Progress } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import countapi from 'countapi-js';

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
            countVisits: null,
            loading:false
        }
        countapi.visits().then((result) => {
            let res = this.state.countVisits + Number(result.value)
            this.setState({countVisits:res})
        });

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

    loadingScreen = () =>{
        let loader = [];
        if (this.state.loading){
            loader.push(<div styles={{display:"block",leftalign:"auto",rightalign:"auto"}}><div class="lds-roller" ><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>)
        }
        else{
            loader.pop()
        }
        return loader
    }

    countVisitsFun = () =>{
        let countVisit = [];
        countapi.visits().then((result) => {
            let res = this.state.countVisits + Number(result.value)
            this.setState({countVisits:res})
        });
      }

    progressBar = () =>{
        let progress = [];
        if(this.state.chances){
            progress.push(<Progress value={this.state.chances}>{this.state.chances}</Progress>)
        }else{
            progress.push(<Progress value="0">{this.state.chances}</Progress>)
        }
        return progress
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
        this.setState({loading:true})
        let url = "http://www.boredapi.com/api/activity/"
        url = url + `?type=${this.state.selectActivity}&participants=${this.state.participants}`
        axios.get(url)
        .then((response) => {
                this.setState({you_can:response.data.activity});
                let chance = response.data.accessibility * 100;
                this.setState({link:response.data.link});
                this.setState({chances:chance});
                this.setState({loading:false});
                if(response.data.error){
                    this.setState({you_can:response.data.error});
                    this.setState({link:""})
                    this.setState({chances:"None 0"});
                    this.setState({loading:false})
                }
            },(error) =>{
                this.setState({loading:false})
                console.log("sorry for that baby")
            }
        );
        // furesponse => ()=>this.setState({you_can:response.data.activity} console.log())
    }

 
    render(){
        return(
            <div>
                <form>
                    <p><b>Visits:</b> {this.state.countVisits} </p>
                    <p>
                    <b>Select the parameters and generate fun activity:-</b>
                    </p>
                        Activity Type<br></br>
                        <select className='select-thing'  value={this.state.selectActivity} onChange={this.handleSelectChange} required>
                            {this.createSelectList()}
                        </select><br></br>
                        Number of Participants<br></br>
                        <select class='select-thing'  value={this.state.participants} onChange={this.handlePartipantsChange} required>
                            {this.createParticipantsList()}
                        </select><br></br>
                    
                    <button class='Button' type='button' onClick={this.handleCreateActivity}>Create Activity</button>
                </form>
                {this.loadingScreen()}
                <p class='activity'><b>You can</b>: {this.state.you_can}</p>
                <br></br>
                <p className='activity'><b>Accessibility</b>:</p>
                <div>
                    {this.progressBar()}
                </div>
                {this.linkIfAny()}
            </div>
        )
    }
}

export default ActivityForBoredPeople