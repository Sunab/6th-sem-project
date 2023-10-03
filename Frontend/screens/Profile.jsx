import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState,useEffect } from "react";
import { Avatar, Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, logout, updateProfile } from "../Redux/Action";
// import mime from "mime";
import Loader from "../components/Loader";
const Profile = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  // const [name] = useState(user.name);
  const [ setAvatar] = useState(user.avatar);
  // const handleImage = () => {
     // navigation.navigate("Camera", {
     //   updateProfile: true,
  //   } 
  // };

  // const submitHandler = async () => {
  //   const myForm = new FormData();

  //   myForm.append("name", name);
  //   myForm.append("avatar", {
  //     uri: avatar,
  //     type: mime.getType(avatar),
  //     name: avatar.split("/").pop(),
  //   });
  //   dispatch(updateProfile(myForm));
  //   dispatch(loadUser());
  // };
  const logoutHandler = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (route.params) {
      if (route.params.image) {
        setAvatar(route.params.image);
      }
    }
  }, [route]);

  return loading ? (
    <Loader />
  ) : (
    <View style={profileStyle.profileContainer}>
      <TouchableOpacity>
        <Avatar.Image
          style={profileStyle.avatarStyle}
          size={100}
          source={{ uri: user? user?.user?.avatar?.url : null }}
        />
      </TouchableOpacity>

      <View
        style={{
          marginTop:10,
          marginRight: 80,
          width: "70%",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "black",
          }}
        >
          {user?.user.name}
        </Text>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "black",
          }}
        >
          {user?.user?.email}
        </Text>
        {/* <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "#ffff",
          }}
        >
          {user?.user.bloodgroup}
        </Text> */}

        <Button onPress={ ()=> navigation.navigate(viewtask)}>
          <Text style = {{color:"white"}}> View Tasks</Text>
        </Button>
      </View>
      <Button
        style={profileStyle.btnUpdate}
        onPress={() => navigation.navigate(updateProfile)}
      >
        <Text style={profileStyle.btnTxt}>Update Profile</Text>
      </Button>
      {user.verified ? null : (
        <Button
          style={profileStyle.btnVerify}
          onPress={() => navigation.navigate("Verify")}
        >
          <Text style={profileStyle.btnTxt}>Verify Profile</Text>
        </Button>
      )}
      <Button
        style={profileStyle.btn2}
        onPress={() => navigation.navigate("changePassword")}
      >
        <Text style={profileStyle.btnTxt}>Change Password</Text>
      </Button>

      <Button style={ profileStyle.btn3} onPress={logoutHandler}>
        <Text style={profileStyle.btnTxt}>Logout</Text>
      </Button>
    </View>
  );
};

const profileStyle = StyleSheet.create({
  profileContainer: {
    flex: 1,
    backgroundColor: "red",
    alignItems: "center",
    // justifyContent: "center",
  },

  avatarStyle: {
    marginTop: 50,
    marginRight: 200,
    backgroundColor: "#900",
  },

  changeProfilePic: {
    color: "black",
    marginRight: 200,
  },

  profileInput: {
    width: "70%",
  },

  btn: {
    backgroundColor: "#f0ad4e",
    padding: 5,
    width: "70%",
    borderRadius: 0,
  },
  btn1: {
    backgroundColor: "#900",
    padding: 5,
    marginTop: 15,
    width: "70%",
    borderRadius: 0,
  },
  btn2: {
    backgroundColor: "#355950",
    padding: 5,
    marginTop: 15,
    width: "40%",
    borderRadius: 0,
  },
  btn3: {
    backgroundColor: "#355950",
    padding: 5,
    marginTop: 15,
    width: "20%",
    borderRadius: 0,
  },
  btnUpdate: {
    backgroundColor: "#355950",
    padding: 5,
    marginTop: 15,
    width: "40%",
    borderRadius: 0,
  },
  btnVerify: {
    backgroundColor: "#355950",
    padding: 5,
    marginTop: 15,
    width: "40%",
    borderRadius: 0,
  },

  btnTxt: {
    color: "#fff",
  },
});

export default Profile;
