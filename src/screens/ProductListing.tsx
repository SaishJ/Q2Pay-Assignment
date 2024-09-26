import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {routes} from '../navigators/routes';
import {useQuery} from '@tanstack/react-query';
import api from '../api/api';
import Loader from '../components/Loader';
import ProductCard from '../components/ProductCard';
import {colors} from '../utlis/utils';

const ProductListing = () => {
  const navigation = useNavigation();

  const {data, isLoading, refetch} = useQuery({
    queryKey: ['productListing'],
    queryFn: async () => api.productList(),
  });

  const renderItem = ({item}: any) => {
    return <ProductCard item={item} navigation={navigation} />;
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Loader />
      ) : !isLoading && !data?.data ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorHeading}>Something went wrong</Text>
          <Text style={styles.errorSubHeading}>Try again</Text>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => refetch()}
            style={styles.button}>
            <Text style={styles.buttonText}>Try again</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={data?.data?.products}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default ProductListing;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: '#FFFFFF',
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  errorHeading: {
    fontSize: 18,
    color: '#222222',
  },
  errorSubHeading: {
    fontSize: 16,
    color: '#222222',
  },
  button: {
    backgroundColor: colors.accent,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
});
