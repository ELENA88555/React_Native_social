import React from "react";
import MapView, {PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { useNavigation, useRoute } from "@react-navigation/native";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const MapScreen = () => {

  const navigation = useNavigation();
  const { params } = useRoute();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Map</Text>
        <TouchableOpacity
          style={styles.goBackBtn}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} />
        </TouchableOpacity>
      </View>

      <MapView
      showsUserLocation={true}
       provider={PROVIDER_GOOGLE}
        style={styles.mapStyle}
        region={{
          ...params,
          // latitude: 51.493680,
          // longitude: 31.294689,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        mapType="standard"
        minZoomLevel={25}
        onMapReady={() => console.log("Map is ready")}
        onRegionChange={() => console.log("Region change")}
      >
        <Marker
          title="I am here"
          // coordinate={{
          //   latitude: params.latitude,
          //   longitude: params.longitude,
          // }}
          coordinate={{
            latitude: 51.493680,
            longitude: 31.294689,
          }}
          description="Hello"
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },

  header: {
    paddingTop: 55,
    paddingBottom: 11,

    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.3)",
  },
  goBackBtn: {
    position: "absolute",
    bottom: 10,
    left: 20,
  },
  headerText: {
    textAlign: "center",
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.408,
    color: "#212121",
  },
});

export default MapScreen;
