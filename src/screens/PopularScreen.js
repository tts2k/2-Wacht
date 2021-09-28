import React from "react";
import {View, Text, StyleSheet} from "react-native";
import { colors } from '../styles';
import { MovieCard } from '../components/Card/MovieCard'

export const PopularScreen = () => {
    return (
        <View>
            <MovieCard type="online" />
        </View>
    )
}
