import { SafeAreaView, StyleSheet, Text, View, ScrollView, FlatList, ActivityIndicator, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';
import * as Icon from 'react-native-feather'
import { Appbar } from 'react-native-paper';
import { Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import { CodeLink } from '../utils';

const RequestOrder = ({ navigation }) => {
    const [data, setData] = useState([]);
    useEffect(() => {
        getAllLaundries()
    }, [])


    const [loading, setLoading] = useState(true);
    const getAllLaundries = async () => {
        try {
            const response = await axios.get(`${CodeLink}/api/v2/admin/alllaundries`); // Replace with your API endpoint
            setData(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    const renderItem = ({ item }) => (
        <View className="w-full flex-row justify-between items-center h-32 border-l-2 border-sky-500 my-2 p-3">
            <View className="">
                <View>
                    <Text className="text-slate-400">Working hours</Text>
                    <View className="flex-row">
                        <Icon.Clock size={10} color="gray" />
                        <Text className="text-slate-600">8:00-5:00</Text>
                    </View>

                </View>
                <View className="flex-row space-x-3">
                    <View>
                        <Image source={require('../assets/images/laundcartoon.png')} className="rounded-full h-10 w-10 border border-sky-50" />
                    </View>
                    <View>
                        <Text className="text-2xl font-semi-bold text-slate-700">{item.laundryname}</Text>
                        <Text className="text-slate-600">{item.price} per kg</Text>
                    </View>
                </View>

            </View>

            <View>
                <TouchableOpacity onPress={()=>navigation.navigate('ViewLaundry',{laundry:item.laundryname})}>
                    <Icon.ArrowRightCircle size={32} color="gray" />
                </TouchableOpacity>
            </View>
        </View>
    );

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center">
                <Text className="text-sky-500 font-semibold">Looking for Laundries near you</Text>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-white">
            <StatusBar style='dark' />


            <Appbar.Header>
                <Appbar.Action onPress={() => navigation.goBack()} icon="arrow-left" />
                <Appbar.Content title="Make Order" subtitle={'Subtitle'} />
                <Appbar.Action icon={MORE_ICON} onPress={() => navigation.navigate('Menu')} />
            </Appbar.Header>




            <View className="px-4">
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item._id}
                />
            </View>
        </SafeAreaView>
    )
}

export default RequestOrder

const styles = StyleSheet.create({})