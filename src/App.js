import stubber_logo from './stubber_logo.png';
import React from 'react';
import './App.css';
import TableView from './TableView/TableView.js';
import Form from './Form/Form.js';
import Stack from '@mui/material/Stack';
import { Container } from '@mui/system';
import Ranking from './Ranking/Ranking.js';
import { AppBar, Button, Typography, Toolbar, IconButton, Tooltip, Dialog, DialogContent, createTheme, ThemeProvider } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

const stubberTheme = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
};

const theme = createTheme(stubberTheme);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: "card",
      form: false,
    };
    this.setView = this.setView.bind(this);
    this.handleFormClose = this.handleFormClose.bind(this);
    this.handleFormOpen = this.handleFormOpen.bind(this);
    this.appBarLabel = this.appBarLabel.bind(this);
    this.rerenderCallback = this.rerenderCallback.bind(this);
  }

  handleFormOpen() {
    this.setState({form: true});
  }

  handleFormClose() {
    this.setState({form: false});
  }

  rerenderCallback() {
    this.forceUpdate();
    console.log("parent rerendered")
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
        <Tooltip title="Add a movie">
          <IconButton onClick={() => this.handleFormOpen()}>
            <AddBoxIcon/>
          </IconButton>
        </Tooltip>
        <Button color="inherit" onClick={() => this.setView("table")}>Table View</Button>
        <Button color="inherit" onClick={() => this.setView("card")}>Card View</Button>
      </Toolbar>
    )
  }

  render() {
    const view = this.state.view;
    let movieBody;
    let key = Math.floor(Math.random() * 100);
    switch(view) {
      case "card":
        movieBody = <Ranking key={key}/>
        break;
      case "table":
        movieBody = <TableView key={key}/>
        break;
      default:
        movieBody = <Ranking key={key}/>
        break;
    }
    return(
      <ThemeProvider theme={theme}>
      <div className='App'>
        <Stack spacing={5}>
          <AppBar position="fixed">
            <this.appBarLabel/> 
          </AppBar>
            <Dialog open={this.state.form} onClose={this.handleFormClose}>
              <DialogTitle>Add a new Movie</DialogTitle>
              <DialogContent>
                <Form rerenderCallback={this.rerenderCallback}/>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => this.handleFormClose()}>Close</Button>
              </DialogActions>
            </Dialog>
            <Container className='App-container'>
              {movieBody}
            </Container>
        </Stack>
      </div>
      </ThemeProvider>
    )
  }
}

export default App;
