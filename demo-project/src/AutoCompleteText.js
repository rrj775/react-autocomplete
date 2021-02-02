import React from 'react';
import './AutoCompleteText.css';
import axios from 'axios';
import { render } from '@testing-library/react';

const headers = {
   "x-api-key": "$2a$10$AIUufK8g6EFhBRV2AQNBjp7oDQVFiO5JJMBFZQ6x2/R/2"
}

export default class AutoCompleteText extends React.Component {
    constructor(props) {
        super(props);
        this.items = [ 'Security Guard',
        'Housekeeping',
        'carpenter',
        'Gardener',
        'Plumber',
        'Supervisor',
        'Electrician',
        'Security Guard Supervisor',
        'HouseKeeping Supervisor',
        'Plumber Supervisor',
            
        ];
        this.state = {
            suggestions: [],
            text: '',
        };

    }

    onTextChanged = (e) => {
        const value = e.target.value;
        let suggestions =[];
        if (value.length >0) {
            const regex = new RegExp(`^${value}` , 'i');
            suggestions = this.items.sort().filter(v => regex.test(v));

        }
        this.setState(() => ({suggestions, text: value}));
        
    }
        suggestionSelected (value) {
            this.setState(() => ({
            text: value,
            suggestions: [],
        }))
    }

        renderSuggestions (){
            const { suggestions } = this.state;
            if(suggestions.length === 0) {
                return null;
            }
            return (
                <ul>
                   {suggestions.map((item) => <li onClick={() => this.suggestionSelected(item)}>{item}</li>)}
                </ul>
            );

        }

        componentDidMount() 
        {
            axios.get(`https://tomcat.stskproptech.com/stskFmsApi/jobTypes/getAllJobTypes`,{headers}).then(res => {
                    console.log(res.data.data[0].name);
                    this.setState({ items   : res.data.data });
                } );
    
        }

        

    render () {
        const { text} = this.setState;
        return (
            <div className="AutoCompleteText">
                <input value={text} onChange={this.onTextChanged}  type="text" />
                {this.renderSuggestions()}
            </div>
        )
    }
}
   

    