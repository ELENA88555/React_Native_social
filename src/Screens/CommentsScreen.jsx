import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
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
  ScrollView,
} from "react-native";
import { useSelector } from "react-redux";
import { selectUserId, selectUserPhoto } from "../redux/auth/authSelector";
import { useNavigation, useRoute } from "@react-navigation/native";

const ComentsScreen = () => {
  const navigation = useNavigation();

  const { params } = useRoute();
  const [comment, setComment] = useState("");

  const userId = useSelector(selectUserId);
  const avatar = useSelector(selectUserPhoto);




  // const handleSubmit = () => {
  //   if (comment.trim() === "") {
  //     return;
  //   }

  //   addNewComment({
  //     postId: params.postId,
  //     newComment: { date: Date.now(), text: comment, avatar: avatar },
  //   });
  //   setComment("");
  // };

  // const date = (date) => {
  //   return format(date, "dd MMMM, yyyy | HH:mm");
  // };
  

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={-260}
      >
        <View>
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
        </View>
        <ScrollView></ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Leave a comment..."
            placeholderTextColor="#BDBDBD"
            value={comment}
            onChangeText={setComment}
          />

          <TouchableOpacity >
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
    // marginTop: 62,
    // marginBottom: 20,
    // fontSize: 27,
    // lineHeight: 30,
    // fontWeight: 500,
    // textAlign: "center",
    // justifyContent: "center",
    // alignItems: "center",
  },
  comment: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
  },

  post: {
    marginBottom: 34,
  },
  photo: {
    width: "100%",
    height: 240,

    borderWidth: 1,
    borderRadius: 8,
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

    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  arrowUp: {
    position: "absolute",
    display: "flex",
    right: 8,
    bottom: 14,
    width: 34,
    height: 34,
    transform: [{ translateY: -0.5 * 0 }],
    justifyContent: "center",
    alignItems: "center",

    borderRadius: 100,

    backgroundColor: "#FF6C00",
  },

});

export default ComentsScreen;
