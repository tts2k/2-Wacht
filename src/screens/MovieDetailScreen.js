import React, { useEffect, useState, useReducer } from "react";
import {View, Text } from "react-native";
import { colors } from '../styles';
import { tmdb, formatDate } from '../utilities';
import { MovieList } from '../components/List/MovieList';

export const MovieDetailScreen = ({ route }) => {
    let initialState  = {
        movies: [],
        loading: false,
        error: null,
    };
    const reducer = (state, newState) => ({ ...state, ...newState });
    const [state, setState] = useReducer(reducer, initialState);
    const [page, setPage] = useState(1);

    useEffect(() => {
        getSimilar();
    }, [page]);

    const getSimilar = async () => {
        try{
            let data1 = await tmdb.movie.similar({
                movieId: route.params.id,
                page: 1
            });
            data1.results.forEach((e) => {
                e.poster_path= `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${e.poster_path}`
                e.release_date = formatDate(e.release_date) ;
                e.score = `${e.vote_average * 10}% (${e.vote_count})`
            });
            setState({ movies: [...data1.results]});
        }catch (error) {
           setState({ error: error })
        }
    }
    const loadMoreMovies = () => {
        setPage(page + 1);
    }
    
    return (
        <View>
            <Text style={{ fontSize: 30, color: colors.foreground }}>Movie Detail Screen</Text>
            <Text style={{ fontSize: 30, color: colors.foreground }}>Movie Id: { route.params.id }</Text>
            <MovieList movies={ state.movies } loadMoreMovies={ loadMoreMovies } showSpinner={ state.loading }/>
        </View>
    )
}
