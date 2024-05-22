import { useEffect, useState } from 'react';
import { FlatList, Text } from 'react-native';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../providers/AuthProvider';
import UserListItem from '../../components/UserListItem';

export default function UsersScreen() {
	const [users, setUsers] = useState([]);
	const { user } = useAuth();
	// const { profile } = useAuth();

	// console.log('SHO ME', user.email);
	// console.log('show my ', profile.full_name);
	// console.log('list o users are', users);

	useEffect(() => {
		const fetchUsers = async () => {
			let { data: profiles, error } = await supabase
				.from('profiles')
				.select('*')
				.neq('id', user.id); // exclude me

			setUsers(profiles);
		};
		fetchUsers();
		// console.log('I need list of users', users);
	}, []);

	return (
		<FlatList
			data={users}
			contentContainerStyle={{ gap: 5 }}
			renderItem={({ item }) => <UserListItem user={item} />}
		/>
	);
}
