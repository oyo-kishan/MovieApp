import React from 'react';
import {View,StyleSheet,Image,Text, TouchableOpacity} from 'react-native';

const Footer=()=>{
    return (
        <View style={styles.rootView}>

            <TouchableOpacity onPress={()=>{}}>
                <View style={styles.container}>
                    <Image
                        source={require('../images/play.png')}
                        style={styles.image}
                    />
                    <Text style={styles.text}>Now Playing</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{}}>
                <View style={styles.container}>
                    <Image
                        source={require('../images/trending.png')}
                        style={styles.image}
                    />
                    <Text style={styles.text}>Top Rated</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{}}>
                <View style={styles.container}>
                    <Image
                        source={require('../images/upcoming.png')}
                        style={styles.image}
                    />
                    <Text style={styles.text}>Upcoming</Text>
                </View>
            </TouchableOpacity>
           
        </View>
    )
}

const styles=StyleSheet.create({
    rootView : {
        width:'100%',
        marginTop:20,
    },
    container:{
        height:50,
        width:'100%',
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
    },
    image:{
        height:20,
        width:20,
        marginLeft:16
    },
    text:{
        color : 'white',
        marginLeft:16,
        fontSize:16
    }
})


export default Footer;