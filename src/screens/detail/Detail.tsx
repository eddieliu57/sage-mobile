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
} from 'native-base';

import Layout from '../../components/Layout/Layout';

import AppBar from '../../components/Layout/AppBar';
import {Minus, Plus, ShopActive} from '../../constants/icons';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {Dimensions} from 'react-native';
import {colors} from '../../constants/colors';
import {UIButton} from '../../components';
import {ProductListType} from '../../types/home/product';
import {api} from '../../utilities/api';
import {addToCart} from '../../redux/actions/cart';
import {useDispatch} from 'react-redux';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

// const image = require('../../assets/login.png');
const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');

function DetailScreen({route}: any) {
  const [slide, setActiveSlide] = useState(0);
  const [addCart, setAddCart] = useState(1);
  const [product, setProduct] = useState<ProductListType>({
    _id: '',
    buisness_value: '',
    category_id: '',
    deleted: false,
    description: '',
    how_to_use: '',
    name: '',
    performance_value: '',
    sell_price: '',
  });

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {t} = useTranslation();
  const {id} = route.params;

  useEffect(() => {
    async function getProducts() {
      const response = await api.get(`product/getProducts?id=${id}`);
      if (response.status === 200) {
        setProduct(response.data[0]);
      }
    }
    getProducts();
  }, [id]);

  const onPlus = () => setAddCart(addCart + 1);

  const onMinus = () => {
    if (addCart === 0) {
      return;
    }
    setAddCart(addCart - 1);
  };

  const addToCartAction = () => {
    const param = {...product, counter: addCart};
    dispatch(addToCart(param));
  };

  const _renderItem = ({item, index}: any) => {
    return (
      <View style={{alignItems: 'center'}}>
        <Image
          alt="Image"
          source={{
            width: 200,
            height: 200,
            uri: 'https://rituals.scene7.com/is/image/rituals/1106886_TheRitualofJingHandLotionPRO?resMode=sharp2&fmt=png-alpha&wid=1000',
          }}
        />
      </View>
    );
  };

  const pagination = () => {
    return (
      <Pagination
        dotsLength={3}
        activeDotIndex={slide}
        dotStyle={styles.dotStyle}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  };

  return (
    <Layout>
      <AppBar
        title={t('detail.detailProduct')}
        rightElement={
          <Pressable onPress={() => navigation.navigate('Cart')}>
            <ShopActive />
          </Pressable>
        }
      />

      <ScrollView
        mt={4}
        flex={1}
        contentContainerStyle={{justifyContent: 'space-between'}}>
        <View>
          <Carousel
            data={[1, 2, 3]}
            renderItem={_renderItem}
            sliderWidth={viewportWidth}
            itemWidth={viewportWidth}
            onSnapToItem={index => setActiveSlide(index)}
          />
          {pagination()}
        </View>

        <Row mt={1} justifyContent="space-between" width="100%">
          <Column>
            <Text style={{color: 'grey'}}>{t('common.item')} #11872</Text>
            <Text fontSize={18} fontWeight={'bold'}>
              {product.name}
            </Text>
            <Text fontSize={18} fontWeight={'bold'} style={{color: 'red'}}>
              Rp. {product.sell_price}
            </Text>
          </Column>
          <Row alignItems="center">
            <Minus onPress={() => onMinus()} />
            <Text mx={5}>{addCart}</Text>
            <Plus onPress={() => onPlus()} />
          </Row>
        </Row>

        <Row
          mt={1}
          justifyContent="space-between"
          alignItems="center"
          style={{borderWidth: 1, borderColor: 'grey', borderRadius: 5}}>
          <Column p={4}>
            <Box borderRadius={20} p={2} backgroundColor={colors.primary}>
              <Text>{t('common.available')}</Text>
            </Box>
          </Column>
          <Divider orientation="vertical" />
          <Column p={2}>
            <Text>{t('common.retailPrice')}</Text>
            <Text>Rp. {product.sell_price}</Text>
          </Column>
          <Divider orientation="vertical" />
          <Column p={2}>
            <Text>PV/BV</Text>
            <Text>
              {product.performance_value}/ {product.buisness_value}
            </Text>
          </Column>
        </Row>

        <Row mt={2}>
          <Column>
            <Text fontSize={18} fontWeight="bold">
              {t('detail.productDescription')}
            </Text>
            <Text>{product.description}</Text>
          </Column>
        </Row>

        <Row mt={2}>
          <Column>
            <Text fontSize={18} fontWeight="bold">
              {t('detail.howToUse')}
            </Text>
            <Text> {product.how_to_use}</Text>
          </Column>
        </Row>

        <Row mt={2}>
          <Column>
            <Text fontSize={18} fontWeight="bold">
              {t('detail.registrationNumber')}
            </Text>
            <Text>Kemenkes RI: BK7771</Text>
          </Column>
        </Row>
      </ScrollView>
      <View bottom={0}>
        <UIButton
          // onPress={() => navigation.navigate('Home')}
          onPress={() => addToCartAction()}
          name={t('detail.addToCart')}
          backgroundColor={colors.primary}
        />
      </View>
    </Layout>
  );
}

export default DetailScreen;
