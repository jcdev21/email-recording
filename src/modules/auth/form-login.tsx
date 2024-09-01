import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { loginSchema } from './form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { loginWithEmailAndPassword } from '@/modules/auth/action';
import { setAccessTokenCookie, setUserCookie } from '@/lib/utils';
import { AxiosError } from 'axios';

export default function FormLogin() {
	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	async function onSubmit(values: z.infer<typeof loginSchema>) {
		try {
			const response = await loginWithEmailAndPassword(values);
			const { data } = response;
			setAccessTokenCookie(data.accessToken);
			setUserCookie(data.user);
			window.location.replace('/');
		} catch (error) {
			if (error instanceof AxiosError) {
				console.log(error.message);
				alert(error.message);
			}
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<div className="grid items-center w-full gap-4">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										type="email"
										placeholder="Enter your email"
										disabled={form.formState.isSubmitting}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input
										type="password"
										placeholder="Enter your password"
										disabled={form.formState.isSubmitting}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormItem className="ml-auto">
						<Button
							disabled={form.formState.isSubmitting}
							className="ml-2"
						>
							{form.formState.isSubmitting ? (
								<Loader2 className="w-4 h-4 mr-2 animate-spin" />
							) : null}
							Login
						</Button>
					</FormItem>
				</div>
			</form>
		</Form>
	);
}
