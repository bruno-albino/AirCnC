import React, { useState, useEffect } from 'react';
import { AsyncStorage, KeyboardAvoidingView, Platform, TouchableOpacity, View, Text, Image, TextInput, StyleSheet } from 'react-native';
import logo from '../assets/logo.png'

import api from '../services/api'

export default function login({navigation}){
    const [email, setEmail] = useState('');
    const [techs, setTechs] = useState('');

    useEffect(()=>{
        AsyncStorage.getItem('user').then(user=>{
            if(user){
                navigation.navigate('list')
            }
        })
    }, []);
    
    async function handleSubmit(){
        const response = await api.post('/sessions', {
            email,
            techs
        })
        const { _id } = response.data;

        await AsyncStorage.setItem('user', _id);
        await AsyncStorage.setItem('techs', techs);

        navigation.navigate('list')

    }


    return (
        <KeyboardAvoidingView enabled={Platform.OS==='ios'} behavior='padding' style={styles.container}>
            <Image source={logo}/>

            <View style={styles.form}>
                <Text style={styles.label}>SEU E-MAIL*</Text>
                <TextInput
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                    placeholder="Seu e-mail"
                    placeholderTextColor="#999"
                    keyboardType='email-address'
                    autoCapitalize='none'
                    autoCorrect={false}
                />


                <Text style={styles.label}>TECNOLOGIAS*</Text>
                <Text style={styles.span}>(Separados por virgulas)</Text>
                <TextInput
                    value={techs}
                    onChangeText={setTechs}
                    style={styles.input}
                    placeholder="Tecnologias de interesse"
                    placeholderTextColor="#999"
                    autoCapitalize='words'
                    autoCorrect={false}
                />

                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.buttonText}>Encontrar Spots</Text>
                </TouchableOpacity>

                
            </View>
            </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    label:{
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8
    },
    form:{
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30,
    },
    input:{
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 2
    },
    span:{
        fontSize: 12
    },
    button:{
        height: 42,
        backgroundColor:'#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
    },

    

    buttonText:{
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    }
})