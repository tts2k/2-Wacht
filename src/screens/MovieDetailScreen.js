import React from "react";
import { StyleSheet, Image, ScrollView, Button, Linking } from 'react-native';
import {View, Text } from "react-native";
import { colors } from '../styles';


export const MovieDetailScreen = ({ route }) => {  
  
  let data = route.params;
  let gensName = [];
  let genres = [{"id":28,"name":"Action"}, {"id":12,"name":"Adventure"}, {"id":16,"name":"Animation"}, {"id":35,"name":"Comedy"}, {"id":80,"name":"Crime"}, {"id":99,"name":"Documentary"}, {"id":18,"name":"Drama"}, {"id":10751,"name":"Family"}, {"id":14,"name":"Fantasy"}, {"id":36,"name":"History"}, {"id":27,"name":"Horror"}, {"id":10402,"name":"Music"}, {"id":9648,"name":"Mystery"}, {"id":10749,"name":"Romance"}, {"id":878,"name":"Science Fiction"}, {"id":10770,"name":"TV Movie"}, {"id":53,"name":"Thriller"}, {"id":10752,"name":"War"}, {"id":37,"name":"Western"}]

  for (let i = 0; i < genres.length; i++) {
    for (let j = 0; j < data.genre.length; j++) {
      if(genres[i].id == data.genre[j])
        gensName.push(genres[i].name);
    }
  }

  const genre2 = gensName.slice(0,2);

  return (
    <View>
      <View style={ styles.container }>
        <Text style={{ fontSize: 24, color: colors.foreground, textAlign: "center",  fontWeight: 'bold', marginTop: 20 }}> { data.title + '\n'}</Text>
        <Image source={{ uri: `https://image.tmdb.org/t/p/w500` + `${data.backdrop_path}`}} style={ styles.backdrop } />

        <Text style={{ fontSize: 20, color: colors.foreground, marginBottom: 10 }}>
          <Text style={ {fontWeight: 'bold'} }>
            Score: 
          </Text>
          <Text>
             { ' ' + data.score }
           </Text>        
        </Text>

        <Text style={{ fontSize: 20, color: colors.foreground, marginBottom: 10 }}>
          <Text style={ {fontWeight: 'bold'} }>
            Release: 
          </Text>
          <Text>
             { ' ' + data.release_date }
           </Text>        
        </Text>

        <Text style={{ fontSize: 20, color: colors.foreground, marginBottom: 10 }}>
          <Text style={ {fontWeight: 'bold'} }>
            Genre: 
          </Text>
          <Text>
            
             { ' ' + gensName }
           </Text>        
        </Text>

        <Text style={{  fontSize: 20, color: colors.foreground, marginBottom: 10, fontWeight: 'bold' }}>Overview: </Text>
          
        <View >
          <ScrollView style={styles.scrollView}>
              <Text style={{fontSize: 18, color: colors.foreground }}>{ data.overview }</Text>
          </ScrollView>
        </View>
      </View>

      <View style={{marginTop: 370}}>
          <Button           
            title="More Info"
            color="#adb5bd"
            onPress={() =>{ Linking.openURL(`https://www.themoviedb.org/movie/${data.id}`).catch(err => console.error("Couldn't load page", err))}}
          />
      </View>
  </View>
);
};

const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      width: '100%',
      height: 207,
      paddingLeft: 20,
      paddingRight: 20
    },
    backdrop: {
      height: '100%',
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
      height: 105,
      marginBottom: 15
    }
  });
