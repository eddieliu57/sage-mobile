import {StyleSheet} from 'react-native';

const commonStyle = () =>
  StyleSheet.create({
    Button: {
      backgroundColor: '#8A9A5B',
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    Input: {
      height: 25,
      borderColor: 'gray',
    },
  });

export default commonStyle;
