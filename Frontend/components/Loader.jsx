import { StyleSheet, View } from "react-native";
import React from "react";
import { ActivityIndicator } from "react-native-paper";

const Loader = () => {
  return (
    <View style={loaderStyle.loaderContainer}>
      <ActivityIndicator animating={true} size={100} color="#900" />
    </View>
  );
};
const loaderStyle = StyleSheet.create({
  loaderContainer: {
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default Loader;
