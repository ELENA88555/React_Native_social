// import "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { Camera, CameraType } from "expo-camera";
import { SimpleLineIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { View, Text } from "react-native";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app, db, storage } from "../../firebase/config";
import { collection, setDoc, addDoc } from "firebase/firestore";
import { selectNickName, selectUserId } from "../redux/auth/authSelector";
import { useSelector } from "react-redux";

import * as firebase from "firebase/app";
import "firebase/storage";

const CreatePostsScreen = ({ navigation }) => {
  const [camera, setCamera] = useState(null);
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [posts, setPosts] = useState([]);
  const [commentNumber, setCommentNumber] = useState(0);
  const [mapLocation, setMapLocation] = useState("");

  const userId = useSelector(selectUserId);
  const user = useSelector(selectNickName);

  useEffect(() => {

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const  coords = await{
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setLocation(coords);
    })();
  }, []);

  const checUserkLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    const coords = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
    setLocation(coords);
  };

  const takePhoto = async () => {
    const { uri } = await camera.takePictureAsync();
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    const coords = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };

    console.log(location.coords.latitude);
    console.log(location.coords.longitude);
    setLocation(coords);
    setPhoto(uri);
    // uriToBlob(uri)
    console.log(uri);
  };

  const handleChangeName = (value) => {
    setName(value);
  };

  const handleChangeMap = (value) => {
    setMapLocation(value);
  };

  const uriToBlob = (photo) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new Error("uriToBlob failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", photo, true);
      xhr.send(null);
    });
  };

  const uploadPhotoToServer = async () => {
    const body = await uriToBlob(photo);
    const response = await fetch(body);

    const file = await response.blob();

    const uniqePostId = Date.now().toString();

    // const data = await app.storage().ref(`postImage/${uniqePostId}`).put(file)
    const data = await ref(storage, `postImage/${uniqePostId}/${file}`);
    console.log(data);
    await uploadBytes(data, file);

    // const processedPhoto = await db
    //   .storage()
    //   .ref("postImage")
    //   .child(uniqePostId)
    //   .getDownloadURL();
    const processedPhoto = await getDownloadURL(data);
    console.log(processedPhoto);
    return processedPhoto;
  };

  const choosePhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access media library denied");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();

    if (!result.didCancel) {
      setPhoto(result.assets[0].uri);
    }
  };

  const writeDataToFirestore = async () => {
    try {
      const photo = await uploadPhotoToServer();

      const docRef = await addDoc(collection(db, "posts"), {
        name,
        photo,
        mapLocation,
        location,
        userId,
        user,
      });

      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
      throw e;
    }
  };

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

  const handleSubmit = () => {
    if (!name || !photo) {
      return console.warn("Fill in the fields");
    }
    writeDataToFirestore();

    setName("");
    setPhoto(null);
    setMapLocation("");
    navigation.navigate("Home", { photo, name, location, mapLocation});
  };

  const disabledButton = name === "" || photo === null || mapLocation === ""

  const clearPosts = () => {
    setPhoto(null);
    setName("");
    setMapLocation("");
  };

  // checUserkLocation()

  const clearPostsButton = name === "" && photo === null;
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Create new post</Text>
        <TouchableOpacity
          style={styles.goBack}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} />
        </TouchableOpacity>
      </View>
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
      <TouchableOpacity onPress={choosePhoto}>
        <Text style={styles.text}>Upload a photo</Text>
      </TouchableOpacity>
      <View style={styles.containerInput}>
        <TextInput
          value={name}
          style={styles.input}
          placeholderTextColor="#BDBDBD"
          placeholder="Name..."
          keyboardType="default"
          onChangeText={handleChangeName}
        />

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate("Map")}
          style={styles.location}
        >
          <SimpleLineIcons name="location-pin" size={24} color="gray" />
        </TouchableOpacity>

        <TextInput
          dataDetectorTypes={"address"}
          style={styles.input}
          placeholder="Locality..."
          placeholderTextColor="#BDBDBD"
          keyboardType="default"
          value={mapLocation}
          onChangeText={handleChangeMap}
        />
      </View>

      <TouchableOpacity
        activeOpacity={0.8}
        disabled={disabledButton}
        style={!disabledButton ? styles.button : styles.disabledButton}
        onPress={handleSubmit}
      >
        <Text
          style={
            !disabledButton ? styles.buttonText : styles.disabledButtonText
          }
        >
          Publish
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={clearPosts}
        style={
          !clearPostsButton ? styles.trashButton : styles.trashButtonDisabled
        }
      >
        <Ionicons
          name="trash-outline"
          size={24}
          color="#DADADA"
          style={styles.trashIcon}
        />
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
  headerContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.3)",
    paddingTop: 45,
    paddingBottom: 11,

    backgroundColor: "#FFFFFF",
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
  goBack: {
    position: "absolute",
    bottom: 10,
    left: 20,
  },
  header: {
    textAlign: "center",
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.408,
    color: "#212121",
  },

  textOnBtn: {
    lineHeight: 19,
    marginTop: 32,
    paddingVertical: 16,
    borderRadius: 100,
    backgroundColor: "#F6F6F6",
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
  disabledButton: {
    justifyContent: "center",
    marginTop: 22,
    alignItems: "center",
    height: 41,
    borderRadius: 100,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "transparent",
  },

  button: {
    justifyContent: "center",
    marginTop: 22,
    alignItems: "center",
    height: 41,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "transparent",
    // paddingVertical: 16,
    backgroundColor: "#FF6C00",
  },
  location: {
    zIndex: 999,
    position: "absolute",
    top: 50,
    marginLeft: 0,
    borderRadius: 100,

    // position: "absolute",
  },
  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 14,
  },

  disabledButtonText: {
    color: "#BDBDBD",
    textAlign: "center",
    fontSize: 14,
  },
  clearButton: {
    position: "absolute",
    // justifyContent: "center",
    // alignItems: "center",
    width: 80,
    height: 40,
    bottom: 4,
    left: "50%",
    transform: [{ translateX: -0.3 * 70 }],
    borderRadius: 100,
    backgroundColor: "#F6F6F6",
  },

  trashButton: {
    flex: 1,
    position: "absolute",
    width: 70,
    height: 40,
    bottom: 14,
    left: "50%",
    transform: [{ translateX: -0.3 * 70 }],
    borderRadius: 100,
    backgroundColor: "#FF6C00",
  },
  trashButtonDisabled: {
    flex: 1,
    position: "absolute",
    width: 70,
    height: 40,
    bottom: 14,
    left: "50%",
    transform: [{ translateX: -0.3 * 70 }],

    borderRadius: 100,
    backgroundColor: "#F6F6F6",
  },
  trashIcon: {
    position: "absolute",
    bottom: "50%",
    left: "50%",
    transform: [{ translateY: 0.5 * 25 }, { translateX: -0.5 * 25 }],
  },
});

export default CreatePostsScreen;
