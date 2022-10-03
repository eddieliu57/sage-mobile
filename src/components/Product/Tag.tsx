import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
export default function Tag(props: {
  name:
    | boolean
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
}) {
  return (
    <View style={styles.tagView}>
      <Text style={styles.tagText}>{props.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tagView: {
    backgroundColor: '#B1EBC9',
    width: 70,
    alignItems: 'center',
    borderRadius: 5,
    padding: 4,
  },
  tagText: {color: '#219653', fontSize: 10},
});
