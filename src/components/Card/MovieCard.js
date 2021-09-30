import React from 'react';
import { Text, View, Image, ScrollView } from 'react-native';
import { styles as S } from './styles';
import { formatDate } from '../../utilities';

export const MovieCard = ({ movie, type }) => {
    const posterUri = `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`
    const overview = movie.overview.length >= 220
        ? movie.overview.substring(0, 200) + '...'
        : movie.overview;

    const onlineCard = (
        <View style={ S.container }>
            <Image source={{ uri: posterUri }} style={ S.poster }/>
            <View style={ S.body }>
                <Text style={ S.title }>{ movie.original_title }</Text>
                <Text style={ S.bodyText }>{ formatDate(movie.release_date) }</Text>
                <Text style={ S.bodyText }>Score: { movie.vote_average * 10 }% ({ movie.vote_count })</Text>
                <View>
                    <Text style={ S.bodyText }>{ overview }</Text>
                </View>
            </View>
        </View>
    )

    if (type === 'online') {
        return onlineCard;
    }
}
