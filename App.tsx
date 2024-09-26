import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Navigation from './src/navigators/Navigation';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {StatusBar} from 'react-native';
import {ToastProvider} from 'react-native-toast-notifications';
import ToastNotification from './src/components/ToastNotification';

const App = () => {
  const queryClient = new QueryClient();

  return (
    <NavigationContainer>
      <ToastProvider
        placement="top"
        duration={1500}
        animationType="zoom-in"
        renderToast={toastOptions => (
          <ToastNotification toastOptions={toastOptions} />
        )}>
        <QueryClientProvider client={queryClient}>
          <StatusBar backgroundColor={'#FFFFFF'} barStyle={'dark-content'} />
          <Navigation />
        </QueryClientProvider>
      </ToastProvider>
    </NavigationContainer>
  );
};

export default App;
