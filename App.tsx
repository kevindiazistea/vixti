import * as Notifications from 'expo-notifications';
import React, { useEffect } from 'react';
import StackNavigator from './src/navigation/StackNavigator';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }) as Notifications.NotificationBehavior,
});


export default function App() {
  useEffect(() => {
    Notifications.requestPermissionsAsync();
  }, []);

  return <StackNavigator />;
}
