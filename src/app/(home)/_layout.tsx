import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StreamChat } from 'stream-chat';
import ChatProvider from '../../providers/ChatProvider';

const client = StreamChat.getInstance('r5fjz2vq9f9k');

export default function HomeLayout() {
	return (
		<ChatProvider>
			<Stack>
				<Stack.Screen name='(tabs)' options={{ headerShown: false }} />
			</Stack>
		</ChatProvider>
	);
}
