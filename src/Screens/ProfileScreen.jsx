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
  updateUserProfiles,
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
import {
  onSnapshot,
  collection,
  where,
  query,
  getDocs,
  orderBy,
} from "firebase/firestore";
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
  //     const snapshot = await getDocs(collection(db, 'posts'));
  //           // Перевіряємо у консолі отримані дані
  //     snapshot.forEach((doc) => console.log(`${doc.id} =>`, doc.data()));
  //           // Повертаємо масив обʼєктів у довільній формі
  //           const posts = snapshot.map((doc) => ({ id: doc.id, data: doc.data() }))
  //           return setPosts(posts);
  //   } catch (error) {
  //     console.log(error);
  //           throw error;
  //   }
  // };

  // const getPosts = async () => {
  //   try {
  //     const snapshot = await getDocs(collection(db, 'posts'), where("userId", "==", userId));
  //           // Перевіряємо у консолі отримані дані
  //     snapshot.forEach((doc) => console.log(`${doc.id} =>`, doc.data()));
  //           // Повертаємо масив обʼєктів у довільній формі
  //           const posts = snapshot.map((doc) => ({ id: doc.id, data: doc.data() }))
  //           setPosts(posts);
  //   } catch (error) {
  //     console.log(error);
  //           throw error;
  //   }
  // };

  const getPosts = async () => {
    const q = query(collection(db, "posts"), where("userId", "==", userId));

    const querySnapshot = await getDocs(q);
    const newPosts = querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
    setPosts(newPosts);
  };

  // const getPosts = async () => {
  //   try {
  //      onSnapshot(collection(db, "posts"), where("userId", "==", userId), (data) => {
  //       const posts = data.docs.map((doc) => ({ ...doc.data() }));
  //       setPosts(posts);
  //       console.log(posts)
  //     });
  //   } catch (error) {
  //     console.log(error.massage);

  //   }
  // };

  //   const getPosts = async () => {
  //   try {
  //      onSnapshot(collection(db, "posts"), (data) => {
  //       const posts = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  //       setPosts(posts);
  //     });
  //   } catch (error) {
  //     console.warn(error.massage);

  //   }
  // };

  //   const getPosts = async () => {

  //     await getDocs(collection(db, "posts"), where(userId, "==", userId))
  //         .then((querySnapshot)=>{
  //             const newPosts = querySnapshot.docs
  //                 .map((doc) => ({...doc.data(), id:doc.id }));
  //             setPosts(newPosts);
  //             console.log(posts, newPosts);
  //         })

  // }

  useEffect(() => {
    getPosts();
  }, []);

  const signOut = () => {
    dispatch(authSingOutUser());
  };

  const choosePhoto = async () => {
    if (photoUri) {
      dispatch(updateUserProfiles({ photoURL: "" }));
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
      dispatch(updateUserProfiles({ photoURL: result.assets[0].uri }));
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
              <Text style={styles.titleText}>{displayName}</Text>
            </View>
          </View>
          {posts ? (
            <FlatList
              data={posts}
              keyExtractor={(item, indx) => item + indx.toString()}
              renderItem={({ item }) => (
                <View style={styles.userPosts}>
                  <Image style={styles.images} source={{ uri: item.photo }} />
                  <Text style={styles.name}>{item.name}</Text>
                  <View style={styles.content}>
                    <TouchableOpacity
                      style={styles.comments}
                      onPress={() =>
                        navigation.navigate("Comments", {
                          photo: item.photo,
                          postId: item.id,
                        })
                      }
                    >
                      {/* <Ionicons name="ios-chatbubbles-sharp" size={24} color="#FF6C00" /> */}
                      <Fontisto name="hipchat" size={24} color="#FF6C00" />
                      {/* <Text>{item.comments.length}</Text> */}
                    </TouchableOpacity>
                    {/* <View style={styles.content}> */}
                    <Text style={styles.address}>{item.mapLocation}</Text>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("Map", item.location)}
                      style={styles.comments}
                      disabled={item.location === null}
                    >
                      <Ionicons
                        name="location-outline"
                        size={24}
                        color="#BDBDBD"
                      />
                    </TouchableOpacity>
                    {/* </View> */}
                  </View>
                </View>
              )}
            />
          ) : (
            <View>
              <TouchableOpacity
                style={styles.containerAdd}
                onPress={() => navigation.navigate("CreatePosts")}
              >
                <Text style={styles.text}>Create your first posts</Text>
                <View style={styles.containerForm}>
                  <Ionicons style={styles.plus} name="add-outline" size={24} />
                </View>
              </TouchableOpacity>
            </View>
          )}

          {/* <ProfileComponent posts={posts}></ProfileComponent> */}
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
  text: {
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 73,
    color: "#20232a",
    fontSize: 20,
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

  //   flex: 1,
  //   display: "flex",
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
  newPost: {
    marginBottom: 24,
    paddingHorizontal: 6,
  },
  images: {
    width: "100%",
    height: 240,
    borderWidth: 1,
    borderRadius: 8,
  },
  name: {
    fontSize: 16,
    lineHeight: 19,
    marginTop: 8,
  },
  content: {
    flex: 1,
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    marginTop: 5,
    marginBottom: 10,
  },
  comments: {
    // display: "flex",
    flexDirection: "row",
    gap: 9,
    alignPosts: "center",
  },
  commentsPost: {
    flex: 1,
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    marginTop: 5,
    // marginBottom: 10,
  },
  address: {
    padding: 0,
    marginLeft: 200,
    fontSize: 16,
    lineHeight: 19,
    textDecorationLine: "underline",
  },
  postAddress: {
    fontSize: 16,
    lineHeight: 19,
  },
  containerForm: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    height: 40,
    width: 70,
    // alignPosts: "center",
    borderRadius: 20,
    backgroundColor: "#FF6C00",
  },
  plus: {
    // flex: 1,
    color: "#fff",
    alignItems: "center",
  },
  containerAdd: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    gap: 20,
  },
});

export default ProfileScreen;
