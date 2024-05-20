import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, TextInput, ActivityIndicator, KeyboardAvoidingView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Dialog, Portal } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CodeLink } from '../utils';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const [username, setUsername] = useState('')
    const [phone, setPhone] = useState('')
    useEffect(() => {
        getUserData();
    }, [])
    const getUserData = async () => {
        const user = await AsyncStorage.getItem('name');
        const phone = await AsyncStorage.getItem('phone');
        const savedemail = await AsyncStorage.getItem('email');
        const savedpassword = await AsyncStorage.getItem('password');
        if (user) {
            setUsername(user);
            setPhone(phone);
            setEmail(savedemail);
            setPassword(savedpassword);
        }
    }






    const handleLogin = async () => {
        if (email === "" || password === "") {
            Alert.alert("Please input all the fields");
            
            
        } else {
            setLoading(true);
            try {
                const response = await axios.post(`${CodeLink}/api/v2/rider/login`, { email, password });
                // if (response.status === 200) {
                //     console.log(response.data.phone);
                //     setLoading(false);
                //     navigation.navigate('Home',{useremail:email});
                // } else {
                //     Alert.alert('Incorrect Loggin Details');
                //     setLoading(false);
                // }
                const user = response.data;
                
                if (user) {
                    setLoading(false);
                    navigation.replace('Home', { rider: email });
                    // console.log("Link is ",CodeLink);
                    // console.log("username",response.data.user.name);

                    // const username = user.name;
                    savedname = response.data.user.name;
                    console.log(savedname)
                    savedemail = response.data.user.email;
                    savedphone = response.data.user.phone;
                    // console.log("token",response.data.token);

                    await AsyncStorage.setItem("email", savedemail);
                    await AsyncStorage.setItem("name", savedname);
                    await AsyncStorage.setItem("phone", savedphone);
                    await AsyncStorage.setItem("password", password);
                } else {
                    setLoading(false);
                    Alert.alert('Check your connection');
                }

            } catch (error) {
                console.log(error);
                
                setLoading(false);
                if (axios.isAxiosError(error)) {
                    const { response } = error;
    
                    if (response) {
                        if (response.status === 401) {
                            // Invalid password
                            // console.error(response.data.error);
                            alert('Invalid password. Please check your credentials.');
                        } else if (response.status === 500) {
                            // User not found
                            // console.error(response.data.error);
                            alert('Error logging in.Please contact admin.');
                        }
                        else if (response.status === 400) {
                            // Account not approved
                            // console.error(response.status.error);
                            alert('Invalid Email or password');
                            setLoading(false);
                        }
                        else {
                            // Handle other status codes
                            console.error(response.data.error);
                        }
                    } else {
                        // Handle other errors (network issues, etc.)
                        console.error('An error occurred:', error.message);
                    }
                }

            }
        }

    }
    return (
        <SafeAreaView className="flex-1 items-center justify-center">
            <KeyboardAvoidingView behavior='padding'>
                <View className="justify-center items-center">
                    <Image source={require('../assets/images/laundcartoon.png')}
                        className="h-60 w-60"
                    />
                </View>
                <View className="justify-center space-y-8 items-center">
                    <Text className="text-2xl font-semibold text-slate-900">Rider Login</Text>

                    <TextInput
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        className="border border-b-slate-300 p-3 border-t-0 border-r-0 border-l-0 w-80"
                        placeholder='Email Address'
                    />
                    <TextInput
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        className="border border-b-slate-300 p-3 focus:border-b-sky-500 border-t-0 border-r-0 border-l-0 w-80"
                        placeholder='Password'
                        secureTextEntry
                    />

                    <TouchableOpacity
                        onPress={handleLogin}
                        className="bg-black justify-center items-center rounded-2xl w-60 h-12">
                        {!loading ? (
                            <Text className="text-white font-semibold text-xl">Login</Text>
                        ) : (
                            <ActivityIndicator size="medium" color="#ffffff" />
                        )}
                    </TouchableOpacity>
                </View>

                <View className="justify-end items-center my-4 space-y-2">
                    
                    <TouchableOpacity>
                        <Text className="text-sky-500">Forgot Password</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({})