import React from 'react';
import { Text, TouchableOpacity, Image, View } from 'react-native';
import { styles as S } from './styles';

export const MovieCard = ({ movie }) => {
    return (
        <TouchableOpacity style={ S.container }>
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
