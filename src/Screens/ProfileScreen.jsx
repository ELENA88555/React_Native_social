import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { auth, db } from "../../firebase/config";
import { useDispatch, useSelector } from "react-redux";
import {
  authSingOutUser,
  updateUserProfile,
} from "../redux/auth/authOperations";
import ImageBackgroundScreen from "../components/ImageBackground";
import {
  selectEmail,
  selectNickName,
  selectUserId,
  selectUserPhoto,
} from "../redux/auth/authSelector";
import { updateProfile } from "firebase/auth";
import { authSlice } from "../redux/auth/authReducer";
import { onSnapshot, collection, where, query,getDocs } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import ProfileComponent from "../components/ProfileComponent";
import { FlatList } from "react-native-gesture-handler";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const email = useSelector(selectEmail);
  const userPhoto = useSelector(selectUserPhoto);
  const displayName = useSelector(selectNickName);
  const userId = useSelector(selectUserId);

  const [photoUri, setPhotoUri] = useState(userPhoto ?? null);
  const [posts, setPosts] = useState([]);
  const navigation = useNavigation();

  // const getPosts = async () => {
  //   try {
  //     const querySnapshot = await getDocs( query( collection(db, "posts"), where("userId", "==", "userId")));

  //     await onSnapshot(querySnapshot, (data) => {
  //       const posts =   data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  //       setPosts(posts);
  //     });
  //   } catch (error) {
  //     console.log(error.massage);
     
  //   }
  // };

  const getPosts = async () => {
    const q = query(collection(db, "posts"), where("userId", "==", "userId"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      // const posts = [];
      const posts =    querySnapshot.forEach((doc) => {
          posts.push(doc.data().posts);
      });
      setPosts(posts)
      console.log("Current userId in posts: ");
    });
   };

  // const getPosts = async () => {
  //   const q = await getDocs(query(collection(db, "posts"), where("userId", "==", "userId")))
  //   await onSnapshot(q, (data) => {
  //     // const posts = [];
  //     const posts = data.docs.map((doc) => ({ ...doc.data()}));
  //     setPosts(posts);

  //     console.log("Current userId in posts: ", posts.join(", "));
  //   });
  // };

  //   const getPosts = async () => {
  //   try {
  //     await onSnapshot(collection(db, "posts"), (data) => {
  //       const posts = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  //       setPosts(posts);
  //     });
  //   } catch (error) {
  //     console.log(error.massage);
  //     alert("Try again");
  //   }
  // };



  useEffect(() => {
    getPosts();
  }, []);

  const signOut = () => {
    dispatch(authSingOutUser());
  };

  const choosePhoto = async () => {
    if (photoUri) {
      dispatch(updateUserProfile({ photoURL: "" }));
      dispatch(authSlice.changePhoto(""));
      setPhotoUri(null);
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPhotoUri(result.assets[0].uri);
      dispatch(updateUserProfile({ photoURL: result.assets[0].uri }));
      dispatch(authSlice.changePhoto(result.assets[0].uri));
    }
  };

  const deletePhoto = () => {
    setPhotoUri(null);
  };

  return (
    <View style={styles.container}>
      <ImageBackgroundScreen style={styles.backgroundImage}>
        <View style={styles.mainContainer}>
          <TouchableOpacity onPress={signOut} style={styles.logOutBtn}>
            <Ionicons name="log-out-outline" size={24} color="gray" />
          </TouchableOpacity>

          <View style={styles.mainFoto}>
            <View style={styles.addFoto}>
              {photoUri ? (
                <Image source={{ uri: photoUri }} style={styles.image} />
              ) : (
                <Image
                  source={{
                    uri: "https://i0.wp.com/sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png?ssl=1",
                  }}
                  style={styles.image}
                />
              )}
              <TouchableOpacity onPress={!photoUri ? choosePhoto : deletePhoto}>
                <Ionicons
                  name={
                    photoUri ? "close-circle-outline" : "add-circle-outline"
                  }
                  size={32}
                  color={photoUri ? "#c0bebd" : "#FF6C00"}
                  style={styles.addImage}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.title}>
              <Text style={styles.titleText}>Name:{displayName}</Text>
            </View>
            <FlatList
            // data={posts}
            // keyExtractor={(item, indx) => item + indx.toString()}
            // renderItem={({ item }) => (
            //   <View style={styles.userPosts}>
            //     <Image style={styles.image} source={{ uri: item.photo }} />
            //     <Text style={styles.name}>{item.name}</Text>
            //     <TouchableOpacity
            //           style={styles.comments}
            //           onPress={() =>
            //             navigation.navigate("Comments", {
            //               photo: item.photo,
            //               postId: item.id,
            //             })
            //           }
            //         >
            //           <Fontisto name="hipchat" size={24} color="gray" />
            //           {/* <Text>{item.comments.length}</Text> */}
            //         </TouchableOpacity>
            //         <TouchableOpacity
            //         onPress={() => navigation.navigate("Map", item.location)}
            //         style={styles.comments}
            //         disabled={item.location === null}
            //       >
            //         <Ionicons name="location-outline" size={24} color="#BDBDBD" />

            //         <Text style={styles.address}>{item.address}</Text>
            //       </TouchableOpacity>
            //   </View>
            // )}
            />
          </View>
          <ProfileComponent posts={posts}></ProfileComponent>
        </View>
      </ImageBackgroundScreen>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  backgroundImage: {
    // flex: 1,
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

    backgroundColor: "#FFFFFF",
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
    top: -140,
    left: "50%",
    transform: [{ translateX: -0.4 * 120 }],
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
  },

  image: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
  },
  addImage: {
    position: "absolute",
    bottom: 16,
    right: -18,
  },
  titleText: {
    // display: "flex",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 33,
    color: "#20232a",
    fontSize: 30,
  },

  // container: {
  //   flex: 1,

  // },

  // backgroundImage: {
  //   flex: 1,
  //   width: "100%",
  //   position: "absolute",
  // },

  // mainContainer: {
  //   // flex: 1,
  //   // marginTop: "auto",
  //   height: "84%",
  //   paddingHorizontal: 16,
  //   // paddingTop: 92,
  //   // paddingBottom: 78,
  //   borderTopLeftRadius: 25,
  //   borderTopRightRadius: 25,
  //   backgroundColor: "#ffffff",
  // },

  // logOutBtn: {
  //   position: "absolute",
  //   top: 16,
  //   right: 18,
  // },

  // mainFoto: {
  //   // position: "absolute",
  //   // top: -60,
  //   // left: "50%",
  //   // transform: [{ translateX: -0.4 * 120 }],
  //   // width: 120,
  //   // height: 120,
  //   // borderRadius: 16,
  //   // backgroundColor: "#F6F6F6",
  //   //   alignItems: "center",
  //   //   textAlign: "center",
  //   //   justifyContent: "center",
  //   //   width: 120,
  //   //   height: 120,
  //   //   // backgroundColor: "#F6F6F6",
  //   //   borderRadius: 16,
  //   //   enum: "absolute",
  //   //   position: "relative",
  //   //   // top: 10,
  //   //   // left: 128,
  //   //   zIndex: 999,
  //   //   // overflow: "hidden",
  //   // //   borderColor: "#F6F6F6",
  //   // //  borderWidth: 1,
  //   //  transform: [{ translateY: -0.4 * -30 }],
  // },
  // addFoto: {
  //   position: "absolute",
  //   top: -640,
  //   left: "35%",
  //   // transform: [{ translateY: 0.4 * -120 }],
  //   width: 120,
  //   height: 120,
  //   borderRadius: 16,
  //   backgroundColor: "#F6F6F6",
  //   //   alignItems: "center",
  //   //   textAlign: "center",
  //   //   justifyContent: "center",
  //   //   width: 120,
  //   //   height: 120,
  //   //   backgroundColor: "#F6F6F6",
  //   //   borderRadius: 16,
  //   //   // enum: "absolute",
  //   //   // position: "relative",
  //   //   top: 10,
  //   //   left: "120%",
  //   //   zIndex: 999,
  //   //   // overflow: "hidden",
  //   //   borderColor: "#F6F6F6",
  //   //  borderWidth: 1,
  //   //  transform: [{ translateY: -0.4 * -20 }]
  // },

  // image: {
  //   width: "100%",
  //   height: "100%",
  //   borderRadius: 16,
  //   // position: "absolute",
  //   // width: "100%",
  //   // height: "100%",
  //   // borderRadius: 16,
  //   // zIndex: 999,
  // },
  // addImage: {
  //   position: "absolute",
  //   bottom: 16,
  //   right: -18,
  //   // position: "absolute",
  //   // zIndex: 999,
  //   // left: "160%",
  //   // top: "15%",
  // },
  // titleText : {
  //   fontSize: 30,
  //   marginBottom: 33,
  //   color: "#20232a",
  //   textAlign: "center",
  // },
  // title: {
  //   width: 200,
  //   position: "absolute",
  //   top: -500,
  //   left: "25%",
  //   // left: "50%",
  //   // transform:([{rotateX: '50deg'}]),
  //   // alignContent: "center",
  //   // alignItems: "center",
  //   // width: "100%",
  //   // transform: [{ translateX: 0.9 * -0.5 }],

  // },
  // userPosts: {
  //   position: "absolute",
  //   flex: 1,
  //   // display: "flex",
  //   flexDirection: "row",
  //   alignItems: "baseline",
  //   justifyContent: "space-between",

  // },
  // userPosts: {
  //   position: "absolute",
  //   zIndex: 999,
  //   top: -420,
  //   // flex: 1,
  //   width: "100%",
  //   height: 950,
  //   backgroundColor: "#671010",

  // },
});

export default ProfileScreen;
