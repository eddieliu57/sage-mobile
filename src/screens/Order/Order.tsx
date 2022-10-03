/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState} from 'react';
import {View, Row, Image, Text, FlatList, Column} from 'native-base';

import Layout from '../../components/Layout/Layout';

import styles from './styles';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';

const image = require('../../assets/login.png');

const jsonVal = [
  {
    orderId: '1',
    orderDate: '2022-04-01',
    orderStatus: 'Waiting',
    status: 1,
    orderTotal: '400',

    orderItems: [
      {
        itemId: '11872',
        itemName: 'Erythritol',
        itemPrice: '200',
        itemQuantity: '2',
        itemTotal: '400',
      },
    ],
  },
  {
    orderId: '2',
    orderDate: '2022-04-04',
    orderStatus: 'Shipping',
    status: 2,
    orderTotal: '100',
    orderItems: [
      {
        itemId: '11873',
        itemName: 'Aspirin',
        itemPrice: '100',
        itemQuantity: '1',
        itemTotal: '100',
      },
    ],
  },
  {
    orderId: '3',
    orderDate: '2022-04-04',
    orderStatus: 'Shipping',
    status: 3,
    orderTotal: '1200',
    orderItems: [
      {
        itemId: '11872',
        itemName: 'Erythritol',
        itemPrice: '200',
        itemQuantity: '6',
        itemTotal: '1200',
      },
    ],
  },

  {
    orderId: '4',
    orderDate: '2022-02-01',
    orderStatus: 'Delivered',
    status: 4,
    orderTotal: '400',
    orderItems: [
      {
        itemId: '11873',
        itemName: 'Aspirin',
        itemPrice: '100',
        itemQuantity: '4',
        itemTotal: '400',
      },
    ],
  },
  {
    orderId: '5',
    orderDate: '2022-02-01',
    orderStatus: 'Canceled',
    status: 5,
    orderTotal: '200',
    orderItems: [
      {
        itemId: '11872',
        itemName: 'Erythritol',
        itemPrice: '200',
        itemQuantity: '1',
        itemTotal: '200',
      },
    ],
  },
];
function OrderScreen({route}: any) {
  const [doctorsList, setDoctorsList] = useState([]);

  const {t} = useTranslation();

  return (
    <Layout padding={0}>
      {/* <View padding={4}>
        <Row justifyContent={'space-between'}>
          <Image style={styles.image} source={image} alt="img" />
          <Pressable>
            <ShopActive />
          </Pressable>
        </Row>
      </View> */}

      <View padding={4} flex={1} backgroundColor="gray.100">
        <Text fontSize={22} fontWeight="bold">
          {'Orders'}
        </Text>
        {/* <UIInput placeholder={t('consult.searchDoctor')} /> */}

        <FlatList
          style={styles.list}
          contentContainerStyle={styles.listContainer}
          data={jsonVal}
          keyExtractor={(item: any) => {
            return item.orderId;
          }}
          renderItem={({item}) => {
            return <TestView key={Math.random()} {...item} />;
          }}
        />
      </View>
    </Layout>
  );
}

const OrderStatus = (params: any) => {
  let color = '#FA9917';
  let backgroundColor = '#FDF7E2';
  if (params?.status === 1) {
    color = '#FA9917';
    backgroundColor = '#FDF7E2';
  } else if (params?.status === 2) {
    color = '#3399FF';
    backgroundColor = '#E1F0FF';
  } else if (params?.status === 3) {
    color = '#3399FF';
    backgroundColor = '#E1F0FF';
  } else if (params?.status === 4) {
    color = '#2AC940';
    backgroundColor = '#DFFFE9';
  } else if (params?.status === 5) {
    color = '#EB5757';
    backgroundColor = '#e0a6a6';
  }
  return (
    <View
      style={{
        backgroundColor: backgroundColor,
        borderRadius: 10,
        paddingHorizontal: 4,
        paddingVertical: 4,
        height: 30,
        alignContent: 'center',
      }}>
      <Text fontWeight="bold" color={color}>
        {params?.orderStatus}
      </Text>
    </View>
  );
};

function TestView(params: any) {
  const navigation = useNavigation();
  return (
    <View mb={4} height={150} borderRadius={15} p={2} style={styles.boxShadow}>
      {/* <Row justifyContent={'space-between'} backgroundColor="red" p={2}>
        <Column>
          <Text fontWeight="bold">{params?.orderId}</Text>
          <Text>{params?.orderDate}</Text>
        </Column>
        <OrderStatus {...params} />
      </Row> */}

      <Row>
        <Column>
          <Image
            style={{resizeMode: 'contain'}}
            source={{
              width: 70,
              height: 70,
              uri: 'https://rituals.scene7.com/is/image/rituals/1106886_TheRitualofJingHandLotionPRO?resMode=sharp2&fmt=png-alpha&wid=1000',
            }}
            alt="img"
          />
          <Row>
            <Text>Quantity | {params?.orderItems[0].itemQuantity} items</Text>
          </Row>
        </Column>
        <Column>
          <Row>
            <Text color="gray.500">Order No. | #{params?.orderId}</Text>
            <Text color="gray.500" marginLeft={10}>
              {params?.orderDate}
            </Text>
          </Row>
          <Text fontWeight="bold" fontSize={18}>
            {params?.orderItems[0].itemName}
          </Text>
          {/* <Text fontWeight="bold" color="red.400">
            Rp. {params?.orderItems[0].itemPrice}
          </Text> */}
        </Column>
      </Row>

      <Row pt={2} justifyContent="space-between">
        <Text fontWeight="bold" fontSize={20}>
          Total
        </Text>
        <Text fontWeight="bold" fontSize={20} color="#E96341">
          Rp.{params?.orderTotal}
        </Text>
      </Row>
    </View>
  );
}
export default OrderScreen;
