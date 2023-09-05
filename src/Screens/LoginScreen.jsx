import React from "react";
import { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
// import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import ImageBackgroundScreen from "../components/ImageBackground";
import { useTogglePasswordVisibility } from "../../hooks/useTogglePasswordVisibility";
// import {Dimensions} from 'react-native';
import { authSingIn } from "../redux/auth/authOperations";
import { Pressable } from "react-native";

const initiatState = {
  // login: "",
  email: "",
  password: "",
};

// const LoadApplication = async () => {
//   await Font.loadAsync({ Roboto: require("./src/fonts/Roboto-Italic.ttf") });
// };

const LoginScreen = ({ navigation }) => {

  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  // const [fontReady, setFontReady] = useState(false);

  // if (!fontReady) {
  //   return (
  //     <AppLoading
  //       startAsync={LoadApplication}
  //       onFinish={() => setFontReady(true)}
  //       onError={console.warm}
  //     />
  //   );
  // }

  const [state, setState] = useState(initiatState);

  // const navigation = useNavigation();
  // const [text, setChangeText] = React.useState("");
  // const [number, setChangeNumber] = React.useState("");
  const [isShowKeyBoard, setIsShowKeyBoard] = useState(false);

  const handleSubmit = () => {
    setIsShowKeyBoard(false);
    Keyboard.dismiss();
    setState(initiatState);
    dispatch(authSingIn(state));
  };

  return (
    <ImageBackgroundScreen>
      <SafeAreaView>
        <View style={styles.containerForm}>
          <Text style={styles.text}>Увійти</Text>
          <View
            style={{ ...styles.form, marginBottom: isShowKeyBoard ? 10 : 20 }}
          >
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <TextInput
                style={styles.input}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, email: value }))
                }
                value={state.email}
                placeholder="Адреса електронної пошти"
                autoComplete="email"
                onFocus={() => {
                  setIsShowKeyBoard(true);
                }}
                keyboardType="email-address"
                importantForAutofill={"yes"}
              />
              <TextInput
                style={styles.input}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, password: value }))
                }
                value={state.password}
                placeholder="Пароль"
                textContentType="newPassword"
                keyboardType="numeric"
                secureTextEntry={passwordVisibility}
                onFocus={() => {
                  setIsShowKeyBoard(true);
                }}
              />

              <Pressable onPress={handlePasswordVisibility}>
                {/* <Text style={styles.showHidePass}>Показати</Text> */}
                <MaterialCommunityIcons
                  style={styles.showHidePass}
                  name={rightIcon}
                  size={24}
                />
              </Pressable>
            </KeyboardAvoidingView>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.button}
              onPress={handleSubmit}
            >
              <Text style={styles.textOnBtn}>Увійти</Text>
            </TouchableOpacity>
            <View>
              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.textRegistration}
                onPress={() => navigation.navigate("Registration")}
              >
                <Text style={styles.textRegistration}>
                  {" "}
                  Немає акаунту? Зареєструватися
                </Text>
              </TouchableOpacity>

              {/* <Button
              title="Немає акаунту? Зареєструватися"
              onPress={() => navigation.navigate("LoginScreen")}
              color="#1B4371"
            /> */}
              {/* <Text style={styles.textRegistration} >
        Вже є акаунт? Увійти
        </Text> */}
            </View>
            {/* <Button style={styles.button} 
       title="Зареєстуватися"
       color = '#FF6C00'/> */}
          </View>
        </View>
      </SafeAreaView>
    </ImageBackgroundScreen>
  );
};

const styles = StyleSheet.create({
  containerForm: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },

  form: {
    marginHorizontal: 16,
    // marginTop: 33,
    // position: 'absolute',
    // width: 'auto',
    // height: "auto",
  },
  input: {
    height: 42,
    margin: 8,
    borderWidth: 1,
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
  },
  button: {
    justifyContent: "center",
    // textAlign: "center",
    alignItems: "center",
    height: 41,
    borderRadius: 100,
    backgroundColor: "#FF6C00",
    marginTop: 33,
    fontFamily: "Roboto",
  },
  text: {
    marginTop: 62,
    marginBottom: 20,
    fontSize: 27,
    lineHeight: 30,
    fontWeight: 500,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  textOnBtn: {
    fontSize: 16,
    lineHeight: 19,
    fontWeight: 400,
    color: "#FFFFFF",
  },
  showHidePass: {
    position: "absolute",
    bottom: 15,
    right: 16,
    transform: [{ translateY: -4 }],
    color: "#888d94",
  },
  mainFoto: {
    // flex: 1,
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    enum: "absolute",
    // position: "absolute",
    // enum: 'relative',
    top: 60,
    left: 128,
    zIndex: 1,
    overflow: "hidden",
  },
  addFoto: {
    backgroundColor: "#F6F6F6",
    // borderRadius: "100%",
  },
  textRegistration: {
    marginTop: 16,
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#1B4371",
  },
});

export default LoginScreen;
