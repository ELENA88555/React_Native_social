
// import { createStackNavigator } from "@react-navigation/stack";
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import React from "react";
// import { AntDesign } from '@expo/vector-icons';
// import ComentsScreen from "./CommentsScreen";
// import MapScreen from "./MapScreen";
// import CreatePostsScreen from "./CreatePostsScreen";

// const StackNav = createStackNavigator(); // вказує на групу навігаторів
// // const Tab = createBottomTabNavigator();

// const MyHome = () => {
//   return (
//       <StackNav.Navigator > 
//         <StackNav.Screen name="CreatePosts"  component={CreatePostsScreen} />
//       <StackNav.Screen name="Map" options={{headerShown: false}} component={MapScreen} />
//        <StackNav.Screen name="Coments" options={{headerShown: false}}  component={ComentsScreen} />
//       </StackNav.Navigator> 
//   );
// }

// export default  MyHome


// Після сабміту в LoginScreen, 
// RegistrationScreen перекидає 
// на Home, де відразу показується екран PostsScreen


import { SimpleLineIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { authSingOutUser } from "../redux/auth/authOperations";
import { useDispatch } from "react-redux";


const Home = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);

  const dispatch = useDispatch()

  

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);


  const signOut = ()=> {
    dispatch(authSingOutUser())
  }

  return (
    <View style={styles.container}>


      <TouchableOpacity
          onPress={signOut}
          style={styles.logOutBtn}
        >
       <Ionicons name="log-out-outline" size={24} color="gray" />
      </TouchableOpacity>

      <FlatList
        data={posts}
        keyExtractor={(item, indx) => item + indx.toString()}
        renderItem={({item})=> 
        <View style={{ marginBottom: 20, alignItems: "center",  justifyContent: "center" }} >
          <Image style={{ width: 200, height: 200 }} source={{ uri: item.photo }} />
        </View> }

        sections={posts}
        // keyExtractor={(item, index) => item + index}
        // renderItem={({item}) => (
        //   <View style={{ marginBottom: 200, alignItems: "center",  justifyContent: "center" }}>
        //     <Image style={{ height: 200 }} source={{ uri: item.photo }} />
        //   </View>
        // )}

      />
              {/* <TouchableOpacity
          activeOpacity={0.7}
          onPress={()=> navigation.navigate("Map")}
          style={styles.location}
        >
          <SimpleLineIcons name="location-pin" size={24} color="gray" />
        </TouchableOpacity> */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={()=> navigation.navigate("Coments")}
          style={styles.location}
        >
          {/* <SimpleLineIcons name="location-pin" size={24} color="gray" /> */}
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    justifyContent: "center",
  },
  logOutBtn: {
    position: "absolute",
    top: 6,
    left: 358,
  },
});




export default Home;