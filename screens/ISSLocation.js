import React from "react"
import {Text, View,StyleSheet} from "react native" 

export default class ISSlocation extends React.Component {
    render(){
        return(
        <View style={styles.container}>
            <Text>ISSlocation</Text>
        </View>
        )
    }
          
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    }
})