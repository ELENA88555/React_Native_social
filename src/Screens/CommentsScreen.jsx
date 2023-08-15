import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { View, Text, TouchableOpacity } from "react-native";

const ComentsScreen = ({ navigation }) => {
  return (
    <View>
              <View style={styles.headerContainer}>
       <Text style={styles.header}>Create new publication</Text>
                <TouchableOpacity
            style={styles.goBack}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} />
          </TouchableOpacity>
          </View>
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
  headerContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.3)",
    paddingTop: 45,
    paddingBottom: 11,

    backgroundColor: "#FFFFFF",
  }, 
  goBack: {
    position: "absolute",
    bottom: 10,
    left: 20,
  },
  header: {
    textAlign: "center",
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.408,
    color: "#212121",
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