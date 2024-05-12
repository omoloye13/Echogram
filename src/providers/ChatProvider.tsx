//connecting the user an renering overlay and chat
import { View, Text, ActivityIndicator } from 'react-native';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';
import { OverlayProvider, Chat } from 'stream-chat-expo';

const client = StreamChat.getInstance(process.env.EXPO_PUBLIC_STREAM_API_KEY);

const ChatProvider = ({ children }: PropsWithChildren) => {
	const [isConnected, setIsConnnected] = useState(false);
	useEffect(() => {
		const connect = async () => {
			await client.connectUser(
				{
					id: 'jlahey',
					name: 'Jim Lahey',
					image: 'https://i.imgur.com/fR9Jz14.png',
				},
				client.devToken('jlahey')
			);
			setIsConnnected(true);
		};
		connect();

		//cleanup function
		return () => {
			client.disconnectUser();
			setIsConnnected(false);
		};
	}, []);

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
