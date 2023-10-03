import { View, Text, TextInput, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../Redux/Action";
import { clearErrors, clearMessage } from "../Redux/messageSlice";

const ResetPassword = ({ navigation }) => {
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const { success, message, error } = useSelector((state) => state.task);
  const resetPasswordHandler = () => {
    dispatch(resetPassword(otp, newPassword, confirmPassword));
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    if (success) {
      alert(message);
      navigation.navigate("Login");
      dispatch(clearMessage());
    }
  }, [success, message, error, dispatch, alert]);

  return (
    <View style={resetPasswordStyle.resetPasswordContainer}>
      <Text style={resetPasswordStyle.resetPasswordHeader}>
        Change Password
      </Text>
      <View style={{ width: "70%" }}>
        <TextInput
          style={resetPasswordStyle.input}
          placeholder="Enter your OTP"
          value={otp}
          onChangeText={setOtp}
          keyboardType="number-pad"
        />
        <TextInput
          secureTextEntry
          style={resetPasswordStyle.input}
          placeholder="New Password"
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <TextInput
          secureTextEntry
          style={resetPasswordStyle.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>
      <Button
        disabled={!newPassword || !otp || !confirmPassword}
        style={resetPasswordStyle.btn}
        onPress={resetPasswordHandler}
      >
        <Text style={{ color: "#fff" }}>Change Password</Text>
      </Button>
    </View>
  );
};
const resetPasswordStyle = StyleSheet.create({
  resetPasswordContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  resetPasswordHeader: {
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
export default ResetPassword;
