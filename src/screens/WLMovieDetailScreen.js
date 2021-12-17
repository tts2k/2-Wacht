import React, { useEffect, useReducer }from "react";
import { StyleSheet, Image, ScrollView, Button, Linking } from "react-native";
import { View, Text } from "react-native";
import { colors } from "../styles";
import { genres } from "../constants";
import { getMovie } from "../utilities/sqlite";

export const WLMovieDetailScreen = ({ route }) => {
    let initialState = {
        id: "",
        name: "",
        score: "",
        date: "",
        overview: "",
        backdrop: "",
        gensName: ""
    }

    const reducer = (state, newState) => ({ ...state, ...newState });
    const [state, setState] = useReducer(reducer, initialState);

    useEffect(() => {
        getMovieDetail()
    },[])

    const getMovieDetail = async () => {
        id = route.params.id;
        let res = await getMovie(id);
        let parsedGenre = JSON.parse(res.genre);
        let gensName = [];
        parsedGenre.forEach((e) =>{
            let gen = genres.filter((f => f.id === e));
            gensName.push(gen[0].name);
        })
        setState({
            name: res.name,
            score: res.score,
            date: res.release_date,
            id: res.id,
            overview: res.synopsis,
            backdrop: res.backdrop,
            genres: gensName.toString().split(',').join(', ')
        })
    }
    
 

    return (
        <View>
            <View style={styles.container}>
                <Text
                    style={{
                        fontSize: 24,
                        color: colors.foreground,
                        textAlign: "center",
                        fontWeight: "bold",
                        marginTop: 20,
                    }}
                >
                    {" "}
                    {state.name + "\n"}
                </Text>
                <Image source={{ uri: `data:image/jpg;base64,${state.backdrop}`}} style={ styles.backdrop }/>

                <Text
                    style={{
                        fontSize: 20,
                        color: colors.foreground,
                        marginBottom: 10,
                    }}
                >
                    <Text style={{ fontWeight: "bold" }}>Score:</Text>
                    <Text>{" " + state.score}</Text>
                </Text>

                <Text
                    style={{
                        fontSize: 20,
                        color: colors.foreground,
                        marginBottom: 10,
                    }}
                >
                    <Text style={{ fontWeight: "bold" }}>Release:</Text>
                    <Text>{" " + state.date}</Text>
                </Text>

                <Text
                    style={{
                        fontSize: 20,
                        color: colors.foreground,
                        marginBottom: 10,
                    }}
                >
                    <Text style={{ fontWeight: "bold" }}>Genre:</Text>
                    <Text>{" " + state.genres}</Text>
                </Text>

                <Text
                    style={{
                        fontSize: 20,
                        color: colors.foreground,
                        marginBottom: 10,
                        fontWeight: "bold",
                    }}
                >
                    Overview:{" "}
                </Text>

                <View>
                    <ScrollView style={styles.scrollView}>
                        <Text
                            style={{ fontSize: 18, color: colors.foreground }}
                        >
                            {state.overview}
                        </Text>
                    </ScrollView>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        width: "100%",
        height: 207,
        paddingLeft: 20,
        paddingRight: 20,
    },
    backdrop: {
        height: "100%",
        resizeMode: "contain",
        marginBottom: 20,
    },
    image: {
        width: 200,
        height: 200,
        margin: 5,
        resizeMode: "contain",
    },
    textCenter: {
        textAlign: "center",
    },
    scrollView: {
        marginHorizontal: 20,
        height: 105,
        marginBottom: 15,
    },
});
