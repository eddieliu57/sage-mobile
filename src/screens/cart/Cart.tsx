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
import {cartItems} from '../../redux/actions/cart';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

// const image = require('../../assets/login.png');
const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');

let vouhcerData = [
  {id: '1', name: 'Voucher 1', text: ' Berlaku hingga 31', value: '10'},
  {id: '2', name: 'Voucher 2', text: ' Berlaku hingga 41', value: '20'},
  {id: '3', name: 'Voucher 3', text: ' Berlaku hingga 991', value: '30'},
];

function CartScreen({route}: any) {
  const [slide, setActiveSlide] = useState(0);
  const [addCart, setAddCart] = useState(1);
  const [visible, setVisible] = useState(false);
  const [voucher, setVoucher] = useState('');
  const [voucherList, setVoucherList] = useState([]);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {t} = useTranslation();
  const data = useSelector((state: any) => state.cart.cart);
  const [items, setItems] = useState(data);

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
    const params = {
      items,
      voucher: voucher,
    };
    dispatch(cartItems(params));
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
      <View padding={4} flex={1}>
        <AppBar
          title={t('cart.myShoppingBag')}
          rightElement={
            <Pressable>
              <ShopActive />
            </Pressable>
          }
        />

        <ScrollView
          mt={4}
          flex={1}
          p={2}
          contentContainerStyle={{justifyContent: 'space-between'}}>
          {items.map((item: any, index: number) => {
            return (
              <View key={index} mb={2}>
                <Row>
                  <Column>
                    <Image
                      alt="Image"
                      source={{
                        width: 100,
                        height: 100,
                        uri: 'https://rituals.scene7.com/is/image/rituals/1106886_TheRitualofJingHandLotionPRO?resMode=sharp2&fmt=png-alpha&wid=1000',
                      }}
                    />
                  </Column>
                  <Column flexGrow={1}>
                    <Text fontSize={18} fontWeight="bold" mt={1}>
                      {item.name}
                    </Text>
                    <Text
                      mt={1}
                      style={{color: colors.primary}}
                      fontSize={14}
                      fontWeight="bold">
                      RP. {item.sell_price}
                    </Text>
                    <Row alignItems="center" mt={1}>
                      <Minus onPress={() => onMinus(item)} />
                      <Text mx={5}>{item.counter}</Text>
                      <Plus onPress={() => onPlus(item)} />
                    </Row>
                  </Column>
                  <Column
                    justifyContent={'space-between'}
                    alignItems="flex-end">
                    <Delete />
                    <Text
                      style={{color: 'red'}}
                      fontSize={14}
                      fontWeight="bold">
                      RP. {item.sell_price * item.counter}
                    </Text>
                  </Column>
                </Row>
                <Divider />
              </View>
            );
          })}

          <View mt={2}>
            <Text fontSize={18} fontWeight="bold">
              {t('cart.redeemVoucher')}
            </Text>
            <Row>
              <Input
                width={'100%'}
                value={voucher}
                rightElement={
                  <UIButton
                    name={t('cart.apply')}
                    onPress={() => reedemVoucher()}
                    backgroundColor={colors.primary}
                  />
                }
              />
            </Row>
          </View>

          <View mt={2} backgroundColor={'#ECEFE5'} p={4}>
            <Pressable onPress={() => setVisible(true)}>
              <Row justifyContent={'space-between'} alignItems="center">
                <Promo />
                <Text fontSize={14} color={colors.primary}>
                  {t('cart.availableVouchers')}
                </Text>
                <RightChevron />
              </Row>
            </Pressable>
          </View>
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
              <Text>{t('cart.notIncludingShippingCost')}</Text>
            </Column>
            <Text fontSize={18} fontWeight="bold">
              Rp.{' '}
              {data.reduce((total: number, item: any) => {
                return total + item.sell_price * item.counter;
              }, 0)}
            </Text>
          </Row>
          <UIButton
            // onPress={() => navigation.navigate('Home')}
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
              {t('cart.redeemVoucher')}
            </Text>
            <Close onPress={() => setVisible(false)} />
          </Row>
          <Row>
            <Input
              width={'100%'}
              rightElement={
                <UIButton
                  name={t('cart.apply')}
                  onPress={() => applyVoucher('No Voucher')}
                  backgroundColor={colors.primary}
                />
              }
            />
          </Row>
          {voucherList.map((item: any, index: number) => {
            return (
              <Box
                mt={4}
                justifyContent="space-between"
                borderWidth={1}
                p={4}
                borderColor={colors.primary}
                borderRadius={5}
                key={index}>
                <Text fontSize={16} fontWeight="bold">
                  {item.code}
                </Text>
                <Row>
                  <Time />
                  <Text ml={1} fontSize={14}>
                    {item.code}
                  </Text>
                </Row>

                <Button
                  variant="outline"
                  colorScheme="success"
                  mt={2}
                  onPress={() => applyVoucher(item.code)}>
                  <Text color={colors.primary}>{t('cart.applyVoucher')}</Text>
                </Button>
              </Box>
            );
          })}
        </View>
      </Modal>
    </Layout>
  );
}

export default CartScreen;
