import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const SplashScreen = ({ navigation }) => {
    return (
        <SafeAreaView className="bg-white flex-1 justify-center items-center">
            <View className="mb-[200] justify-center items-center">

                <Image source={require('../assets/images/laundcartoon.png')}
                    className="h-60 w-60"
                />
                <View className="text-center items-center justify-center px-12 space-y-5 space-x-2">
                    <Text className="font-bold text-3xl text-slate-700">Welcome to the Rider App</Text>
                    <Text className="text-slate-500 text-center font-semibold tracking-wider space-y-2">Just the best laundry finder for all your clothes
                        .We just have what you are looking for.</Text>
                </View>
            </View>

            <View className="justify-center space-y-5">
                {/** 
                <TouchableOpacity
                onPress={()=>navigation.navigate('SignUp')}
                className="bg-white rounded-2xl border border-slate-800 h-10 w-60 justify-center items-center">
                    <Text className="text-xl text-slate-600">Create Account</Text>
                </TouchableOpacity>
                */}
                <TouchableOpacity
                    onPress={() => navigation.replace('Login')}
                    className="bg-black rounded-2xl h-10 w-60 justify-center items-center">
                    <Text className="text-xl text-white font-semibold">Login</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default SplashScreen

const styles = StyleSheet.create({})