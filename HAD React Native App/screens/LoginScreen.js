import React, { useState, useEffect, useRef } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Text } from "react-native-paper";
import Background from "../components/Background";
import Header from "../components/Header";
import Button from "../components/Button";
import TextInput from "../components/TextInput.js";
import BackButton from "../components/BackButton";
import { theme } from "../core/theme";
import { emailValidator } from "../helpers/EmailValidator";
import { passwordValidator } from "../helpers/PasswordValidator";
import { loginURL, loginURL_v2 } from "../services/URLs";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen({ navigation }) {
  const dummyHandler = () => {};

  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  const [userData, setUserData] = useState({});
  const [isDisabled, setIsDisabled] = useState(false);

  const handleLogin = async (event) => {
    setIsDisabled(true);
    try {
      const response1 = await axios.post(
        loginURL,
        {
          username: email["value"],
          password: password["value"],
        },
        {
          headers: { "ngrok-skip-browser-warning": "true" },
        }
      );

      const token = response1.headers["authorization"];

      let config = {
        headers: {
          Authorization: token,
          "ngrok-skip-browser-warning": "true",
        },
      };

      const response2 = await axios.post(
        loginURL_v2,
        {
          username: email["value"],
          password: password["value"],
        },
        config
      );

      if (response2.status === 200) {
        await AsyncStorage.setItem("id", response2.data.id);
        await AsyncStorage.setItem("firstName", response2.data.firstName);
        await AsyncStorage.setItem("contact", response2.data.contact);
        await AsyncStorage.setItem("email", response2.data.email);
        await AsyncStorage.setItem("dob", response2.data.dob);
        await AsyncStorage.setItem("middleName", response2.data.middleName);
        await AsyncStorage.setItem("lastName", response2.data.lastName);
        await AsyncStorage.setItem("token", token);
        await AsyncStorage.setItem("isUserLoggedIn", "true");
        if (response2.data.doctor === null) {
          await AsyncStorage.setItem("assignedDoctorId", "");
        } else {
          //setting doctor id
          await AsyncStorage.setItem(
            "assignedDoctorId",
            response2.data.doctor.id
          );
        }

        if (response2.data.sessionDone === -1) {
          await AsyncStorage.setItem("initialSessionCompleted", "No");
        } else {
          await AsyncStorage.setItem("initialSessionCompleted", "Yes");
        }

        navigation.reset({
          index: 0,
          routes: [{ name: "LandingScreen", params: { data: response2.data } }],
        });
        setIsDisabled(false);
      } else {
        setIsDisabled(false);
        return Alert.alert(
          "Invalid Credentials",
          "Please try again with correct credentials",
          [
            {
              text: "Try again",
              onPress: dummyHandler,
            },
          ]
        );
      }
    } catch (error) {
      setIsDisabled(false);
      console.log(error);
      return Alert.alert(
        "Invalid Credentials",
        "Please try again with correct credentials",
        [
          {
            text: "Try again",
            onPress: dummyHandler,
          },
        ]
      );
    }
  };

  const onLoginPressed = async () => {
    Keyboard.dismiss;
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }
    await handleLogin();
  };

  return (
    <Background>
      <Header>Login </Header>
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: "" })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: "" })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate("ResetPasswordScreen")}
        >
          <Text className="text-lg" style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <Button mode="contained" isDisabled={isDisabled} onPress={onLoginPressed}>
        Login
      </Button>
      <View style={styles.row}>
        <Text style={styles.forgot} >Don't have an account? </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("RegistrationScreen")}
        >
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}
const styles = StyleSheet.create({
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  forgot: {
    fontSize: 18,

    color: theme.colors.secondary,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});
