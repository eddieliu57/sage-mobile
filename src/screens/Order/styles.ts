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
    backgroundColor: 'gray.100',
  },
  boxShadow: {
    backgroundColor: 'white',
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 1,
  },
});

export default styles;
