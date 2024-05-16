import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { router } from 'expo-router';
import { ChannelList } from 'stream-chat-expo';
import { Channel as ChannelType, StreamChat } from 'stream-chat';
import { useAuth } from '../../../providers/AuthProvider';
export default function MainTabScreen() {
	const { user } = useAuth();
	return (
		<ChannelList
			filters={{ members: { $in: [user.id] } }}
			onSelect={(channel) => router.push(`/channel/${channel.cid}`)}
		/>
	);
}
