import React, { useState, useEffect } from "react";
import { StyleSheet, Image, ScrollView } from 'react-native';
import { View, Text } from "react-native";
import { colors } from '../styles';
import { genres } from '../constants'
import { useDispatch } from "react-redux";
import { OPEN_LINK } from "../store/taskTypes";
import { tmdb, getImageUrl } from "../utilities";
import { SimliarList } from "../components/List/SimilarList";

export const MovieDetailScreen = ({ route }) => {  
  
    const dispatch = useDispatch();
    const [similar, setSimilar] = useState([]);
    const [video, setVideo] = useState('');
    let data = route.params.movie;
    data.genre = data.genre_ids;
    let gensName = [];

    for (let i = 0; i < genres.length; i++) {
      for (let j = 0; j < data.genre.length; j++) {
        if(genres[i].id == data.genre[j])
          gensName.push(genres[i].name);
      }
    }

    useEffect(() => {
        tmdb.movie.similar(data.id, { page: 1 }).then((res) => {
            let newArr = [...res.results];
            setSimilar(newArr);
        });
        tmdb.movie.videos(data.id).then((res) => {
             
        });
    },[])

    dispatch({ type: OPEN_LINK, payload: `https://www.themoviedb.org/movie/${data.id}` })

    const genre2 = gensName.join(', ');

    return (
    <View>
        <ScrollView style={ styles.container }>
            <Image source={{ uri: getImageUrl(data.backdrop_path, true) }} style={ styles.backdrop } />
            <View style={ styles.innerContainer }>
                <Image source={{ uri: getImageUrl(data.poster_path, false) }} style={ styles.poster }/>
                <Text style={{ fontSize: 24, color: colors.foreground, textAlign: "center",  fontWeight: 'bold', marginTop: 20 }}> { data.title + '\n'}</Text>
                <View style={ styles.columnView }>
                    <Text style={ [styles.attrName, styles.columnViewItemLeft] }>Score: </Text>
                    <Text style={ [styles.attrDetail, styles.columnViewItemRight] }>{ data.score }</Text>        
                    <Text style={ [styles.attrName, styles.columnViewItemLeft] }>Release: </Text>
                    <Text style={ [styles.attrDetail, styles.columnViewItemRight]}>{ data.release_date }</Text>        
                    <Text style={ [styles.attrName, styles.columnViewItemLeft] }>Genre:</Text>
                    <Text style={ [styles.attrDetail, styles.columnViewItemRight] }>{ genre2 }</Text>        
                </View>
                <Text style={ styles.sectionName }>Overview: </Text>
                <Text style={ styles.attrDetail }>{ data.overview }</Text>
                <Text style={ styles.sectionName }>Simliar: </Text>
                <SimliarList movies={ similar } />
            </View>
    </ScrollView>

  </View>
);
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        width: '100%',
        height: '100%',
    },
    innerContainer: {
        paddingLeft: 20,
        paddingRight: 20
    },
    backdrop: {
        width: '100%',
        height: 200,
        position: "absolute",
        opacity: 0.3,
    },  
    poster: {
        width: 200,
        height: 300,
        alignSelf: 'center',
        marginTop: 100
    },
    image: {
        width: 200,
        height: 200,
        margin: 5,
        resizeMode: 'contain',
    },  
    textCenter: {
        textAlign: 'center',
    },
    scrollView: {
        marginHorizontal: 20,
        marginBottom: 15
    },
    columnView: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start'
    },
    columnViewItemLeft: {
        width: '20%'
    },
    columnViewItemRight: {
        width: '80%'
    },
    attrName: {
        color: colors.foreground,
        fontWeight: 'bold',
    },
    attrDetail: {
        color: colors.foreground,
    },
    sectionName: {
        color: colors.foreground,
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10
    },
  });
