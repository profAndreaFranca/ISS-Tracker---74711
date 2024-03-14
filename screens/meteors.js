import axios from "axios";
import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Alert,
  Platform,
  StatusBar,
  SafeAreaView,
  FlatList,
  ImageBackground,
  Image,
  Dimensions,
} from "react-native";

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
        console.log(Object.keys(this.state.meteors));
      })
      .catch((error) => Alert.alert(error.message));
  };

  keyExtractor = (item, index) => index.toString();

  //criar o renderItem

  renderItem = ({ item }) => {
    let meteor = item;
    let bgImg;
    let size;
    let speed;

    if (meteor.pontuacao_Risco <= 30) {
      bgImg = require("../assets/meteor_bg1.png");
      speed = require("../assets/meteor_speed1.gif");
      size = 100;
    } else if (meteor.pontuacao_Risco <= 75) {
      bgImg = require("../assets/meteor_bg2.png");
      speed = require("../assets/meteor_speed2.gif");
      size = 150;
    } else {
      bgImg = require("../assets/meteor_bg3.png");
      speed = require("../assets/meteor_speed3.gif");
      size = 200;
    }

    return (
      <View>
        <ImageBackground source ={bgImg}style ={styles.backgroundImage}> 
          <View style={styles.gifContainer}>
            <Image source={speed} style={{ width: size, height: size }} />
            <View style= {styles.cardTitle}>
              <Text style = {styles.cardTitle}>{item.name}</Text> 
              <Text style = {[styles.cardText,{marginTop:20}]}>
                Mais Próximo da Terra -{" "}
                {item.close_approach_data[0].close_approach_date_full}
              </Text>
              <Text style = {styles.cardText}>
                Diametro Mínimo(km) -{" "}
                {item.estimated_diameter.kilometers.estimated_diameter_min}
              </Text>
              <Text style = {styles.cardText}>
                Diametro Maxímo(km) -{" "}
                {item.estimated_diameter.kilometers.estimated_diameter_max}
              </Text>
              <Text style = {styles.cardText}>
                Velocida(km/h) -{" "}
                {
                  item.close_approach_data[0].relative_velocity
                    .kilometers_per_hour
                }
              </Text>
              <Text style = {styles.cardText}>
                Distancia da Terra(km) -{" "}
                {item.close_approach_data[0].miss_distance.kilometers}
              </Text>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  };

  render() {
    //criar uma condição para exibir carregando até que os dados estejam disponíveis - alexandre
    if (Object.keys(this.state.meteors).length == 0) {
      //no if => exibir carregando na tela - Francesco
      return (
        <View style={styles.loading}>
          <Text>carregando...</Text>
        </View>
      );
    } else {
      //mapear os meteoros - João

      var meteorArray = Object.keys(this.state.meteors).map((meteorDate) => {
        return this.state.meteors[meteorDate];
      });
      var meteors = [].concat.apply([], meteorArray);
      //pontuação de risco = diamentro/distancia ao passar pela terra
      //calcular a pontuação de risco - Francisco
      meteors.forEach(function (element) {
        var diametro =
          (element.estimated_diameter.kilometers.estimated_diameter_min +
            element.estimated_diameter.kilometers.estimated_diameter_max) /
          2;
        var pRisco =
          (diametro / element.close_approach_data[0].miss_distance.kilometers) *
          1000000000;
        element.pontuacao_Risco = pRisco;
      });
      //ordenar meteoros conforme pontuação de risco - Iago

      meteors.sort(function (A, B) {
        return B.pontuacao_Risco - A.pontuacao_Risco;
      });

      //fatiar/recortar os 5 mais críticos.
      meteors = meteors.slice(0, 5);

      //criar um flatlist para exibir os meteoros - Francesco
      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />
          <FlatList
            data={meteors}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
            horizontal={true}
          />
        </View>
      );
    }
  }
}
//criar os estilos
//Alexandre
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
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  titleBar: {
    flex: 0.15,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    marginTop: 5,
    marginLeft: 50,
  },
  meteorContainer: {
    flex: 0.85,
  },
  listContainer: {
    backgroundColor: "rgba(52, 52, 52, 0.5)",
    justifyContent: "center",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    borderRadius: 10,
    padding: 10,
  },
  cardTitle: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: "bold",
    color: "white",
  },
  cardText: {
    color: "white",
    marginTop:5,
    marginLeft:50
  },
  threatDetector: {
    height: 10,
    marginBottom: 10,
  },
  gifContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  meteorDataContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
