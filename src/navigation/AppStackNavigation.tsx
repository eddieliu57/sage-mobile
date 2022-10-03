import React, {useEffect, useState} from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StackParamList} from '../types/route';

import LoginScreen from '../screens/login/login';
import SignupScreen from '../screens/signup/signup';
// import HomeScreen from '../screens/home';
import ProductScreen from '../screens/search/search';
import {AppTabNavigator} from './AppTabNavigator';
import DetailScreen from '../screens/detail/Detail';
import CartScreen from '../screens/cart/Cart';
import ShippingScreen from '../screens/shipping/Shipping';
import AddressListScreen from '../screens/addressList/AddressList';
import AddressFormScreen from '../screens/addressForm/AddressForm';

import {useDispatch, useSelector} from 'react-redux';
import {Spinner, View} from 'native-base';
import {loggedIn} from '../redux/actions/login';
import ChatScreen from '../screens/chat/Chat';
import VerifyOtpScreen from '../screens/verifyOtp/verifyOtp';

const Stack = createNativeStackNavigator<StackParamList>();

export default function AppStackNavigation() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const token = useSelector((state: any) => state?.login?.token);

  useEffect(() => {
    dispatch(loggedIn());
    setTimeout(() => {
      setLoading(false);
      // navigation.navigate('HomeTab');
    }, 1000);
  }, [dispatch]);

  if (loading) {
    return (
      <View flex={1} alignItems="center" justifyContent={'center'}>
        {/* <Text>HI</Text> */}
        <Spinner />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {!token ? (
          <Stack.Group>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="VerifyOtp" component={VerifyOtpScreen} />
          </Stack.Group>
        ) : (
          <Stack.Group>
            <Stack.Screen name="HomeTab" component={AppTabNavigator} />
            <Stack.Screen name="Product" component={ProductScreen} />
            <Stack.Screen name="ProductDetails" component={DetailScreen} />
            <Stack.Screen name="Cart" component={CartScreen} />
            <Stack.Screen name="Shipping" component={ShippingScreen} />
            <Stack.Screen name="AddressList" component={AddressListScreen} />
            <Stack.Screen name="AddressForm" component={AddressFormScreen} />
            <Stack.Screen name="Chat" component={ChatScreen} />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </SafeAreaProvider>
  );
}
