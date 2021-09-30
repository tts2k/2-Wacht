import React, { useEffect, useState, useReducer } from "react";
import { View } from "react-native";
import { MovieList } from '../components/List/MovieList';
import { tmdb } from '../utilities';

export const PopularScreen = () => {
    /*
    const movies = [
        {
            name: "Aria the Crepuscolo",
            poster: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/iA5nYOO9L3KuM6uP5chzFrh6vdk.jpg",
            date: "May 3, 2021",
            score: 1,
            vote: 2,
            id: '1'
        },
        {
            name: "Aria the Crepuscolo",
            poster: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/iA5nYOO9L3KuM6uP5chzFrh6vdk.jpg",
            date: "May 3, 2021",
            score: 1,
            vote: 2,
            id: '2'
        },
        {
            name: "Aria the Crepuscolo",
            poster: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/iA5nYOO9L3KuM6uP5chzFrh6vdk.jpg",
            date: "May 3, 2021",
            score: 1,
            vote: 2,
            id: '3'
        },
        {
            name: "Aria the Crepuscolo",
            poster: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/iA5nYOO9L3KuM6uP5chzFrh6vdk.jpg",
            date: "May 3, 2021",
            score: 1,
            vote: 2,
            id: '4'
        },
    ]*/

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        getPopularFirstTime();
    }, []);

    const getPopularFirstTime = async () => {
        try {
            if (movies.length === 0) {
                let data = await tmdb.movie.popular();
                setMovies(data.results);
            }
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <View>
            { movies.length > 0 ?
                <MovieList movies={ movies }/>
                : <></>
            }
        </View>
    )
}
