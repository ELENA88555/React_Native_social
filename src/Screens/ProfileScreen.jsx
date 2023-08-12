import React from "react";
// import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Button } from "react-native";
import { StyleSheet } from "react-native";
import { View, Text, TouchableOpacity } from "react-native";
import { auth } from "../../firebase/config";
import { useDispatch } from "react-redux";
import { authSingOutUser } from "../redux/auth/authOperations";
import ImageBackgroundScreen from "../components/ImageBackground";


const ProfileScreen = () => {
  const dispatch = useDispatch()

  const signOut = ()=> {
    dispatch(authSingOutUser())
  }
  return (
    <View  style={styles.container}>
   <ImageBackgroundScreen style={styles.backgroundImage} />

    <View  style={styles.mainContainer}>
      {/* <Text style={styles.text}>ProfileScreen</Text> */}
      <TouchableOpacity
         
          onPress={signOut}
          style={styles.logOutBtn}
        >
      {/* <Button title = "out" onPress={signOut} /> */}
      {/* <Feather name="log-out" size={24} color="black" /> */}
       <Ionicons name="log-out-outline" size={24} color="black" />
      </TouchableOpacity>
     
    </View>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // backgroundImage: {
  //   width: "100%",
  //   position: "absolute",
  // },

  mainContainer: {
    marginTop: "auto",
    height: "84%",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 16,
    paddingTop: 92,
    paddingBottom: 78,


    backgroundColor: "#FFFFFF",
  },

  // containerForm: {
  //   backgroundColor: "#FFFFFF",
  //   borderTopLeftRadius: 25,
  //   borderTopRightRadius: 25,
  // },

  // text: {
  //   marginTop: 62,
  //   marginBottom: 20,
  //   fontSize: 27,
  //   lineHeight: 30,
  //   fontWeight: 500,
  //   textAlign: "center",
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  // logOutBtn: {
  //   zIndex: 999,
  //   // position: "absolute",
  //   marginRight: 88,
  //   marginTop: 62,
  //   marginBottom: 20,
  //   marginTop: 24,
  //   backgroundColor: "red",
  //   width: 30,
  //   height: 50,
  //   // top: 50,
  // },
  logOutBtn: {
    zIndex: 999,

    // position: "absolute",
    top: 24,
    right: 20,
  },
});

export default ProfileScreen;
