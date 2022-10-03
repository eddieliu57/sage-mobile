/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Box,
  Image,
  Input,
  Row,
  ScrollView,
  View,
  Text,
  VStack,
  Skeleton,
  Pressable,
  Column,
} from 'native-base';
import React, {useEffect, useRef, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
// import Layout from '../../components/Layout/Layout';
import UIText from '../../components/UIText';
import styles from './styles';
import {api} from '../../utilities/api';
import {CategoryListType} from '../../types/home/category';
import {ProductListType} from '../../types/home/product';
import ProductView from '../../components/Product/ProductView';
import {colors} from '../../constants/colors';
import {CategoryBox} from '../../components/Category/CategoryBox';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {Alert, Dimensions, Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const image = require('../../assets/home.png');
const banner = require('../../assets/banner.jpg');

import axios from 'axios';
import {API_URL} from '../../constants/config';
import {Cart, DownChevron, MapPoint, Search} from '../../constants/icons';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

const {width, height} = Dimensions.get('window');
function HomeScreen() {
  const [category, setCategory] = useState<CategoryListType[]>([]);
  const [products, setProducts] = useState<ProductListType[]>([]);
  const [activeSlide, setActiveSlide] = useState(0);
  let carouselRef = useRef<any>(undefined);
  const navigation = useNavigation();
  const {t} = useTranslation();

  useEffect(() => {
    async function fetchCategory() {
      const token = await AsyncStorage.getItem('token');
      const id = await AsyncStorage.getItem('id');

      let config: any = {
        headers: {
          Token: token,
        },
      };
      const response = await axios.get(
        `${API_URL}category/getCategories`,
        config,
      );
      if (response.status === 200) {
        setCategory(response.data);
      }
    }

    async function getProducts() {
      const response = await api.get('product/getProducts');
      if (response.status === 200) {
        setTimeout(() => {
          setProducts(response.data);
        }, 2000);
      }
    }
    fetchCategory();
    getProducts();
  }, []);

  const _items = (data: any) => {
    return (
      <Pressable alignItems={'center'}>
        <Image
          source={banner}
          alt="img"
          width={300}
          height={200}
          resizeMode="contain"
          borderRadius={20}
        />
      </Pressable>
    );
  };

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
      <LinearGradient
        colors={[colors.third, colors.primary]}
        start={{x: 1, y: 0}}
        style={styles.gradientStyle}>
        <Row
          justifyContent={'space-around'}
          pt={Platform.OS === 'android' ? 8 : 12}>
          <Image style={styles.image} source={image} alt="img" />

          <Column alignItems={'center'}>
            <Text color="white">{t('home.shippingTo')}</Text>

            <Row alignItems={'center'} mr={2}>
              <Pressable mr={2}>
                <MapPoint />
              </Pressable>
              <Text color="white" fontSize={16} fontWeight="bold">
                Amarillo Village
              </Text>

              <Pressable ml={2}>
                <DownChevron />
              </Pressable>
            </Row>
          </Column>

          <Pressable
            onPress={() => navigation.navigate('Cart')}
            style={styles.cartStyle}>
            <Cart />
          </Pressable>
        </Row>
        <Box mx={4} marginBottom={2} alignItems={'center'}>
          <Input
            mt={2}
            height={54}
            backgroundColor={'#F4F4F4'}
            variant="outline"
            placeholder="Search product here..."
            fontSize={14}
            borderColor={'#F4F4F4'}
            borderRadius={10}
            _focus={{borderColor: 'green'}}
            p={2}
            rightElement={
              <Pressable onPress={() => console.log('')} mr={4}>
                <Search />
              </Pressable>
            }
          />
        </Box>
      </LinearGradient>
      <View backgroundColor={'gray.100'}>
        <Carousel
          data={[1, 2, 4, 4]}
          renderItem={_items}
          sliderWidth={width}
          itemWidth={width}
          itemHeight={200}
          layout={'default'}
          onSnapToItem={index => setActiveSlide(index)}
        />
      </View>
      <Pagination
        dotsLength={4}
        activeDotIndex={activeSlide}
        containerStyle={{marginTop: -45}}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        dotColor={'blue'}
        inactiveDotColor={'gray.400'}
        dotElement={
          <Box
            backgroundColor={colors.primary}
            height={2}
            width={6}
            borderRadius={10}
          />
        }
        inactiveDotElement={
          <Box
            backgroundColor={'gray.400'}
            height={2}
            width={2}
            borderRadius={10}
            ml={1}
          />
        }
      />
      <View mt={2} paddingX={4}>
        <Row justifyContent={'space-between'}>
          <UIText
            title={t('home.category')}
            style={{fontSize: 20, fontWeight: 'bold'}}
          />
          <Text color={'#8A9A5B'} fontWeight="bold">
            See all
          </Text>
        </Row>
        <Row flexWrap={'wrap'} justifyContent={'space-between'}>
          {category.map(data => {
            return <CategoryBox key={data.id} {...data} />;
          })}
        </Row>
      </View>
      <View mt={2} paddingX={4} backgroundColor="gray.100">
        <Row justifyContent={'space-between'} alignItems="center" mt={4}>
          <UIText
            title={t('home.ourProducts')}
            style={{fontSize: 20, fontWeight: 'bold'}}
          />
          <Text color={'#8A9A5B'} fontWeight="bold">
            See all
          </Text>
        </Row>
        <View
          flexDirection={'row'}
          flexWrap={'wrap'}
          justifyContent={'space-between'}>
          {/* <FlatList
              // style={styles.list}
              data={products}
              scrollEnabled={false}
              horizontal={false}
              numColumns={3}
              // keyExtractor={(item, index: number) => index}
              renderItem={({item}) => {
                return <ProductView key={Math.random()} {...item} />;
              }}
            /> */}

          {products.length > 0 ? (
            products.map(data => {
              return <ProductView key={Math.random()} {...data} />;
            })
          ) : (
            <Row flexWrap={'wrap'} justifyContent={'space-between'}>
              <VStack
                w="48%"
                maxW="400"
                borderWidth="1"
                space={8}
                overflow="hidden"
                rounded="md"
                _dark={{
                  borderColor: 'coolGray.500',
                }}
                _light={{
                  borderColor: 'coolGray.200',
                }}>
                <Skeleton h="40" />
                <Skeleton.Text px="4" />
                <Skeleton px="4" my="4" rounded="md" startColor="primary.100" />
              </VStack>
              <VStack
                w="48%"
                maxW="400"
                borderWidth="1"
                space={8}
                overflow="hidden"
                rounded="md"
                _dark={{
                  borderColor: 'coolGray.500',
                }}
                _light={{
                  borderColor: 'coolGray.200',
                }}>
                <Skeleton h="40" />
                <Skeleton.Text px="4" />
                <Skeleton px="4" my="4" rounded="md" startColor="primary.100" />
              </VStack>
            </Row>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

export default HomeScreen;
