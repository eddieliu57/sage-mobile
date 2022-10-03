import {useNavigation} from '@react-navigation/native';
import {Input, Row, Text} from 'native-base';
import React from 'react';
import {colors} from '../../constants/colors';
import Icon from 'react-native-vector-icons/FontAwesome5';

function AppBar(props: any) {
  const navigation = useNavigation();
  return (
    <Row alignItems={'center'} justifyContent="space-between">
      <Icon
        name="arrow-left"
        size={20}
        color={colors.primary}
        onPress={() => navigation.goBack()}
      />
      {props.title ? (
        <Text fontSize={18} fontWeight="bold">
          {props.title}
        </Text>
      ) : (
        <Input
          height={50}
          width={'80%'}
          backgroundColor={'#F4F4F4'}
          variant="outline"
          fontSize={14}
          borderColor={colors.primary}
          _focus={{borderColor: colors.primary}}
          p={2}
        />
      )}
      {props.rightElement}
    </Row>
  );
}

export default AppBar;
