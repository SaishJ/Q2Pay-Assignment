import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {colors} from '../utlis/utils';

const ToastNotification = ({toastOptions}: any) => {
  const type = toastOptions.type;
  const backgroundColor =
    type === 'success'
      ? colors.successColor
      : type === 'warning'
      ? colors.warningColor
      : type === 'danger'
      ? colors.dangerColor
      : '#222';
  const icon =
    type === 'success'
      ? 'check-circle'
      : type === 'warning'
      ? 'info'
      : type === 'danger'
      ? 'x-circle'
      : null;
  const color = type === 'warning' ? '#000000' : '#FFFFFF';

  return (
    <View
      style={{
        backgroundColor,
        width: '90%',
        padding: 15,
        borderRadius: 5,
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
        <Icon name={icon} color={color} size={15} />
        <Text
          style={{
            color,
            fontFamily: 'Nexa-Regular',
            fontSize: 14,
          }}>
          {toastOptions.message}
        </Text>
      </View>
    </View>
  );
};

export default ToastNotification;
