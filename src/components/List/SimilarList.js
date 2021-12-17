import React from 'react';
import { FlatList, View } from 'react-native';
import { colors } from '../../styles'
import { SimilarCard } from '../Card/SimilarCard';

export const SimliarList = ({ movies }) => {
    const renderItem = ({ item }) => (
        <SimilarCard movie={ item }/>
    )
    
    return (
        <>
            <View>
                <FlatList 
                    data={ movies }
                    horizontal={ true }
                    renderItem={ renderItem }
                    keyExtractor={ (item,index) => `${index}${item.id}` }
                />
            </View>
        </>
    )
}
