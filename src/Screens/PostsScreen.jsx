import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from "react";
// import { AntDesign } from '@expo/vector-icons';
import ComentsScreen from "./CommentsScreen";
import MapScreen from "./MapScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import Home from "./Home";

const StackNav = createStackNavigator(); // вказує на групу навігаторів
// const Tab = createBottomTabNavigator();

const PostsScreen = () => {
  return (
      <StackNav.Navigator > 
        <StackNav.Screen name="Home" options={{headerShown: false}}  component={Home} />
      <StackNav.Screen name="Map" options={{headerShown: false}} component={MapScreen} />
       <StackNav.Screen name="Coments" options={{headerShown: false}}  component={ComentsScreen} />
      </StackNav.Navigator> 
  );
}

export default  PostsScreen


