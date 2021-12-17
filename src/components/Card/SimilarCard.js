import React from 'react';
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import { styles as S } from './styles'

export const SimilarCard = ({ movie }) => {

    const openLink = () => {
        Linking.openURL(`https://www.themoviedb.org/movie/${ movie.id }`)
            .catch(err => console.error("Couldn't load page", err));
    }

    return (
        <TouchableOpacity onPress={ () => openLink() }>
            <View style={ S.similarContainer }>
                <Image source={{ uri: `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}` }} style={ S.similarImage }/>
                <Text style={ S.smallTitle }>{ movie.title + '\n' } ({ movie.release_date.slice(0,4) })</Text>
            </View>
        </TouchableOpacity>
    )
}
