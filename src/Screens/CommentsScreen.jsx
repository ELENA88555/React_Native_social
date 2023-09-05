import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { compareAsc, format } from "date-fns";
import { AntDesign } from "@expo/vector-icons";

import {
  View,
  TouchableOpacity,
  Text,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TextInput,
  StyleSheet,
  Platform,
  FlatList,
  Dimensions,
} from "react-native";
import { useSelector } from "react-redux";
import {
  selectNickName,
  selectUserId,
  selectUserPhoto,
} from "../redux/auth/authSelector";
import { useNavigation, useRoute } from "@react-navigation/native";

import { db } from "../../firebase/config";
import { doc, collection, addDoc, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";

const ComentsScreen = ({ route }) => {
  const { postId } = route.params;
  const { params } = useRoute();
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  // const [userPhoto, setuserPhoto] = useState("");
  const [count, setCount] = useState(0);

  const userId = useSelector(selectUserId);
  const userPhoto = useSelector(selectUserPhoto);
  const nickName = useSelector(selectNickName);

  useEffect(() => {
    getAllPosts();
  }, []);

  const handleOnPress = () => {
    Keyboard.dismiss();
  };

  const navigation = useNavigation();

  const formatDate = (date) => {
    return format(date, "dd MMMM, yyyy | HH:mm");
  };

  const addNewComment = async () => {
    if (commentText.trim() === "") {
      alert("Write the comment");
      return;
    }
    const docRef = doc(db, "posts", postId);
    console.log("docRef", docRef);

    await addDoc(collection(docRef, "comments"), {
      commentText,
      nickName,
      postedDate: formatDate(new Date()),
      // userPhoto,
    });

    handleOnPress();
    setCommentText("");
  };

  const getAllPosts = async () => {
    try {
      const ref = doc(db, "posts", postId);
      onSnapshot(collection(ref, "comments"), (data) => {
        setComments(data.docs.map((doc) => ({ ...doc.data() })));
      });
    } catch (error) {
      console.log(error.message);
    }
  };



  return (
    <TouchableWithoutFeedback onPress={handleOnPress}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={-260}
      >
        <View style={styles.mainContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.text}>Comments</Text>
            <TouchableOpacity
              style={styles.goBack}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={24} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.comment}>
          {params && (
            <View style={styles.post}>
              <Image style={styles.photo} source={{ uri: params.photo }} />
            </View>
          )}
          {/* <TouchableOpacity
           onPress={() => {
              setCount(count + 1)
              console.log(count)
            }}
            style={styles.counter}
            >
            <AntDesign name="like2" size={24} color="#BDBDBD" />
          </TouchableOpacity>
          <Text style={styles.countText}>{count}</Text> */}
        </View>

        <FlatList
          style={styles.commentsArr}
          data={comments}
          keyExtractor={(item, indx) => item + indx.toString()}
          renderItem={({ item }) =>
            comments && (
              <View style={styles.comments}>
                <View style={styles.commentsWrap} id={item.id}>
                  {userPhoto ? (
                    <Image
                      style={styles.userPhoto}
                      source={{ uri: item.userPhoto }}
                    />
                  ) : (
                    <Image
                      source={{
                        uri: "https://i0.wp.com/sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png?ssl=1",
                      }}
                      style={styles.userPhoto}
                    />
                  )}
                  <View style={styles.commentThumb}>
                    <Text style={styles.commentText}>{item.commentText}</Text>
                    <Text style={styles.commentDate}>{item.postedDate}</Text>
                  </View>
                </View>
              </View>
            )
          }
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Leave a comment..."
            placeholderTextColor="#BDBDBD"
            value={commentText}
            onChangeText={setCommentText}
          />

          <TouchableOpacity  onPress={addNewComment}>
            <View style={styles.arrowUp}>
              <Ionicons name="arrow-up-outline" size={24} color="#FFFFFF" />
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  containerForm: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  mainContainer: {},

  container: {
    flex: 1,
  },

  headerContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.3)",
    paddingTop: 45,
    paddingBottom: 11,

    backgroundColor: "#FFFFFF",
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

  text: {
    textAlign: "center",
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.408,
    color: "#212121",
  },
  comment: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
    marginBottom: 50,
  },
  commentsArr: {
    maxHeight: 220,
    marginBottom: 28,
  },

  post: {
    marginBottom: 124,
  },
  photo: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    borderWidth: 1,
  },
  inputContainer: {
    position: "relative",
    marginTop: "auto",
    paddingBottom: 16,
  },
  input: {
    width: "100%",
    padding: 16,
    borderWidth: 1,
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    borderColor: "#E8E8E8",
    color: "#212121",
    fontSize: 16,
    lineHeight: 19,
  },
  arrowUp: {
    position: "absolute",
    display: "flex",
    right: 8,
    bottom: 14,
    width: 34,
    height: 34,
    transform: [{ translateY: -0.5 * 0 }],
    borderRadius: 100,
    backgroundColor: "#FF6C00",
    justifyContent: "center",
    alignItems: "center",
  },

  comments: {
    display: "flex",
    flexDirection: "column",
    gap: 25,
    paddingBottom: 50,
  },
  userPhoto: {
    width: 28,
    height: 28,
    backgroundColor: "#F6F6F6",
    marginLeft: 18,
    borderRadius: 100,
    overflow: "hidden",
  },
  commentsWrap: {
    paddingHorizontal: 16,

    display: "flex",
    flexDirection: "row-reverse",
    // width: Dimensions.get("window").width - 76,
  },

  commentThumb: {
    width: "80%",
    minHeight: 50,
    padding: 16,
    backgroundColor: "#F6F6F6",
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  commentText: {
    fontSize: 13,
    color: "#212121",
    lineHeight: 18,
  },
  commentDate: {
    marginTop: 8,
    fontSize: 10,
    lineHeight: 12,
    color: "#BDBDBD",
    marginLeft: "auto",
  },
  counter: {
    marginTop: 0,
    position: "absolute",
    top: 280,
    left: 18,
  },
  countText: {
    marginTop: 0,
    position: "absolute",
    top: 299,
    left: 18,
    color: "#BDBDBD",
  },
});

export default ComentsScreen;
