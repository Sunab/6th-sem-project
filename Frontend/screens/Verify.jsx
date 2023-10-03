import { View, Text, TextInput, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Button } from "react-native-paper";
import { useDispatch } from "react-redux";
import { loadUser, verifyAccount } from "../Redux/Action";

const Verify = () => {
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const verifyHandler = async () => {
    console.log("verified")
   await dispatch(verifyAccount(otp));
    dispatch(loadUser());
  };
  return (
    <View style={verifyStyle.verifyContainer}>
      <Text style={verifyStyle.verifyHeader}>Verify Your Account Below</Text>
      
      <View style={{ width: "70%" }}>
        <TextInput
          style={verifyStyle.input}
          placeholder="Enter your OTP"
          value={otp}
          onChangeText={setOtp}
          keyboardType="number-pad"
        />
      </View>
      <Button disabled={!otp} style={verifyStyle.btn} onPress={verifyHandler}>
        <Text style={{ color: "#fff" }}>Verify</Text>
      </Button>
      
    </View>
  );
};
const verifyStyle = StyleSheet.create({
  verifyContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  verifyHeader: {
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

export default Verify;
