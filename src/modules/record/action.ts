import { format } from 'date-fns';
import { z } from 'zod';
import { recordSchema } from './form-schema';
import { axios } from '@/lib/axios';

export async function getRecordsByDate(date: Date) {
	const formatDate = format(date, 'yyyy-MM-dd');
	return await axios.get(`records?date=${formatDate}`);
}

export async function storeRecord(payload: z.infer<typeof recordSchema>) {
	const requestBody = {
		...payload,
		date: format(payload.date, 'yyyy-MM-dd'),
	};
	return await axios.post('records', requestBody);
}
