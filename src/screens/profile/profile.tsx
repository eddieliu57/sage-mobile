/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Image,
  Row,
  ScrollView,
  Text,
  Pressable,
  Box,
  Divider,
  Column,
  View,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {AnimatedGaugeProgress} from 'react-native-simple-gauge';

const image = require('../../assets/login.png');

import {RightChevron, Settings, ShopInActive} from '../../constants/icons';
import {CommonActions, useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {API_URL} from '../../constants/config';
import {ProfileData} from '../../types/profile/profiletype';
import {UIButton} from '../../components';

function ProfileScreen() {
  // const {t} = useTranslation();
  const [userData, setUserData] = useState<ProfileData>({
    countryCode: '',
    deleted: false,
    email: '',
    firstname: '',
    gender: 0,
    id: '',
    isLoggedIn: false,
    isVerified: false,
    lastname: '',
    mobileNo: '',
    role_id: 0,
    status: '',
    user_type: 0,
    username: '',
  });
  const navigation = useNavigation();

  useEffect(() => {
    async function getProducts() {
      const token1 = await AsyncStorage.getItem('token');
      const id = await AsyncStorage.getItem('id');
      let config: any = {
        headers: {
          Token: token1,
        },
      };
      const response = await axios.get(
        `${API_URL}customer/getCustomer?id=${id}`,
        config,
      );

      if (response.status === 200) {
        console.log('REPSON ', response.data[0]);
        setUserData(response.data[0]);
      }
    }

    getProducts();
  }, []);

  const removeItemValue = async _key => {
    try {
      AsyncStorage.removeItem('token');
      return true;
    } catch (exception) {
      return false;
    }
  };

  const logout = async () => {
    removeItemValue('token').then(value => {
      if (value) {
        // navigation.navigate('Login');
      }
    });
    //
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <LinearGradient
        colors={['#8A9A5B', '#8A9A5B']}
        start={{x: 1, y: 0}}
        style={styles.gradientStyle}>
        <Box pt={10} px={4}>
          <Row justifyContent={'space-between'}>
            <Image style={styles.image} source={image} alt="img" />
            <Pressable onPress={() => navigation.navigate('Cart')}>
              <ShopInActive />
            </Pressable>
          </Row>

          <Row my={4} justifyContent={'space-between'}>
            <Text fontSize={18} fontWeight="bold" color="white">
              My Profile
            </Text>
            <Text fontSize={16} fontWeight="bold" color="white">
              Edit Profile
            </Text>
          </Row>
          <Divider />
          <Box mt={4}>
            <Row justifyContent={'space-between'}>
              <Column>
                <Text fontSize={22} color="white">
                  {userData?.firstname.toUpperCase() +
                    ' ' +
                    userData?.lastname.toUpperCase()}
                </Text>
                <Text fontSize={32} fontWeight="bold" color="white">
                  {userData?.user_type === 1 ? 'Blue Member' : ''}
                  {userData?.user_type === 2 ? 'Silver Member' : ''}
                  {userData?.user_type === 3 ? 'Gold Member' : ''}
                  {userData?.user_type === 4 ? 'Platinum Member' : ''}
                </Text>
                <Row justifyContent={'space-between'} alignItems="center">
                  <Text fontSize={16} fontWeight="bold" color="white">
                    Benefits
                  </Text>
                  <RightChevron />
                </Row>
              </Column>

              <Settings />
            </Row>
          </Box>
        </Box>
      </LinearGradient>
      <Box
        mx={4}
        borderWidth={1}
        borderColor="lightgrey"
        height={300}
        background={'white'}
        position={'relative'}
        mt={'-100px'}
        p={2}>
        <Row justifyContent={'space-between'} alignItems="center" my={2}>
          <Text fontSize={18} fontWeight="bold">
            Member Number
          </Text>
          <Row>
            <Text fontSize={18} color="red.400">
              {717288190}
            </Text>
            <RightChevron />
          </Row>
        </Row>
        <Divider />
        <AnimatedGaugeProgress
          size={200}
          width={15}
          fill={50}
          rotation={90}
          cropDegree={90}
          tintColor="#E96244"
          backgroundColor="#F7D1C4"
          stroke={[2, 2]}
          strokeCap="circle"
          style={{alignItems: 'center', marginTop: 20}}
        />
        <View
          marginTop={'-160px'}
          alignSelf="center"
          alignItems={'center'}
          borderWidth={2}
          width={'40%'}
          p={5}
          borderColor="grey"
          borderRadius={140}>
          <Text fontSize={55} fontWeight="extrabold" color="#E96244">
            50
          </Text>
        </View>
        <Text alignSelf={'center'} marginTop={3} fontSize={18}>
          Points Accumulated
        </Text>
      </Box>

      {/* <View my={4} alignItems="center">
        <UIButton
          backgroundColor="#8A9A5B"
          name="Logout"
          onPress={() => logout()}
        />
      </View> */}
      <Box
        style={{
          width: '100%',
          bottom: 0,
          padding: 20,
          position: 'absolute',
          backgroundColor: '#E9EBDE',
        }}>
        <Row justifyContent={'space-between'}>
          <Text fontSize={18}>Total Points</Text>
          <Text fontSize={18} fontWeight="bold">
            152,000
          </Text>
        </Row>
      </Box>
    </View>
  );
}

export default ProfileScreen;
