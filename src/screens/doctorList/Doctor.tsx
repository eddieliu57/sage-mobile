/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect, useState} from 'react';
import {
  View,
  Pressable,
  Row,
  Image,
  Text,
  FlatList,
  Box,
  Input,
  Column,
} from 'native-base';

import Layout from '../../components/Layout/Layout';

import {ShopActive} from '../../constants/icons';

import {api} from '../../utilities/api';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import {UIButton, UIInput} from '../../components';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {DoctorList} from '../../types/doctor/doctorList';
import axios from 'axios';
import {API_URL} from '../../constants/config';
import {colors} from '../../constants/colors';
import LinearGradient from 'react-native-linear-gradient';

const image = require('../../assets/login.png');
function ConsultScreen({route}: any) {
  const [doctorsList, setDoctorsList] = useState<DoctorList[]>([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const dispatch = useDispatch();
  const {t} = useTranslation();

  useEffect(() => {
    async function getDoctorsList() {
      const token1 = await AsyncStorage.getItem('token');
      const id = await AsyncStorage.getItem('id');
      let config: any = {
        headers: {
          Token: token1,
        },
      };
      const response = await axios.get(`${API_URL}customer/getDoctors`, config);

      if (response.status === 200) {
        setDoctorsList(response.data);
      }
    }

    getDoctorsList();
  }, []);

  return (
    <View flex="1" backgroundColor="white">
      <LinearGradient
        colors={[colors.third, colors.primary]}
        start={{x: 1, y: 0}}
        style={styles.gradientStyle}>
        <Column alignItems={'center'} mt={8}>
          <Text fontSize={26} fontWeight="bold" color="white">
            {t('consult.consultWithExpert')}
          </Text>
          <Box mx={2} alignItems={'center'}>
            <Input
              mt={2}
              height={50}
              backgroundColor={'#F4F4F4'}
              variant="outline"
              placeholder="Find Doctor here"
              fontSize={14}
              borderColor={'#F4F4F4'}
              borderRadius={10}
              _focus={{borderColor: 'green'}}
              p={2}
            />
          </Box>
        </Column>
      </LinearGradient>

      <View padding={4} flex={1} backgroundColor="gray.100">
        <FlatList
          style={styles.list}
          contentContainerStyle={styles.listContainer}
          data={doctorsList}
          keyExtractor={(item: DoctorList) => {
            return item.id;
          }}
          renderItem={({item}) => {
            return <TestView key={Math.random()} {...item} />;
          }}
        />
      </View>
    </View>
  );
}

function TestView(params: DoctorList) {
  const navigation = useNavigation();

  return (
    <View
      flexDirection={'row'}
      mb={4}
      height={150}
      borderRadius={15}
      backgroundColor="white"
      style={styles.boxShadow}>
      <View>
        <Image
          style={{resizeMode: 'contain'}}
          source={{
            width: 130,
            height: 130,
            uri: 'https://www.freepnglogos.com/uploads/doctor-png/basic-ideas-for-logical-programs-for-doctor-home-loan-6.png',
          }}
          alt="img"
        />
      </View>
      <View flex={1} padding={4}>
        <Text style={{fontWeight: 'bold'}}>
          {params?.firstname + ' '}
          {params?.lastname}
        </Text>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              backgroundColor: params.status === 'Active' ? 'green' : 'red',
              width: 10,
              height: 10,
              borderRadius: 20,
              marginTop: 5,
            }}
          />
          <Text style={{marginLeft: 5}}>{params.status}</Text>
        </View>
        {/* <Text>2 years experience</Text> */}
        <View mt={2}>
          <UIButton
            backgroundColor={colors.primary}
            name="Chat"
            variant="outline"
            onPress={() => navigation.navigate('Chat', {...params})}
          />
        </View>
      </View>
    </View>
  );
}
export default ConsultScreen;
