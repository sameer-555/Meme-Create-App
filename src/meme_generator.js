import React, {Component} from 'react';
import data from './memes_avaliable.json'
import axios from 'axios'


const option = data

export class MemeGenerator extends Component{
    constructor(props){
        super(props);
        this.state = {
            selectValue:option[0].value,
            topValue:'',
            bottomValue:'',
            quote:''
        }
        this.getQuote()

    }
    createSelectList = () =>{
        let options = [];
        for(let i = 0; i < option.length; i++){
            options.push(<option value={option[i].value}>{option[i].label}</option>);
        }
        return options;
    }

    handleTopValueChange = (event) =>{
        this.setState({topValue :event.target.value})
    }

    handleBottomValueChange = (event) =>{
        this.setState({bottomValue:event.target.value})
    }

    handleSelectChange =(event) =>{
        this.setState({selectValue:event.target.value})
    }

    handleClick = (event) => {
        let requestURL = `http://apimeme.com/meme?meme=${this.state.selectValue}&top=${this.createSplitText(this.state.topValue)}&bottom=${this.createSplitText(this.state.bottomValue)}`
        window.open(requestURL)

    }

    createSplitText = (str) => {
        return str.split(' ').join("+")
    }
    getQuote = () =>{
        axios.get('https://api.adviceslip.com/advice')
        .then(response => this.setState({ quote: response.data.slip.advice }));
        console.log(this.state)
    }


render(){
    return(
        <div>
        <p id='quotes'>
            {this.state.quote}
        </p>
        <form>
            <p lassName="h5 text-center mb-4">Enter Top value:-</p>
            <input type='text' value={this.state.topValue} onChange={this.handleTopValueChange} required/>
            <p>Enter Bottom value:-</p>
            <input type='text' value={this.state.bottomValue} onChange={this.handleBottomValueChange} required/>
            <p>
            Pick your Meme Image(more will be added):-
            </p>
                <select class='select-thing'  value={this.state.selectValue} onChange={this.handleSelectChange} required>
                    {this.createSelectList()}
                </select>
            <p>Click To Generate Meme:</p>
            <button class='Button1' type='button' onClick={this.handleClick}>Generate</button>
        </form>
        </div>

    )
}
}

export default MemeGenerator