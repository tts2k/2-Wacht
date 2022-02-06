import React from 'react';
import { Text, TouchableOpacity, Image, View, ToastAndroid } from 'react-native';
import Menu, { MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu'
import { useNavigation } from '@react-navigation/native';
import { styles as S } from './styles';
import { popupStyles } from '../../styles'
import { db, getImageUrl } from '../../utilities';
import { useDispatch } from 'react-redux';
import { INSERT_MOVIE } from '../../store/taskTypes'

export const MovieCard = ({ movie }) => {
    let menu;
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const openDetailScreen = () => {
        navigation.navigate('Movie Detail', { movie: movie });
    }

    const addToLocalList = async () => {
        try {
            await db.insertMovie(movie);
            dispatch({ type: INSERT_MOVIE })
            ToastAndroid.show("Added to local list", ToastAndroid.SHORT)
        } catch (error) {
            if (error.message.startsWith("UNIQUE")) {
                ToastAndroid.show("You have already added this movie to your list", ToastAndroid.SHORT);
            }
        }
    }

    const openMenu = () => {
        menu.open();
    }

    const onRef = r => {
        menu = r;
    }

    return (
        <TouchableOpacity style={ S.container } onPress={ openDetailScreen } onLongPress={ () => openMenu() }>
            <Image source={{ uri: getImageUrl(movie.poster_path) }} style={ S.poster }/>
            <View style={ S.body }>
                <Text style={ S.title } numberOfLines={2}>{ movie.title }</Text>
                <Text style={ S.bodyText }>{ movie.release_date }</Text>
                <Text style={ S.bodyText }>Score: { movie.score }</Text>
                <View>
                    <Text style={ S.bodyText } numberOfLines={4}>{ movie.overview }</Text>
                </View>
            </View>
            <Menu ref={ onRef }>
                <MenuTrigger text=''/>
                <MenuOptions customStyles={ popupStyles }>
                    <MenuOption onSelect={ () => addToLocalList() } value={1} text="Add to watch list" />
                </MenuOptions>
            </Menu>
        </TouchableOpacity>
    );
}

