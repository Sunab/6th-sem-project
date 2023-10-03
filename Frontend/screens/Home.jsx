import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Platform,
  StatusBar,
  ScrollView,
  Linking,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, clearMessage } from "../Redux/messageSlice";
import { addTask, getTasks, loadUser } from "../Redux/Action";
import { api } from "../Redux/api";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Home = () => {
  const { allTasks } = useSelector((state) => state.task);
  // const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  const handleOpenGoogleMaps = (latitude, longitude) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(url);
        } else {
          console.log("Google Maps is not installed");
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <>
      <View style={homeContainerStyle.homeContainer}>
        <ScrollView>
          <SafeAreaView>
            <Text style={homeContainerStyle.textViewHeading}>All Requests</Text>
            {allTasks?.map((e, i) => {
              return (
                <View
                  style={{
                    width: "94%",
                    backgroundColor: "white",
                    // borderRadius: 10,
                    borderBottomEndRadius: 10,
                    margin: 10,
                    padding: 10,
                  }}
                  key={i}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      marginBottom: 5,
                      fontWeight: "bold",

                      color: "#3498db",
                    }}
                  >
                    {e?.title}
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      marginBottom: 5,
                      fontWeight: "bold",
                      color: "#3498db",
                    }}
                  >
                    {e?.description}
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      marginBottom: 5,
                      fontWeight: "bold",
                      color: "#3498db",
                    }}
                  >
                    {e?.hospital_name}
                  </Text>

                  <Text
                    style={{
                      fontSize: 16,
                      marginBottom: 5,
                      fontWeight: "bold",
                      color: "#3498db",
                    }}
                  >
                    {e?.blood_group}
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      marginBottom: 5,
                      fontWeight: "bold",
                      color: "#3498db",
                    }}
                  >
                    {e?.number}
                  </Text>
                  <Icon.Button
                    name="map"
                    onPress={() =>
                      handleOpenGoogleMaps(e?.latitude, e?.longitude)
                    }
                  >
                    Open in map
                  </Icon.Button>
                </View>
              );
            })}
          </SafeAreaView>
        </ScrollView>
      </View>
    </>
  );
};

const homeContainerStyle = StyleSheet.create({
  homeContainer: {
    backgroundColor: "red",
    flex: 1,
    color: "#ff0000",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  textViewHeading: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 25,
    marginBottom: 20,
    color: "#fff",
    backgroundColor: "#474747",
  },
  addToListContainer: {
    backgroundColor: "#fff",
    width: 150,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    alignSelf: "center",
    marginVertical: 20,
    elevation: 5,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#b5b5b5",
    padding: 10,
    paddingLeft: 15,
    borderRadius: 5,
    marginVertical: 15,
    fontSize: 15,
  },
});
export default Home;
