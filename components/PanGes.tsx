import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, Dimensions } from 'react-native';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';

type context={
    translateX:number
    translateY:number
}

const {height,width} = Dimensions.get('window');
export default function PanGes() {
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const gesEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent,context>({
        onStart:(e,context)=>{
            context.translateX = translateX.value;
            context.translateY = translateY.value;
        },
        onActive:(e,context)=>{
            translateX.value = e.translationX + context.translateX;
            translateY.value = e.translationY + context.translateY;
        },
        onEnd:(e)=>{
            const dis = Math.sqrt(translateX.value **2 + translateY.value**2);
            if(dis<width/2){
                translateX.value = withSpring(0);
                translateY.value = withSpring(0);
            }
            
        }
    })
    const rStyle = useAnimatedStyle(():any=>{
        return{
            transform:[{translateX:translateX.value},{translateY:translateY.value}]
        }
    })
  return (
    <SafeAreaView style={styles.main}>
        <View style={styles.outerCircle}>
            <PanGestureHandler onGestureEvent={gesEvent}>
                <Animated.View style={[styles.Circle,rStyle]}/>
            </PanGestureHandler>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    main:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#000'
    },
    Circle:{
        height:100,
        width:100,
        backgroundColor:'#FA9905',
        borderRadius:50
    },
    outerCircle:{
        height:width,
        width:width,
        borderWidth:2,
        borderColor:'#FA9905',
        borderRadius:400,
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    }
})