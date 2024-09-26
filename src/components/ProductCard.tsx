import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {colors} from '../utlis/utils';
import {routes} from '../navigators/routes';
import {useToast} from 'react-native-toast-notifications';

const ProductCard = ({item, navigation}: any) => {
  const toast = useToast();

  const handleAddtoCart = () => {
    toast.show('Product added to Cart', {type: 'success'});
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() =>
        navigation.navigate(routes.prdouct_details, {prdId: item?.id})
      }
      style={styles.cardContainer}>
      <View style={styles.row}>
        <View style={styles.imageContainer}>
          <Image source={{uri: item?.thumbnail}} style={styles.image} />
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{item?.title}</Text>
          <Text style={styles.text}>Category: {item?.category}</Text>
          <Text style={styles.text}>Price: {`\u20B9 ${item?.price}`}</Text>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.button}
            onPress={handleAddtoCart}>
            <Text style={styles.buttonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;

export const styles = StyleSheet.create({
  cardContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 2},
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  imageContainer: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  title: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  text: {
    color: '#000',
    fontSize: 14,
    marginBottom: 2,
  },
  button: {
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: colors.accent,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
});
