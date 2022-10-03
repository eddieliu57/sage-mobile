import {
  Input,
  Row,
  View,
  FlatList,
  Pressable,
  Box,
  Text,
  ScrollView,
} from 'native-base';
import React, {useEffect, useState} from 'react';

import Layout from '../../components/Layout/Layout';

import {api} from '../../utilities/api';
import {ProductListType} from '../../types/home/product';
import ProductView from '../../components/Product/ProductView';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {colors} from '../../constants/colors';
import {useNavigation} from '@react-navigation/native';
import {Search} from '../../constants/icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_URL} from '../../constants/config';
import {CategoryListType} from '../../types/home/category';

// const image = require('../../assets/login.png');

function SearchScreen() {
  const [products, setProducts] = useState<ProductListType[]>([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<CategoryListType[]>([]);
  const [selectedCat, setSelectedCat] = useState<number>(0);
  const navigation = useNavigation();

  useEffect(() => {
    async function fetchCategory() {
      const token = await AsyncStorage.getItem('token');
      console.log('TOKEN ', token);
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
        const allData = [{name: 'All Categories', _id: 0}, ...response.data];
        setCategory(allData);
      }
    }

    fetchCategory();
    getProducts();
  }, []);

  const getProducts = async (params?: string) => {
    if (params) {
      const response = await api.get(
        `product/getProducts?search_params=${params}`,
      );

      if (response.status === 200) {
        setProducts(response.data);
      }
    } else {
      const response = await api.get('product/getProducts');

      if (response.status === 200) {
        setProducts(response.data);
      }
    }
  };

  const searchData = (text: string) => {
    setSearch(text);
    getProducts(text);
  };

  const getProductsOnCategory = async (data: any, key: number) => {
    const id = data?._id !== 0 ? data?._id : null;
    setSelectedCat(key);
    if (data?._id !== 0) {
      getProductsFilterData(id);
    } else {
      const response = await api.get('product/getProducts');

      if (response.status === 200) {
        setProducts(response.data);
      }
    }
  };

  const getProductsFilterData = async (id: string) => {
    const response = await api.post(
      `product/getPorductsBasedOnCategory?id=${id}`,
    );
    console.log('RESP ', response.data);
    if (response.status === 200) {
      setProducts(response.data);
    }
  };
  return (
    <Layout padding={0}>
      <View flex={1} backgroundColor="gray.100">
        <View
          backgroundColor={'white'}
          paddingX={2}
          height={140}
          alignItems="center"
          justifyContent={'space-around'}>
          <Row alignItems={'center'} mt={4}>
            <Icon
              name="arrow-left"
              size={20}
              color={colors.primary}
              onPress={() => navigation.goBack()}
            />
            <View
              style={{
                backgroundColor: '#fff',
                shadowColor: '#171717',
                shadowOffset: {width: -2, height: 4},
                shadowOpacity: 0.1,
                shadowRadius: 10,
                width: '80%',
                marginLeft: 20,
                borderRadius: 10,
              }}>
              <Input
                height={52}
                variant="outline"
                fontSize={14}
                borderColor={'white'}
                _focus={{borderColor: colors.primary}}
                value={search}
                placeholder="Search product here..."
                onChangeText={text => searchData(text)}
                p={2}
                rightElement={
                  <Pressable mr={4}>
                    <Search />
                  </Pressable>
                }
              />
            </View>
          </Row>
          <Row alignItems={'center'} px={3}>
            <Box mr={2}>
              <Icon name="filter" size={20} color={colors.third} />
            </Box>
            <ScrollView horizontal={true}>
              {category.map((data, key) => {
                return (
                  <Box
                    backgroundColor={'red'}
                    key={key}
                    ml={2}
                    p={3}
                    borderRadius={10}
                    background={
                      selectedCat === key ? colors.primary : '#E4E9EE'
                    }>
                    <Pressable onPress={() => getProductsOnCategory(data, key)}>
                      <Text
                        color={selectedCat === key ? 'white' : '#A0A6AD'}
                        fontWeight={'bold'}>
                        {data?.name}
                      </Text>
                    </Pressable>
                  </Box>
                );
              })}
            </ScrollView>
          </Row>
        </View>

        <View
          backgroundColor="gray.100"
          paddingX={2}
          flex={1}
          alignItems={products.length > 1 ? 'center' : 'baseline'}>
          <FlatList
            data={products}
            horizontal={false}
            numColumns={2}
            renderItem={({item}) => {
              return <ProductView key={Math.random()} {...item} />;
            }}
          />
        </View>
      </View>
    </Layout>
  );
}

export default SearchScreen;
