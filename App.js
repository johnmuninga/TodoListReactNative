import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import { db } from './config/firebase';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';

const Stack = createNativeStackNavigator();

export default function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={
        {
          headerShown: false
        }
      }
       >
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
