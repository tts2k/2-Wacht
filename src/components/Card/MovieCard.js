import React from 'react';
import { Text, View, Image } from 'react-native';
import { styles as S } from './styles';

export const MovieCard = ({ movie, type }) => {
    const placeholderMovie = {
        name: "Aria the Crepuscolo",
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/iA5nYOO9L3KuM6uP5chzFrh6vdk.jpg",
        date: "May 3, 2021",
        score: 1,
        vote: 2
    }

    const onlineCard = (
        <View style={ S.container }>
            <Image source={{ uri: placeholderMovie.poster }} style={ S.poster }/>
            <View style={ S.body }>
                <Text style={ S.title }>{ placeholderMovie.name }</Text>
                <Text style={ S.bodyText }>{ placeholderMovie.date }</Text>
                <Text style={ S.bodyText }>Score: { placeholderMovie.score * 100 }% ({ placeholderMovie.vote })</Text>
            </View>
        </View>
    )

    if (type === 'online') {
        return onlineCard;
    }
}
