import { StatusBar } from "expo-status-bar";
import React, { useCallback, useRef, useState } from "react";
import { Dimensions, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ListItem from "./ListItem";

const DATA = [
  { text: "Task 1", id: 1 },
  { text: "Task 2", id: 2 },
  { text: "Task 3", id: 3 },
  { text: "Task 4", id: 4 },
  { text: "Task 5", id: 5 },
  { text: "Task 6", id: 6 },
  { text: "Task 7", id: 7 },
  { text: "Task 8", id: 8 },
];
const SwipeDelete = () => {
  const [data, setData] = useState(DATA);

  const onDismiss = useCallback((data) => {
    setData((e) => e.filter((i) => i.id !== data.id));
  }, []);
  const scrollRef = useRef(null);
  return (
    <SafeAreaView style={styles.main}>
      <StatusBar style='dark' />
      <Text style={styles.headText}>Task</Text>

      <ScrollView ref={scrollRef} style={styles.scView}>
        {data.map((item) => {
          return (
            <ListItem
              simultaneousHandlers={scrollRef}
              key={item.id}
              data={item}
              onDismiss={onDismiss}
            />
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SwipeDelete;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingTop: "10%",
  },
  scView: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headText: {
    fontSize: 40,
    color: "#383838",
    margin: 10,
    marginLeft: 20,
  },
});
