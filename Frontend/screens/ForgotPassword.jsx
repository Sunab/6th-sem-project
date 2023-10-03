import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../Redux/Action";

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const forgotPasswordHandler = () => {
    console.log("Password");
    dispatch(forgotPassword(email));
    navigation.navigate("ResetPassword");
  };
  const { loading } = useSelector((state) => state.task);
  return (
    <View style={forgotPasswordStyle.forgotPasswordContainer}>
      <Text style={forgotPasswordStyle.forgotPasswordHeader}>
        Forgot Password
      </Text>
      <View style={{ width: "70%" }}>
        <TextInput
          style={forgotPasswordStyle.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <Button
        disabled={!email}
        loading={loading}
        style={forgotPasswordStyle.btn}
        onPress={forgotPasswordHandler}
      >
        <Text style={{ color: "#fff" }}>Send Email</Text>
      </Button>
    </View>
  );
};

const forgotPasswordStyle = StyleSheet.create({
  forgotPasswordContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  forgotPasswordHeader: {
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

export default ForgotPassword;
