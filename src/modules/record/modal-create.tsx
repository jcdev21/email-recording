import { useState } from 'react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { recordSchema } from './form-schema';
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
import { Button } from '@/components/ui/button';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';
import { storeRecord } from './action';
import { AxiosError } from 'axios';

type ModalCreateProps = {
	children: React.ReactNode;
};

export default function ModalCreate({ children }: ModalCreateProps) {
	const [open, setOpen] = useState<boolean>(false);

	const form = useForm<z.infer<typeof recordSchema>>({
		resolver: zodResolver(recordSchema),
		defaultValues: {
			email: '',
			date: undefined,
			description: '',
		},
	});

	async function onSubmit(values: z.infer<typeof recordSchema>) {
		try {
			await storeRecord(values);
			form.reset();
			setOpen(false);
		} catch (error) {
			if (error instanceof AxiosError) {
				console.log(error.message);
				alert(error.message);
			}
		}
	}

	return (
		<Dialog open={open} onOpenChange={(value) => setOpen(value)}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create</DialogTitle>
					<DialogDescription></DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<div className="grid gap-4 pt-2 pb-4">
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input
												type="email"
												placeholder="enter email"
												disabled={
													form.formState.isSubmitting
												}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="date"
								render={({ field }) => (
									<FormItem className="flex flex-col">
										<FormLabel>Date</FormLabel>
										<Popover>
											<PopoverTrigger asChild>
												<FormControl>
													<Button
														variant={'outline'}
														className={cn(
															'w-full pl-3 text-left font-normal',
															!field.value &&
																'text-muted-foreground'
														)}
													>
														{field.value ? (
															format(
																field.value,
																'PPP'
															)
														) : (
															<span>
																Select date
															</span>
														)}
														<CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
													</Button>
												</FormControl>
											</PopoverTrigger>
											<PopoverContent
												className="w-auto p-0"
												align="start"
											>
												<Calendar
													mode="single"
													selected={field.value}
													onSelect={field.onChange}
													initialFocus
												/>
											</PopoverContent>
										</Popover>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="description"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Description</FormLabel>
										<FormControl>
											<Textarea
												placeholder="Enter description"
												className="resize-none"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormItem className="flex justify-end mt-4">
								<Button
									type="submit"
									disabled={form.formState.isSubmitting}
								>
									{form.formState.isSubmitting ? (
										<Loader2 className="w-4 h-4 mr-2 animate-spin" />
									) : null}
									Submit
								</Button>
							</FormItem>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
