import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Redux/Action";
import { clearErrors } from "../Redux/userSlice";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("sunabbaskota@gmail.com");
  const [password, setPassword] = useState("Baskota123$");
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.auth);

  // Login handler function
  const loginHandler = () => {
    dispatch(login(email, password));
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
  }, [error, dispatch, alert]);

  // useEffect(() => {
  //   console.log("my loading is: ", loading);
  //   console.log("my is Authenticated is: ", isAuthenticated);
  //   if (error) {
  //     alert(error);
  //     dispatch(clearErrors());
  //   }
  // }, [error, dispatch]);
  return (
    <View style={loginStyle.loginContainer}>
      <Text style={loginStyle.loginHeader}>Welcome</Text>
      <View style={{ width: "70%" }}>
        <TextInput
          style={loginStyle.input}
          placeholder="Email"
          value={email}
          onChangeText={(e) => setEmail(e)}
        />
        <TextInput
          secureTextEntry
          style={loginStyle.input}
          placeholder="Password"
          value={password}
          onChangeText={(e) => setPassword(e)}
        />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
        <Text style={loginStyle.forgot}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity
        disabled={!email || !password}
        style={loginStyle.btn}
        onPress={() => loginHandler()}
      >
        <Text style={{ color: "#fff", alignSelf: "center" }}>Login</Text>
      </TouchableOpacity>
      <Text style={{ marginTop: 20 }}>Or</Text>

      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={loginStyle.signUp}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const loginStyle = StyleSheet.create({
  loginContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  loginHeader: {
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
    margin: 20,
  },
  forgot: {
    color: "blue",
    height: 30,
    textDecorationLine: "underline",
  },
});
export default Login;
