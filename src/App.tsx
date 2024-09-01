import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '@/components/layout';
import Home from '@/pages/home';
import Login from '@/pages/login';

function App() {
	const router = createBrowserRouter([
		{
			path: '/',
			element: <Layout />,
			children: [
				{
					index: true,
					element: <Home />,
				},
			],
		},
		{
			path: '/login',
			element: <Login />,
		},
	]);

	return <RouterProvider router={router} />;
}

export default App;
