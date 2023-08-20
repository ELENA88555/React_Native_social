import { useState } from "react";
import React from "react";
import * as ImagePicker from "expo-image-picker";
// import { useNavigation } from "@react-navigation/native";
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
  Pressable,
  Button,
  Image,
} from "react-native";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import ImageBackgroundScreen from "../components/ImageBackground";
import { authSignUpUser } from "../redux/auth/authOperations";
import { useDispatch } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTogglePasswordVisibility } from "../../hooks/useTogglePasswordVisibility";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Dimensions } from "react-native";
import { useEffect } from "react";

const initiatState = {
  nickName: "",
  email: "",
  password: "",
  userPhoto: null,
};

// const LoadApplication = async () => {
//   await Font.loadAsync({ Roboto: require("./src/fonts/Roboto-Italic.ttf") });
// };

const Registration = ({ navigation }) => {
  const [userPhoto, setUserPhoto] = useState(null);
  const [image, setImage] = useState(null);

  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();
  const [password, setPassword] = useState("");

  const [dimensions, setdimensions] = useState(
    Dimensions.get("window").width - 20 * 2
  );

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width - 20 * 2;
      setdimensions(width);
    };
    Dimensions.addEventListener("change", onChange);

    return () => {
      Dimensions.removeEventListener("change", onChange);
    };
  }, []);
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

  const dispatch = useDispatch();
  // const navigation = useNavigation();
  // const [text, setChangeText] = React.useState("");
  // const [number, setChangeNumber] = React.useState("");
  const [isShowKeyBoard, setIsShowKeyBoard] = useState(false);

  const handleSubmit = () => {
    // const newUser = {

    // }
    setIsShowKeyBoard(false);
    Keyboard.dismiss();
    dispatch(authSignUpUser(state));
    setState(initiatState);

    navigation.navigate("Home", { nickName, userPhoto, email });
  };

  const takePhoto = async () => {
    // const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    // if (status !== "granted") {
    //   console.log("Insufficient permissions!");
    //   return;
    // }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setUserPhoto(result.assets[0].uri);
    }
  };

  const deletePhoto = () => {
    setUserPhoto(null);
  };

  return (
    <ImageBackgroundScreen>
      <SafeAreaView>
        <View style={styles.mainFoto}>
          <View style={styles.addFoto}>
            {userPhoto ? (
              <Image source={{ uri: userPhoto }} style={styles.image} />
            ) : (
              <Image
                source={{
                  uri: "https://i0.wp.com/sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png?ssl=1",
                }}
                style={styles.image}
              />
            )}
          </View>
          <TouchableOpacity onPress={!userPhoto ? takePhoto : deletePhoto}>
            <Ionicons
              name={userPhoto ? "close-circle-outline" : "add-circle-outline"}
              size={32}
              color={userPhoto ? "#c0bebd" : "#FF6C00"}
              style={styles.addImage}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.containerForm}>
          <Text style={styles.text}>Реєстрація</Text>
          <View
            style={{
              ...styles.form,
              marginBottom: isShowKeyBoard ? 10 : 20,
              width: dimensions,
            }}
          >
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <TextInput
                style={styles.input}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, nickName: value }))
                }
                value={state.nickName}
                placeholder="Логін"
                maxLength={40}
                onFocus={() => {
                  setIsShowKeyBoard(true);
                }}
              />
              <TextInput
                style={styles.input}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, email: value }))
                }
                value={state.email}
                placeholder="Адреса електронної пошти"
                autoComplete="email"
                maxLength={40}
                onFocus={() => {
                  setIsShowKeyBoard(true);
                }}
                keyboardType="numeric"
              />
              <TextInput
                style={styles.input}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, password: value }))
                }
                value={state.password}
                placeholder="Пароль"
                maxLength={20}
                textContentType="newPassword"
                keyboardType="numeric"
                secureTextEntry={passwordVisibility}
                onFocus={() => {
                  setIsShowKeyBoard(true);
                }}
              />
              <Pressable onPress={handlePasswordVisibility}>
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
              <Text style={styles.textOnBtn}>Зареєстуватися</Text>
            </TouchableOpacity>
            <View>
              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.textRegistration}
                onPress={() => navigation.navigate("Login")}
              >
                <Text style={styles.textRegistration}>
                  {" "}
                  Вже є акаунт? Увійти
                </Text>
              </TouchableOpacity>
            </View>
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
  textHidePassword: {
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    textAlign: "right",
    color: "#b7bfc7",
  },

  mainFoto: {
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    width: 120,
    height: 120,
    borderRadius: 16,
    enum: "absolute",
    position: "relative",
    // top: 10,
    // left: 128,
    zIndex: 999,
    // overflow: "hidden",
    //   borderColor: "#F6F6F6",
    //  borderWidth: 1,
    transform: [{ translateY: -0.4 * -30 }],
  },
  addFoto: {
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    // enum: "absolute",
    position: "relative",
    top: 10,
    left: "120%",
    zIndex: 999,
    // overflow: "hidden",
    //   borderColor: "#F6F6F6",
    //  borderWidth: 1,
    transform: [{ translateY: -0.4 * -20 }],
  },

  image: {
    // position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 16,
    zIndex: 999,
  },
  addImage: {
    position: "absolute",
    zIndex: 999,
    left: "160%",
    top: "15%",
  },

  // mainFoto: {
  //   // flex: 1,
  //   // position: "absolute",
  //   // alignItems: "center",
  //   // textAlign: "center",
  //   // top: 60,
  //   // left: 128,
  //   // position: "absolute",
  //   // top: -60,
  //   // left: "50%",
  //   // transform: [{ translateX: -0.4 * 120 }],
  //   // width: 120,
  //   // height: 120,
  //   // borderRadius: 16,
  //   // backgroundColor: "#F6F6F6",
  //   // overflow: "hidden",

  // },

  // addImage: {
  //   // position: "absolute",
  //   // bottom: 16,
  //   // right: 118,

  //   zIndex: 999,
  //   position: "absolute",
  //   bottom: 30,
  //   right: -64,
  // },
  // addFoto:{

  //   position: "absolute",
  //   top: -80,
  //   left: "50%",
  //   transform: [{ translateX: -0.4 * 120 }],
  //   width: 120,
  //   height: 120,
  //   borderRadius: 16,
  //   backgroundColor: "#F6F6F6",

  //   // width: 120,
  //   // height: 120,
  //   // // backgroundColor: "#cc9090",
  //   // borderRadius: 16,
  //   // // enum: "absolute",
  //   // borderColor: "#F6F6F6",
  //   // borderWidth: 1,
  //   // top: 120,
  //   // left: 128,
  //   zIndex: 999,
  //   overflow: "hidden",
  // },
  // image: {
  //   alignItems: "center",
  //   alignItems: "center",
  //   position: "absolute",
  //   width: "100%",
  //   height: "100%",
  //   borderRadius: 16,
  // },

  textRegistration: {
    marginTop: 16,
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#1B4371",
  },
  showHidePass: {
    position: "absolute",
    bottom: 15,
    right: 16,
    transform: [{ translateY: -4 }],
    color: "#888d94",
  },
});

export default Registration;
