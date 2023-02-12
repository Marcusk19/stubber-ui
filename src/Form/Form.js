import React from 'react';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import './Form.css';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material/styles'


const Theme = {
    palette: {
      type: 'dark',
      primary: {
        main: '#3f51b5',
        contrastText: '#ffffff',
      },
    },
    typography: {
      allVariants: {
        color: "white"
      },
    },
    components: {
        MuiInputBase: {
            styleOverrides: {
                input: {
                    color: 'white',
                },
                '&.MuiFilledInput-root': {
                    borderColor: 'white',
                },
                '&.Mui-focused': {
                    borderColor: 'white',
                },
            }
        }
    }
};
const theme = createTheme(Theme);

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
        window.location.reload(true);
    }).catch((error) => {
        console.log(error);
        alert('Error: ' + error);
    })
    }
    
    render() {
    return(
        <ThemeProvider theme={theme}>
        <Box
            component="form"
            onSubmit={this.handleSubmit}
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
        >
            <div>
            <TextField 
                name="title" 
                type="text" 
                value={this.state.title} 
                onChange={this.handleInputChange} 
                label="Movie title" 
                margin="normal"
            />
            <TextField 
                name="rating" 
                type="number" 
                value={this.state.rating} 
                onChange={this.handleInputChange} 
                label="Movie Rating" 
                margin="normal"
            />
            </div>
            <div>
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
            </div>
            <Button type="submit" variant="contained">Add Movie</Button>
        </Box>
        </ThemeProvider>
    )
    }
}

export default Form;
