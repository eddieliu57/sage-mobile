import {Platform, StyleSheet} from 'react-native';
import {colors} from '../../constants/colors';

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
  icon: {marginRight: 8},
  shadowStyle: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 1,
    paddingTop: Platform.OS === 'ios' ? 50 : 70,
  },
  textStyle: {
    borderWidth: 2,
    borderColor: colors.primary,
    borderBottomWidth: 2,
    borderRadius: 12,
  },
});

export default styles;
