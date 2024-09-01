import { format } from 'date-fns';
import { z } from 'zod';
import { recordSchema } from './form-schema';
import { axios } from '@/lib/axios';

export async function getRecordsByDate(date: Date) {
	const formatDate = format(date, 'yyyy-MM-dd');
	const response = await axios.get(`records?date=${formatDate}`);
	return await response;
}

export async function storeRecord(payload: z.infer<typeof recordSchema>) {
	const requestBody = {
		...payload,
		date: format(payload.date, 'yyyy-MM-dd'),
	};
	const response = await axios.post('records', requestBody);
	return await response;
}
