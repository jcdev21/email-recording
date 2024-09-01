import { Button } from '@/components/ui/button';
import { useAuth } from '@/modules/auth/auth-context';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Navbar() {
	const navigate = useNavigate();
	const location = useLocation();
	const { signOut } = useAuth();

	const signOutHandle = () => {
		signOut?.(() => {
			navigate('/login', {
				replace: true,
				state: { from: location },
			});
		});
	};

	return (
		<header className="grid w-full h-16 shadow">
			<nav role="navigation" className="container flex items-center">
				<div className="ml-auto">
					<Button variant="secondary" onClick={signOutHandle}>
						Logout
					</Button>
				</div>
			</nav>
		</header>
	);
}
