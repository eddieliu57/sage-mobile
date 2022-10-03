import React from 'react';
import {StyleSheet, Text} from 'react-native';
import IText from '../types/text';
export default function UIText(props: IText) {
  return <Text style={[props.style, styles(props).Text]}>{props.title}</Text>;
}

const styles = (props: IText) =>
  StyleSheet.create({
    Text: {
      ...props.text,
      color: props.color || 'black',
    },
  });
