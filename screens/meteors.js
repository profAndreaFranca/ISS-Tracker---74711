import axios from "axios";
import React from "react";
import { Text, View, StyleSheet, Alert } from "react-native";

export default class Meteors extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meteors: {},
    };
  }

  componentDidMount() {
    this.getMeteors();
  }

  getMeteors = () => {
    axios
      .get(
        "https://api.nasa.gov/neo/rest/v1/feed?api_key=UEG79o7VuN1AvC2nm6N7ze0clLmLOUaAHrKej06i"
      )
      .then((response) => {
        this.setState({ meteors: response.data.near_earth_objects });
        console.log(Object.keys(this.state.meteors))
      })
      .catch((error) => Alert.alert(error.message))
  };

  render() {
    return (
      <View style={styles.container}>
        <Text> Meteors </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
