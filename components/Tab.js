import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
   } from 'react-native';


const Tab=(props)=>{

    return (
        <View style={styles.root}>

            <TouchableOpacity style={styles.button} onPress={()=>{props.changeTabIndex(0)}}>
                <Text style={styles.text}>INFO</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={()=>{props.changeTabIndex(1)}}>
                <Text style={styles.text}>CASTS</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.button} onPress={()=>{props.changeTabIndex(2)}}>
                <Text style={styles.text}>TRAILERS</Text>
            </TouchableOpacity>


        </View>
    )
}

const styles=StyleSheet.create({
    root : {
        height:50,
        width:'100%',
        backgroundColor:'#0d0d0a',
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center'
    },
    button:{
        flex : 1,
    },
    text : {
        color :'white',
        fontWeight:'bold',
        textAlign:'center'
    },
   
    
})

export default Tab;