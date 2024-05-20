import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native'
import * as Icon from 'react-native-feather'
import React, { useEffect, useState } from 'react'
import { MenuIcons } from '../utils'
import AsyncStorage from '@react-native-async-storage/async-storage';

const MenuScreen = ({ navigation }) => {
    const [username, setUsername] = useState('')
    useEffect(() => {
        getUserData();
    }, [])
    const getUserData = async () => {
        const user = await AsyncStorage.getItem('name');
        if (user) {
            setUsername(user);
        }
    }
    return (
        <SafeAreaView class="flex-1">
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                className="bg-sky-500 h-12 w-12 rounded-full justify-center items-center absolute"
                style={{ top: 30, right: 30 }}
            >
                <Icon.X size={25} color="white" />
            </TouchableOpacity>
            <View className="justify-center items-center my-5 mt-8">
                <Text className="font-semibold text-2xl">Settings</Text>
            </View>
            <View className="mt-5 justify-center items-center px-5">
                {MenuIcons.map((menuitem) => {
                    return (
                        <View className="flex-row bg-slate-200 mb-4 rounded-2xl justify-between px-5 border border-b-slate-300 border-t-0 border-l-0 border-r-0 w-full p-5">
                            <Text className="font-semibold text-xl text-slate-600">{menuitem.name}</Text>
                            <Icon.ArrowRight size={25} color="lightblue" />
                        </View>
                    )
                })}

            </View>
            <View>

            </View>
        </SafeAreaView>
    )
}

export default MenuScreen

const styles = StyleSheet.create({})