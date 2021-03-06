import React,{useState,useEffect,useRef,} from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    FlatList, 
    ScrollView,
    Animated,
    Image,
    TouchableOpacity
    } from 'react-native';

import CastList from '../components/CastList';
import InfoHeader from '../components/InfoHeader';
import InfoImageCarousel from '../components/InfoImageCarousel';
import InfoList from '../components/InfoList';
import Tab from '../components/Tab';
import TrailerList from '../components/TrailerList';

const {width} = Dimensions.get('window');
const axios = require('axios');


const Info=({route,navigation})=>{

    const movieId=route.params.id;
    const movieImageUrl=`https://api.themoviedb.org/3/movie/${movieId}/images?api_key=71298cd73892fc9acb385b50a59e4124&language=en-US&include_image_language=null`

    const imageListRef=useRef();
    const scrollRef=useRef();
    const currentIndexOfImageCarousel=useRef(0);

    const [imageList,setImageList]=useState([]);
    const animatedValue=useState(new Animated.Value(0))[0];


    useEffect(()=>{
        axios.get(movieImageUrl).then((response)=>{
            const fetchedData=response?.data;
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


    const translateInterpolator=animatedValue.interpolate({
        inputRange  :[0 , 1 ,2],
        outputRange : [0,width*0.33,width*0.66],
        extrapolate : 'clamp'
    })

    const changeTabIndex=(index)=>{
        Animated.spring(animatedValue,{
            toValue:index,
            duration:300,
            useNativeDriver:true
        }).start();
    }


    const animatedStyle={
        transform : [
            {
                translateX : translateInterpolator
            }
        ]
    }

    const makeFlatListScollable=(len)=>{
        setInterval(()=>{
            imageListRef.current?.scrollToIndex({ animated: true, index: (currentIndexOfImageCarousel.current+1)%len})
            currentIndexOfImageCarousel.current=(currentIndexOfImageCarousel.current+1)%len;
        },4000);
    }

    const handleScroll=(ev)=>{
        const ceil=Math.ceil(ev.nativeEvent.contentOffset.x/width);
        changeTabIndex(ceil);
    }

    const handleImageCarouselScroll=(x)=>{
        let index=Math.floor(x/width);
        currentIndexOfImageCarousel.current=index
    }


    return (
        <View style={styles.root}>

            <View style={styles.firstHalfView}>
                <FlatList
                  ref={imageListRef}
                  onScroll={(ev)=>handleImageCarouselScroll(ev.nativeEvent.contentOffset.x)}
                  horizontal
                  pagingEnabled
                  showsHorizontalScrollIndicator={false}
                  data={imageList}
                  keyExtractor={(item)=>item.id.toString()}
                  renderItem={({item})=><InfoImageCarousel imagePath={item.imagePath}/>}
                />


                <View style={{position:'absolute',left:0,right:0,bottom:0,height:200,elevation:5,justifyContent:'center'}}>
                    <Image
                      source={require('../images/nolan.jpg')}
                      style={{height:150,width:120,marginLeft:16,resizeMode:'cover',borderRadius:4}}
                    />
                    <View>

                    </View>
                </View>


            </View>

            <View style={styles.secondHalfView}> 

                <View>
                    <Tab changeTabIndex={(index)=>{ scrollRef?.current?.scrollTo({animated:true,x:width*index})}} />
                    <Animated.View style={[styles.bar,animatedStyle]}></Animated.View>
                </View>
                    

                <ScrollView
                    onScroll={(ev)=>{handleScroll(ev)}}
                    ref={scrollRef}
                    scrollEventThrottle={16}
                    nestedScrollEnabled
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    decelerationRate={0.1}>
                    <InfoList/>
                    <CastList/>
                    <TrailerList/>
                </ScrollView>  
            </View>
            
            <TouchableOpacity style={styles.downImage} onPress={()=>{navigation.goBack()}} >
                <Image
                    style={{height:30,width:30,resizeMode:'cover'}}
                    source={require('../images/arrow.png')}
                    />
            </TouchableOpacity>
            
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
    infoHeader : {
        position:'absolute',
        bottom:0,
        left:0,
        right:0,
        elevation:100,
    },
    secondHalfView:{
        flex : 1,
    },
    bar :{
        position:'absolute',
        bottom:0,
        left:0,
        width:width/3,
        height:4,
        backgroundColor:'#b80f0f',
        elevation:5
    },
    downImage : {
        position:'absolute',
        height:30,
        width:30,
        top:20,
        right : 8,
        elevation:5
    }
})

export default Info;