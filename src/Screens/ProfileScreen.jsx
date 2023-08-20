import React, { useState } from "react";
// import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Button } from "react-native";
import { StyleSheet,  ScrollView } from "react-native";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { auth } from "../../firebase/config";
import { useDispatch, useSelector } from "react-redux";
import { authSingOutUser } from "../redux/auth/authOperations";
import ImageBackgroundScreen from "../components/ImageBackground";
import { selectUserPhoto } from "../redux/auth/authSelector";
import { updateProfile } from "firebase/auth";



const ProfileScreen = () => {
  const dispatch = useDispatch()
  const userPhoto = useSelector(selectUserPhoto)
  const [photoUri, setPhotoUri] = useState(userPhoto ?? null);

  const signOut = ()=> {
    dispatch(authSingOutUser())
  }

  const choosePhoto = async () => {
if (photoUri){
  dispatch(updateProfile)
}

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };



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
    <View style={styles.mainFoto}>
          <View style={styles.addFoto}>
          <Image source={{ uri: userPhoto }} style={styles.image} />
            <TouchableOpacity onPress={choosePhoto} >
              <Ionicons
                name={ photoUri ? "close-circle-outline" : "add-circle-outline"}
                size={32}
                color="#b7bfc7"
                style={styles.addImage}
              />
            </TouchableOpacity>
          </View>
        </View>
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

  mainFoto: {
    // position: "absolute",
    // top: -60,
    // left: "50%",
    // transform: [{ translateX: -0.4 * 120 }],
    // width: 120,
    // height: 120,
    // borderRadius: 16,
    // backgroundColor: "#F6F6F6",
  //   alignItems: "center",
  //   textAlign: "center",
  //   justifyContent: "center",
  //   width: 120,
  //   height: 120,
  //   // backgroundColor: "#F6F6F6",
  //   borderRadius: 16,
  //   enum: "absolute",
  //   position: "relative",
  //   // top: 10,
  //   // left: 128,
  //   zIndex: 999,
  //   // overflow: "hidden",
  // //   borderColor: "#F6F6F6",
  // //  borderWidth: 1,
  //  transform: [{ translateY: -0.4 * -30 }],
  },
  addFoto: {
    position: "absolute",
    top: -640,
    left: "35%",
    // transform: [{ translateY: 0.4 * -120 }],
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
  //   alignItems: "center",
  //   textAlign: "center",
  //   justifyContent: "center",
  //   width: 120,
  //   height: 120,
  //   backgroundColor: "#F6F6F6",
  //   borderRadius: 16,
  //   // enum: "absolute",
  //   // position: "relative",
  //   top: 10,
  //   left: "120%",
  //   zIndex: 999,
  //   // overflow: "hidden",
  //   borderColor: "#F6F6F6",
  //  borderWidth: 1,
  //  transform: [{ translateY: -0.4 * -20 }]
  },
  
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
    // position: "absolute",
    // width: "100%",
    // height: "100%",
    // borderRadius: 16,
    // zIndex: 999,
 
  },
  addImage: {
    position: "absolute",
    bottom: 16,
    right: -18,
    // position: "absolute",
    // zIndex: 999,
    // left: "160%",
    // top: "15%",
  },

});

export default ProfileScreen;
