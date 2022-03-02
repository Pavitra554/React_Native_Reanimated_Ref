import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { ReText } from "react-native-redash";
import Svg, { Circle } from "react-native-svg";

const BACKGROUND_COLOR = "#212121";
const BACKGROUND_STROCK = "#121212";
const STROCK_COLOR = "#BB86FC";
const CIRCLE_LENGTH = 900;
const CIRCLE_RADIUS = CIRCLE_LENGTH / (2 * Math.PI);
const { height, width } = Dimensions.get("window");

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const ProgressBar = () => {
  const progress = useSharedValue(0);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: CIRCLE_LENGTH * (1 - progress.value),
  }));

  const progressText = useDerivedValue(() => {
    return `${Math.floor(progress.value *10)}`;
  });

  const start = useCallback(() => {
    progress.value = withTiming(progress.value > 0 ? 0 : 1, { duration: 10000 });
  }, []);

  return (
    <View style={styles.main}>
      <StatusBar style='inverted' />
      {/* something new to me  */}
      <ReText style={styles.text} text={progressText} />
      <Svg style={styles.svg}>
        <Circle
          r={CIRCLE_RADIUS}
          cx={width / 2}
          cy={height / 2}
          stroke={BACKGROUND_STROCK}
          strokeWidth={30}
        />
        <AnimatedCircle
          r={CIRCLE_RADIUS}
          cx={width / 2}
          cy={height / 2}
          stroke={STROCK_COLOR}
          strokeWidth={15}
          strokeDasharray={CIRCLE_LENGTH}
          animatedProps={animatedProps}
          strokeLinecap={"round"}
        />
      </Svg>
      {/*till this */}

      <TouchableOpacity onPress={start} style={styles.btn}>
        <Text style={styles.btntext}>Run</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: BACKGROUND_COLOR,
  },
  svg: {
    position: "absolute",
  },
  text: {
    fontSize: 60,
    color: "#fff",
    marginBottom: 40,
  },
  btn: {
    height: 50,
    width: width * 0.7,
    backgroundColor: BACKGROUND_STROCK,
    position: "absolute",
    bottom: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  btntext: {
    fontSize: 20,
    letterSpacing: 2.0,
    color: "#fff",
  },
});
