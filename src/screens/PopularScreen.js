import React, { useEffect, useState, useReducer } from "react";
import { View } from "react-native";
import { MovieList } from '../components/List/MovieList';
import { tmdb, formatDate } from '../utilities';

export const PopularScreen = () => {
    let initialState  = {
        movies: [],
        loading: false,
        error: null,

    };
    const reducer = (state, newState) => ({ ...state, ...newState });
    const [state, setState] = useReducer(reducer, initialState);
    const [page, setPage] = useState(1);

    useEffect(() => {
        getPopular();
    }, [page]);

    const processMovieList = (list) => {
        list.forEach((e) => {
            e.poster_path= `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${e.poster_path}`
            e.release_date = formatDate(e.release_date) ;
            e.score = `${e.vote_average * 10}% (${e.vote_count})`
        });

        return list;
    }

    const getPopular = async () => {
        if (state.loading)
            return;

        try {
            setState({ loading: true });
            let data = await tmdb.movie.popular({
                page: page
            });
            let processedData = processMovieList(data.results);
            setState({ movies: state.movies.concat(processedData), loading: false });
        }
        catch (error) {
           setState({ error: error })
        }
    }
    
    const getMoreMovie = () => {
        setPage(page + 1);
    }

    return (
        <View>
            <MovieList movies={ state.movies } getMoreMovie={ getMoreMovie }/>
        </View>
    )
}
