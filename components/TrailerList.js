import React from 'react';
import {View,Text,StyleSheet, Dimensions} from 'react-native';

const {width,height}=Dimensions.get('window');

const TrailerList=()=>{
    return (
        <View style={styles.root}>
            <Text>TrailerList</Text>
        </View>
    )
}

const styles=StyleSheet.create({
    root : {
        width,
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center'
    }
})

export default TrailerList;