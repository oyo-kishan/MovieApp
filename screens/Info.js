import React,{useState,useEffect,useRef, useReducer} from 'react';
import {View,Text,StyleSheet, Dimensions, FlatList} from 'react-native';
import InfoImageCarousel from '../components/InfoImageCarousel';

const {width,height} = Dimensions.get('window');
const axios = require('axios');


const Info=({navigation,route})=>{
    const movieId=route.params.id;
    const movieImageUrl=`https://api.themoviedb.org/3/movie/${movieId}/images?api_key=71298cd73892fc9acb385b50a59e4124&language=en-US&include_image_language=null`

    const imageListRef=useRef();
    const [imageList,setImageList]=useState([]);

    useEffect(()=>{
        axios.get(movieImageUrl).then((response)=>{
            const fetchedData=response.data;
            const list=[];
            for(let i=0;i<fetchedData?.backdrops?.length;i++){
                const requiredData={
                    id : fetchedData.id+""+i,
                    imagePath : fetchedData.backdrops[i].file_path
                }
                list.push(requiredData);
            }
            setImageList(list);
            makeFlatListScollable(list.length);
        })
    },[]);

    const makeFlatListScollable=(len)=>{
        let scrolled=0;
        setInterval(()=>{
            scrolled=(scrolled+1)%len;
            if(imageListRef.current){
                imageListRef.current.scrollToIndex({ animated: true, index: scrolled})
            }
        },4000);
    }


    return (
        <View style={styles.root}>

            <View style={styles.firstHalfView}>
                <FlatList
                  ref={imageListRef}
                  horizontal
                  pagingEnabled
                  showsHorizontalScrollIndicator={false}
                  data={imageList}
                  keyExtractor={(item)=>item.id.toString()}
                  renderItem={({item,index})=><InfoImageCarousel imagePath={item.imagePath}/>}
                />
               
            </View>

{/* 


            <View style={styles.secondHalfView}> 

            </View> */}

        </View>
    )
}

const styles=StyleSheet.create({
    root  :{
        flex : 1,
    },
    firstHalfView : {
        flex : 1,
    },
    secondHalfView:{
        flex : 1,
        backgroundColor:'red'
    }
})

export default Info;