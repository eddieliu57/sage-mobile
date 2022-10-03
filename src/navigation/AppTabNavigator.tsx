import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home/home';
import {
  ConsultActive,
  ConsultInActive,
  OrderActive,
  OrderInActive,
  ProfileActive,
  ProfileInActive,
  ShopActive,
  ShopInActive,
} from '../constants/icons';
import ProfileScreen from '../screens/profile/profile';
import ConsultScreen from '../screens/doctorList/Doctor';
import OrderScreen from '../screens/Order/Order';
import SearchScreen from '../screens/search/search';

let Tab = createBottomTabNavigator();
export function AppTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      sceneContainerStyle={{
        backgroundColor: '#000',
      }}
      // tabBarOptions={{
      //   style: {
      //     position: 'absolute',
      //     bottom: 0,
      //     backgroundColor: '#FDFDFA',
      //     borderTopLeftRadius: 8,
      //     borderTopRightRadius: 8,
      //     height: 85,
      //     elevation: 15,
      //     shadowColor: '#7672642B',
      //     shadowOffset: {width: 0, height: -15},
      //     shadowOpacity: 0.7,
      //     shadowRadius: 10,
      //   },
      // }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? <ShopActive /> : <ShopInActive />,
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? <ShopActive /> : <ShopInActive />,
        }}
      />
      <Tab.Screen
        name="Consult"
        component={ConsultScreen}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({focused}) =>
            focused ? <ConsultActive /> : <ConsultInActive />,
        }}
      />
      <Tab.Screen
        name="Order"
        component={OrderScreen}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? <OrderActive /> : <OrderInActive />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? <ProfileActive /> : <ProfileInActive />,
        }}
      />
    </Tab.Navigator>
  );
}
