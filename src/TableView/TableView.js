import React from 'react';
import { TableContainer, TableRow, TableCell, TableHead, TableBody, Table } from '@mui/material';
import Paper from '@mui/material/Paper';
import TableListing from './TableListing.js';
import './TableView.css'

class TableView extends React.Component {
  
    render() {  
        return (
        <TableContainer component={Paper} className="Table">
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell style={{fontWeight: 'bold'}}>Title</TableCell>
                        <TableCell style={{fontWeight: 'bold'}}>Rating</TableCell>
                        <TableCell style={{fontWeight: 'bold'}}>Notes</TableCell>
                        <TableCell style={{fontWeight: 'bold'}}>Year</TableCell>
                    </TableRow>
                </TableHead>
                
                <TableBody>
                    <TableListing/>
                </TableBody>
            </Table>
        </TableContainer> 
        );
    }

}

export default TableView;
