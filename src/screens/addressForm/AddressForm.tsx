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
  Checkbox,
  Button,
} from 'native-base';

import Layout from '../../components/Layout/Layout';

import AppBar from '../../components/Layout/AppBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UIButton, UIInput} from '../../components';
import {useTranslation} from 'react-i18next';
import {colors} from '../../constants/colors';
import {Alert} from 'react-native';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {api} from '../../utilities/api';

function AddressFormScreen({route}: any) {
  const [form, setForm] = useState({
    is_primary: false,
    first_name: '',
    last_name: '',
    username: '',
    country_code: '91',
    mobile_no: '',
    country: '',
    province: '',
    city: '',
    district: '',
    main_address: '',
    other_address: '',
    pincode: '',
  });

  const {t} = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const addAddress = async () => {
    const id = await AsyncStorage.getItem('id');
    console.log('CUSTOMER ID', id);
    console.log('FORM ', form);
    const formData = {...form, customer_id: id};

    const response = await api.post('address/saveCustomerAddress', formData);
    console.log('DATA ', response.data);
    if (response.status === 200) {
      console.log('Address Added Successfully');

      navigation.goBack();
    }
  };

  return (
    <Layout padding={0}>
      <View padding={4}>
        <AppBar
          title="Tambha alamat Baru"
          rightElement={
            <Pressable>
              <Text></Text>
            </Pressable>
          }
        />
      </View>

      <View padding={4} flex={1}>
        <ScrollView
          mt={2}
          flex={1}
          contentContainerStyle={{
            justifyContent: 'space-between',
          }}>
          <UIInput
            label="Label Alamat (Contoh: Alamat Rumah)"
            placeholder="Enter Username"
            value={form.username}
            onChangeText={text => setForm({...form, username: text})}
          />
          <Text fontWeight={'bold'} fontSize="sm" mt={2}>
            INFORMASI PENERIMA
          </Text>

          <Row justifyContent={'space-between'} mb={2}>
            <UIInput
              stackWidth={'45%'}
              label="nama depan"
              placeholder="First Name"
              value={form.first_name}
              onChangeText={text => setForm({...form, first_name: text})}
            />
            <UIInput
              stackWidth={'45%'}
              label="Nama Belakang"
              placeholder="Last Name"
              value={form.last_name}
              onChangeText={text => setForm({...form, last_name: text})}
            />
          </Row>
          <UIInput
            label={t('signup.mobileNumber')}
            placeholder={t('signup.mobileNumber')}
            value={form.mobile_no}
            onChangeText={text => setForm({...form, mobile_no: text})}
          />

          <Text fontWeight={'bold'} fontSize="sm" my={2}>
            ALAMAT PENERIMA
          </Text>

          <View mt={2}>
            <UIInput
              label="Negara"
              placeholder="Negara"
              value={form.country}
              onChangeText={text => setForm({...form, country: text})}
            />

            <UIInput
              label="Provinsi"
              placeholder="Provinsi"
              value={form.province}
              onChangeText={text => setForm({...form, province: text})}
            />

            <UIInput
              label="Kabupaten/Kota"
              placeholder="Provinsi"
              value={form.city}
              onChangeText={text => setForm({...form, city: text})}
            />

            <UIInput
              label="Kecamaten"
              placeholder="Kecamaten"
              value={form.district}
              onChangeText={text => setForm({...form, district: text})}
            />

            <UIInput
              label="alamat lengkap"
              placeholder="alamat lengkap"
              value={form.main_address}
              onChangeText={text => setForm({...form, main_address: text})}
            />

            <UIInput
              label="alamat lainnya"
              placeholder="alamat lainnya"
              value={form.other_address}
              onChangeText={text => setForm({...form, other_address: text})}
            />

            <UIInput
              label="Kode pos"
              placeholder="alamat lainnya"
              value={form.pincode}
              onChangeText={text => setForm({...form, pincode: text})}
            />
          </View>

          <Row my={4}>
            <Checkbox value="test" accessibilityLabel="checkbox" />
            <Text fontWeight={'bold'} fontSize="sm" ml={2}>
              Gunakan sebagai alamat utama
            </Text>
          </Row>

          <UIButton
            onPress={() => addAddress()}
            name={'TAMBAH KE KERANJANG'}
            backgroundColor={colors.primary}
          />

          <View mt={2}>
            <Button onPress={() => navigation.goBack()} variant="outline">
              <Row alignItems={'center'}>
                <Text
                  fontWeight={'bold'}
                  fontSize="16"
                  padding={1}
                  color={colors.primary}>
                  CANCEL
                </Text>
              </Row>
            </Button>
          </View>
        </ScrollView>
      </View>
    </Layout>
  );
}

export default AddressFormScreen;
