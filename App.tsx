import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withRepeat,
} from "react-native-reanimated";
import {
  Bottomsheet,
  ClockLoader,
  ColorPickerMain,
  DoubleTap_Like,
  Interpolate,
  Interpolate_Colors,
  LayoutAnimation,
  PanGes,
  PinchGes,
  ProgressBar,
  Sview,
  SwipeDelete,
} from "./components";

export default function App() {
  const progress = useSharedValue(1);
  const scale = useSharedValue(1);
  const deg = useSharedValue(0);

  const rStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      transform: [{ scale: scale.value }, { rotate: deg.value + "deg" }],
      // backgroundColor:color.value
    };
  }, []);

  useEffect(() => {
    // progress.value = withRepeat(withTiming(0),Infindity,true);
    scale.value = withRepeat(withSpring(5), Infinity, true);
    deg.value = withRepeat(withSpring(90), Infinity, true);
    // color.value = withRepeat(withSpring("#fff"),Infinity,true)
  }, []);

  return (
    // <View style={styles.container}>
    //   <Animated.View style={[styles.box, rStyle]} />
    // </View>

    // Pan Gesture Handler

    <GestureHandlerRootView style={styles.forpan}>
      <StatusBar style='inverted' />
      {/* <PanGes/> */}

      {/* Interpolate Colors */}
      {/* <Interpolate_Colors/> */}

      {/*Pinch Gesture Handler*/}
      {/* <PinchGes/> */}

      {/*DoubleTap like Instagram */}
      {/* <DoubleTap_Like/> */}

      {/*ScrollView from scrach */}
      {/* <Sview/> */}

      {/* Color Picker */}
      {/*  <ColorPickerMain /> */}

      {/* Circular Progress Bar */}
      {/* <ProgressBar/> */}

      {/*ClockLoader*/}
      {/* <ClockLoader/> */}

      {/*Layout Animation */}
      {/* <LayoutAnimation/> */}

      {/*Swipe To Delete */}
      {/* <SwipeDelete/> */}

      {/* bottonSheet */}
      <Bottomsheet />
    </GestureHandlerRootView>

    //interpolate
    // <>
    //  {/* <StatusBar style="dark" /> */}
    //   <Interpolate/>
    //   </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    height: 50,
    width: 50,
    backgroundColor: "#7A0BC0",
    borderRadius: 5,
  },
  text: {
    color: "#fff",
    fontSize: 50,
  },
  forpan: {
    flex: 1,
  },
});
