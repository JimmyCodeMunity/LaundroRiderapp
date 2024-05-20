import { SafeAreaView, StyleSheet, Text, View, RefreshControl, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Materials, Promos } from '../utils'
import * as Icon from 'react-native-feather'
import { Appbar } from 'react-native-paper';
import { Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CodeLink } from '../utils';
import axios from 'axios';

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';



const OrderScreen = ({ navigation, route }) => {
    const { rider } = route.params;
    const [username, setUsername] = useState('')
    const [orders, setOrders] = useState([])
    const [email, setEmail] = useState('')
    useEffect(() => {
        getUserData();
    }, [])
    const getUserData = async () => {
        const user = await AsyncStorage.getItem('name');
        const phone = await AsyncStorage.getItem('phone');
        const email = await AsyncStorage.getItem('email');
        if (user) {
            setUsername(user);

            setEmail(email);
        }
    }

    useEffect(() => {
        getOrders();
        getUserData();
    }, [])
    //get orders
    const [isRefreshing, setIsRefreshing] = useState(false);

    // ... existing code ...

    const onRefresh = async () => {
        setIsRefreshing(true);
        try {
            await getOrders(); // Fetch the updated data
            await getUserdata();
        } catch (error) {
            console.log(error);
        }
        setIsRefreshing(false);
    };

    const getOrders = async () => {
        try {
            const response = await axios.get(`https://laundryappbackend.vercel.app/api/v2/rider/riderorders/${rider}`);

            // const response = await axios.get(`${CodeLink}/api/v2/user/orders/${useremail}`);
            // const response = await axios.get(`https://6429-102-219-208-66.ngrok-free.app/api/v2/user/orders/${useremail}`);
            //
            const myorder = response.data;
            // console.log("orders", myorder);
            setOrders(myorder);

        } catch (error) {
            console.log(error)

        }
    }

    return (
        <SafeAreaView className="flex-1 bg-white">
            <StatusBar style='dark' />
            <Appbar.Header>
                <Appbar.Action onPress={() => navigation.goBack()} icon="arrow-left" />
                <Appbar.Content title="Orders" subtitle={'Subtitle'} />
                <Appbar.Action icon="magnify" onPress={() => { }} />
                <Appbar.Action icon={MORE_ICON} onPress={() => navigation.navigate('Menu')} />
            </Appbar.Header>
            <View className="mt-8">
                <ScrollView
                    refreshControl={
                        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
                    }
                    vertical={true} showsVerticalScrollIndicator={true}>
                    <View className="px-5 mt-3">
                        <View className="flex-row justify-between items-center">
                            <View>
                                <Text className="text-2xl font-semibold">Explore Laundro {username}</Text>
                                <Text className="text-slate-500">Order and track your orders</Text>
                            </View>
                            <View>
                                <TouchableOpacity className="bg-sky-500 rounded-3xl p-2 h-8-w-10 justify-center items-center">
                                    <Text className="text-white">View All</Text>
                                </TouchableOpacity>
                            </View>
                        </View>


                        <View className="flex-row justify-between my-4">
                            {Materials.map((material) => {
                                return (
                                    <View className="justify-center items-center bg-sky-200 w-20 rounded-2xl h-20">
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
                                    <Text className="text-sky-500 text-xl"> (2)</Text>
                                </Text>
                            </View><View>
                                <TouchableOpacity className="bg-sky-500 rounded-3xl p-2 h-8-w-10 justify-center items-center">
                                    <Text className="text-white">Order History</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View className="my-3">
                            {orders.map((order) => {
                                return (
                                    <TouchableOpacity onPress={() => navigation.navigate('ViewOrder', {
                                        ordernumber: order._id
                                    })} className="flex-row space-x-10 justify-between items-center my-3">
                                        <View>
                                            <Image source={require('../assets/images/hourglass.png')}
                                                className="h-12 w-12"
                                            />
                                        </View>
                                        <View>
                                            <Text className="text-xl text-slate-600">Order No: #{order._id}</Text>
                                            <Text className="text-sky-500">Status:{order.orderstatus}</Text>
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





                    {/**Promos */}
                    <View className="mt-5 px-5 space-y-5">
                        <Text className="text-2xl font-bold">Promo</Text>
                        <ScrollView horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ paddingHorizontal: 10 }}
                            className="space-x-6"
                        >
                            {Promos.map((item) => {
                                return (
                                    <View className="h-24 w-80 bg-indigo-400 rounded-2xl justify-center">
                                        <View className="flex-row space-x-20 px-4 items-center">
                                            <Image
                                                source={require('../assets/images/laundry-machine.png')}
                                                className="h-10 w-10 border border-white border-xl rounded-full"
                                            />
                                            <Text className="font-semibold text-white">{item.name}</Text>
                                        </View>
                                    </View>
                                )
                            })}

                        </ScrollView>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default OrderScreen

const styles = StyleSheet.create({})