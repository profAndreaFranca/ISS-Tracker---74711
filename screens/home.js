import React from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  TouchableOpacity,
  Image,
} from "react-native";

export default class Home extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.droidSafeArea} />
        <View style={styles.titleBar}>
          <Text style={styles.titleText}> ISSTracker </Text>
        </View>
        <TouchableOpacity style={styles.routeCard}>
          {/* <Image style={styles.imageIcon}/> */}
          <Text style={styles.routeText}>ISS Location</Text>
          <Text style={styles.knowMore}>know more</Text>
          <Text style={styles.bgDigit}>1</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.routeCard}>
          {/* <Image style={styles.imageIcon}/> */}
          <Text style={styles.routeText}>Meteors</Text>
          <Text style={styles.knowMore}>know more</Text>
          <Text style={styles.bgDigit}>2</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.routeCard}>
          {/* <Image style={styles.imageIcon}/> */}
          <Text style={styles.routeText}>Updates</Text>
          <Text style={styles.knowMore}>know more</Text>
          <Text style={styles.bgDigit}>3</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "pink",
  },
  titleBar: {
    // backgroundColor: "blue",
    flex: 0.15,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontSize: 50,
    color: "#fff",
    fontWeight: "bold",
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  routeCard: {
    flex: 0.25,
    marginLeft: 50,
    marginRight: 50,
    marginTop: 50,
    backgroundColor: "white",
    borderRadius: 30,
  },
  imageIcon: {},
  routeText: {
    fontSize:35,
    fontWeight:"bold",
    color:"black",
    marginTop:75,
    paddingLeft:30
  },
  knowMore: {
    paddingLeft:30,
    color:"red",
    fontSize:15
  },
  bgDigit: {
    

  },
});
