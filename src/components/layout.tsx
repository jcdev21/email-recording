import Navbar from '@/components/navbar';
import { Outlet } from 'react-router-dom';

export default function Layout() {
	return (
		<div>
			<Navbar />
			<main>
				<Outlet />
			</main>
		</div>
	);
}
