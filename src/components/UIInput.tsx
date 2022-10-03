import React from 'react';
import {Input, Stack, Text} from 'native-base';
import {textColors} from '../constants/colors';
import IInput from '../types/input';

function UIInput(props: IInput) {
  return (
    <Stack width={props.stackWidth}>
      {props.label && (
        <Text fontSize={22} fontWeight="bold">
          {props.label}
        </Text>
      )}
      <Input
        mt={2}
        height={50}
        variant={'underlined'}
        placeholderTextColor={textColors.third}
        fontSize={16}
        color={'black'}
        // borderColor={'#F4F4F4'}
        _focus={{borderColor: 'green'}}
        p={2}
        placeholder={props.placeholder}
        multiline={props.multiline}
        onChangeText={props.onChangeText}
        value={props.value}
        secureTextEntry={props.secureTextEntry}
        rightElement={props.rightElement}
        leftElement={props.leftElement}
        maxLength={props.maxLength}
        keyboardType={props.keyboardType}
        isRequired={props.isRequired}
      />
    </Stack>
  );
}

export default UIInput;
