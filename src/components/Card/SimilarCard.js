import React from 'react';
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import { styles as S } from './styles'
import { useNavigation } from '@react-navigation/native';
import { HorizontalCard } from './HorizonalCard';

export const SimilarCard = ({ movie }) => {
    const navigation = useNavigation();

    const openDetailScreen = () => {
        navigation.push("Movie Detail", { movie: movie });
    }

    const image = ( 
        <Image 
            source={{ uri: `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}` }} 
            style={ S.horizontalCardImage }
        />)

    const text = (
        <Text style={ S.smallTitle }>
            { movie.title + '\n' } ({ movie.release_date.slice(0,4) })
        </Text>
    )

    return (
        <HorizontalCard 
            image={ image }
            text={ text }
            onPress={ openDetailScreen }
        />
    )
}
