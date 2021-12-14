import React, {useReducer} from "react";
import {View, Text, StyleSheet, TextInput} from "react-native";
import { colors } from '../styles';
import { MovieList } from '../components/List/MovieList';
import { tmdb, formatDate } from '../utilities';

export const SearchScreen = () => {
    let initialState = {
	    searchTitle: '',
	    movies: [],
        error: null,
	};
	const reducer = (state, newState) => ({ ...state, ...newState });
    const [state, setState] = useReducer(reducer, initialState);

    const fetchMovie = async (movieTitle) => {
        setState({searchTitle: movieTitle});
        try {
            let data = await tmdb.search.movies({
                query: state.searchTitle,
                page: 1
            });
            data.results.forEach((e) => {
                e.poster_path= `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${e.poster_path}`;
                if(e.release_date !== '')
                    e.release_date = formatDate(e.release_date);
                else
                    e.release_date = 'Date Unknown';
                e.score = `${e.vote_average * 10}% (${e.vote_count})`;
            });
            setState({ movies: [...data.results]});
        }
        catch (error) {
            setState({ error: error });
        }
    }
    return (
        <View>
            <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, color: colors.foreground }}
            value={state.searchTitle}
            onChangeText={(text) => fetchMovie(text)}
            />
            <MovieList movies={ state.movies } />
        </View>
    )
}
