import { StatusBar } from "expo-status-bar";
import React, { useCallback, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableOpacity, Dimensions } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import Animated, { FadeIn, FadeInDown, FadeInUp, FadeOutDown, FadeOutLeft, FadeOutUp, Layout, RollInLeft, RollOutLeft, RollOutRight, RotateInDownRight, ZoomIn } from "react-native-reanimated";

const {height} = Dimensions.get('window');
let i = 0;

const LayoutAnimation = () => {
    const[item,setItem] = useState([{id:i}]);

    const onAdd = useCallback(()=>{
        setItem((e):any=>{
            i++;
            return [...e,{id:i}]
        })
    },[]);

    const onDelete = useCallback((i)=>{
        setItem((e):any=>{
            return e.filter((item) => item.id !== i)
        })
    },[])
  return (
    <View style={styles.main}>
      <TouchableOpacity style={styles.btn} onPress={onAdd}>
      <FontAwesome5 name="plus" size={30} color="white" />
      </TouchableOpacity>
      <StatusBar style='dark' />
      <ScrollView
        style={{flex:1,height}}
        contentContainerStyle={{ paddingVertical: 50 }}
      >
        {item.map((i) => {
          return <Animated.View key={i.id} 
          layout={Layout.delay(300)} //Important
          entering={ZoomIn.delay(300)} //Important
          exiting={RollOutRight.delay(300)} //Important
          style={styles.item} 
          onTouchEnd={()=>onDelete(i.id)} />;
        })}
      </ScrollView>
    </View>
  );
};

export default LayoutAnimation;

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  item: {
    height: 100,
    width: "90%",
    backgroundColor: "#4852F8",
    elevation: 10,
    marginVertical: 10,
    alignSelf: "center",
    borderRadius: 20,
  },
  btn: {
    width: 80,
    aspectRatio: 1,
    backgroundColor: "#181818",
    borderRadius: 80,
    position:'absolute',
    bottom:'3%',
    right:'7%',
    zIndex:10,
    justifyContent:'center',
    alignItems:'center'
  },
});
