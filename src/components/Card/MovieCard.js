import React from 'react';
import { Text, View, Image } from 'react-native';
import { styles as S } from './styles';

export const MovieCard = ({ movie, type }) => {
    const onlineCard = (
        <View style={ S.container }>
            <Image source={{ uri: movie.poster }} style={ S.poster }/>
            <View style={ S.body }>
                <Text style={ S.title }>{ movie.name }</Text>
                <Text style={ S.bodyText }>{ movie.date }</Text>
                <Text style={ S.bodyText }>Score: { movie.score * 100 }% ({ movie.vote })</Text>
            </View>
        </View>
    )

    if (type === 'online') {
        return onlineCard;
    }
}
