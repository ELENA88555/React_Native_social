import { SimpleLineIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { authSingOutUser } from "../redux/auth/authOperations";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Fontisto } from "@expo/vector-icons";
import { selectEmail, selectNickName } from "../redux/auth/authSelector";
import { selectUserPhoto } from "../redux/auth/authSelector";

const Home = ({ route }) => {
  const email = useSelector(selectEmail);
  const userPhoto = useSelector(selectUserPhoto);
  const displayName = useSelector(selectNickName);

  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);

  const signOut = () => {
    dispatch(authSingOutUser());
    // navigation.navigate("Login")
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Posts</Text>
          <TouchableOpacity onPress={signOut} style={styles.signOut}>
            <Ionicons name="log-out-outline" size={24} color="gray" />
          </TouchableOpacity>
        </View>
        <View style={styles.user}>
          <View style={styles.addPhoto}>
            <Image style={styles.image} source={{ uri: userPhoto }} />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.email}>{email}</Text>
            <Text style={styles.name}>{displayName}</Text>
          </View>
        </View>
        <FlatList
          data={posts}
          keyExtractor={(item, indx) => item + indx.toString()}
          renderItem={({ item }) => (
            <View>
              <Image style={styles.image} source={{ uri: item.photo }} />
              <Text style={styles.name}>{item.name}</Text>

              <View style={styles.post}>
                <TouchableOpacity
                  style={styles.infoPost}
                  onPress={() =>
                    navigation.navigate("Coments", {
                      photo: item.photo,
                      postId: item.id,
                      data: item.coments,
                    })
                  }
                >
                  <Fontisto name="hipchat" size={24} color="gray" />
                  <Text>{item.coments}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => navigation.navigate("Map")}
                  style={styles.location}
                >
                  <SimpleLineIcons name="location-pin" size={24} color="gray" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate("Coments")}
          style={styles.location}
        ></TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    justifyContent: "center",
  },
  headerContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.3)",
    paddingTop: 45,
    paddingBottom: 10,
    backgroundColor: "#FFFFFF",
  },
  addPhoto: {
    // flex: 1,
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    // backgroundColor: "#763a3a",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#763a3a",
    // overflow: "hidden",
  },
  image: {
    // position: "absolute",
    // width: "100%",
    // height: "100%",
    borderRadius: 16,
    width: 60,
    height: 60,
    borderRadius: 16,
    resizeMode: "cover",
    marginBottom: 10,
  },

  signOut: {
    position: "absolute",
    bottom: 10,
    right: 20,
  },
  name: {
    fontSize: 16,
    lineHeight: 19,
    marginTop: 8,
  },
  header: {
    textAlign: "center",
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.408,
    color: "#212121",
  },
  image: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 5,
  },
  post: {
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    marginTop: 5,
    marginBottom: 20,
  },
  infoPost: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  user: {
    display: "flex",
    flexDirection: "row",
    paddingVertical: 32,
  },
  // display: "flex",
  // flexDirection: "column",
  // justifyContent: "center",

  email: {
    fontWeight: 400,
    fontSize: 11,
    lineHeight: 13,
  },

  userInfo: {
    display: "flex",
    flexDirection: "column",
    paddingVertical: 12,
    marginLeft: 5,
 
  },
});

export default Home;
