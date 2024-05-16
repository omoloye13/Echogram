import React from 'react';
import { StreamChat } from 'stream-chat';
import ChatProvider from '../../providers/ChatProvider';
import { Redirect, Stack } from 'expo-router';
import { useAuth } from '../../providers/AuthProvider';

const client = StreamChat.getInstance('r5fjz2vq9f9k');

export default function HomeLayout() {
	//performing a check to know if user has been authenticated
	const { user } = useAuth();

	if (!user) {
		return <Redirect href='/(auth)/login' />;
	}
	return (
		<ChatProvider>
			<Stack>
				<Stack.Screen name='(tabs)' options={{ headerShown: false }} />
			</Stack>
		</ChatProvider>
	);
}
