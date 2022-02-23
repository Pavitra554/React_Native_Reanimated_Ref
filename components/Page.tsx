import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

interface props{
    index:number,
    title:string,
    translateX:Animated.SharedValue<number>
}

const {width} = Dimensions.get('window');
const Page:React.FC<props> = ({index,title,translateX}) => {
    const rStyle = useAnimatedStyle(()=>{
        return{
          transform:[{translateX:translateX.value + (width*index)}]
        }
    })
  return (
    <Animated.View style={[{...StyleSheet.absoluteFillObject,backgroundColor:`rgba(0,0,256,0.${index+2})`,flex:1,justifyContent:'center',alignItems:'center'},rStyle
    ]}>
      <Text style={styles.text}>{title}</Text>
    </Animated.View>
  )
}

export default Page

const styles = StyleSheet.create({
    text:{
        fontSize:40,
        fontWeight:'bold',
        color:'#fff'
    }
})