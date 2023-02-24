import stubber_logo from './stubber_logo.png';
import React from 'react';
import './App.css';
import TableView from './TableView/TableView.js';
import Form from './Form/Form.js';
import FileUploader from './Upload/FileUploader.js';
import Stack from '@mui/material/Stack';
import { Container } from '@mui/system';
import Ranking from './Ranking/Ranking.js';
import { AppBar, Button, Typography, Toolbar, IconButton, Tooltip, Dialog, DialogContent, createTheme, ThemeProvider, List, ListItem, ListItemText } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import MenuIcon from '@mui/icons-material/Menu';

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
    this.handleMenuClose = this.handleMenuClose.bind(this);
    this.handleMenuOpen = this.handleMenuOpen.bind(this);
    this.appBarLabel = this.appBarLabel.bind(this);
    this.rerenderCallback = this.rerenderCallback.bind(this);
  }

  handleFormOpen() {
    this.setState({form: true});
  }

  handleFormClose() {
    this.setState({form: false});
  }

  handleMenuOpen(){
    this.setState({menu: true});
  }

  handleMenuClose(){
    this.setState({menu: false});
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
        <IconButton onClick={() => this.handleMenuOpen()}>
          <MenuIcon/>
        </IconButton>
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
          {/* Dialog for adding a movie */}
          <Dialog open={this.state.form} onClose={this.handleFormClose}>
            <DialogTitle>Add a new Movie</DialogTitle>
            <DialogContent>
              <Form rerenderCallback={this.rerenderCallback}/>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => this.handleFormClose()}>Close</Button>
            </DialogActions>
          </Dialog>

          <Dialog fullScreen open={this.state.menu} onClose={this.handleMenuClose} >
              <AppBar sx={{position: 'relative'}}>
                <Toolbar>
                  <Typography variant='h6' sx={{flexGrow: 1}}>
                    Options
                  </Typography>
                  <Button edge="start" onClick={() => this.handleMenuClose()}>Close</Button>
                </Toolbar>
              </AppBar>
              <List>
                <ListItem>
                  <FileUploader />
                  <ListItemText primary="Upload csv"/>
                </ListItem>
                <ListItem>
                  This is a work in progress :)
                </ListItem>
              </List>
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
