import 'react-native-gesture-handler';
import React from "react";
import { StyleSheet, View, Text, Dimensions, Button, Alert } from "react-native";



import { PanGestureHandler, } from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const Bottomsheet = () => {

  const top = useSharedValue(Dimensions.get("window").height/2);

  const rstyle = useAnimatedStyle(() => {
    return {
      top: top.value,
    };
  });

 
  const { height, width } = Dimensions.get("window");
  const gestureHandler = useAnimatedGestureHandler({
    onStart:(event,context:any)=>{
        
        context.top=top.value
    },
      onActive:(event,context)=>{
        
       if(event.translationY<0){
          top.value = withSpring(50);
       }
       else{
           top.value = withSpring(height-90)
       }
      },
      
      
    
  });
  
  
  return (
    
    <View style={styles.container}>
        
     
     
      <PanGestureHandler  onGestureEvent={gestureHandler}>
        <Animated.View
          style={[{ position: "absolute",
            left: 0,
             right: 0,
             elevation:70,
              bottom: 0 ,
              backgroundColor: "#fff",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,},rstyle]}
        >
         
        
        </Animated.View>
      </PanGestureHandler>
    </View>
    
  );
};
export default Bottomsheet;

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("screen").width,
    height: 500,
  },
  heading: {
    alignSelf: "center",
    paddingTop: 20,
    marginBottom: 10,
    fontSize: 24,
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,255,0.4)",
    
  },
  
});
