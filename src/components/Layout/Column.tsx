import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ILayout} from '../../types/layout';

function Column(props: ILayout) {
  return (
    <View style={[styles(props).container, props.style]}>{props.children}</View>
  );
}

const styles = (props?: any) =>
  StyleSheet.create({
    container: {
      // flex: 1,
      flexDirection: 'column',
      justifyContent: props.justifyContent,
      alignItems: props.alignItems,
    },
  });

export default Column;
