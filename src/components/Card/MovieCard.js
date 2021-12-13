import React from 'react';
import { Text, TouchableOpacity, Image, View, ToastAndroid } from 'react-native';
import Menu, { MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu'
import { useNavigation } from '@react-navigation/native';
import { styles as S, optionsStyles} from './styles';
import { insertMovie } from '../../utilities/sqlite';

export const MovieCard = ({ movie }) => {
    let menu;
    const navigation = useNavigation();

    const openDetailScreen = () => {
        navigation.navigate('Movie Detail', { id: movie.id });
    }

    const addToLocalList = () => {
        insertMovie(movie);
        ToastAndroid.show("Added to local list", ToastAndroid.SHORT)
    }

    const openMenu = () => {
        menu.open();
    }

    const onRef = r => {
        menu = r;
    }

    return (
        <TouchableOpacity style={ S.container } onPress={ openDetailScreen } onLongPress={ () => openMenu() }>
            <Image source={{ uri: movie.poster_path }} style={ S.poster }/>
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
                <MenuOptions customStyles={ optionsStyles }>
                    <MenuOption onSelect={ () => addToLocalList() } value={1} text="Add to watch list" />
                </MenuOptions>
            </Menu>
        </TouchableOpacity>
    );
}
