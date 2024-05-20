import { StyleSheet, Text, View, SafeAreaView, TextInput, Platform, TouchableOpacity, Image, ImageBackground, ActivityIndicator, Alert, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { CodeLink } from '../utils';
import axios from 'axios';
import Device from 'expo-device';
import * as Location from 'expo-location';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';

const WeighScreen = ({ navigation, route }) => {
    const { ordernumber, customer, userphone } = route.params;
    const [amount, setAmount] = useState('')
    const [price, setPrice] = useState('')
    const [shopprice, setShopPrice] = useState('')
    const [weight, setWeight] = useState('')

    const [rider, setRider] = useState('')
    const [riderphone, setRiderPhone] = useState('')
    const [orderstatus, setOrderstatus] = useState('')
    const [changing, setChanging] = useState(false)
    const [customerphone, setCustomerPhone] = useState('')


    const [description, setDescription] = useState('')
    const [customername, setName] = useState('');
    const [payrequest,setPayRequest] = useState(false);






    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);


    useEffect(() => {
        getOrderDetails();
    }, [])


    const getTotal = async () => {
        const final = shopprice * weight;
        setTotal(final)
    }

    const resetTotal = async () => {
        setTotal(0);
    }

    const getOrderDetails = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${CodeLink}/api/v2/admin/orders/${ordernumber}`);
            // const response = await axios.get(`https://6429-102-219-208-66.ngrok-free.app/api/v2/user/orders/${useremail}`);

            //
            const myorder = response.data;
            // console.log("orderdetails", myorder);
            setRider(myorder.rider);
            setRiderPhone(myorder.riderphone);
            setOrderstatus(myorder.orderstatus);
            setPrice(myorder.price);

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

    const makePayment = async () => {
        try {
            // Assuming userPhone is defined somewhere above this function
            // and contains the full phone number including the country code
    
            // Extract the last 9 digits of the userPhone
            const newphonenumber = userphone.substring(userphone.length - 9);
    
            const res = await axios.post('https://laundryappstk.vercel.app/stkpush', {
                phoneNumber: newphonenumber, // Send only the last 9 digits
                Amount: total
            });
    
            // console.log(res.data);
            // console.log("Payment request sent");
            setPayRequest(true)
        } catch (error) {
            console.error("Payment request failed:", error);
        }
    }
    






    const updatePrice = async () => {
        setChanging(true)
        try {
            const newstatus = "Washing"
            const response = await axios.put(`${CodeLink}/api/v2/admin/updateorder/${ordernumber}`, { orderstatus: newstatus, price: total, weight: weight });
            const updated = response.data;
            // console.log("updatedorder", updated);
            if (updated) {
                alert('Order updated');
                getOrderDetails();
                // navigation.goBack();
            }
        } catch (error) {
            console.log(error);
            alert('error accepting request')
            setChanging(false);

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

                    <View className="flex-1 justify-center items-center">
                        {orderstatus == "Washing" ? (
                            <View className="flex-1 justify-center items-center">
                                <Image
                                    source={require('../assets/images/laundcartoon.png')}
                                    className="h-[100] w-[100] rounded-full border border-black border-3xl"
                                />

                                <Text className="font-bold text-2xl my-4">Washing 🙂 </Text>
                            </View>

                        ) : (
                            <View>
                                <ImageBackground
                                    source={require('../assets/images/laundcartoon.png')}
                                    className="absolute h-[200] w-full"
                                />

                                <KeyboardAvoidingView behavior='padding' className="mt-[200] px-4 justify-center items-center">
                                    <Text className="text-slate-900 text-center font-bold text-2xl my-5">Order Service</Text>
                                    <Text className="text-slate-900 text-center font-bold text-2xl my-5">Current:{orderstatus}</Text>


                                    <TextInput
                                        value={customer}
                                        className="border border-b-slate-300 p-3 border-t-0 border-r-0 border-l-0 w-80"
                                        placeholder='Email Customer Name'
                                    />
                                    <TextInput
                                        value={userphone}
                                        className="border border-b-slate-300 p-3 border-t-0 border-r-0 border-l-0 w-80"
                                        placeholder='Email Customer Name'
                                    />

                                    <TextInput
                                        value={weight}
                                        onChangeText={(text) => setWeight(text)}
                                        className="border border-b-slate-300 p-3 border-t-0 border-r-0 border-l-0 w-80"
                                        placeholder='Enter weight'
                                    />
                                    <TextInput
                                        value={shopprice}
                                        onChangeText={(text) => setShopPrice(text)}
                                        className="border border-b-slate-300 p-3 border-t-0 border-r-0 border-l-0 w-80"
                                        placeholder='Laundry Price'
                                    />
                                    <Text className="font-bold text-xl text-start">Total:{total}</Text>



                                    {total == 0 ? (
                                        <View className="flex-row justify-between space-x-4">
                                            <TouchableOpacity onPress={getTotal} className="bg-black rounded-2xl my-8 justify-center items-center h-12 w-60">
                                                <Text className="text-white font-bold text-2xl">Get Total Price</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => setTotal(0)} className="bg-red-400 rounded-2xl my-8 justify-center items-center h-12 w-20">
                                                <Text className="text-white font-bold text-2xl">reset</Text>
                                            </TouchableOpacity>
                                        </View>

                                    ) : (

                                        <View className="flex-row justify-between space-x-4">
                                        
                                            <TouchableOpacity onPress={!payrequest ? makePayment:updatePrice} className={`${!payrequest ? "bg-sky-500":"bg-green-500"} rounded-2xl my-8 justify-center items-center h-12 w-60`}>
                                                {!payrequest ? 
                                                    <Text className="text-white font-bold text-2xl">Request Payment</Text>
                                                :
                                                <Text className="text-white font-bold text-2xl">Complete Order</Text>}
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => setTotal(0)} className="bg-red-400 rounded-2xl my-8 justify-center items-center h-12 w-20">
                                                <Text className="text-white font-bold text-2xl">reset</Text>
                                            </TouchableOpacity>

                                        </View>

                                    )}


                                </KeyboardAvoidingView>
                            </View>
                        )}


                    </View>

                </SafeAreaView>
            )}
        </View>

    )
}

export default WeighScreen

const styles = StyleSheet.create({})