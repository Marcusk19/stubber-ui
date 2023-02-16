import stubber_logo from './stubber_logo.png';
import React from 'react';
import './App.css';
import TableView from './TableView/TableView.js';
import Form from './Form/Form.js';
import Stack from '@mui/material/Stack';
import { Container } from '@mui/system';
import Ranking from './Ranking/Ranking.js';
import { AppBar, Button, Typography, Toolbar } from '@mui/material';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: "card"
    };
    this.setView = this.setView.bind(this);
    this.appBarLabel = this.appBarLabel.bind(this);
  }

  setView(view_value) {
    this.setState(
      {
        view: view_value
      }
    );
    console.log("changed state to " + view_value);
  }

  appBarLabel() {
    return(
      <Toolbar>
        <img className="App-logo" src={stubber_logo} alt="logo"/>
        <Typography variant="h6" sx={{flexGrow: 1}} textAlign="left">
            Stubber
        </Typography>
        <Button color="inherit" onClick={() => this.setView("table")}>Table View</Button>
        <Button color="inherit" onClick={() => this.setView("card")}>Card View</Button>
      </Toolbar>
    )
  }

  render() {
    const view = this.state.view;
    let movieBody;
    switch(view) {
      case "card":
        movieBody = <Ranking/>
        break;
      case "table":
        movieBody = <TableView/>
        break;
      default:
        movieBody = <Ranking/>
        break;
    }
    return(
      <div className='App'>
        <Stack spacing={5}>
          <AppBar position="fixed">
            <this.appBarLabel/>
          </AppBar>
            <Form/>
            <Container className='App-container'>
              {movieBody}
            </Container>
        </Stack>
      </div>
    )
  }
}

export default App;
