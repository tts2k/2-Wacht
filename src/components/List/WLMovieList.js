import React from 'react';
import { FlatList, ActivityIndicator, View } from 'react-native';
import { WLMovieCard } from '../Card/WLMovieCard';
import { colors } from '../../styles'

export const WLMovieList = ({ movies, showSpinner}) => {
    const renderItem = ({ item }) => (
        <WLMovieCard key={item.id} movie={ item } />
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
                    onEndReachedThreshold={ 0.7 }
                />
            </View>
        </>
    )
}
