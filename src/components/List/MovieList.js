import React from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import { MovieCard } from '../Card/MovieCard'
import { styles as S } from './styles'

export const MovieList = ({ movies }) => {
    const renderItem = ({ item }) => (
        <MovieCard movie={ item } type="online"/>
    )

    return (
        <SafeAreaView style={ S.container }>
            <FlatList 
                data={ movies }
                renderItem={ renderItem }
                keyExtractor={ item => item.id }
            />
        </SafeAreaView>
    )
}
