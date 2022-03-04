import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Easing, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { N } from '../constants/constants';
import Square from './Square';

const ClockLoader = () => {
    const progress = useSharedValue(0);

    useEffect(()=>{
        progress.value =withRepeat( withTiming(4*Math.PI,{duration:4000,easing:Easing.linear}),-1)
    },[])
  return (
    <View style={styles.main}>
      {new Array(N).fill(0).map((_,index)=>{
          return <Square key={index} progress = {progress} index={index}/>
      })}
    </View>
  )
}

export default ClockLoader

const styles = StyleSheet.create({
    main:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#181818'
    }
})