import { View, Text, StyleSheet, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, updatePassword } from "../Redux/Action";
import { clearErrors } from "../Redux/userSlice";
import Profile from "./Profile";

const ChangePassword = (navigation) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const changePasswordHandler = async () => {
    if (newPassword !== confirmPassword) {
      alert("Password does not match");
    }
    await dispatch(updatePassword(oldPassword, newPassword, confirmPassword));
    // navigation.navigate(Profile)
    dispatch(loadUser());
  };
  const { message, error, success } = useSelector((state) => state.auth);

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
  }, [alert, error, dispatch]);

  return (
    <View style={changePasswordStyle.changePasswordContainer}>
      <Text style={changePasswordStyle.changePasswordHeader}>
        Change Password
      </Text>
      <View style={{ width: "70%" }}>
        <TextInput
          secureTextEntry
          style={changePasswordStyle.input}
          placeholder="Old Password"
          value={oldPassword}
          onChangeText={setOldPassword}
        />
        <TextInput
          secureTextEntry
          style={changePasswordStyle.input}
          placeholder="New Password"
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <TextInput
          secureTextEntry
          style={changePasswordStyle.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>
      <Button
        disabled={!newPassword || !oldPassword || !confirmPassword}
        style={changePasswordStyle.btn}
        onPress={changePasswordHandler}
      >
        <Text style={{ color: "#fff" }}>Change Password</Text>
      </Button>
    </View>
  );
};

const changePasswordStyle = StyleSheet.create({
  changePasswordContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  changePasswordHeader: {
    fontSize: 20,
    margin: 20,
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
  btn: {
    backgroundColor: "#900",
    padding: 5,
    width: "70%",
    borderRadius: 0,
  },
  signUp: {
    color: "#900",
    height: 30,
    margin: 10,
  },
  forgot: {
    color: "blue",
    height: 30,
    textDecorationLine: "underline",
  },
});

export default ChangePassword;
