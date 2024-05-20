import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, TextInput, ActivityIndicator, KeyboardAvoidingView, Alert } from 'react-native'
import React, { useState } from 'react'
import * as Icon from 'react-native-feather'
import axios from 'axios'
import { CodeLink } from '../utils';

const SignUpScreen = ({ navigation }) => {
    const [name, setName] = useState('samir');
    const [email, setEmail] = useState('samir@gmail.com');
    const [phone, setPhone] = useState('0114068776');
    const [password, setPassword] = useState('123456');
    const [address, setAddress] = useState('kisumu');
    const [loading, setLoading] = useState(false);



    const handleSignUp = async () => {
        setLoading(true);
        if (name === "" || email === "" || password === "" || phone === "" || address === "") {
            Alert.alert('Please input all the fields');
        }
        try {
            const response = await axios.post(`${CodeLink}/api/v2/user/register`, {
                name: name,
                email: email,
                phone: phone,
                password: password,
                address: address
            })

            // const user = response.data;
            if (response.status === 200) {
                Alert.alert('Account Created Successfully');
                setLoading(false)
                navigation.goBack();
            }

        } catch (error) {

            setLoading(false)
            if (axios.isAxiosError(error)) {
                const { response } = error;

                if (response) {
                    if (response.status === 401) {
                        // Invalid password
                        // console.error(response.data.error);
                        alert('Invalid password. Please check your credentials.');
                    } else if (response.status === 404) {
                        // User not found
                        // console.error(response.data.error);
                        alert('User not found. Please create an account first.');
                    }
                    else if (response.status === 400) {
                        // Account not approved
                        // console.error(response.status.error);
                        alert('Account Already Exists');
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
        setLoading(false);
    }
    return (
        <SafeAreaView className="flex-1 items-center justify-center">
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                className="bg-sky-500 h-12 w-12 rounded-full justify-center items-center absolute"
                style={{ top: 30, right: 30 }}
            >
                <Icon.X size={25} color="white" />
            </TouchableOpacity>
            <KeyboardAvoidingView behavior='padding'>
                <View className="justify-center items-center">
                    <Image source={require('../assets/images/laundcartoon.png')}
                        className="h-24 w-24"
                    />
                </View>
                <View className="justify-center space-y-8 items-center">
                    <Text className="text-2xl font-semibold text-sky-500">SignUp</Text>

                    <TextInput
                        value={name}
                        onChangeText={(text) => setName(text)}
                        className="border border-b-slate-300 p-3 border-t-0 border-r-0 border-l-0 w-80"
                        placeholder='Email Username'
                    />
                    <TextInput
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        className="border border-b-slate-300 p-3 border-t-0 border-r-0 border-l-0 w-80"
                        placeholder='Email Email'
                    />
                    <TextInput
                        value={phone}
                        onChangeText={(text) => setPhone(text)}
                        keyboardType='numeric'
                        className="border border-b-slate-300 p-3 border-t-0 border-r-0 border-l-0 w-80"
                        placeholder='Email Phone'
                    />
                    <TextInput
                        value={address}
                        onChangeText={(text) => setAddress(text)}

                        className="border border-b-slate-300 p-3 border-t-0 border-r-0 border-l-0 w-80"
                        placeholder='enter Address'
                    />
                    <TextInput
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        className="border border-b-slate-300 p-3 focus:border-b-sky-500 border-t-0 border-r-0 border-l-0 w-80"
                        placeholder='Password'
                        secureTextEntry
                    />

                    <TouchableOpacity onPress={handleSignUp} className="bg-sky-400 justify-center items-center rounded-2xl w-60 h-12">
                        {loading ? (
                            <Text className="text-white font-semibold text-xl">Creating account...</Text>
                        ) : (
                            <Text className="text-white font-semibold text-xl">Create Account</Text>
                        )}
                    </TouchableOpacity>
                </View>

                <View className="justify-end items-center my-4 space-y-2">
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                    >
                        <Text className="text-slate-500 space-x-2 items-center">Already have an account
                            <Text className="text-sky-500">Login Now</Text>
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text className="text-sky-500">Forgot Password</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default SignUpScreen

const styles = StyleSheet.create({})