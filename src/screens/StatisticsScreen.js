import React, {useReducer, useEffect} from "react";
import { View, Text, StyleSheet, Button} from "react-native";
import { colors } from '../styles';
import {SQLite} from 'expo-sqlite';

export const StatsScreen = () => {
    let initialState = {
        numMovies: 0,
        numWatched: 0,
        numPlanned: 0,
        numDropped: 0
    }
    const reducer = (state, newState) => ({ ...state, ...newState });
    const [state, setState] = useReducer(reducer, initialState);

    useEffect(() => {
        getBasicStats();
    }, [])

    const getBasicStats = () => {
        let db = null;
        try{
            db = SQLite.openDatabase('wl.db');
              db.transaction(function(tx) {
                  tx.executeSql("SELECT COUNT(*) FROM Movies", [],
                  function(tx, result) {
                      setState({numMovies: result.rows.item(0)["count(*)"]});
                  },
                  function(tx, error){
                  }
                  );
              });
              db.transaction(function(tx) {
                tx.executeSql("SELECT COUNT(*) FROM Movies WHERE status = 'Planned'", [],
                function(tx, result) {
                    setState({numPlanned: result.rows.item(0)["count(*)"]});
                },
                function(tx, error){
                }
                );
            });
            db.transaction(function(tx) {
                tx.executeSql("SELECT COUNT(*) FROM Movies WHERE status = 'Watched'", [],
                function(tx, result) {
                    setState({numWatched: result.rows.item(0)["count(*)"]});
                },
                function(tx, error){
                }
                );
            });
            db.transaction(function(tx) {
                tx.executeSql("SELECT COUNT(*) FROM Movies WHERE status = 'Dropped'", [],
                function(tx, result) {
                    setState({numDropped: result.rows.item(0)["count(*)"]});
                },
                function(tx, error){
                }
                );
            });
        }catch(error){
      console.log("Operation(s) could not be completed");
        }
    }

    return(
        <View>
            <Text>Basic Statistics</Text>
            <View>
                <Text>No. of Movies: {state.numMovies}</Text>
                <Text>No. of Watched Movies: {state.numWatched}</Text>
                <Text>No. of Planned Movies: {state.numPlanned}</Text>
                <Text>No. of Dropped Movies: {state.numDropped}</Text>
            </View>
        </View>
    )
}
