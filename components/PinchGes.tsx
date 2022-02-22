import React from "react";
import { StyleSheet, View, Text, Image, Dimensions } from "react-native";
import {
  PinchGestureHandler,
  PinchGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const AnimatedImage = Animated.createAnimatedComponent(Image);
const { height, width } = Dimensions.get("window");
export default function PinchGes() {
  const imgUri =
    "https://images.unsplash.com/photo-1621569642780-4864752e847e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80";
  const scale = useSharedValue(0);
  const focalX = useSharedValue(0);
  const focalY = useSharedValue(0);
  const pinchGestureEvent =
    useAnimatedGestureHandler<PinchGestureHandlerGestureEvent>({
      onActive: (e) => {
        scale.value = e.scale;
        focalX.value = e.focalX;
        focalY.value = e.focalY;
      },
      onEnd: () => {
        scale.value = withTiming(1);
      },
    });

  const Rstyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: focalX.value },
        { translateY: focalY.value },
        { translateX: -width / 2 },
        { translateY: -width / 2 },
        {scale:scale.value},
        { translateX: -focalX.value },
        { translateY: -focalY.value },
        { translateX: width / 2 },
        { translateY: width / 2 },
      ],
    };
  });

  const focalStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: focalX.value }, { translateY: focalY.value }],
    };
  });
  return (
    <PinchGestureHandler onGestureEvent={pinchGestureEvent}>
      <Animated.View style={{ flex: 1 }}>
        <AnimatedImage style={[styles.img, Rstyle]} source={{ uri: imgUri }} />
        <Animated.View style={[styles.point, focalStyle]} />
      </Animated.View>
    </PinchGestureHandler>
  );
}

const styles = StyleSheet.create({
  img: {
    flex: 1,
  },
  point: {
    ...StyleSheet.absoluteFillObject,
    height: 20,
    width: 20,
    borderRadius: 30,
    backgroundColor: "rgba(0,256,0,0.6)",
  },
});
