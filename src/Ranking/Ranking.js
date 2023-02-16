import React, {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import { CardActions, CardContent, CardMedia, Typography } from '@mui/material';

class PosterCard extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            poster: true,
            movie: this.props.movie,
        };
        this.setPoster = this.setPoster.bind(this);
        this.setInfo = this.setInfo.bind(this);
    }

    setPoster(){
        this.setState({poster: true});
    }

    setInfo(){
        this.setState({poster: false});
    }

    render() {
        const movie = this.state.movie;
        const poster = this.state.poster;
        if(poster){
            return (
                <Card className="Poster-card">
                <CardMedia
                component="img"
                alt="poster"
                height="190"
                image={"https://image.tmdb.org/t/p/original" + movie.Poster}
                />
                <CardContent className={"rating-" + movie.Rating}>
                    <Typography variant="h6" component="div">
                        {movie.Title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {movie.Notes}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={() => this.setInfo()}>Info</Button>
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
                        <Typography variant="body2" color="text.secondary">
                            {movie.Year} <br/>
                            Rating: {movie.Rating}/10
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

function Rankings() {
    let [movies, setMovies] = useState(null);

    useEffect(() => {
        const connection = process.env.REACT_APP_API_ENDPOINT + "/api/v1/movies";
        fetch(connection)
        .then(response => response.json())
        .then(data => setMovies(data.Data))
        .catch(error => console.log(error))
    }, [])
    
    return(
        <Grid container justify="center" alignItems="stretch" spacing={2}>
            {/* movies && movies.map ensures we don't render if movies is null */}
            {movies && movies.map((movie) => {
                return(
                    <Grid item key={movie.Id}>
                        <PosterCard movie={movie} className="Poster-card"/>
                    </Grid>
                )
                }
            )}
        </Grid>
    )
}

export default Rankings;