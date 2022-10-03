/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect, useState} from 'react';
import {
  View,
  Pressable,
  Column,
  Row,
  Text,
  Divider,
  ScrollView,
  Radio,
} from 'native-base';

import Layout from '../../components/Layout/Layout';

import AppBar from '../../components/Layout/AppBar';
import {DeleteEnable, Edit} from '../../constants/icons';

import {Dimensions, Modal} from 'react-native';

import {api} from '../../utilities/api';
import {addToCart} from '../../redux/actions/cart';
import {useDispatch, useSelector} from 'react-redux';
import {AddressBox} from '../../components/address/AddressBox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AddressList} from '../../types/address/addressList';
import {addDefaultAddress} from '../../redux/actions/address';

// const image = require('../../assets/login.png');
const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');

function AddressListScreen({route}: any) {
  const [addressList, setAddressList] = useState<AddressList[]>([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    async function getVouchers() {
      const id = await AsyncStorage.getItem('id');
      const token = await AsyncStorage.getItem('token');
      console.log('ASYNC ', id, ' TOKEN ', token);
      const response = await api.post(
        `/address/getCustomerAddressByCustomerId?customer_id=${id}`,
      );
      if (response.status === 200) {
        console.log('DATA ', response.data);
        setAddressList(response.data);
      }
    }
    getVouchers();
  }, []);

  const selectMainAddress = (val: any) => {
    setSelectedAddress(val);
    const address = addressList.find(x => x._id === val);
    if (address !== null) {
      dispatch(addDefaultAddress(address));
    }
  };

  return (
    <Layout padding={0}>
      <View padding={4}>
        <AppBar
          title="Pilih Alamat Lainnya"
          rightElement={
            <Pressable>
              <Text></Text>
            </Pressable>
          }
        />
      </View>

      <View padding={4} flex={1}>
        <Row justifyContent={'space-between'} pb={4}>
          <Text>{selectedAddress !== null ? 1 : ''} Alamat Tersimpan</Text>
          <Pressable>
            <Text style={{color: 'red'}}>Tambah Alamat Baru</Text>
          </Pressable>
        </Row>
        <Divider />
        <ScrollView
          mt={4}
          flex={1}
          contentContainerStyle={{justifyContent: 'space-between'}}>
          {(addressList || []).map((item: AddressList, index: number) => {
            return (
              <AddressBox
                key={index}
                selectedAddress={selectedAddress}
                // setSelectedAddress={setSelectedAddress}
                setSelectedAddress={(val: any) => selectMainAddress(val)}
                {...item}
              />
            );
          })}
        </ScrollView>
      </View>
    </Layout>
  );
}

export default AddressListScreen;
