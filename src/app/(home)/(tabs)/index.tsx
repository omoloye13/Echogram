import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { router } from 'expo-router';
import { ChannelList } from 'stream-chat-expo';
import { Channel as ChannelType, StreamChat } from 'stream-chat';
export default function MainTabScreen() {
	return (
		<ChannelList
			onSelect={(channel) => router.push(`/channel/${channel.cid}`)}
		/>
	);
}
