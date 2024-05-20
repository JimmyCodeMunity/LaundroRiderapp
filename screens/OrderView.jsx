import { Image, StyleSheet, Text, TouchableOpacity, View, ImageBackground, Linking } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CodeLink } from '../utils';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

import * as Icon from 'react-native-feather'


const OrderView = ({ route, navigation }) => {
    const { ordernumber } = route.params;
    const [username, setUsername] = useState('')
    const [phone, setPhone] = useState('')
    const [rider, setRider] = useState('')
    const [riderphone, setRiderPhone] = useState('')
    const [orderstatus, setOrderstatus] = useState('')
    const [price, setPrice] = useState('')
    const [weight, setWeight] = useState('')
    const [long, setLongitude] = useState('')
    const [lat, setLatitude] = useState('')
    const [loading, setLoading] = useState(false)
    const [changing, setChanging] = useState(false)
    const [customerphone, setCustomerPhone] = useState('')
    const [customername, setCustomerName] = useState('')


    //set time
    const [estimatedArrival, setEstimatedArrival] = useState(0);

    useEffect(() => {
        // Update estimated arrival time every 5 seconds
        const interval = setInterval(() => {
            const randomTime = Math.floor(Math.random() * 41); // Random time from 0 to 40 minutes
            setEstimatedArrival(randomTime);
        }, 5000);

        // Clear the interval when the component unmounts
        return () => clearInterval(interval);
    }, []);

    const [orders, setOrders] = useState([])
    useEffect(() => {
        getUserData();
        getOrderDetails();
    }, [])
    const getUserData = async () => {
        const user = await AsyncStorage.getItem('name');
        const phone = await AsyncStorage.getItem('phone');
        if (user) {
            setUsername(user);
            setPhone(phone);
        }
    }


    //get orders


    const getOrderDetails = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${CodeLink}/api/v2/admin/orders/${ordernumber}`);
            // const response = await axios.get(`https://6429-102-219-208-66.ngrok-free.app/api/v2/user/orders/${useremail}`);

            //
            const myorder = response.data;
            // console.log("orders", myorder);
            setRider(myorder.rider);
            setRiderPhone(myorder.riderphone);
            setOrderstatus(myorder.orderstatus);
            setPrice(myorder.price);
            setWeight(myorder.weight);
            setLongitude(myorder.longitude)
            setLatitude(myorder.latitude)
            setCustomerPhone(myorder.customerphone)
            setCustomerName(myorder.customername)
            setLoading(false);

        } catch (error) {
            console.log(error)
            setLoading(false);

        }
    }

    //navigate back to homeon cancel
    const cancelOrder = async () => {
        setChanging(true)
        try {
            const neworder = "Rejected";
            const response = await axios.put(`${CodeLink}/api/v2/admin/updateorder/${ordernumber}`, { orderstatus: neworder });
            const updated = response.data;
            console.log("updatedorder", updated);
            if (updated) {
                alert('Order rejected');
                getOrderDetails();
                setChanging(false);
                // navigation.goBack();
            }
        } catch (error) {
            console.log(error);
            alert('error accepting request')
            setChanging(false);

        }

    }


    //accept order
    const AcceptOrder = async () => {
        setChanging(true)
        try {
            const neworder = "Accepted";
            const response = await axios.put(`${CodeLink}/api/v2/admin/updateorder/${ordernumber}`, { orderstatus: neworder });
            const updated = response.data;
            console.log("updatedorder", updated);
            if (updated) {
                alert('Order status changed Successfully');
                getOrderDetails();
                setChanging(false);
                // navigation.goBack();
            }
        } catch (error) {
            console.log(error);
            alert('error accepting request')
            setChanging(false)

        }
    }

    const handleCall = () => {
        const phoneNumber = customerphone;
        const countryCode = "+254";


        // Check if the phone number is valid
        if (customerphone) {

            const fullPhoneNumber = `${countryCode}${phoneNumber}`;
            // Construct the phone call URL
            const phoneURL = `tel:${fullPhoneNumber}`;

            // Open the phone app with the specified phone number
            Linking.canOpenURL(phoneURL)
                .then((supported) => {
                    if (!supported) {
                        console.error("Phone calls are not supported on this device");
                    } else {
                        return Linking.openURL(phoneURL);
                    }
                })
                .catch((error) => console.error(`Error opening phone app: ${error}`));
        } else {
            console.error("Phone number is not available");
        }
    }

    const handleChat = () => {
        const phoneNumber = customerphone;
        const countryCode = "+254";
        if (phoneNumber) {
            const fullPhoneNumber = `${countryCode}${phoneNumber}`;
            const phoneURL = `tel:${fullPhoneNumber}`;
            // Construct the WhatsApp chat URL
            const whatsappURL = `https://wa.me/${fullPhoneNumber}`;

            // Open the WhatsApp chat with the specified phone number
            Linking.canOpenURL(whatsappURL)
                .then((supported) => {
                    if (!supported) {
                        console.error("WhatsApp is not installed on this device");
                    } else {
                        return Linking.openURL(whatsappURL);
                    }
                })
                .catch((error) => console.error(`Error opening WhatsApp chat: ${error}`));
        } else {
            console.error("Phone number is not available");
        }
    }
    return (
        <View className="flex-1">
            {orderstatus == "Washing" ? (
                <View className="flex-1 justify-center items-center">
                    <Image
                        source={require('../assets/images/laundcartoon.png')}
                        className="h-[100] w-[100] rounded-full border border-black border-3xl"
                    />

                    <Text className="font-bold text-2xl my-4">Washing 🙂 </Text>
                </View>

            ) : orderstatus == "Completed" ? (
                <View className="flex-1 justify-center items-center">
                    <Image
                        source={require('../assets/images/laundcartoon.png')}
                        className="h-[100] w-[100] rounded-full border border-black border-3xl"
                    />

                    <Text className="font-bold text-2xl my-4">Completed 🙋  </Text>
                </View>

            ) : (
                <View className="flex-1 bg-white">

                    {/**mapview */}
                    {loading ? (
                        <View className="flex-1 bg-white justify-center items-center">
                            <ImageBackground
                                source={require('../assets/images/laundcartoon.png')}
                                className="h-12 w-12"
                            />
                            {changing ? (
                                <Text>Changing Order Status..</Text>
                            ) : (
                                <Text>Loading Order Information...</Text>

                            )}



                        </View>
                    ) : (

                        <MapView
                            initialRegion={{
                                latitude: lat,
                                longitude: long,
                                latitudeDelta: 0.01,
                                longitudeDelta: 0.01,

                            }}
                            className="flex-1"
                            mapType='standard'
                        >
                            <Marker
                                coordinate={{
                                    latitude: lat,
                                    longitude: long,

                                }}
                                title={rider}
                                description={rider}
                                pinColor='blue'
                            />
                        </MapView>

                    )}

                    <View className="rounded-t-3xl relative -mt-12 bg-white">
                        <View className="flex-row justify-between px-5 pt-10">
                            <View>
                                <Text className="text-gray-700 font-semibold">
                                    Estimated Arrival
                                </Text>
                                <Text className="text-gray-700 text-3xl font-extrabold">
                                    {estimatedArrival} Minutes
                                </Text>
                                <Text className="mt-2 font-semibold text-gray-700">
                                    Your order is {orderstatus}
                                </Text>
                            </View>
                            <Image className="h-24 w-24" source={require('../assets/images/delivery-man.png')} />
                        </View>

                        <View className="p-2 flex-row justify-between mb-2 rounded-full items-center mx-2">
                            <View style={{ backgroundColor: 'rgba(255,255,255,0.4)' }} className="p-1 rounded-full">
                                <Image className="h-16 w-16 rounded-full" source={require('../assets/images/delivery-man.png')} />

                            </View>
                            <View className="flex-1 ml-3">
                                <Text className="font-bold text-lg text-black">
                                    {customername}
                                </Text>
                                <Text className="font-semibold text-black">
                                    {customerphone}
                                </Text>
                            </View>

                            <View className="flex-row items-center space-x-3 mr-3">
                                <TouchableOpacity onPress={handleCall} className="bg-white p-2 rounded-full">
                                    <Icon.Phone strokeWidth={1} />

                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleChat} className="bg-white p-2 rounded-full">
                                    <Icon.MessageCircle stroke="red" strokeWidth={3} />

                                </TouchableOpacity>
                            </View>

                        </View>


                        <View className="flex-row justify-between items-center px-5 py-2 w-full">
                            {orderstatus === "Accepted" ? (
                                <TouchableOpacity onPress={() => navigation.navigate('Weigh', { ordernumber: ordernumber, customer: customername, userphone: customerphone })} className="bg-green-400 justify-center items-center rounded-2xl h-10 w-40">
                                    <Text className="text-white text-2xl font-bold">Continue</Text>
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity onPress={AcceptOrder} className="bg-black justify-center items-center rounded-2xl h-10 w-40">
                                    <Text className="text-white text-2xl font-bold">Accept order</Text>
                                </TouchableOpacity>

                            )}

                            <TouchableOpacity onPress={cancelOrder} className="bg-red-400 justify-center items-center rounded-2xl h-10 w-40">
                                <Text className="text-white text-2xl font-bold">Reject order</Text>
                            </TouchableOpacity>
                        </View>

                        <View className="w-full px-5">
                            <TouchableOpacity onPress={() => navigation.goBack()} className="bg-black rounded-2xl h-10 w-full my-5 justify-center items-center">
                                <Text className="text-white font-bold text-xl">Later</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            )}

        </View>
    )
}

export default OrderView

const styles = StyleSheet.create({})