import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  image: {
    width: 40,
    height: 40,
    alignSelf: 'center',
  },
  list: {
    marginTop: 20,
    paddingHorizontal: 4,
  },
  listContainer: {
    flexDirection: 'column',
  },
  gradientStyle: {
    justifyContent: 'center',
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    height: 220,
    padding: 10,
  },
  boxShadow: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 1,
  },
});

export default styles;
