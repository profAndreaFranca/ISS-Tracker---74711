
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
      return B.pontuacaoRisco - A.pontuacaoRisco
    })
    meteors = meteors.slice(0,5)
    
    
    return (
      <View style={styles.container}>
        <Text> Meteors </Text>
      </View>
    );
    }
    

    

 


    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
