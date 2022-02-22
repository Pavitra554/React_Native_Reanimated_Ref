import React, { useCallback, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  ImageBackground,
} from "react-native";
import { TapGestureHandler } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming } from "react-native-reanimated";

const { height, width } = Dimensions.get("window");

const AnimatedImage = Animated.createAnimatedComponent(Image);
export default function DoubleTap_Like() {
  const doubleTapRef = useRef();
  const scale = useSharedValue(0);

  const rStyle = useAnimatedStyle(()=>{
      return{
          transform:[{scale:scale.value}]
      }
  })

  const onDoubleTap = useCallback(()=>{
    scale.value = withSpring(1,undefined,(isfinished)=>{
        if(isfinished){
            scale.value = withTiming(0);
        }
    })
  },[])
  return (
    <View style={styles.main}>
      <TapGestureHandler
        waitFor={doubleTapRef}
        onActivated={() => {
          console.log("Single Tap");
        }}
      >
        <TapGestureHandler
          maxDelayMs={250}
          numberOfTaps={2}
          ref={doubleTapRef}
          onActivated={onDoubleTap}
        >
          <Animated.View>
            <ImageBackground
              source={require("../assets/post.jpg")}
              style={styles.image}
            >
              <AnimatedImage
                style={[styles.like,rStyle]}
                source={require("../assets/like.png")}
                resizeMode='center'
              />
            </ImageBackground>
          </Animated.View>
        </TapGestureHandler>
      </TapGestureHandler>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: width + 50,
    width,
  },
  like: {
    height: width + 50,
    width,
  },
});
