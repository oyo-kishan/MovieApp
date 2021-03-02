import React ,{useEffect,useState}from'react';
import {View,StyleSheet,FlatList} from 'react-native';
import DetailCard from '../components/DetailCard';

const imagePathUrl="https://image.tmdb.org/t/p/w500";
const axios = require('axios');


const Detail=({navigation,route})=>{
    const url=route.params.url;
    const [data,setData]=useState([]);

    useEffect(()=>{
        navigation.setOptions({title : route?.params?.title})
        axios.get(url).then((response)=>{
            const fetchedData=response.data.results;
            const list=[];
            for(let i=0;i<fetchedData.length;i++){
                const requiredData={
                    id : fetchedData[i].id,
                    title : fetchedData[i].original_title,
                    rating : fetchedData[i].vote_average,
                    foregroundImage : imagePathUrl+fetchedData[i].backdrop_path,
                    year : fetchedData[i].release_date,
                    description: fetchedData[i].overview,
                }
                list.push(requiredData);
            }
            setData(list);
        })
    },[]);


    

    return (
        <View style={styles.root}>
            <FlatList
               data={data}
               keyExtractor={(item)=>item.id.toString()}
               renderItem={({item,index})=><DetailCard item={item}/>}
            />
        </View>
    )
}


const styles=StyleSheet.create({
    root : {
        flex:1,
    }
})


export default Detail;