//connecting the user an renering overlay and chat
import { View, Text, ActivityIndicator } from 'react-native';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';
import { OverlayProvider, Chat } from 'stream-chat-expo';
import { useAuth } from './AuthProvider';

const client = StreamChat.getInstance(process.env.EXPO_PUBLIC_STREAM_API_KEY);

const ChatProvider = ({ children }: PropsWithChildren) => {
	const [isConnected, setIsConnnected] = useState(false);
	const { profile } = useAuth();

	useEffect(() => {
		if (!profile) {
			return;
		}
		const connect = async () => {
			await client.connectUser(
				{
					id: profile.id,
					name: profile.full_name,
					image: 'https://i.imgur.com/fR9Jz14.png',
				},
				client.devToken(profile.id)
			);
			setIsConnnected(true);
		};
		connect();

		//cleanup function
		return () => {
			if (isConnected) {
				client.disconnectUser();
			}
			setIsConnnected(false);
		};
	}, [profile?.id]);

	if (!isConnected) {
		return (
			<ActivityIndicator
				style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
			/>
		);
	}
	return (
		<>
			<OverlayProvider>
				<Chat client={client}>{children}</Chat>
			</OverlayProvider>
		</>
	);
};

export default ChatProvider;

//db passord
// Folashade_13
