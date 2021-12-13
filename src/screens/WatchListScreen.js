import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { WLMovieList } from "../components/List/WLMovieList"
import { getAllMovies } from "../utilities/sqlite";

export const WatchListScreen = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        getListMovies()
    }, []);

    const getListMovies = async () => {
        let movies = await getAllMovies();
        let moviesList = movies.rows._array;
        setMovies([...moviesList]);
    };
    
    return (
        <View>
            <WLMovieList movies={ movies } showSpinner={ false } loadMoreMovies={ () => { return; } }/>
        </View>
    )
}
