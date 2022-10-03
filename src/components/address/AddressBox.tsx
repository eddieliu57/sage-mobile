import React from 'react';
import {Column, Divider, Pressable, Radio, Row, Text, View} from 'native-base';
// import * as Navigator from '../../navigation/RootNavigation';
import {DeleteEnable, Edit, LocationEnable} from '../../constants/icons';

export function AddressBox(props: any) {
  return (
    <Pressable
      key={Math.random()}
      mb={4}
      borderWidth={1}
      borderColor={'#e6e6e6'}
      borderRadius={10}>
      <View p={2}>
        <Row justifyContent={'space-between'}>
          <Text fontSize={12} fontWeight="bold">
            RUMAH
          </Text>
          <Radio.Group
            name="exampleGroup"
            value={props.selectedAddress}
            onChange={props.setSelectedAddress}
            accessibilityLabel="select an option">
            <Radio
              colorScheme="emerald"
              size={'sm'}
              value={props._id}
              accessibilityLabel="selected"
            />
          </Radio.Group>
        </Row>

        <Column>
          <Text fontSize={16} fontWeight="bold">
            {props.country}
          </Text>
          <Text mt={2}>
            {props.main_address}
            {','}
            {props.city}
            {' ,'}
            {props.district}
            {','}
            {props.country}
          </Text>
        </Column>
      </View>
      <Divider />
      <Row p={2} justifyContent="space-between">
        <Row>
          <LocationEnable />
          <Text>{props.city}</Text>
        </Row>
        <Row>
          <Pressable>
            <Edit />
          </Pressable>
          <Pressable ml={4}>
            <DeleteEnable />
          </Pressable>
        </Row>
      </Row>
    </Pressable>
  );
}
