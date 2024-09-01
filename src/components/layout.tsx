import Navbar from '@/components/navbar';
import { RequireAuth } from '@/modules/auth/auth-context';
import { Outlet } from 'react-router-dom';

export default function Layout() {
	return (
		<RequireAuth>
			<div>
				<Navbar />
				<main>
					<Outlet />
				</main>
			</div>
		</RequireAuth>
	);
}
