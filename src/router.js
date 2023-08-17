import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { AntDesign } from '@expo/vector-icons';
import Registration from "./Screens/RegistrationScreen";
import LoginScreen from "./Screens/LoginScreen";
import PostsScreen from "./Screens/PostsScreen";
import CreatePostsScreen from "./Screens/CreatePostsScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import { View, StyleSheet } from "react-native";

const Stack = createStackNavigator(); // вказує на групу навігаторів
const Tab = createBottomTabNavigator();
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
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        // let iconName

        // if (route.name === 'Home') {
        //   iconName = focused ? 'ios-information-circle' : 'ios-information-circle-outline'
        // } else if (route.name === 'CreatePosts') {
        //   iconName = focused && 'trash-outline' 
        // }

     
        // return <Ionicons name={iconName} size={size} color={color} />
      },
      tabBarShowLabel: false,
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'gray'
    })}
  >
<Tab.Screen name="Posts"  options={{tabBarShowLabel: false, headerShown: false,tabBarIcon: ({focused, size,  color})=> <AntDesign name="appstore-o" size={size} color={color} /> }} component={PostsScreen} />
<Tab.Screen name="CreatePosts"
 options={{headerShown: false, tabBarShowLabel: false,
  tabBarIcon: ({focused, size, color, name})=> 

  <View style={styles.containerForm} >
 <AntDesign style={styles.plus} name={focused ? "delete" : "plus"} size={30} color={color} />
  </View>
   }}
   component={CreatePostsScreen} />
<Tab.Screen name="Profile" options={{ headerShown: false, tabBarIcon: ({focused, size, color})=> <AntDesign name="user" size={size} color={color} /> }} component={ProfileScreen} />
</Tab.Navigator>

  )

}

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
    // justifyContent: "center",


  }


});
// const App = () => {
// const routing = useRoute(true)

//   return (
//     <NavigationContainer>
//     {routing}
//     </NavigationContainer>
//   );
// };

