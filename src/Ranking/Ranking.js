import React, {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { CardActions, CardContent, CardMedia, Typography, IconButton, Dialog, DialogContentText } from '@mui/material';
import { Box } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

class PosterCard extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            poster: true,
            movie: this.props.movie,
            open: false,
        };
        this.setPoster = this.setPoster.bind(this);
        this.setInfo = this.setInfo.bind(this);
        this.setOpen = this.setOpen.bind(this);
        this.setClose = this.setClose.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    setPoster(){
        this.setState({poster: true});
    }

    setInfo(){
        this.setState({poster: false});
    }

    setOpen(){
        this.setState({open: true});
    }

    setClose(){
        this.setState({open: false});
    }

    handleDelete(id){
        // event.preventDefault();
        const params = {
          method: "DELETE"
        }
        const url = process.env.REACT_APP_API_ENDPOINT + "/api/v1/movies/delete/" + id;
        fetch(url, params).then((response)=> {
            response.json();
        // update state on parent function Rankings() to automatically rerender component on delete
            this.props.fetchData();
        }).catch((error) => {
            console.log(error);
            alert('Error: ' + error);
        }); 
    }

    render() {
        const movie = this.state.movie;
        const poster = this.state.poster;
        if(poster){
            return (
                <Card className="Poster-card">
                <CardMedia sx={{display: 'flex', minHeight: 300, width: '100%'}}
                component="img"
                alt="poster"
                height="190"
                image={"https://image.tmdb.org/t/p/original" + movie.Poster}
                />
                <CardContent className={"rating-" + movie.Rating}>
                    <Typography variant="h6" component="div">
                        {movie.Title}
                    </Typography>
                    {/* <Typography variant="body2" color="text.secondary">
                        {movie.Notes}
                    </Typography> */}
                </CardContent>
                <CardActions>
                    <Button size="small" sx={{textAlign: "left", flexGrow: 1}} onClick={() => this.setInfo()}>Info</Button>
                    <IconButton onClick={() => this.setOpen()}>
                        <DeleteIcon/>
                    </IconButton>
                    <Dialog
                        open={this.state.open}
                        onClose={this.setClose}
                    >
                        <DialogTitle>
                            {"Really delete " + movie.Title + "?"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                You'll have to re-add this movie back if you change your mind
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => this.setClose()}>Ok I won't after all...</Button>
                            <Button onClick={() => this.handleDelete(movie.Id)}>Yes, do as I say!</Button>
                        </DialogActions>
                    </Dialog>
                </CardActions>
            </Card>
            )
        } else {
            return(
                <Card className="Poster-card" elevation={5}>
                    <CardContent>
                        <Typography variant="h6">
                            {movie.Title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" className="Movie-info"
                            sx={{
                                textAlign:"left"
                            }}
                        >
                            {movie.Year} <br/>
                            <b>Rating: </b>{movie.Rating} <br/>
                            <b>Review: </b>{movie.Notes} <br/>
                        </Typography>
                    </CardContent>
                    <CardActions>
                    <Button size="small" onClick={() => this.setPoster()}>Poster</Button>
                    </CardActions>
                </Card>
            )
        }
    }
}

// specify gridlayout (5 columns per row)
const gridContainer = {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)"
};

const gridItem = {
    margin: "8px",
    // border: "1px solid red", // leave border red for debugging
};


function Rankings() {
    let [movies, setMovies] = useState(null);

    // function we will pass to child component so deletes refresh the DOM
    let fetchData = React.useCallback(async () => {
        const connection = process.env.REACT_APP_API_ENDPOINT + "/api/v1/movies";
        fetch(connection)
        .then(response => response.json())
        .then(data => setMovies(data.Data))
        .catch(error => console.log(error))
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData])

    if(movies == null){
        return(
            <Box>
                <div>
                    No movies added yet
                </div>
            </Box>
        );
    } else {
        return(
            <Box sx={gridContainer}>
                {/* movies && movies.map ensures we don't render if movies is null */}
                { movies.map((movie) => {
                    return(
                        <Box sx={gridItem} key={movie.Id}>
                            <PosterCard movie={movie} fetchData={fetchData}/>
                        </Box>
                    )
                    }
                )}
            </Box>
        );
    }

}

export default Rankings;