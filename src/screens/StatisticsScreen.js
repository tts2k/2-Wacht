import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { colors } from '../styles';
import { db } from '../utilities'
import { useSelector } from 'react-redux';
import { PieChart } from 'react-native-chart-kit';
import { useWindowDimensions } from 'react-native';

export const StatisticsScreen = () => {
    const initialState = [
      {
        name: "Watched",
        num: 0,
        color: colors.red,
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      },
      {
        name: "Planned",
        num: 0,
        color: colors.yellow,
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      },
      {
        name: "Dropped",
        num: 0,
        color: colors.green,
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      },
    ];

    const [state, setState] = useState(initialState);
    const refresh = useSelector((state) => state.watchListState)
    const window = useWindowDimensions();

    useEffect(() => {
        getBasicStats();
    }, [refresh])

    const getBasicStats = async () => {
        let res = await db.getStats();
        setState([
            {
                name: "Watched",
                num: res.watched,
                color: colors.red,
                legendFontColor: "#7F7F7F",
                legendFontSize: 15
            },
            {
                name: "Planned",
                num: res.planned,
                color: colors.yellow,
                legendFontColor: "#7F7F7F",
                legendFontSize: 15
            },
            {
                name: "On-Hold",
                num: res.onhold,
                color: colors.green,
                legendFontColor: "#7F7F7F",
                legendFontSize: 15
            },
        ])
    }


    const chartConfig = {
        backgroundColor: "#e26a00",
        backgroundGradientFrom: "#fb8c00",
        backgroundGradientTo: "#ffa726",
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    }

    return(
        <View>
            <Text style={{color: colors.foreground, fontSize: 30, textAlign: 'center'}}>Statistics</Text>
            <PieChart
              data={ state }
              width={ window.width }
              height={ 300 }
              chartConfig={ chartConfig }
              accessor={ "num" }
              backgroundColor={ "transparent" }
              paddingLeft={ "15" }
              center={ [10, 10] }
              absolute
            />
        </View>
    )
}
