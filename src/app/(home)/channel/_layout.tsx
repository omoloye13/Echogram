import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';

export default function ChannelStack() {
	return (
		// <View>
		//   <Text>ChannelStack</Text>
		// </View>
		<Stack>
			<Stack.Screen name='[cid]' options={{ headerShown: false }} />
		</Stack>
	);
}

const styles = StyleSheet.create({});
