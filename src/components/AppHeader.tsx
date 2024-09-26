import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {colors} from '../utlis/utils';
import {useNavigation} from '@react-navigation/native';

const AppHeader = (props: any) => {
  const navigation = useNavigation();
  const {title, goBack} = props;

  return (
    <View style={styles.container}>
      {goBack && (
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" color="#FFFFFF" size={25} />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default AppHeader;

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    height: 60,
    paddingHorizontal: 15,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    color: '#222222',
    fontSize: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    elevation: 2,
    backgroundColor: colors.accent,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
