import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { WLMovieList } from "../components/List/WLMovieList"
import { getAllMovies } from "../utilities/sqlite";
import { useSelector } from "react-redux"

export const WatchListScreen = () => {
    const [movies, setMovies] = useState([]);
    const refresh = useSelector((state) => state.watchListState);

    useEffect(() => {
        getListMovies()
    }, [refresh]);

    const getListMovies = async () => {
        let movies = await getAllMovies();
        let moviesList = movies.rows._array;
        setMovies([...moviesList]);
    };
    
    return (
        <View>
            <WLMovieList movies={ movies } showSpinner={ false }/>
        </View>
    )
}
