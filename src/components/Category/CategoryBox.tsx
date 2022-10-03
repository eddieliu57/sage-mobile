import React from 'react';
import {Box, Pressable, Text, View} from 'native-base';
import * as Navigator from '../../navigation/RootNavigation';
import {SvgFromUri} from 'react-native-svg';

export function CategoryBox(props: any) {
  return (
    <Box my={2} flexBasis={'25%'} p={1}>
      <Pressable
        onPress={() => Navigator.navigate('Product')}
        alignItems={'center'}>
        <View background={'gray.100'} width={50} height={50} borderRadius={100}>
          <SvgFromUri
            width={30}
            height={30}
            uri={props?.category_image}
            shouldRasterizeIOS
            style={{
              alignSelf: 'center',
              justifyContent: 'center',
              marginTop: 10,
            }}
          />
        </View>
        {/* <Image
          source={{
            uri:
              props?.category_image ||
              'https://wallpaperaccess.com/full/317501.jpg',
          }}
          alt="img"
          borderRadius={100}
          width={60}
          height={60}
          alignItems="center"
        /> */}

        <Text
          mt={2}
          fontSize={10}
          numberOfLines={1}
          fontWeight="semibold"
          color="#7E858C">
          {props?.name}
        </Text>
      </Pressable>
    </Box>
  );
}
