import React, { useState } from "react";
import { View, Text, StyleSheet, Button, TextInput } from "react-native";
import { colors } from '../styles';
import { tmdb, formatDate } from '../utilities';

export const WatchListScreen = () => {
    const [movies, setMovies] = useState([]);
    const [adding, setAdding] = useState(false);
    const [title, setTitle] = useState('');
    const [year, setYear] = useState('');
    
    const fetchData = async () => {
        try{
            let movieYear = parseInt(year);
            let data = await tmdb.search.movies({
                query: title,
                page: 1,
                year: movieYear
            });
            data.results.forEach((e) => {
                    e.poster_path= `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${e.poster_path}`
                    e.release_date = formatDate(e.release_date) ;
                    e.score = `${e.vote_average * 10}% (${e.vote_count})`
            });
            if(movies.length >= 1){
                let tempArr = [...movies];
                tempArr.push(...data.results);
                setMovies([...tempArr]);
            }else{
                setMovies([...data.results]);
            }
        }catch (error) {
        }
        setAdding(false);
        setTitle('');
        setYear('');
    }

    const titleHandler = (value) => {
        setTitle(value);
    }

    const yearHandler = (value) => {
        setYear(value);
    }

    const cancelAdd = () => {
        setAdding(false);
    }
    
    return (
        <View>
            <Button title="Add" onPress={() => setAdding(true)}/>
            <Button title="View Stats" onPress={openStatsScreen}/>
            <View style={adding ? styles.form : styles.hidden}>
                <Text style={{color: colors.foreground}}>Title</Text>
                <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1, color: colors.foreground}} value={title} onChangeText={titleHandler}></TextInput>
                <Text style={{color: colors.foreground}}>Year</Text>
                <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1, color: colors.foreground}} value={year} onChangeText={yearHandler}></TextInput>
                <Button title="Fetch Data" onPress={fetchData}/>
                <Button style={{paddingVertical: 10}} title="Cancel" onPress={cancelAdd}/>
            </View>
        </View>
    )
    
    const styles = StyleSheet.create({
        hidden:{
            display: "none"
        },
        form: {
            margin: 30
        }
    });
}
