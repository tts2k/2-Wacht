import React from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import { MovieCard } from '../Card/MovieCard';
import { styles as S } from './styles';

export const MovieList = ({ movies, getMoreMovie }) => {
    const renderItem = ({ item }) => (
        <MovieCard movie={ item } />
    )

    return (
        <SafeAreaView style={ S.container }>
            <FlatList 
                data={ movies }
                renderItem={ renderItem }
                keyExtractor={ (item,index) => `${index}${item.id}` }
                onEndReached={ getMoreMovie }
            />
        </SafeAreaView>
    )
}
