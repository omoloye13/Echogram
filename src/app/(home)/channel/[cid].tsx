import { View, Text, ActivityIndicator, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { Channel as ChannelType } from 'stream-chat';
import {
	Channel,
	ChannelList,
	MessageInput,
	MessageList,
	useChatContext,
} from 'stream-chat-expo';

const ChannelScreen = () => {
	const [channel, setChannel] = useState<ChannelType | null>(null);
	const { cid } = useLocalSearchParams<{ cid: string }>();

	const { client } = useChatContext();

	//fetching channels using id
	useEffect(() => {
		const fetchChannel = async () => {
			const channels = await client.queryChannels({ cid });
			// console.log(channels);
			setChannel(channels[0]);
		};
		fetchChannel();
	}, [cid]);

	if (!channel) {
		return <ActivityIndicator />;
	}

	return (
		<Channel channel={channel}>
			<MessageList />
			<SafeAreaView edges={['bottom']}>
				<MessageInput />
			</SafeAreaView>
		</Channel>
	);
};

export default ChannelScreen;
