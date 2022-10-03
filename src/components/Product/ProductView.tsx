import React from 'react';
import {useNavigation} from '@react-navigation/core';
import {StyleSheet, Image, Pressable} from 'react-native';
import {Row, Text, View} from 'native-base';
import {colors} from '../../constants/colors';
import Tag from './Tag';
import {useTranslation} from 'react-i18next';
import {CartMain} from '../../constants/icons';
// import {SvgFromUri} from 'react-native-svg';

export default function ProductView({
  // imageUrl = 'https://rituals.scene7.com/is/image/rituals/1106886_TheRitualofJingHandLotionPRO?resMode=sharp2&fmt=png-alpha&wid=1000',
  // reference_code = '',
  name = '',
  retail_price = '0',
  sell_price = '0',
  performance_value = '0.00',
  _id = 0 || '',
}) {
  const navigation = useNavigation();
  const {t} = useTranslation();
  const onPress = () => {
    navigation.navigate('ProductDetails', {id: _id});
  };
  return (
    <View style={styles.productBox}>
      <Pressable onPress={() => onPress()}>
        <View style={styles.imageView}>
          <Image
            style={styles.image}
            source={require('../../assets/product.jpg')}
          />
        </View>
        <View px={4} py={1}>
          <Row justifyContent={'space-between'}>
            <Text color="#7E858C">Item</Text>
            <Tag name="Available" />
          </Row>
          {/* <Text style={styles.thinFont}>{reference_code}</Text> */}
          <Text style={styles.boldFont} my={2}>
            {name}
          </Text>

          <Row justifyContent={'space-between'} my={1}>
            <Text style={styles.thinFont200}>PV/BV</Text>
            <Text color="#7E858C" fontWeight={'bold'}>
              {performance_value}
            </Text>
          </Row>
          <Row justifyContent={'space-between'} my={1}>
            <Text style={styles.thinFont200}>{t('common.retailPrice')}</Text>
            <Text color="#7E858C" fontWeight={'bold'}>
              Rp. {retail_price}
            </Text>
          </Row>

          <Row
            borderTopColor="#E4E9EE"
            borderTopWidth={1}
            my={2}
            alignItems="center"
            justifyContent="space-between">
            <Text style={[styles.boldFont, styles.mainText]}>
              Rp. {sell_price}
            </Text>

            <Pressable style={styles.button}>
              <CartMain width={20} height={20} strokeWidth={20} />

              {/* <SvgFromUri uri={CartMain} /> */}
              {/* <Icon name="shopping-cart" color={colors.primary} size={16} /> */}
            </Pressable>
          </Row>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  productBox: {
    marginVertical: 10,
    flexBasis: '46%',
    marginHorizontal: 3,
    borderRadius: 15,
    backgroundColor: '#fff',
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  imageView: {
    alignItems: 'center',
    borderBottomColor: '#E4E9EE',
    borderBottomWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  image: {
    resizeMode: 'center',
    height: 80,
    width: 80,
  },
  tagView: {
    backgroundColor: 'green',
    width: 70,
    alignItems: 'center',
    borderRadius: 15,
    padding: 4,
  },
  thinFont: {fontWeight: '100', color: 'black'},
  boldFont: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 16,
  },
  marginTop: {marginTop: 8},
  thinFont200: {color: '#7E858C'},
  button: {
    borderRadius: 10,
    marginTop: 8,
    backgroundColor: 'white',
    borderColor: colors.primary,
    borderWidth: 2,
    padding: 6,
  },
  buttonText: {
    color: colors.primary,
    marginLeft: 8,
  },
  priceContent: {
    flexDirection: 'row',
    marginTop: 8,
    justifyContent: 'space-between',
  },
  mainText: {
    color: '#E96341',
    marginTop: 5,
  },
});
