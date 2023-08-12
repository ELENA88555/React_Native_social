import "react-native-gesture-handler";
// import { NavigationContainer } from "@react-navigation/native";
// import { StyleSheet } from "react-native";
import React, { useState } from "react";
// import { useRoute } from "./src/router";
import { Provider, useSelector } from "react-redux";
import { store } from "./src/redux/store";
import { Main } from "./src/components/main";

// import { auth }  from "./firebase/config";
// import { Main } from ;


const App = () => {
  // const [user, setUser] = useState(null)

  // const state = useSelector((state) => state)

// useEffect(()=>{


// }, [])

  // auth.onAuthStateChanged((user)=> setUser(user))
  // const routing = useRoute(user);

  return (
    <Provider store={store}>

      <Main/>
   
    </Provider>
  );
};

// Після сабміту в LoginScreen, RegistrationScreen перекидає на Home,
//  де відразу показується екран PostsScreen
// Підключити нижню навігацію, використовуючи createBottomTabNavigator
// У нижній навігації створити 3 переходи.
// Клік по іконці №1 веде на екран PostsScreen
// Клік по іконці №2 веде на екран CreatePostsScreen
// Клік по іконці №3 веде на екран ProfileScreen
// В хедері на екрані PostsScreen додати іконку для logout
// Стилізувати нижню навігацію

// const App = () => (
//   <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//   <View style={styles.container}>
//     <ImageBackground
//       source={require("./src/images/PhotoBG.png")}
//       resizeMode="cover"
//       style={styles.image}
//     >
//       <LoginScreen ></LoginScreen>
//     </ImageBackground>
//   </View>

//   </TouchableWithoutFeedback>

// );

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   image: {
//     flex: 1,
//     justifyContent: "flex-end",
//   },
// });

export default App;
