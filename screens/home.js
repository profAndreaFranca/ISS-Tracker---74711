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
  ImageBackground,
} from "react-native";

var bgImage = require('../assets/bg.png')
var meteorIcon = require("../assets/meteor_icon.png")
var rocketIcon = require("../assets/rocket_icon.png")
var issIcon = require("../assets/iss_icon.png")

export default class Home extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.droidSafeArea} />
        <ImageBackground source={bgImage} style={styles.backgroundImage}> 
        <View style={styles.titleBar}>
          <Text style={styles.titleText}> ISSTracker </Text>
        </View>
        <TouchableOpacity style={styles.routeCard}
          onPress={()=> this.props.navigation.navigate("ISSLocation")}
        >
          <Image style={styles.imageIcon} source={issIcon}/>
          <Text style={styles.routeText}>ISS Location</Text>
          <Text style={styles.knowMore}>know more</Text>
          <Text style={styles.bgDigit}>1</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.routeCard}
          onPress={()=> this.props.navigation.navigate("Meteors")}
        >
          <Image style={styles.imageIcon} source={meteorIcon}/>
          <Text style={styles.routeText}>Meteors</Text>
          <Text style={styles.knowMore}>know more</Text>
          <Text style={styles.bgDigit}>2</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.routeCard}
          onPress={()=> this.props.navigation.navigate("Updates")}
        >
          <Image style={styles.imageIcon} source={rocketIcon}/>
          <Text style={styles.routeText}>Updates</Text>
          <Text style={styles.knowMore}>know more</Text>
          <Text style={styles.bgDigit}>3</Text>
        </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  }
}

//Iago - ImageBackground
//Francesco - Images
//Alexandre - Navegação
//João - Styles

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "pink",
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
    position:"absolute",
    color:"rgba(183,183,183,0.5)",
    fontSize:150,
    zIndex:-1,
    right:20,
    bottom:-15


  },
  backgroundImage:{
    flex:1,
    resizeMode:"cover"
  },
  imageIcon: {
    position:"absolute",
    height:200,
    width:200,
    resizeMode:"contain",
    top:-80,
    right:20
  },
});
