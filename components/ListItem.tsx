import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  PanGestureHandlerProps,
} from "react-native-gesture-handler";
import Animated, {
    runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

interface props extends Pick<PanGestureHandlerProps,'simultaneousHandlers'> {
  data:any;
  onDismiss?:(data:string)=>void
}

const {width} = Dimensions.get('window');

const holdValue =-width *0.3;
const ListItem: React.FC<props> = ({ data,onDismiss,simultaneousHandlers }) => {
  const progress = useSharedValue(0);
  const height = useSharedValue(100);
  const opacity = useSharedValue(1);
  const gestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>(
    {
      onActive: (event) => {
        progress.value = event.translationX;
      },
      onEnd: () => {
          if(progress.value < holdValue){
              progress.value =withSpring(-width);
              height.value = withTiming(0);
              opacity.value = withTiming(0,{duration:10},(isFinished)=>{
                  if(isFinished && onDismiss){
                      runOnJS(onDismiss)(data);
                  }
              });   

          }else {
              progress.value = withSpring(0);
          }
      },
    }
  );
  const RStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: progress.value }],
    };
  });
  const RStyleIcon = useAnimatedStyle(() => {
      const opacity = progress.value<holdValue ? withTiming(1):withTiming(0);
    return {
      opacity
    };
  });
  const RStyleContainer = useAnimatedStyle(() => {
    return {
      height:height.value,
      opacity:opacity.value
    };
  });
  return (
    <Animated.View style={[styles.outerMain,RStyleContainer]}>
      <PanGestureHandler simultaneousHandlers={simultaneousHandlers} onGestureEvent={gestureEvent}>
        <Animated.View style={[styles.main, RStyle]}>
          <Text style={styles.text}>{data.text}</Text>
        </Animated.View>
      </PanGestureHandler>
      <Animated.View style={[styles.icon,RStyleIcon]}>
        <MaterialCommunityIcons
          name='delete-outline'
          size={36}
          color='#ff5555'
        />
      </Animated.View>
    </Animated.View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  outerMain: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  main: {
    flex: 1,
    backgroundColor: "#FFF",
    width: "90%",
    height: 80,
    borderRadius: 20,
    margin: 10,
    alignSelf: "center",
    elevation: 5,
    justifyContent: "center",
    padding: 10,
  },
  text: {
    color: "#383838",
    fontSize: 18,
  },
  icon: {
    width: "15%",
    position: "absolute",
    justifyContent:'center',
    alignItems:'center'
  },
});
