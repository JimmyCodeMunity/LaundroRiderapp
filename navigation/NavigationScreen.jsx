import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/HomeScreen';
import MenuScreen from '../screens/MenuScreen';
import OrderScreen from '../screens/OrderScreen';
import OrderView from '../screens/OrderView';

import LocationScreen from '../screens/Location';
import RequestOrder from '../screens/RequestOrder';
import ViewLaundry from '../screens/ViewLaundry';
import WeighScreen from '../screens/WeighScreen';


const Stack = createNativeStackNavigator();


const NavigationScreen = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Splash" component={SplashScreen} options={{headerShown:false}} />
                <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}}/>
                <Stack.Screen name="SignUp" component={SignUpScreen} options={{headerShown:false,presentation:"modal"}}/>
                <Stack.Screen name="Menu" component={MenuScreen} options={{headerShown:false,presentation:"modal"}}/>
                <Stack.Screen name="ViewOrder" component={OrderView} options={{headerShown:false,presentation:"modal"}}/>
                <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
                <Stack.Screen name="Order" component={OrderScreen} options={{headerShown:false}}/>
                <Stack.Screen name="Location" component={LocationScreen} options={{headerShown:false}}/>
                <Stack.Screen name="MakeOrder" component={RequestOrder} options={{headerShown:false,presentation:"modal"}}/>
                <Stack.Screen name="ViewLaundry" component={ViewLaundry} options={{headerShown:false,presentation:"modal"}}/>
                <Stack.Screen name="Weigh" component={WeighScreen} options={{headerShown:false,presentation:"modal"}}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default NavigationScreen

const styles = StyleSheet.create({})