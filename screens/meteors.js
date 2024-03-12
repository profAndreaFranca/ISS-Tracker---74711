
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

  keyExtractor = (item, index) => index.toString()

  //criar o renderItem
 
 renderItem = ({item}) => {
  let meteor = item;
  let bgImg;
  let size;
  let speed;

  if (meteor.pontuacao_Risco<=30){
    bgImg = require("../assets/meteor_bg1.png")
    speed = require("../assets/meteor_speed1.gif")
    size = 100
  }else if (meteor.pontuacao_Risco<=75) {
    bgImg = require("../assets/meteor_bg2.png")
    speed = require("../assets/meteor_speed2.gif")
    size = 150
  }else{
    bgImg = require("../assets/meteor_bg3.png")
    speed = require("../assets/meteor_speed3.gif")
    size = 200
  }
 }
  // Francisco
  // João
  


  render() {
    //criar uma condição para exibir carregando até que os dados estejam disponíveis - alexandre
    if(Object.keys(this.state.meteors).length == 0){
      //no if => exibir carregando na tela - Francesco
      return(
        <View style ={styles.container}> 
          <Text>carregando...</Text>
        </View>
      
      )
    }else{
    //mapear os meteoros - João

    var meteorArray = Object.keys(this.state.meteors).map(meteorDate=>{
      return this.state.meteors[meteorDate]
    })
    var meteors = [].concat.apply([],meteorArray)
    //pontuação de risco = diamentro/distancia ao passar pela terra
    //calcular a pontuação de risco - Francisco
    meteors.forEach(function(element){
      var diametro = (element.estimated_diameter.kilometers.estimated_diameter_min + 
      element.estimated_diameter.kilometers.estimated_diameter_max) / 2 
      var pRisco = (diametro / element.close_approach_data[0].miss_distance.kilometers) * 1000000000 
      element.pontuacao_Risco = pRisco
    })
    //ordenar meteoros conforme pontuação de risco - Iago
    
    meteors.sort(function(A,B){
      return B.pontuacao_Risco - A.pontuacao_Risco
    })

    //fatiar/recortar os 5 mais críticos.
    meteors = meteors.slice(0,5)
    
    //criar um flatlist para exibir os meteoros - Francesco
    return (
      <View style={styles.container}>
      <SafeAreaView style={styles.droidSafeArea}/>
      <FlatList
        data = {meteors}
        renderItem = {this.renderItem}
        keyExtractor = {this.keyExtractor}
        horizontal = {true}
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
    justifyContent: "center",
    alignItems: "center",
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android"? StatusBar.currentHeight: 0,
  }
});
