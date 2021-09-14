import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, Switch } from 'react-router-dom';

import Movie from './Movies/Movie';
import MovieList from './Movies/MovieList';
import SavedList from './Movies/SavedList';

export default function App () {
  const [saved, setSaved] = useState([]); // Stretch: the ids of "saved" movies
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const getMovies = () => {
      axios
        .get('http://localhost:5000/api/movies') // Study this endpoint with Postman
        .then(resp => {
          // Study this response with a breakpoint or log statements
          // and set the response data as the 'movieList' slice of state
          setMovieList(resp.data);
        })
        .catch(error => {
          console.error('Server Error', error);
        });
    }
    getMovies();

  }, []);


  const addToSavedList = (id) => {
    console.log(`TRACK ID HERE`,id);
    const movie = movieList.find(movie => movie.id === +id)
    const savedMovie = saved.find(movie => movie.id === +id)
    // console.log('TRACK movieList HERE',movieList)
    // console.log(`TRACK MOVE ARRAY HERE`.movie);
    return !savedMovie ? setSaved([...saved, movie]) : null
  };

  return (
    <div>
      <Route>  
        <SavedList list={saved}/>
       </Route>

      <Switch>

      <Route path='/'> 
        <MovieList  movies={movieList}/>
      </Route>

      <Route path='/movies/:id'>
        <Movie movie={movieList} addToSavedList={addToSavedList}/>
      </Route>
      
      </Switch>
    </div>
  );
}
