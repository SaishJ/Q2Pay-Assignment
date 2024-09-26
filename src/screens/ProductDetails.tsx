import {useRoute} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import api from '../api/api';
import {ScrollView} from 'react-native-gesture-handler';
import {Rating} from 'react-native-ratings';
import {colors} from '../utlis/utils';
import Loader from '../components/Loader';
import {useToast} from 'react-native-toast-notifications';

const ProductDetails = () => {
  const route = useRoute();
  const toast = useToast();

  const {prdId} = route.params;

  const {data, isLoading, refetch} = useQuery({
    queryKey: ['productDetails', prdId],
    queryFn: async () => await api.productDetails(prdId),
  });

  const productData = data?.data;

  const handleAddtoCart = () => {
    toast.show('Product added to Cart', {type: 'success'});
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <Loader />
      ) : !isLoading && !data?.data ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorHeading}>Something went wrong</Text>
          <Text style={styles.errorSubHeading}>Try again</Text>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => refetch()}
            style={styles.errorButton}>
            <Text style={styles.errorButtonText}>Try again</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView style={styles.scrollViewContainer}>
          <Image source={{uri: productData?.thumbnail}} style={styles.image} />
          <Text style={styles.title}>{productData?.title}</Text>
          <Text style={styles.price}>{`\u20B9 ${productData?.price.toFixed(
            2,
          )}`}</Text>
          <Text style={styles.availability}>
            Availability: {productData?.availabilityStatus}
          </Text>
          <Rating
            type="star"
            ratingCount={5}
            imageSize={20}
            startingValue={productData?.rating}
            readonly
            style={styles.rating}
          />
          <Text style={styles.description}>{productData?.description}</Text>
          <View style={styles.detailsContainer}>
            <Text style={styles.detailTitle}>Product Details:</Text>
            <Text style={styles.detailText}>
              Brand: <Text style={styles.highlight}>{productData?.brand}</Text>
            </Text>
            <Text style={styles.detailText}>
              Category:{' '}
              <Text style={styles.highlight}>{productData?.category}</Text>
            </Text>
            <Text style={styles.detailText}>
              SKU: <Text style={styles.highlight}>{productData?.sku}</Text>
            </Text>
            <Text style={styles.detailText}>
              Weight:{' '}
              <Text style={styles.highlight}>{productData?.weight}g</Text>
            </Text>
            <Text style={styles.detailText}>
              Dimensions:{' '}
              <Text style={styles.highlight}>
                {productData?.dimensions?.width} x{' '}
                {productData?.dimensions?.height} x{' '}
                {productData?.dimensions?.depth} mm
              </Text>
            </Text>
            <Text style={styles.detailText}>
              Return Policy:{' '}
              <Text style={styles.highlight}>{productData?.returnPolicy}</Text>
            </Text>
            <Text style={styles.detailText}>
              Warranty:{' '}
              <Text style={styles.highlight}>
                {productData?.warrantyInformation}
              </Text>
            </Text>
            <Text style={styles.detailText}>
              Shipping Info:{' '}
              <Text style={styles.highlight}>
                {productData?.shippingInformation}
              </Text>
            </Text>
          </View>
          <Text style={styles.reviewsTitle}>Customer Reviews:</Text>
          <FlatList
            data={productData?.reviews}
            renderItem={({item}) => (
              <View style={styles.reviewContainer}>
                <Text style={styles.reviewerName}>{item?.reviewerName}</Text>
                <Text style={styles.reviewComment}>{item?.comment}</Text>
              </View>
            )}
            keyExtractor={(productData, index) => index.toString()}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={handleAddtoCart}
              style={styles.button}>
              <Text style={styles.buttonText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
  },
  scrollViewContainer: {
    paddingBottom: 20,
    paddingHorizontal: 15,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  price: {
    fontSize: 24,
    fontWeight: '600',
    color: '#4CAF50',
    marginBottom: 5,
  },
  availability: {
    fontSize: 16,
    color: '#FF5722',
    marginBottom: 10,
  },
  rating: {
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginBottom: 15,
    lineHeight: 22,
  },
  detailsContainer: {
    backgroundColor: '#fff',
    // padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 2},
  },
  detailTitle: {
    fontSize: 18,
    marginBottom: 10,
    color: '#232325',
  },
  detailText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
    lineHeight: 24,
  },
  highlight: {
    fontSize: 14,
    fontWeight: '500',
    color: '#555555',
  },
  imageGalleryTitle: {
    fontSize: 18,
    marginBottom: 10,
    color: '#232325',
  },
  galleryImage: {
    width: 120,
    height: 120,
    marginRight: 10,
    borderRadius: 5,
  },
  galleryContainer: {
    paddingBottom: 10,
  },
  reviewsTitle: {
    fontSize: 18,
    marginBottom: 10,
    color: '#232325',
  },
  reviewContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 2},
  },
  reviewerName: {
    fontWeight: '600',
    color: '#222222',
  },
  reviewComment: {
    color: '#555',
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  button: {
    backgroundColor: colors.accent,
    width: '95%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
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
  errorButton: {
    backgroundColor: colors.accent,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
});

export default ProductDetails;
