import axios from "axios";
import React from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  ImageBackground,
  Image,
  Alert,
} from "react-native";
// import { TouchableOpacity } from "react-native-gesture-handler";
import { MapView, Marker } from "react-native-maps";

var bg = require("../assets/iss_bg.jpg");
var issIcon = require("../assets/iss_icon.png");

export default class ISSlocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {},
    };
  }

  componentDidMount() {
    this.getISSLocation();
  }

  getISSLocation = () => {
    axios
      .get("https://api.wheretheiss.at/v1/satellites/25544")
      .then((response) => {
        this.setState({ location: response.data });
        // console.log(response)
      })
      .catch((error) => Alert.alert(error.message));
  };
  render() {
    if (Object.keys(this.state.location).length === 0) {
      return (
        <View style={styles.loading}>
          <Text>Loading...</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />
          <ImageBackground source={bg} style={styles.backgroundImage}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}> ISS Location </Text>
            </View>
            <View style={styles.mapContainer}>
              <MapView
                style={styles.map}
                region={{
                  latitude: this.state.location.latitude,
                  longitude: this.state.location.longitude,
                  latitudeDelta: 100,
                  longitudeDelta: 100,
                }}
              >
                <Marker
                  coordinate={{
                    latitude: this.state.location.latitude,
                    longitude: this.state.location.longitude,
                  }}
                >
                  <Image style={{ width: 50, height: 50 }} source={issIcon} />
                </Marker>
              </MapView>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.infoText}>
                Latitude:{this.state.location.latitude}
              </Text>
              <Text style={styles.infoText}>
                Longitude:{this.state.location.longitude}
              </Text>
              <Text style={styles.infoText}>
                Altitude:{this.state.location.altitude}
              </Text>
              <Text style={styles.infoText}>
                Velocity:{this.state.location.velocity}
              </Text>
            </View>
          </ImageBackground>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  titleContainer: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
  refeshContainer: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center",
  },
  mapContainer: {
    flex: 0.6,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  infoContainer: {
    flex: 0.2,
    backgroundColor: "#fff",
    marginTop: -10,
    borderRadius: 30,
    padding: 30,
  },
  infoText: {
    fontSize: 15,
    color: "#000",
    fontWeight: "bold",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
