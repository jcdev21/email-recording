import { z } from 'zod';

export const recordSchema = z.object({
	email: z.string().min(1).email('not valid email'),
	date: z.coerce.date(),
	description: z.string().optional(),
});
