import {
  View,
  ImageBackground,
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";

const ImageBackgroundScreen = ({children}) => {
  return (
    // <TouchableWithoutFeedback onPress={Keyboard.dismiss()}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../images/PhotoBG.png")}
          resizeMode="cover"
          style={styles.image}
        >
          {children}
        </ImageBackground>
      </View>
    // </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    // position: "absolute",
    flex: 1,
  },
  image: {

    flex: 1,
    justifyContent: "flex-end",
        // position: "absolute",
  },
});


// const styles = StyleSheet.create({
//   backgroundImage: {
//     width: "100%",
//     position: "absolute",
//   },
// });

export default ImageBackgroundScreen;
