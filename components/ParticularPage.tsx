import React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from "react-native-reanimated";
interface Props {
  title: string;
  i: number;
  translateX:Animated.SharedValue<number>
}

const {height,width} = Dimensions.get('window');

const ParticularPage: React.FC<Props> = ({title,i,translateX}) => {
    const inputval = [(i-1)*width,i*width,(i+1)*width];

    //Square animation
    const rstyle = useAnimatedStyle(()=>{
        const scale = interpolate(
            translateX.value,
            inputval,
            [0,1,0],
            Extrapolate.CLAMP
        );
        // const deg = interpolate(
        //     translateX.value,
        //     inputval,
        //     [90,180,360],
        //     Extrapolate.CLAMP
        // );
        const op = interpolate(
            translateX.value,
            inputval,
            [0.5,1,0.5],
            Extrapolate.CLAMP
        );
        const rad = interpolate(
            translateX.value,
            inputval,
            [0,(width*0.7)/2,0.5],
            Extrapolate.CLAMP
        );
        return{
            // transform:[{scale},{rotate:`${deg}deg`}],
            transform:[{scale}],
            borderRadius:rad,
            opacity:op
        }
    });

    //For Text Animation
    const Rtext = useAnimatedStyle(()=>{
        const translateY = interpolate(
            translateX.value,
            inputval,
            [height/2,0,-height/2],
            Extrapolate.CLAMP
        );
        const opacity = interpolate(
            translateX.value,
            inputval,
            [-2,1,-2],
            Extrapolate.CLAMP
        );
        return{
            opacity,
            transform:[{translateY}]
        }
    })

  return (
    <View style={[styles.page,{backgroundColor:`rgba(0, 0, 256,0.${i+2})`}]}>
        <Animated.View style={[styles.square,rstyle]}/>
        <Animated.View style={[styles.intext,Rtext]}>
            <Text style={[styles.text]}>{title}</Text>
        </Animated.View>
    </View>
  );
};
const styles = StyleSheet.create({
  page: {
      height,
      width,
      flex:1,
      justifyContent:'center',
      alignItems:'center'
  },
  square:{
      height:250,
      width:250,
      backgroundColor:'#0C0C7A',
      borderRadius:0
  },
  intext:{
    position:'absolute'
  },
  text:{
    color:'#fff',
    fontSize:40,
    fontWeight:'bold'
  }
});
export default ParticularPage;
