import * as Notifications from 'expo-notifications';
import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import StackNavigator from './src/navigation/StackNavigator';

if (Platform.OS !== 'web') {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }) as Notifications.NotificationBehavior,
  });
}

export default function App() {
  useEffect(() => {
    if (Platform.OS !== 'web') {
      Notifications.requestPermissionsAsync();
    }
  }, []);

  return <StackNavigator />;
}