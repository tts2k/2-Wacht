import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { WatchListScreen, MovieDetailScreen, StatisticsScreen } from '../screens';
import { movieListScreenOptions } from '../styles';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import { colors, popupStyles } from '../styles';
import { db, generateDateForExport } from '../utilities';
import { StorageAccessFramework, readAsStringAsync } from 'expo-file-system';
import { ToastAndroid } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { useDispatch } from 'react-redux';
import { INSERT_MOVIE } from '../store/taskTypes';
import { useNavigation } from '@react-navigation/native';

const Stack = createStackNavigator();

export const WatchListScreenNavigation = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    let dirPerms = null;

    const exportData = async () => {
        let data = await db.getAllMovies();
        let dataArray = data.rows._array;
        let date = generateDateForExport();

        if (dirPerms === null) {
            dirPerms = await StorageAccessFramework.requestDirectoryPermissionsAsync();
        }
        if (dirPerms.granted) {
            let uri = await StorageAccessFramework.createFileAsync(dirPerms.directoryUri, date, "application/json");
            StorageAccessFramework.writeAsStringAsync(uri, JSON.stringify(dataArray))
            .then(() =>{
                ToastAndroid.show("Watch list exported", ToastAndroid.SHORT);
            })
        }
    }

    const importData = async () => {
        let doc = await DocumentPicker.getDocumentAsync({ 
            type: "application/json",
            copyToCacheDirectory: false
        });
        let dataString = await readAsStringAsync(doc.uri);
        let data = JSON.parse(dataString);
        let promises = [];

        data.forEach((e) => {
            promises.push(db.insertMovieImport(e));
        })

        Promise.all(promises).then(() =>{
            dispatch({ type: INSERT_MOVIE })
            console.log('done');
        })

    }

    const openStatScreen = () => {
        navigation.navigate("Statistics");
    }

    const wlOptions = {
        headerRight: () => (
            <Menu>
                <MenuTrigger>
                    <SimpleLineIcons name="options-vertical" size={ 24 } color={ colors.foreground }/>
                </MenuTrigger>
                <MenuOptions customStyles={ popupStyles }>
                    <MenuOption text="Export" onSelect={ () => exportData() }/>
                    <MenuOption text="Import" onSelect={ () => importData() }/>
                    <MenuOption text="View stats" onSelect={ () => openStatScreen() }/>
                </MenuOptions>
            </Menu>
        )
    }

    return (
        <Stack.Navigator screenOptions={ movieListScreenOptions }>
            <Stack.Screen name="Watch list" component={ WatchListScreen } options={ wlOptions }/>
            <Stack.Screen name="Movie Detail" component={ MovieDetailScreen }/>
            <Stack.Screen name="Statistics" component={ StatisticsScreen }/>
        </Stack.Navigator>
    )
}
