import React, { useState, useEffect } from "react";
import { StyleSheet, Image, ScrollView } from 'react-native';
import { View, Text } from "react-native";
import { colors } from '../styles';
import { genres } from '../constants'
import { useDispatch } from "react-redux";
import { OPEN_LINK } from "../store/taskTypes";
import { tmdb } from "../utilities";
import { SimliarList } from "../components/List/SimilarList";

export const MovieDetailScreen = ({ route }) => {  
  
  const dispatch = useDispatch();
  const [similar, setSimilar] = useState([]);
  let data = route.params;
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
    },[])

  dispatch({ type: OPEN_LINK, payload: `https://www.themoviedb.org/movie/${data.id}` })

  const genre2 = gensName.join(', ');

  return (
    <View>
      <ScrollView style={ styles.container }>
        <Text style={{ fontSize: 24, color: colors.foreground, textAlign: "center",  fontWeight: 'bold', marginTop: 20 }}> { data.title + '\n'}</Text>
        <Image source={{ uri: `https://image.tmdb.org/t/p/w500` + `${data.backdrop_path}`}} style={ styles.backdrop } />

        <Text style={{ fontSize: 16, color: colors.foreground, marginBottom: 10 }}>
          <Text style={ {fontWeight: 'bold'} }>
            Score: 
          </Text>
          <Text>
             { ' ' + data.score }
           </Text>        
        </Text>

        <Text style={{ fontSize: 16, color: colors.foreground, marginBottom: 10 }}>
          <Text style={ {fontWeight: 'bold'} }>
            Release: 
          </Text>
          <Text>
             { ' ' + data.release_date }
           </Text>        
        </Text>

        <Text style={{ fontSize: 16, color: colors.foreground, marginBottom: 10 }}>
          <Text style={ {fontWeight: 'bold'} }>
            Genre: 
          </Text>
          <Text>
            
             { ' ' + genre2 }
           </Text>        
        </Text>

        <Text style={{  fontSize: 20, color: colors.foreground, marginBottom: 10, fontWeight: 'bold' }}>Overview: </Text>
          
        <View >
          <View style={styles.scrollView}>
              <Text style={{fontSize: 18, color: colors.foreground }}>{ data.overview }</Text>
          </View>
        </View>
       <Text style={{  fontSize: 20, color: colors.foreground, marginBottom: 10, fontWeight: 'bold' }}>Simliar: </Text>
        <SimliarList movies={ similar } />
      </ScrollView>

  </View>
);
};

const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      width: '100%',
      height: '100%',
      paddingLeft: 20,
      paddingRight: 20
    },
    backdrop: {
      width: '100%',
      height: 200,
      resizeMode: 'contain',
      marginBottom: 20   
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
    }
  });
