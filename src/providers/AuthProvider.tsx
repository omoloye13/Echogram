import { View, Text } from 'react-native';
import React, {
	PropsWithChildren,
	createContext,
	useContext,
	useEffect,
	useState,
} from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

type AuthContext = {
	session: Session | null;
	user: User | null;
	profile: any | null;
};
const AuthContext = createContext<AuthContext>({
	session: null,
	user: null,
	profile: null,
});

const AuthProvider = ({ children }: PropsWithChildren) => {
	const [session, setSession] = useState<Session | null>(null);
	const [profile, setProfile] = useState();

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
		});

		supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
		});
	}, []);
	//fetching profile when user changes
	useEffect(() => {
		if (!session?.user) {
			setProfile(null);
			return;
		}
		const fetchProfile = async () => {
			let { data, error } = await supabase
				.from('profiles')
				.select('*')
				.eq('id', session.user.id)
				.single();
			setProfile(data);
		};
		fetchProfile();
	}, [session?.user]);
	// console.log(profile);

	return (
		<AuthContext.Provider value={{ session, user: session?.user, profile }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
export const useAuth = () => useContext(AuthContext);
