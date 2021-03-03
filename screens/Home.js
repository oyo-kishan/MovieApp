import React ,{useState,useEffect,useRef}from 'react';
import {View,Text,StyleSheet, FlatList,ScrollView, Dimensions, TouchableOpacity, requireNativeComponent} from 'react-native';
import Footer from '../components/Footer';
import MovieCarouselCard from '../components/MovieCarouselCard';
import PopularMovieCard from '../components/PopularMovieCard';

const axios = require('axios');
const topRatedMovieUrl='https://api.themoviedb.org/3/movie/top_rated?api_key=71298cd73892fc9acb385b50a59e4124&language=en-US&page=';
const popularMovieUrl='https://api.themoviedb.org/3/movie/popular?api_key=71298cd73892fc9acb385b50a59e4124&language=en-US&page=';
const imagePathUrl="https://image.tmdb.org/t/p/w500";


const Home=({navigation})=>{

    const firstFlatList=useRef();
    const [topListData,setTopListData]=useState([]);
    const [secondListData,setSecondListData]=useState([]);


    useEffect(()=>{
        let url=topRatedMovieUrl.concat("1");
        axios.get(url).then((response)=>{
            const fetchedData=response.data.results;
            const list=[];
            for(let i=0;i<fetchedData.length;i++){
                const requiredData={
                    id : fetchedData[i].id,
                    title : fetchedData[i].original_title,
                    rating : fetchedData[i].vote_average,
                    backgroundImage : imagePathUrl+fetchedData[i].poster_path,
                    foregroundImage : imagePathUrl+fetchedData[i].backdrop_path,
                    description: fetchedData[i].overview,
                }
                list.push(requiredData);
            }
            setTopListData(list);
            makeFlatListScollable(list.length);
        })
        

        let turl=popularMovieUrl.concat("1");

        axios.get(turl).then((response)=>{
            const fetchedData=response.data.results;
            const list=[];
            for(let i=0;i<fetchedData.length;i++){
                const requiredData={
                    id : fetchedData[i].id,
                    title : fetchedData[i].original_title,
                    backgroundImage : imagePathUrl+fetchedData[i].poster_path
                }
                list.push(requiredData);
            }
            setSecondListData(list);
        })

    },[]);


    const makeFlatListScollable=(len)=>{
        let scrolled=0;
        setInterval(()=>{
            scrolled=(scrolled+1)%len;
            if(firstFlatList.current){
                firstFlatList.current.scrollToIndex({ animated: true, index: scrolled})
            }
        },4000);
    }


    return (
        <ScrollView style ={{flex : 1}}> 
            <View style={styles.rootView}>

                <FlatList
                    ref={firstFlatList}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    data={topListData}
                    keyExtractor={(item)=>item.id.toString()}
                    renderItem={({item,index})=><MovieCarouselCard 
                                                    data={item} 
                                                    index={index}
                                                    navigation={navigation}
                                                    />}
                />

                <View style={styles.secondFlatListHeader}>
                    <Text style={styles.popularText}>Popular</Text>
                    <TouchableOpacity onPress={()=>navigation.navigate('Detail',{
                        title : 'Popular',
                        url : popularMovieUrl
                    })}>
                         <Text style={styles.seeAllText}>See all</Text>
                    </TouchableOpacity>
                </View>

                <FlatList
                   horizontal
                   pagingEnabled
                   showsHorizontalScrollIndicator={false}
                   data={secondListData}
                   keyExtractor={(item)=>item.id.toString()}
                   renderItem={({item})=><PopularMovieCard navigation={navigation} data={item}/>}
                />  
                <Footer
                   navigation={navigation}
                />              

            </View>
        </ScrollView>
        
    )
}

const styles=StyleSheet.create({
    rootView: {
        flex : 1,
        alignItems:'center'
    },
    secondFlatListHeader:{
        height:50,
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between'
    },
    popularText:{
        color : 'white',
        fontSize:20,
        fontWeight:'bold',
        marginTop:8,
        marginLeft:8,
        textAlign:'center'
    },
    seeAllText:{
        color : 'white',
        fontSize:18,
        padding:16,
        textAlign:'center'

    }
})


export default Home;