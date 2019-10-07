import React, {useState, useEffect} from 'react';
import {Image, Alert, ScrollView, SafeAreaView, TouchableOpacity, Text, AsyncStorage, StyleSheet} from 'react-native';
import socketio from 'socket.io-client'


import SpotList from '../components/SpotList'


import logo from '../assets/logo.png'

export default function list({navigation}){
    const [techs, setTechs] = useState([])

    useEffect(()=>{
        AsyncStorage.getItem('user').then(user_id=>{
            const socket = socketio('http://192.168.0.11:3333', {
                query:{ user_id }
            })

            socket.on('booking_response', booking=>{
                Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'APROVADA': 'REJEITADA'}`)
            })
        })
    }, [])


    useEffect(()=>{
        AsyncStorage.getItem('techs').then(storagedTechs=>{
            const techArray = storagedTechs.split(',').map(tech => tech.trim());
            setTechs(techArray)
        })
    }, [])

    function handleCancel(){
        AsyncStorage.clear();
        navigation.navigate('login')
    }

    //SAFEAREAVIEW para renderizar na área vísivel da tela
    return (
        <SafeAreaView  style={styles.container}> 
            <SafeAreaView style={styles.topvisual}>
            <Image source={logo} style={styles.logo}/>
            <TouchableOpacity onPress={(()=>{handleCancel()})} style={styles.quitButton}><Text style={styles.quitButtontext}>Sair</Text></TouchableOpacity>
            </SafeAreaView>
           

        <ScrollView>
            {techs.map(tech=> <SpotList key={tech} tech={tech}/>)}
        </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        marginBottom: 10
    },
    logo:{
        height: 32,
        resizeMode: "contain", // recolhe a imagem para se adequar dentro do tamanho
        alignSelf: 'center', // alinha no centro
        marginTop: 10,

    },
    quitButton:{
        height: 35,
        backgroundColor:'#f05a5b',
        justifyContent: 'center',
        alignItems:'center',
        borderRadius: 2,
        marginTop: 20,
        marginBottom: 10,
        width: 120,
        marginLeft: 80,
    },
    quitButtontext:{
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 20,
    },
    topvisual:{
        flexDirection: 'row'
    }
})