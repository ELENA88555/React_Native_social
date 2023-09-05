import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Text,
  Image,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import { Fontisto } from "@expo/vector-icons";
import { useState } from "react";

const ProfileComponent = ({ posts }) => {
  const navigation = useNavigation();
 


  return (
    <View>
    posts && (
        {posts.map((post) => {
          return (
            <View key={post.id} style={styles.newPost}>
              <Image style={styles.image} source={{ uri: post.photo }} />

              <Text style={styles.name}>{post.name}</Text>
              <View style={styles.content}>
                <View style={styles.commentsPost}>
                  <TouchableOpacity
                    style={styles.comments}
                    onPress={() =>
                      navigation.navigate("Coments", {
                        photo: post.photo,
                        postId: post.id,
                      }
                      )
                    }
                  >
                    <Fontisto name="hipchat" size={24} color="#BDBDBD" />
                    {/* <Text>{post.comments.length}</Text> */}
                  </TouchableOpacity>


                  <TouchableOpacity
                    onPress={() => navigation.navigate("Map", post.location)}
                    style={styles.comments}
                    disabled={post.location === null}
                  >
                    <Ionicons
                      name="location-outline"
                      size={24}
                      color="#BDBDBD"
                    />

                    <Text style={styles.address}>{post.location}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        })}
    )
      </View>
  );
};

const styles = StyleSheet.create({
  newPost: {
    marginBottom: 24,
    paddingHorizontal: 6,
  },
  image: {
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
    alignPosts: "baseline",
    justifyContent: "space-between",
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
    fontSize: 16,
    lineHeight: 19,
    textDecorationLine: "underline",
  },
  postAddress: {
    fontSize: 16,
    lineHeight: 19,
  },
});

export default ProfileComponent;
