import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import React from 'react';
import {colors} from '../utlis/utils';

const Loader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={colors.accent} size={'large'} />
    </View>
  );
};

export default Loader;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
