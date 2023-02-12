import React from 'react';
import {TableRow, TableCell} from '@mui/material';
import Button from '@mui/material/Button';

class TableListing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          items: [],
        };
    }


    componentDidMount() {
        const connection = process.env.REACT_APP_API_ENDPOINT + "/api/v1/movies";
        fetch(connection)
          .then(response => response.json())  
          .then((json) => {
            this.setState({
              isLoaded: true,
              // Data field in json response contains list of movies (very important)
              // It is important you do not just do 'items: json'
              items: json.Data 
            });
          })
          .catch(error => {
            this.setState({
              isLoaded: true,
              error
            });
          });
    }
    
    handleDelete(id, title){
        // event.preventDefault();
        const params = {
          method: "DELETE"
        }
        const url = process.env.REACT_APP_API_ENDPOINT + "/api/v1/movies/delete/" + id;
        let conf = window.confirm("really delete " + title + "?");
        if(conf){
          fetch(url, params).then((response)=> {
            response.json();
            window.location.reload(true);
          }).catch((error) => {
            console.log(error);
            alert('Error: ' + error);
          }); 
        }
    }

    render() {
      const items = this.state.items;
      if(this.state.error) {
        return(
          <div>
            <p>an error occured :(</p>
          </div>
        )
      }
      else if(items == null){
          return(
              <TableRow>
                  <TableCell>No movies added yet</TableCell>
              </TableRow>
          );
      }
      else{
        return(
            items.map(item => {
                return(
                    <TableRow className={"rating-"+item.Rating}key={item.Id}>
                    <TableCell>
                        <img src={"https://image.tmdb.org/t/p/original" + item.Poster} alt={item.Poster} />
                    </TableCell>
                    <TableCell>{item.Title}</TableCell>
                    <TableCell>{item.Rating}/10</TableCell>
                    <TableCell>{item.Notes}</TableCell>
                    <TableCell>{item.Year}</TableCell>
                    <TableCell color="white">
                        <Button variant="contained" onClick={() => this.handleDelete(item.Id, item.Title)}>delete</Button>
                    </TableCell>
                    </TableRow>
                );
            })
        );
      }
    }
}

export default TableListing;
