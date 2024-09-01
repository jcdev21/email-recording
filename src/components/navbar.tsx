import { Button } from '@/components/ui/button';

export default function Navbar() {
	return (
		<header className="grid w-full h-16 shadow">
			<nav role="navigation" className="container flex items-center">
				<div className="ml-auto">
					<Button variant="secondary" onClick={() => {}}>
						Logout
					</Button>
				</div>
			</nav>
		</header>
	);
}
