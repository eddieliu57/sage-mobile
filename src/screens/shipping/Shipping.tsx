/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect, useState} from 'react';
import {
  View,
  Pressable,
  Image,
  Column,
  Row,
  Text,
  Divider,
  Box,
  ScrollView,
  Button,
  Input,
} from 'native-base';

import Layout from '../../components/Layout/Layout';

import AppBar from '../../components/Layout/AppBar';
import {
  Close,
  Delete,
  Minus,
  NumberOne,
  NumberTwo,
  Plus,
  Promo,
  RightChevron,
  ShopActive,
  Time,
} from '../../constants/icons';

import {Dimensions, Modal} from 'react-native';
import {colors} from '../../constants/colors';
import {UIButton} from '../../components';
import {ProductListType} from '../../types/home/product';
import {api} from '../../utilities/api';
import {addToCart} from '../../redux/actions/cart';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
// const image = require('../../assets/login.png');
const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');

let vouhcerData = [
  {id: '1', name: 'Voucher 1', text: ' Berlaku hingga 31', value: '10'},
  {id: '2', name: 'Voucher 2', text: ' Berlaku hingga 41', value: '20'},
  {id: '3', name: 'Voucher 3', text: ' Berlaku hingga 991', value: '30'},
];

function ShippingScreen({route}: any) {
  const [slide, setActiveSlide] = useState(0);
  const [addCart, setAddCart] = useState(1);
  const [visible, setVisible] = useState(false);
  const [voucher, setVoucher] = useState('');
  const [voucherList, setVoucherList] = useState([]);

  const cartItems = useSelector((state: any) => state.cart.items);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const data = useSelector((state: any) => state.cart.cart);
  const [items, setItems] = useState(data);

  const address = useSelector((state: any) => state.address.address);
  console.log('ADDRESS ', address);
  useEffect(() => {
    async function getVouchers() {
      const response = await api.get('promocodes/getPromoCodes');
      if (response.status === 200) {
        setVoucherList(response.data);
      }
    }
    getVouchers();
  }, []);

  const onPlus = (item: {_id: any}) => {
    const index = items?.findIndex((x: any) => x._id === item._id);
    let newArr = [...items];
    newArr[index].counter = newArr[index].counter + 1;
    setItems(newArr);
  };
  const onMinus = (item: {_id: any}) => {
    if (addCart === 0) return;
    const index = items?.findIndex((x: {_id: any}) => x._id === item._id);
    let newArr = [...items];
    if (newArr[index].counter === 1) return;
    newArr[index].counter = newArr[index].counter - 1;
    setItems(newArr);
  };

  const addToCartAction = () => {
    // const param = {...product, counter: addCart};
    // dispatch(addToCart(param));
  };

  const applyVoucher = (item: any) => {
    setVoucher(item);
    setVisible(false);
  };

  const reedemVoucher = () => {};

  return (
    <Layout padding={0}>
      <View padding={4}>
        <AppBar
          title="Shipping Address"
          rightElement={
            <Pressable>
              <Text></Text>
            </Pressable>
          }
        />
      </View>
      <Box backgroundColor="#F4F4F4" p={3} mt={2} alignItems="center">
        <Row alignItems={'center'}>
          {/* <NumberOne /> */}
          <Box backgroundColor={colors.primary} p={1}>
            <Text> 1 </Text>
          </Box>
          <Text ml={1}>Pengiriman</Text>
          <RightChevron />
          <Box backgroundColor={'grey'} p={1}>
            <Text> 2 </Text>
          </Box>
          {/* <NumberTwo /> */}
          <Text ml={1}>Pembayaran</Text>
        </Row>
      </Box>
      <View padding={4} flex={1}>
        <ScrollView
          mt={4}
          flex={1}
          p={2}
          contentContainerStyle={{justifyContent: 'space-between'}}>
          <View mb={4}>
            <Row justifyContent={'space-between'}>
              <Text fontSize={16} fontWeight="bold">
                Alamat Pengiriman
              </Text>
              <Pressable
                // onPress={() => alert('kkkkk')}
                onPress={() => navigation.navigate('AddressList')}>
                <Text color="#E96341">Ubah</Text>
              </Pressable>
            </Row>
            <Text fontSize={12}>RUMAH</Text>
            <Text>
              {address?.main_address}
              {' , '}
              {address?.city}
              {' , '}
              {address?.country}
              {' , '}
              {address?.pincode}
            </Text>

            <View>
              <Divider />
              <Pressable onPress={() => navigation.navigate('AddressForm')}>
                <Text fontSize={14} p={2} color="#E96341" alignSelf={'center'}>
                  Tambah Alamat Baru
                </Text>
              </Pressable>
              <Divider />
            </View>
          </View>

          <View mb={4}>
            <Text fontSize={16} fontWeight="bold">
              Metode Pengiriman
            </Text>

            <View backgroundColor={'#ECEFE5'} p={4}>
              <Pressable onPress={() => setVisible(true)}>
                <Row justifyContent={'space-between'} alignItems="center">
                  <Row>
                    <Promo />
                    <Column ml={2}>
                      <Text fontSize={14} color={colors.primary}>
                        Regular Shipping
                      </Text>
                      <Text color="#4F4F4F">Dikirim dalam 1-4 hari</Text>
                    </Column>
                  </Row>
                  <View>
                    <RightChevron />
                  </View>
                </Row>
              </Pressable>
            </View>
          </View>

          {(cartItems?.items || []).map((item: any, index: number) => {
            return (
              <View key={index} mb={2}>
                <Row>
                  <Column>
                    <Image
                      alt="Image"
                      source={{
                        width: 80,
                        height: 80,
                        uri: 'https://rituals.scene7.com/is/image/rituals/1106886_TheRitualofJingHandLotionPRO?resMode=sharp2&fmt=png-alpha&wid=1000',
                      }}
                    />
                  </Column>
                  <Column flexGrow={1}>
                    <Text fontSize={16} mt={1}>
                      {item.name}
                    </Text>
                    <Row justifyContent={'space-between'}>
                      <Text>{item.counter} pcs</Text>
                      <Text style={{color: 'red'}} fontSize={14}>
                        RP. {item.sell_price * item.counter}
                      </Text>
                    </Row>
                  </Column>
                </Row>
                <Divider />
              </View>
            );
          })}
        </ScrollView>
      </View>
      <View
        style={{
          position: 'absolute',
          backgroundColor: '#F4F4F4',
          bottom: 20,
          width: '100%',
          alignSelf: 'center',
        }}>
        <View p={4}>
          <Row justifyContent={'space-between'} mb={2}>
            <Column>
              <Text fontSize={18} fontWeight="bold">
                Sub Total
              </Text>
            </Column>
            <Text fontSize={18} fontWeight="bold">
              Rp.{' '}
              {data.reduce((total: number, item: any) => {
                return total + item.sell_price * item.counter;
              }, 0)}
            </Text>
          </Row>
          <Row justifyContent={'space-between'}>
            <Text fontSize={18} fontWeight="bold">
              Shipping Cost
            </Text>
            <Text fontSize={18} fontWeight="bold">
              FREE
            </Text>
          </Row>

          <Row justifyContent={'space-between'} mt={2}>
            <Text fontSize={18} fontWeight="bold">
              Total
            </Text>
            <Text fontSize={18} fontWeight="bold">
              Rp.{' '}
              {data.reduce((total: number, item: any) => {
                return total + item.sell_price * item.counter;
              }, 0)}
            </Text>
          </Row>
          <UIButton
            onPress={() => addToCartAction()}
            name={'TAMBAH KE KERANJANG'}
            backgroundColor={colors.primary}
          />
        </View>
      </View>

      <Modal
        visible={visible}
        presentationStyle="pageSheet"
        animationType="slide"
        onRequestClose={() => setVisible(false)}>
        <View p={6}>
          <Row justifyContent={'space-between'}>
            <Text fontSize={18} fontWeight="bold">
              Select Shipping
            </Text>
            <Close onPress={() => setVisible(false)} />
          </Row>
        </View>
      </Modal>
    </Layout>
  );
}

export default ShippingScreen;
