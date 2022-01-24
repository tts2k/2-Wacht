import React from 'react';
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import { styles as S } from './styles'
import { useNavigation } from '@react-navigation/native';

export const SimilarCard = ({ movie }) => {
    const navigation = useNavigation();

    const openDetailScreen = () => {
        navigation.push("Movie Detail", { movie: movie });
    }

    return (
        <TouchableOpacity onPress={ () => openDetailScreen() }>
            <View style={ S.similarContainer }>
                <Image source={{ uri: `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}` }} style={ S.similarImage }/>
                <Text style={ S.smallTitle }>{ movie.title + '\n' } ({ movie.release_date.slice(0,4) })</Text>
            </View>
        </TouchableOpacity>
    )
}
