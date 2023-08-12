import React from "react";
import { StyleSheet } from "react-native";
import { View, Text } from "react-native";

const ComentsScreen = () => {
  return (
    <View>
      <Text style={styles.text}>ComentsScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  containerForm: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },

  text: {
    marginTop: 62,
    marginBottom: 20,
    fontSize: 27,
    lineHeight: 30,
    fontWeight: 500,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ComentsScreen;