
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
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Fontisto } from "@expo/vector-icons";

const Home = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();
  // const navigation = useNavigation();

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);

  const signOut = () => {
    dispatch(authSingOutUser());
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
  },
  post: {
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    marginTop: 5,
    marginBottom: 15,
  },
  infoPost: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
});

export default Home;
