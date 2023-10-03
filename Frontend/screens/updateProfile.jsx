import { View, Text,StyleSheet,TouchableOpacity,TextInput } from "react-native";
import React, { useEffect,useState } from "react";
import {  useSelector,useDispatch } from "react-redux";
import { Avatar, Button } from "react-native-paper";
import { loadUser, updateProfile } from "../Redux/Action";
import Loader from "../components/Loader";
import mime from "mime";

const UpdateProfile = (navigation,route) => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  const [name, setName] = useState(user.name);
  const [avatar, setAvatar] = useState(user.avatar);
  const handleImage = () => {
    navigation.navigate("Camera", {
      updateProfile: true,
    });
  };

  const submitHandler = async () => {
    const myForm = new FormData();

    myForm.append("name", name);
    myForm.append("avatar", {
      uri: avatar,
      type: mime.getType(avatar),
      name: avatar.split("/").pop(),
    });
    dispatch(updateProfile(myForm));
    dispatch(loadUser());
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
      <Avatar.Image
        style={profileStyle.avatarStyle}
        size={100}
        source={{ uri: user ? user?.user.avatar.url : null }}
      />

      <TouchableOpacity onPress={handleImage}>
        <Text style={profileStyle.changeProfilePic}>Change Photo</Text>
      </TouchableOpacity>

      <View style={profileStyle.profileInput}>
        <TextInput
          style={profileStyle.input}
          placeholder="Your New Name Here!"
          value={name}
          onChangeText={setName}
        />
      </View>

      <Button style={profileStyle.btn} onPress={submitHandler}>
        <Text style={profileStyle.btnTxt}>Update Profile</Text>
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

  profileInput: {
    width: "70%",
  },

  btn: {
    backgroundColor: "#f0ad4e",
    padding: 5,
    width: "70%",
    borderRadius: 0,
  },
  btnTxt: {
    color: "#fff",
  },
});

export default UpdateProfile;
