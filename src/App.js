import stubber_logo from './stubber_logo.png';
import React from 'react';
import './App.css';
import TableView from './TableView/TableView.js';
import Form from './Form/Form.js';
import Stack from '@mui/material/Stack';


class App extends React.Component {

  render() {
    return(
      <div className='App'>
        <header>
            <h1 align="center">Stubber</h1>
            <img class="App-logo" src={stubber_logo} alt="logo bleh"/> 
        </header>
        <Stack spacing={5}>
            <Form/>
            <TableView/>
        </Stack>
      </div>
    )
  }
}

export default App;
