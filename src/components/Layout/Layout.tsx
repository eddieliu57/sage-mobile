import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ILayout} from '../../types/layout';

function Layout(props: ILayout) {
  const styles = {
    flex: 1,
    padding: props.padding !== undefined ? props.padding : 15,
    backgroundColor: '#F7F7F7',
  };
  return <SafeAreaView style={styles}>{props.children}</SafeAreaView>;
}

export default Layout;
