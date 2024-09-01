import {
	deleteAuthCookies,
	getAccessTokenCookie,
	getUserCookie,
} from '@/lib/utils';
import {
	ReactNode,
	createContext,
	useCallback,
	useContext,
	useMemo,
	useState,
} from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export type UserType = {
	id: string;
	email: string;
	name: string;
};

type AuthContextType = {
	accessToken?: string;
	user?: UserType;
	signOut?: (callback: VoidFunction) => void;
};

const AuthContext = createContext<AuthContextType>({});

export default function AuthProvider({ children }: { children: ReactNode }) {
	const [accessToken, setAccessToken] = useState<string | undefined>(
		getAccessTokenCookie ?? undefined
	);
	const [user, setUser] = useState<UserType | undefined>(
		getUserCookie ?? undefined
	);

	const signOut = useCallback(() => {
		deleteAuthCookies();
		setAccessToken(undefined);
		setUser(undefined);
	}, []);

	const auth: AuthContextType = useMemo(() => {
		if (accessToken && user) {
			return { accessToken, user, signOut };
		} else {
			return { signOut };
		}
	}, [accessToken, user, signOut]);

	return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	const context = useContext(AuthContext);

	if (typeof context?.signOut !== 'function') {
		throw new Error('useAuth must be used within AuthProvider');
	}

	return context;
}

export function RequireAuth({ children }: { children: JSX.Element }) {
	const auth = useAuth();
	const location = useLocation();

	if (!auth.user || !auth.accessToken) {
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	return children;
}
