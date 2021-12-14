import React from 'react';
import { Text, TouchableOpacity, Image, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles as S } from './styles';

export const MovieCard = ({ movie }) => {
    const navigation = useNavigation();
    const openDetailScreen = () => {
        navigation.navigate('Movie Detail', { id: movie.id , title: movie.title, poster_path: movie.poster_path, backdrop_path: movie.backdrop_path,  
            score: movie.score, release_date: movie.release_date, genre: movie.genre_ids, overview: movie.overview });
    }

    return (
        <TouchableOpacity style={ S.container } onPress={ openDetailScreen }>
            <Image source={{ uri: movie.poster_path }} style={ S.poster }/>
            <View style={ S.body }>
                <Text style={ S.title } numberOfLines={2}>{ movie.title }</Text>
                <Text style={ S.bodyText }>{ movie.release_date }</Text>
                <Text style={ S.bodyText }>Score: { movie.score }</Text>
                <View>
                    <Text style={ S.bodyText } numberOfLines={4}>{ movie.overview }</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

