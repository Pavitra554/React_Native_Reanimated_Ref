import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  TapGestureHandler,
  TapGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  interpolateColor,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

interface props {
  COLORS: string[];
  onColorChange?: (color: string | number) => void;
}

const { width } = Dimensions.get("window");
const pickerWidth = width * 0.9;

const ColorPicker: React.FC<props> = ({ COLORS, onColorChange }) => {
  const translateX = useSharedValue(0);
  const translatey = useSharedValue(0);
  const scale = useSharedValue(1);
  const absoluteLimit = useDerivedValue(() => {
    return Math.min(Math.max(translateX.value, 10), pickerWidth - 10);
  });

  const panEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { x: number }
  >({
    onStart: (_, context) => {
      context.x = absoluteLimit.value;
      //this doesn't metter because TapGesture has priority
      //   translatey.value = withSpring(-40);
      //   scale.value = withSpring(1.2);r
    },
    onActive: (e, context) => {
      translateX.value = e.translationX + context.x;
    },
    onEnd: () => {
      translatey.value = withSpring(0);
      scale.value = withSpring(1);
    },
  });

  const TapEvent = useAnimatedGestureHandler<TapGestureHandlerGestureEvent>({
    onStart: (event) => {
      translatey.value = withSpring(-40);
      scale.value = withSpring(1.2);
      translateX.value = withSpring(event.absoluteX - 40);
    },
    onEnd: () => {
      translatey.value = withSpring(0);
      scale.value = withSpring(1);
    },
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: absoluteLimit.value },
        { translateY: translatey.value },
        { scale: scale.value },
      ],
    };
  });

  const RPickerStyle = useAnimatedStyle((): any => {
    const interval = COLORS.map((_, i) => {
      return (i / COLORS.length) * pickerWidth;
    });
    const backgroundColor = interpolateColor(
      translateX.value,
      interval,
      COLORS
    );
    onColorChange?.(backgroundColor);
    return {
      backgroundColor,
    };
  });
  return (
    <TapGestureHandler onGestureEvent={TapEvent}>
      <Animated.View>
        <PanGestureHandler onGestureEvent={panEvent}>
          <Animated.View style={styles.main}>
            <LinearGradient
              colors={COLORS}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.colorBar}
            />
            <Animated.View style={[styles.circle, rStyle]}>
              <Animated.View
                style={[styles.pickerColor, RPickerStyle]}
              ></Animated.View>
            </Animated.View>
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
    </TapGestureHandler>
  );
};

export default ColorPicker;

const styles = StyleSheet.create({
  main: {
    justifyContent: "center",
    // alignItems:'center'
  },
  colorBar: {
    height: 30,
    width: pickerWidth,
    marginHorizontal: 20,
    borderRadius: 30,
  },
  circle: {
    height: 35,
    width: 35,
    borderRadius: 50,
    position: "absolute",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  pickerColor: {
    height: 18,
    width: 18,
    borderRadius: 20,
  },
});
