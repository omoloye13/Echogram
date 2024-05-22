//connecting the user an renering overlay and chat
import { View, Text, ActivityIndicator } from 'react-native';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';
import { OverlayProvider, Chat } from 'stream-chat-expo';
import { useAuth } from './AuthProvider';
import { supabase } from '../lib/supabase';

const client = StreamChat.getInstance(process.env.EXPO_PUBLIC_STREAM_API_KEY);

const ChatProvider = ({ children }: PropsWithChildren) => {
	const [isConnected, setIsConnnected] = useState(false);
	const { profile } = useAuth();
	// console.log(profile);

	useEffect(() => {
		if (!profile) {
			return;
		}
		const connect = async () => {
			await client.connectUser(
				{
					id: profile.id,
					name: profile.full_name,
					image: supabase.storage
						.from('avatars')
						.getPublicUrl(profile.avatar_url).data.publicUrl,
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
