//Define global providers
//eg authenticator proider, theme providers etc.
// import { View, Text } from 'react-native';
import React from 'react';
import { Slot, Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AuthProvider from '../providers/AuthProvider';
export default function RootLayout() {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<AuthProvider>
				<Slot />
			</AuthProvider>
		</GestureHandlerRootView>
	);
}
