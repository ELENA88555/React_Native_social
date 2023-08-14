import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from "react";
import { AntDesign } from '@expo/vector-icons';
const Stack = createStackNavigator(); // вказує на групу навігаторів
const Tab = createBottomTabNavigator();
import Registration from "./Screens/RegistrationScreen";
import LoginScreen from "./Screens/LoginScreen";
import PostsScreen from "./Screens/PostsScreen";
import CreatePostsScreen from "./Screens/CreatePostsScreen";
import ProfileScreen from "./Screens/ProfileScreen";

// import { StyleSheet } from "react-native";
// import LoginScreen from "./src/Screens/LoginScreen";
// import Registration from "./src/Screens/RegistrationScreen";
// import PostsScreen from "./src/Screens/PostsScreen";
// import CreatePostsScreen from "./src/Screens/CreatePostsScreen";
// import ProfileScreen from "./src/Screens/ProfileScreen";





export const useRoute = (isLogin) => {
  if (!isLogin) {
    return (
      <Stack.Navigator > 
      <Stack.Screen name="Registration" options={{headerShown: false}} component={Registration} />
       <Stack.Screen name="Login" options={{headerShown: false}}  component={LoginScreen} />
      </Stack.Navigator> 
    )
    // initialRouteName="Registration"  
  }
  return (
<Tab.Navigator  screenOptions = {{tabBarShowLabel: false}} >
<Tab.Screen name="Posts"  options={{tabBarIcon: ({focused, size,  color})=> <AntDesign name="appstore-o" size={size} color={color} /> }} component={PostsScreen} />
<Tab.Screen name="CreatePosts" options={{tabBarIcon: ({focused, size, color})=> <AntDesign name="plus" size={size} color={color} /> }} component={CreatePostsScreen} />
<Tab.Screen name="Profile" options={{ headerShown: false, tabBarIcon: ({focused, size, color})=> <AntDesign name="user" size={size} color={color} /> }} component={ProfileScreen} />
</Tab.Navigator>

  )

}

{/* <AntDesign name="delete" size={24} color="black" /> */}
// <AntDesign name="like2" size={24} color="black" />
{/* <EvilIcons name="arrow-up" size={24} color="black" />
<EvilIcons name="like" size={24} color="black" />
<MaterialCommunityIcons name="exit-to-app" size={24} color="black" /> */}

// // import "react-native-gesture-handler";
// import { NavigationContainer } from "@react-navigation/native";
// // import { StyleSheet } from "react-native";
// import React from "react";
// import { useRoute } from "./src/router";



// const App = () => {
// const routing = useRoute(true)

//   return (
//     <NavigationContainer>
//     {routing}
//     </NavigationContainer>
//   );
// };