import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProductListing from '../screens/ProductListing';
import ProductDetails from '../screens/ProductDetails';
import AppHeader from '../components/AppHeader';

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProductListing"
        component={ProductListing}
        options={{
          headerShown: true,
          header: () => <AppHeader title="Products" />,
        }}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={{
          headerShown: true,
          header: () => <AppHeader title="Products Details" goBack />,
        }}
      />
    </Stack.Navigator>
  );
};

export default Navigation;
