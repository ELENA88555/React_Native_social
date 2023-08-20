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

const ProfileComponent = ({ posts }) => {
  const navigation = useNavigation();

  return (
    posts.length > 0 && (
      <ScrollView>
        {posts.map((post) => {
          return (
            <View key={post.id} style={styles.newPost}>
              <Image style={styles.image} source={{ uri: post.photo }} />
              <Text style={styles.name}>{post.name}</Text>
              <View style={styles.content}>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 27,
                    marginTop: 11,
                  }}
                >
                  <TouchableOpacity
                    style={styles.comments}
                    onPress={() =>
                      navigation.navigate("Comments", {
                        photo: post.photo,
                        postId: post.id,
                      })
                    }
                  >
                    <Ionicons
                      name="chatbubbles-outline"
                      size={24}
                      color="#BDBDBD"
                    />
                    <Text>{post.comments.length}</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Map", post.location)}
                  style={styles.comments}
                  disabled={post.location === null}
                >
                  <Ionicons name="location-outline" size={24} color="#BDBDBD" />

                  <Text style={styles.address}>{post.address}</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </ScrollView>
    )
  );
};

const styles = StyleSheet.create({
  newPost: {
    marginBottom: 34,
  },
  image: {
    width: "100%",
    height: 240,

    borderWidth: 1,
    borderRadius: 8,
  },
  name: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,
    marginTop: 8,
  },
  content: {
    display: "flex",
    flexDirection: "row",
    alignPosts: "baseline",
    justifyContent: "space-between",
  },
  comments: {
    display: "flex",
    flexDirection: "row",
    gap: 9,
    alignPosts: "center",
  },
  address: {
    fontSize: 16,
    lineHeight: 19,
    textDecorationLine: "underline",
  },
  postAddressDisable: {
    fontSize: 16,
    lineHeight: 19,
  },
});

export default ProfileComponent;