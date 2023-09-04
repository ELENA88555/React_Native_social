import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { AntDesign } from "@expo/vector-icons";
import Registration from "./Screens/RegistrationScreen";
import LoginScreen from "./Screens/LoginScreen";
import PostsScreen from "./Screens/PostsScreen";
import CreatePostsScreen from "./Screens/CreatePostsScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import { View, StyleSheet } from "react-native";
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from "@react-navigation/native";

const Stack = createStackNavigator(); // вказує на групу навігаторів
const Tab = createBottomTabNavigator();


export const useRoute = (isLogin) => {
  if (!isLogin) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Registration"
          options={{ headerShown: false }}
          component={Registration}
        />
        <Stack.Screen
          name="Login"
          options={{ headerShown: false }}
          component={LoginScreen}
        />
      </Stack.Navigator>
    );
  }
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {},
        // tabBarStyle: { display: "none" },

        tabBarStyle: ((route) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? "";

          if (routeName === "CreatePosts" || routeName === "Coments") {
            return { display: "none" };
          }
          return { display: "flex" };
        })(route),
        tabBarShowLabel: false,
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Posts"
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <AntDesign name="appstore-o" size={size} color={color} />
          ),
        }}
        component={PostsScreen}
      />
      <Tab.Screen
        name="CreatePosts"
        options={{
          headerShown: false,
          tabBarStyle: { display: "none" },
          tabBarIcon: ({ focused }) => (
            <View style={styles.containerForm}>
              <Ionicons style={styles.plus} name="add-outline" size={24} />
            </View>
          ),
        }}
        // options={({ route, focused, color }) => ({
        //   headerShown: false,
        //   tabBarIcon: ({ focused, size, color, name }) => (
        //     <View style={styles.containerForm}>
        //       <AntDesign
        //         style={styles.plus}
        //         name={focused ? "delete" : "plus"}
        //         size={25}
        //         color={color}
        //       />
        //     </View>
        //   ),
        //   //  tabbarvisible: false,
        //   //  tabBarStyle: { display: "none" },

        //   //   tabBarStyle: ((route) => {
        //   //     const routeName = getFocusedRouteNameFromRoute(route) ?? ""

        //   //     if (routeName === 'CreatePosts') {
        //   //       return  {display: "flex"}
        //   //     }
        //   //     return   { display: "none" }
        //   //   })(route),
        // })}
        component={CreatePostsScreen}
      />
      <Tab.Screen
        name="Profile"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <AntDesign name="user" size={size} color={color} />
          ),
        }}
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  containerForm: {
    // flex: 1,
    height: 40,
    width: 70,
    // borderWidth: 1,
    // padding: 12,
    borderRadius: 20,
    backgroundColor: "#FF6C00",
    justifyContent: "center",
    alignItems: "center",
  },
  plus: {
    // flex: 1,
    color: "#fff",
    alignItems: "center",
  
  },
});

