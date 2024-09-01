import { format } from 'date-fns';
import { LoaderFunctionArgs } from 'react-router-dom';

export async function loader({ request }: LoaderFunctionArgs) {
	// const result = await getRecords(params.chatId as string);
	// return result.data;

	const url = new URL(request.url);
	const date = url.searchParams.get('date')
		? url.searchParams.get('date')
		: format(new Date(), 'yyyy-MM-dd');
	console.log(date);

	return true;
}
