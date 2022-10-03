import React from 'react';
import {Box, Button, Row, Text} from 'native-base';
import {textColors} from '../constants/colors';
import IButton from '../types/button';

function UIButton(props: IButton) {
  return (
    <Button
      variant={props.variant}
      backgroundColor={props.backgroundColor}
      onPress={props.onPress}
      height={58}
      borderRadius={16}>
      <Row alignItems={'center'}>
        <Box mr={2}>{props.icon}</Box>
        <Text
          fontWeight={'bold'}
          fontSize="22"
          padding={1}
          color={textColors.main}>
          {props.name}
        </Text>
      </Row>
    </Button>
  );
}

export default UIButton;
