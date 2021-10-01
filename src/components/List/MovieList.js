import React from 'react';
import { FlatList, ActivityIndicator, View } from 'react-native';
import { MovieCard } from '../Card/MovieCard';
import { colors } from '../../styles'
import { styles as S } from './styles'

export const MovieList = ({ movies, loadMoreMovies, showSpinner}) => {
    const renderItem = ({ item }) => (
        <MovieCard movie={ item } />
    )
    
    const footer = () => {
        if (showSpinner) {
            return (
                <ActivityIndicator size="small" color={ colors.primary } />
            )
        }
        else 
            return (<></>)
    }

    return (
        <>
            <View>
                <FlatList 
                    data={ movies }
                    renderItem={ renderItem }
                    keyExtractor={ (item,index) => `${index}${item.id}` }
                    ListFooterComponent={ footer }
                    onEndReached={ loadMoreMovies }
                    onEndReachedThreshold={ 0.7 }
                />
            </View>
        </>
    )
}
