import React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import Animated, { useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated";
import ParticularPage from "./ParticularPage";

const {width} = Dimensions.get('window');
export default function Interpolate() {
  const words = ["WHAT'S", "UP", " REACT\nNATIVE", "COMMUNITY","✌️🤩"];
  const transX = useSharedValue(0);
  const scrollhandeler = useAnimatedScrollHandler((e) => {
    transX.value = e.contentOffset.x;
  });

  return (
    <Animated.ScrollView
      horizontal
      onScroll={scrollhandeler}
      scrollEventThrottle={16}
      style={styles.mainpage}

    >
      {words.map((title, index) => {
        return (
          <ParticularPage key={index.toString()} title={title} i={index} translateX={transX} />
        );
      })}
    </Animated.ScrollView>
  );
}


const styles = StyleSheet.create({
  mainpage: {
    flex: 1,
    backgroundColor: "#fff",
  },
  text: {
    color: "#fff",
  },
});
