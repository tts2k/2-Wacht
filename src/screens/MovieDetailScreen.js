import React, { useReducer, useEffect } from "react";
import { StyleSheet, Image, ScrollView } from 'react-native';
import { View, Text } from "react-native";
import { WebView } from "react-native-webview";
import { colors } from '../styles';
import { genres } from '../constants'
import { useDispatch } from "react-redux";
import { OPEN_LINK } from "../store/taskTypes";
import { tmdb, getImageUrl } from "../utilities";
import { HorizontalList } from "../components/List/HorizontalList";
import { SimilarCard } from "../components/Card/SimilarCard";
import { CastCard } from "../components/Card/CastCard";

export const MovieDetailScreen = ({ route }) => {  
  
    let initialState = {
        similar: [],
        videoUri: '',
        cast: []
    }
    const reducer = (state, newState) => ({ ...state, ...newState })
    const [state, setState] = useReducer(reducer, initialState);
    const dispatch = useDispatch();
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
        tmdb.movie.details(data.id, { append_to_response: 'videos,similar,credits' })
        .then((res) => {
            let video = res.videos.results.filter(e => e.type === "Trailer")[0];
            let videoUri = '';
            if (video&& video.site === "YouTube") {
                videoUri = `https://www.youtube.com/embed/${video.key}`;
            }
            else if (video && video.site === "Vimeo") {
                videoUri = `https://player.vimeo.com/video/${video.key}`
            }
            setState({
                similar: res.similar.results,
                videoUri: videoUri,
                cast: res.credits.cast
            });
        })
        .catch((error) => {
            console.error(error);
        })
    },[])

    dispatch({ type: OPEN_LINK, payload: `https://www.themoviedb.org/movie/${data.id}` })

    const genre2 = gensName.join(', ');

    const similarRenderItem = ({ item }) => {
        return ( <SimilarCard movie={ item }/> );
    }

    const castRenderItem = ({ item }) => {
        return ( <CastCard cast={ item }/> )
    }

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

                    <Text style={ styles.sectionName }>Trailer: </Text>
                    { state.videoUri !== '' &&
                        <WebView
                            allowsFullscreenVideo
                            allowsInlineMediaPlayback
                            mediaPlaybackRequiresUserAction
                            javaScriptEnabled
                            style={{ width: '100%', height: 200 }}
                            source={{ uri: state.videoUri }}
                        />
                    }

                    <Text style={ styles.sectionName }>Cast: </Text>
                    <HorizontalList data={ state.cast } renderItem={ castRenderItem } />

                    <Text style={ styles.sectionName }>Similar Movies: </Text>
                    <HorizontalList data={ state.similar } renderItem={ similarRenderItem } />
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
        marginTop: 10,
        marginBottom: 5
    },
  });
