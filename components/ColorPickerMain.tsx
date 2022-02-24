import React, { useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import ColorPicker from "./ColorPicker";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const COLORS = [
  "red",
  "orange",
  "yellow",
  "cyan",
  "green",
  "blue",
  "indigo",
  "violet",
  "black",
  "gray",
  "white",
];

const ColorPickerMain = () => {
  const colorpicker = useSharedValue<string | number>(COLORS[0]);

  const rstyle = useAnimatedStyle(() => {
    return {
      backgroundColor: colorpicker.value,
    };
  });

  const oncolorchange = useCallback((color: string | number) => {
    "worklet";
    colorpicker.value = color;
  }, []);

  return (
    <>
      <StatusBar style='light' />
      <View style={styles.topSection}>
        <Animated.View style={[styles.topCircle, rstyle]}></Animated.View>
      </View>
      <View style={styles.bottomSection}>
        <ColorPicker COLORS={COLORS} onColorChange={oncolorchange} />
      </View>
    </>
  );
};

export default ColorPickerMain;

const styles = StyleSheet.create({
  topSection: {
    flex: 3,
    backgroundColor: "#252525",
    justifyContent: "center",
    alignItems: "center",
  },
  topCircle: {
    height: 200,
    width: 200,
    borderRadius: 400,
    borderWidth: 5,
    borderColor: "#fff",
    // backgroundColor:'red'
  },
  bottomSection: {
    flex: 1,
    backgroundColor: "#151515",
    justifyContent: "center",
    alignItems: "center",
  },
});
