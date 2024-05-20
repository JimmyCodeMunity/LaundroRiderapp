import { StyleSheet, Text, View, SafeAreaView, TextInput, Platform, TouchableOpacity, Image, ImageBackground, ActivityIndicator, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { CodeLink } from '../utils';
import axios from 'axios';
import Device from 'expo-device';
import * as Location from 'expo-location';

const ViewLaundry = ({ navigation, route }) => {
    const { laundry } = route.params;
    const [customeremail, setEmail] = useState('')
    const [customerphone, setPhone] = useState('')
    const [description, setDescription] = useState('')
    const [customername, setName] = useState('')
    const [laundryname, setLaundryname] = useState(laundry)





    //get location
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [speed, setSpeed] = useState('')
    const [longitude, setLongitude] = useState('')
    const [latitude, setLatitude] = useState('')
    const [loading, setLoading] = useState(false);
    const [loader,setLoader] = useState(false);

    useEffect(() => {
        setLoading(true);
        (async () => {
            if (Platform.OS === 'android' && !Device.isDevice) {
                setErrorMsg(
                    'Oops, this will not work on Snack in an Android Emulator. Try it on your device!'
                );
                return;
            }
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setSpeed(location.coords.speed)
            setLongitude(location.coords.longitude)
            setLatitude(location.coords.latitude)
            setLocation(location);
            setLoading(false)
        })();
    }, []);

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }



    useEffect(() => {
        getUserData();
    }, [])

    const getUserData = async () => {
        const user = await AsyncStorage.getItem('name');
        const email = await AsyncStorage.getItem('email');
        const phone = await AsyncStorage.getItem('phone');
        if (user) {
            setEmail(email);
            setPhone(phone);
            setName(user)
        }
    }


    const makeOrder = async () => {
        setLoader(true);
        try {
            const response = await axios.post(`${CodeLink}/api/v2/user/order`, { laundryname,customername, customeremail, customerphone,longitude,latitude,description });
            const order = response.data;
            console.log(order);
            setLoader(false);
            navigation.goBack();
            Alert.alert('Order Placed Successfully');
        } catch (error) {
            console.log(laundryname,customername, customeremail, customerphone,longitude,latitude,description);
            console.log(error);
            Alert.alert('Order placing failed');
            setLoader(false)

        }
    }
    return (
        <SafeAreaView className="flex-1 bg-white">
            <ImageBackground
                source={require('../assets/images/laundcartoon.png')}
                className="absolute h-[200] w-full"
            />

            <View className="mt-[200] px-4 justify-center items-center">
                <Text className="text-slate-900 text-center font-bold text-2xl my-5">Order Service</Text>


                <TextInput
                    value={laundryname}
                    onChangeText={(text) => setLaundryname(text)}
                    className="border border-b-slate-300 p-3 border-t-0 border-r-0 border-l-0 w-80"
                    placeholder='Email Address'
                />
                <TextInput
                    value={customername}
                    onChangeText={(text) => setSetName(text)}
                    className="border border-b-slate-300 p-3 border-t-0 border-r-0 border-l-0 w-80"
                    placeholder='Email Username'
                />
                <TextInput
                    value={customeremail}
                    onChangeText={(text) => setEmail(text)}
                    className="border border-b-slate-300 p-3 border-t-0 border-r-0 border-l-0 w-80"
                    placeholder='Email Address'
                />
                <TextInput
                    value={customerphone}
                    onChangeText={(text) => setPhone(text)}
                    className="border border-b-slate-300 p-3 border-t-0 border-r-0 border-l-0 w-80"
                    placeholder='Email Phone'
                />

                <TextInput
                    value={description}
                    onChangeText={(text) => setDescription(text)}
                    className="border border-b-slate-300 p-3 border-t-0 border-r-0 border-l-0 w-80"
                    placeholder='Additional Information'
                />
                {loading ? (
                    <View className="justify-center items-center mt-5">
                        <ActivityIndicator size="small" color="lightblue" />
                        <Text className="text-slate-500 text-center font-bold my-5">Getting current location</Text>
                    </View>
                ) : (
                    <TouchableOpacity onPress={makeOrder} className="bg-sky-500 rounded-2xl my-8 justify-center items-center h-12 w-80">
                    {loader ? (
                        <ActivityIndicator size="small" color="white"/>
                    ):(
                        <Text className="text-white font-bold text-2xl">Request Pickup</Text>
                    )}    
                    
                    </TouchableOpacity>
                )}

            </View>

        </SafeAreaView>
    )
}

export default ViewLaundry

const styles = StyleSheet.create({})