import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Platform,
  StatusBar,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/Entypo";
import { Dialog, Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import * as Location from "expo-location";
import { clearErrors, clearMessage } from "../Redux/messageSlice";
import { addTask, loadUser } from "../Redux/Action";
import SelectDropdown from "react-native-select-dropdown";


const Add = ({navigation}) => {
  const dispatch = useDispatch();
  const { error, message } = useSelector((state) => state.task);
  const [openDialog, setOpenDialog] = useState(false);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [description, setDescription] = useState("");
  const [BloodGroup, setBloodGroup] = useState("");
  const [hospitalName, sethospitalName] = useState("");
  const [number, setNumber] = useState("");

  const addTaskHandler = async () => {
    dispatch(
      addTask(
        title,
        description,
        hospitalName,
        BloodGroup,
        number,
        location.longitude,
        location.latitude
      ),
    );
   
  };
  const BloodGroups = [
    "A+ ",
    "A- ",
    "B+ ",
    "B- ",
    "AB+ ",
    "AB- ",
    "0+ ",
    "0 - ",
  ];

  const openDialogHandler = () => {
    setOpenDialog(!openDialog);
  };
  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Permission to access location was denied");
          return;
        }

        const locationData = await Location.getCurrentPositionAsync({});

        setLocation(locationData.coords);
      } catch (error) {
        setErrorMsg("Error fetching location");
      }
    })();
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    if (message!==undefined) {
      alert("Task Added Successfully");
      dispatch(clearMessage());
      setDescription("");
      setTitle("");
      setBloodGroup("");
      sethospitalName("");
      setNumber("");
      setOpenDialog(false);
      navigation.navigate("Home")}
      
  }, [error, message, alert, dispatch]);
 console.log(message,'messagwee')

  return (
    <>
      <View style={homeContainerStyle.homeContainer}>
        <Text style={{justifyContent:"center",
        alignSelf:"center",
        fontSize:20,
        fontWeight:"bold",
        color:"blue",
        marginTop:50,
      }}>Add Request</Text>
        <ScrollView>
          <SafeAreaView>
            <TouchableOpacity
              onPress={openDialogHandler}
              style={homeContainerStyle.addToListContainer}
            >
              <Icon size={20} color={"#ff0000"} name="add-to-list" />
            </TouchableOpacity>
          </SafeAreaView>
        </ScrollView>
      </View>
      <Dialog visible={openDialog} onDismiss={openDialogHandler}>
        <Dialog.Title>Add Request</Dialog.Title>
        <Dialog.Content>
          <TextInput
            style={homeContainerStyle.input}
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={homeContainerStyle.input}
            placeholder="Case for Blood"
            value={description}
            onChangeText={setDescription}
          />
          <TextInput
            style={homeContainerStyle.input}
            placeholder="Hospital Name"
            value={hospitalName}
            onChangeText={sethospitalName}
          />
          <TextInput
            style={homeContainerStyle.input}
            placeholder="Phone Number "
            value={number}
            onChangeText={setNumber}
          />

          <SelectDropdown
            style={{ borderRadius: 15 }}
            defaultButtonText="Blood Group"
            value={BloodGroup}
            data={BloodGroups}
            onSelect={setBloodGroup}
          />
          <View>
            {errorMsg ? (
              <Text>{errorMsg}</Text>
            ) : location !== null ? (
              <Text>
                Latitude: {location.latitude} , Longitude: {location.longitude}
              </Text>
            ) : (
              <Text>Loading location...</Text>
            )}
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity onPress={openDialogHandler}>
              <Text>Cancel</Text>
            </TouchableOpacity>
            <Button
              disabled={!title || !description || !hospitalName || !BloodGroup || !number}
              onPress={addTaskHandler}
              textColor="#900"
            >
              Add
            </Button>
          </View>
        </Dialog.Content>
      </Dialog>
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
    backgroundColor: "aliceblue",
    width: 150,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    alignSelf: "center",
    marginVertical: 20,
    marginTop: 250,
    elevation: 5,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#b5b5b5",
    padding: 5,
    paddingLeft: 15,
    borderRadius: 15,
    marginVertical: 15,
    fontSize: 15,
  },
});

export default Add;
