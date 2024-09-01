import { useAuth } from '@/modules/auth/auth-context';
import FormLogin from '@/modules/auth/form-login';
import { Navigate, useLocation } from 'react-router-dom';

export default function Login() {
	const auth = useAuth();
	const location = useLocation();

	if (auth.user || auth.accessToken) {
		return <Navigate to="/" state={{ from: location }} replace />;
	}

	return (
		<div className="flex flex-col items-center justify-center w-screen h-screen">
			<h1 className="mb-5 text-2xl font-semibold text-slate-600">
				Sign In
			</h1>
			<div className="p-4 my-4 rounded bg-slate-200">
				<pre>Email : admin@test.com</pre>
				<pre>Password : qwerty123</pre>
			</div>
			<div className="w-[320px]">
				<FormLogin />
			</div>
		</div>
	);
}
