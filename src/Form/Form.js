import React from 'react';
import Button from '@mui/material/Button';
import { Stack, TextField } from '@mui/material';
import './Form.css';

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          title: "",
          rating: "",
          notes: "",
          year: "",
        };
    
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }
    
    handleSubmit(event){
        console.log("handling submit...");
        event.preventDefault();
        const params = {
            method: "POST",
            body: JSON.stringify({
                Title: this.state.title,
                Rating: this.state.rating,
                Notes: this.state.notes,
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
    };
    const endpoint = process.env.REACT_APP_API_ENDPOINT + "/api/v1/movies";
    fetch(endpoint, params).then((response) => {
        response.json();
        this.props.rerenderCallback();
    }).catch((error) => {
        console.log(error);
        alert('Error: ' + error);
    })
    }
    
    render() {
    return(
        <Stack
            spacing={2}
            component="form"
            onSubmit={this.handleSubmit}
            // sx={{
            //     '& .MuiTextField-root': { m: 1, width: '25ch' },
            // }}
        >
            <TextField 
                name="title" 
                type="text" 
                value={this.state.title} 
                onChange={this.handleInputChange} 
                label="Movie Title" 
                margin="normal"
            />
            <TextField 
                name="rating" 
                type="number" 
                value={this.state.rating} 
                onChange={this.handleInputChange} 
                label="Movie Rating (1-10)" 
                margin="normal"
            />
            <TextField 
                multiline
                minRows={4}
                name="notes" 
                type="text" 
                value={this.state.notes} 
                onChange={this.handleInputChange} 
                label="Notes"  
                margin="normal"
            />
            <Button type="submit" variant="contained">Add Movie</Button>
        </Stack>
    )
    }
}

export default Form;
