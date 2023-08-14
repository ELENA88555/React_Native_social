import "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { Camera, CameraType } from "expo-camera";
import { SimpleLineIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { View, Text } from "react-native";
import { app, db } from "../../firebase/config";
import { collection, addDoc } from "firebase/firestore";


const CreatePostsScreen = ({ navigation }) => {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);




  const takePhoto = async () => {
    const {uri} = await camera.takePictureAsync();
    const location = await Location.getCurrentPositionAsync();
    console.log(location)
    console.log(location.coords.latitude)
    console.log(location.coords.longitude)
    setPhoto(uri);
  };


  const choosePhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };


  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);


  const uploadPhotoToServer = async () => {
    const response = await fetch(photo)
    const file = await response.blob()
    
    const uniqePostId = Date.now().toString()
    
    // const data = await app.storage().ref(`postImage/${uniqePostId}`).put(file)
    const data =  await db.storage().ref(`postImage/${uniqePostId}`).put(file)
    console.log(data)
    const processedPhoto = await db.storage().ref("postImage").child(uniqePostId).getDownloadURL()


    }



//   const writeDataToFirestore = async () => {
//     try {
//       const docRef = await addDoc(collection(db, 'postImage'), {
//         camera, location, comments: []


//       });
//       console.log('Document written with ID: ', docRef.id);
//     } catch (e) {
//       console.error('Error adding document: ', e);
//         throw e;
//     }
// };



// const getDataFromFirestore = async () => {
//   try {
//     const snapshot = await getDocs(collection(db, 'users'));
//         
//     snapshot.forEach((doc) => console.log(`${doc.id} =>`, doc.data()));
//       
//           return snapshot.map((doc) => ({ id: doc.id, data: doc.data() });
//   } catch (error) {
//     console.log(error);
//           throw error;
//   }
// };


  const sendPhoto = () => {
    uploadPhotoToServer()
    navigation.navigate("Home", { photo });
  };




  return (
    <View style={styles.container}>
      <Camera ref={setCamera} style={styles.camera}>
        {photo && (
          <View style={styles.containerPhoto}>
            <Image style={styles.photo} source={{ uri: photo }} />
          </View>
        )}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={takePhoto}
          style={styles.containerCamera}
        >
          <Ionicons name="ios-camera-outline" size={24} color="gray" />
        </TouchableOpacity>
      </Camera>
      <TouchableOpacity 
      onPress={choosePhoto}
      >
      <Text style={styles.text}>Завантажте фото</Text>
      </TouchableOpacity>
      <View style={styles.containerInput}>
        <TextInput
          style={styles.input}
          placeholder="Назва..."
          keyboardType="default"
        />

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={()=> navigation.navigate("Map")}
          style={styles.location}
        >
          <SimpleLineIcons name="location-pin" size={24} color="gray" />
        </TouchableOpacity>

        <TextInput
          dataDetectorTypes={"address"}
          style={styles.input}
          placeholder="Місцевість..."
          keyboardType="default"
        />
       </View>

      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.button}
        onPress={sendPhoto}
      >
        <Text style={styles.textOnBtn}>Опубліковати</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    flex: 1,
    backgroundColor: "#ffffff",
  },
  camera: {
    height: "40%",
    marginTop: 32,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "#f6f4f4",
  },

  containerCamera: {
    zIndex: 999,
    position: "absolute",
    height: 60,
    width: 60,
    borderRadius: 100,
    backgroundColor: "#f6f6f6bd",
    alignItems: "center",
    justifyContent: "center",
  },
  containerPhoto: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    height: "90%",
    width: "90%",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#F6F6F6",
    overflow: "hidden",
  },

  photo: {
    alignItems: "center",
    justifyContent: "center",
    height: "90%",
    width: "90%",
  },

  textOnBtn: {
    fontSize: 16,
    lineHeight: 19,
    fontWeight: 400,
    color: "#BDBDBD",
  },

  text: {
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
    marginTop: 8,
  },
  containerInput: {
    marginTop: 32,
  },

  input: {
    paddingLeft: 27,
    marginBottom: 23,
    borderBottomWidth: 1,
    borderColor: "#E8E8E8",
  },
  button: {
    justifyContent: "center",
    marginTop: 22,
    alignItems: "center",
    height: 41,
    borderRadius: 100,
    backgroundColor: "#F6F6F6",
    marginTop: 23,
    borderWidth: 1,
    
    borderColor: "transparent",
  },

  submitButton: {
    marginTop: 32,
    paddingVertical: 16,
    borderRadius: 100,
    backgroundColor: "#FF6C00",
  },


  disabledButton: {
    marginTop: 32,
    paddingVertical: 16,
    borderRadius: 100,
    backgroundColor: "#F6F6F6",
  },

  location: {
    zIndex: 999,
    position: "absolute",
    top: 50,
    marginLeft: 0,
    borderRadius: 100,

// position: "absolute",

  }

});

export default CreatePostsScreen;