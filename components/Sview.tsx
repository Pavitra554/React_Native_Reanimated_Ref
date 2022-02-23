import React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import Page from "./Page";
import { PanGestureHandler, PanGestureHandlerGestureEvent } from "react-native-gesture-handler";
import Animated, { cancelAnimation, useAnimatedGestureHandler, useAnimatedStyle, useDerivedValue, useSharedValue, withDecay } from "react-native-reanimated";

type contextType= {
    x:number
}
const {width} = Dimensions.get('window');

export default function Sview() {
  const data = ["Hello,", "My", "Self", "Pavitra"];
  const translateX = useSharedValue(0);
  const limitTranslateX = useDerivedValue(()=>{
      const maxLimit = -width*(data.length-1)
      return Math.max(Math.min(translateX.value,0),maxLimit);
  })

  const panEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent,contextType>({
      onStart:(_,context)=>{
        context.x = limitTranslateX.value;

        cancelAnimation(translateX);
      },
      onActive:(event,context)=>{
        console.log(event.translationX);
        translateX.value = event.translationX + context.x;
        // alert('working')
      },
      onEnd:(event)=>{
        translateX.value = withDecay({velocity:event.velocityX})
      }
  })

  
  return (
    <View style={styles.main}>
      <PanGestureHandler onGestureEvent={panEvent}>
        <Animated.View style={[styles.list]}>
          {data.map((title, index) => {
            return <Page key={index.toString()} translateX={limitTranslateX} title={title} index={index} />;
          })}
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  list:{
      flex:1,
      flexDirection:'row'
  }
});
