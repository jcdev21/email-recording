import { API_URL } from '@/constans';
import { format } from 'date-fns';

export async function getRecordsByDate(date: Date) {
	try {
		const formatDate = format(date, 'yyyy-MM-dd');
		const response = await fetch(`${API_URL}/records?date=${formatDate}`);
		return await response.json();
	} catch (error) {
		return error;
	}
}
