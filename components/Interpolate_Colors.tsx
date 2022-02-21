import { StyleSheet, View, Text } from "react-native";
import React, { useState } from "react";
import { Switch } from "react-native-gesture-handler";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { StatusBar } from "expo-status-bar";



type themes = "light" | "dark";
const color = {
  dark: {
    background: "#1E1E1E",
    circle: "#252525",
    text: "#F8F8F8",
  },
  light: {
    background: "#F8F8F8",
    circle: "#fff",
    text: "#1E1E1E",
  },
};


const THEME_COLORS = {
  true: "rgba(66,133,244,0.4)",
  false: "rgba(0,0,0,0.1)",
};


export default function Interpolate_Colors() {

  const [theme, setTheme] = useState<themes>("light");


  const p = useDerivedValue(() => {
    return theme === "dark" ? withTiming(1) : withTiming(0);
  }, [theme]);


  const RStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      p.value,
      [0, 1],
      [color.light.background, color.dark.background]
    );

    return { backgroundColor };
  });


  const RCircleStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      p.value,
      [0, 1],
      [color.light.circle, color.dark.circle]
    );

    return { backgroundColor };
  });


  const RTextStyle = useAnimatedStyle(() => {
    const c = interpolateColor(
      p.value,
      [0, 1],
      [color.light.text, color.dark.text]
    );

    return { color:c };
  });

  return (
    <Animated.View style={[styles.main, RStyle]}>
      {theme === "dark" ? (
        <StatusBar style='light' />
      ) : (
        <StatusBar style='dark' />
      )}


        <Animated.Text style={[styles.text,RTextStyle]}>{theme==='dark'?'DARK':'LIGHT'}</Animated.Text>

      <Animated.View style={[styles.circle,RCircleStyle]}>
        <Switch
          value={theme === "dark"}
          onValueChange={(toggle) => {
            setTheme(toggle ? "dark" : "light");
          }}
          trackColor={THEME_COLORS}
          thumbColor={"rgba(66,133,244,1)"}
        />
      </Animated.View>

    </Animated.View>
  );
}
const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    height: 300,
    width: 300,
    borderRadius: 300,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:'#fff',
    elevation: 28,
    shadowColor:'rgba(0,0,0,0.4)',
    // shadowColor:'rgba(0,0,256,0.4)'
  },
  text:{
    fontSize:60,
    fontWeight:'700',
    letterSpacing:20,
  }
});
