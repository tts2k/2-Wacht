import React, { useReducer } from "react";
import { View } from "react-native";
import { colors } from '../styles';
import { MovieList } from '../components/List/MovieList';
import { SearchBar } from "../components/Bar/SearchBar";
import { tmdb, formatDate } from '../utilities';

export const SearchScreen = () => {
    let initialState = {
        movies: [],
        error: null,
        loading: false,
        searchText: "",
        page: 1
    };
    const reducer = (state, newState) => ({ ...state, ...newState });
    const [state, setState] = useReducer(reducer, initialState);

    const fetchMovie = async (pageToSearch, text) => {
        try {
            let data = await tmdb.search.movies({
                query: text,
                page: pageToSearch
            });
            data.results.forEach((e) => {
                e.poster_path= `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${e.poster_path}`;
                if(e.release_date !== '')
                    e.release_date = formatDate(e.release_date);
                else
                    e.release_date = 'Date Unknown';
                e.score = `${e.vote_average * 10}% (${e.vote_count})`;
            });
            return data.results;
        }
        catch (error) {
            setState({ error: error });
        }
    }

    const searchMovies = async (text) => {
        setState({ loading: true });
        let data = await fetchMovie(1, text);
        setState({ movies: data , loading:false, page: 1});
    }

    const loadMoreMovies = async () => {
        setState({ loading: true });
        let data = await fetchMovie(state.page + 1, state.searchText);
        setState({ movies: state.movies.concat(data), loading: false, page: state.page + 1})
    }

    const onSearchChange = (text) => {
        setState({ searchText: text })
        searchMovies(text);
    }

    const onClearSearch = () => {
        setState({ searchText: '', movies: [] })
    }

    return (
        <View>
            <SearchBar
                value={ state.searchText }
                onChangeText={ onSearchChange }
                onClearText={ onClearSearch }
            />
            <MovieList movies={ state.movies } loadMoreMovies={ loadMoreMovies } showSpinner={ state.loading }/>
        </View>
    )
}
