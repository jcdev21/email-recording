import { z } from 'zod';
import { loginSchema } from './form-schema';
import { axios } from '@/lib/axios';

export async function loginWithEmailAndPassword(
	data: z.infer<typeof loginSchema>
) {
	return await axios.post('/auth', data);
}
