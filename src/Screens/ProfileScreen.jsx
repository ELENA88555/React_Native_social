import React from "react";
// import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Button } from "react-native";
import { StyleSheet,  ScrollView } from "react-native";
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
   <ImageBackgroundScreen style={styles.backgroundImage} >
   {/* <ScrollView> */}
    <View  style={styles.mainContainer}>
      {/* <Text style={styles.text}>ProfileScreen</Text> */}
      <TouchableOpacity
          onPress={signOut}
          style={styles.logOutBtn}
        >
      {/* <Button title = "out" onPress={signOut} /> */}
      {/* <Feather name="log-out" size={24} color="black" /> */}
       <Ionicons name="log-out-outline" size={24} color="gray" />
      </TouchableOpacity>
     
    </View>
    {/* </ScrollView> */}
    </ImageBackgroundScreen>
    </View>

  );
};

const styles = StyleSheet.create({

  container: {
    
    flex: 1,
    backgroundColor: "black",

  },

  backgroundImage: {
  
    flex: 1,
    width: "100%",
    position: "absolute",
   
  },



  mainContainer: {
    marginTop: "auto",
    height: "84%",
    paddingHorizontal: 16,
    paddingTop: 92,
    paddingBottom: 78,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#ffffff",
  },


  logOutBtn: {
    position: "absolute",
    top: 16,
    right: 18,
  },
});

export default ProfileScreen;
