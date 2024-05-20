import { StyleSheet, Text, View, TouchableOpacity, RefreshControl, SafeAreaView, Image, ImageBackground, ScrollView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Icon from 'react-native-feather'
import { Materials, SampleOrders, Services } from '../utils'
import { StatusBar } from 'expo-status-bar'
import axios from 'axios'
import { ActivityIndicator } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CodeLink } from '../utils';

const HomeScreen = ({ navigation, route }) => {
    const { rider } = route.params;
    // console.log(rider)
    // const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState([]);
    const shopAlert = () => {
        Alert.alert('Shop Is coming soon.')
    }
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')

    console.log(CodeLink)
    useEffect(() => {
        getUserData();
        getOrders();
        getMe();
    }, [])
    const getUserData = async () => {
        const user = await AsyncStorage.getItem('name');
        const phone = await AsyncStorage.getItem('phone');
        const email = await AsyncStorage.getItem('email');
        if (user) {
            setUsername(user);
            setPhone(phone);
            setEmail(email);
        }
    }

    const [isRefreshing, setIsRefreshing] = useState(false);

    // ... existing code ...

    const onRefresh = async () => {
        setIsRefreshing(true);
        try {
            await getUserData(); // Fetch the updated data
            await getOrders();
        } catch (error) {
            console.log(error);
        }
        setIsRefreshing(false);
    };

    // useEffect(() => {
    //     getUserData()
    // }, [])

    // //get user data
    // const getUserData = async () => {
    //     setLoading(true)
    //     try {
    //         const response = await axios.get(`https://ff43-41-139-202-31.ngrok-free.app/api/v2/user/users/${useremail}`);
    //         const user = response.data;
    //         if (user) {
    //             setLoading(false);
    //             setUsername(user.name)

    //             // const username = user.name;
    //             console.log("logged in user:", response.data.phone);
    //         } else {
    //             setLoading(false);
    //             Alert.alert('Check yur connection');
    //         }

    //     } catch (error) {
    //         console.log(error)
    //         setLoading(false)

    //     }
    //     setLoading(false);
    // }



    //get orders


    const getOrders = async () => {
        try {
            // const response = await axios.get(`${CodeLink}/api/v2/user/orders/${useremail}`);
            const response = await axios.get(`https://laundryappbackend.vercel.app/api/v2/rider/riderorders/${rider}`);

            const myorder = response.data;
            // console.log("orders", myorder);
            setOrders(myorder);

        } catch (error) {
            console.log(error)

        }
    }

    const getMe = async () => {
        try {
            const response = await axios.get('');
            const riderdet = response.data;
            // console.log(riderdet);
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <View className="flex-1">
            {loading ? (
                <View className="flex-1 justify-center items-center">
                    <Image
                        source={require('../assets/images/laundcartoon.png')}
                        className="h-12 w-12 rounded-full border border-black border-3xl"
                    />

                    <Text>Loading User Info....</Text>
                </View>

            ) : (
                <SafeAreaView className="flex-1 bg-white">
                    <ImageBackground
                        blurRadius={0}
                        resizeMode='cover'
                        className="h-60 w-full absolute rounded-b-3xl contain"
                        style={{ top: 0 }}
                        source={require('../assets/images/bg4.jpeg')}
                    />

                    <View className="flex-row justify-between px-5 mt-8">
                        <View>
                            <TouchableOpacity onPress={() => navigation.navigate('Menu')}>
                                <Icon.Menu size={30} color="white" />
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity onPress={() => navigation.replace('Login')}>
                                <Icon.LogOut size={30} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View className="px-5 mt-5 flex-row space-x-3 items-center">
                        <Image
                            source={require('../assets/images/laundcartoon.png')}
                            className="h-12 w-12 rounded-full border border-black border-3xl"
                        />
                        <View>
                            <Text className="text-white font-semibold text-2xl">Rider App </Text>
                            <Text className="text-white font-semibold text-xl">Welcome {username} </Text>
                        </View>
                    </View>

                    <View className="justify-center items-center w-full my-5">
                        <View className="bg-white h-40 rounded-2xl shadow shadow-3xl justify-center px-8"
                            style={{ width: '90%' }}
                        >
                            <View className="flex-row justify-between">
                                {Services.map((service) => {
                                    return (
                                        <View className="justify-center items-center">
                                            <Image source={service.image}
                                                className="h-10 w-10 rounded-full"
                                            />
                                            <Text className="text-slate-500">{service.name}</Text>
                                        </View>
                                    )
                                })}


                            </View>

                        </View>
                    </View>


                    <ScrollView
                    refreshControl={
                        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
                      }
                    vertical={true} showsVerticalScrollIndicator={true}>
                        <View className="px-5 mt-3">
                            <View className="flex-row justify-between items-center">
                                <View>
                                    <Text className="text-2xl font-semibold">Explore Laundro</Text>
                                    <Text className="text-slate-500">Order and track your orders</Text>
                                </View>
                                <View>
                                    <TouchableOpacity
                                        onPress={shopAlert}
                                        className="bg-black rounded-3xl p-2 h-8-w-10 justify-center items-center">
                                        <Text className="text-white">View All</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>


                            <View className="flex-row justify-between my-4">
                                {Materials.map((material) => {
                                    return (
                                        <View className="justify-center items-center bg-slate-300 w-20 rounded-2xl h-20">
                                            <Image source={material.image}
                                                className="h-10 w-10 rounded-full"
                                            />
                                            <Text className="text-slate-500">{material.name}</Text>
                                        </View>
                                    )
                                })}


                            </View>




                            <View className="flex-row justify-between items-center">
                                <View>
                                    <Text className="text-slate-900 text-2xl font-bold">Active Orders
                                        <Text className="text-slate-400 text-xl"> (2)</Text>
                                    </Text>
                                </View><View>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('Order', { rider: rider })}
                                        className="bg-black rounded-3xl p-2 h-8-w-10 justify-center items-center">
                                        <Text className="text-white">Order History</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View className="my-3">
                                {orders.slice(0,4).map((order) => {
                                    return (
                                        <TouchableOpacity onPress={() => navigation.navigate('ViewOrder', {
                                            ordernumber: order._id
                                        })} className="flex-row space-x-10 justify-between items-center my-3">
                                            <View>
                                                <Image source={require('../assets/images/laundcartoon.png')}
                                                    className="h-12 w-12"
                                                />
                                            </View>
                                            <View>
                                                <Text className="text-xl text-slate-600">Order No: {order._id}</Text>
                                                <Text className="text-sky-500">status: {order.orderstatus}</Text>
                                            </View>
                                            <View>
                                                <TouchableOpacity>
                                                    <Icon.ArrowRight size={20} color="lightblue" />
                                                </TouchableOpacity>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                })}

                            </View>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            )}

        </View>

    )
}

export default HomeScreen

const styles = StyleSheet.create({})