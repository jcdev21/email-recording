import { Button } from '@/components/ui/button';
import { getRecordsByDate } from '@/modules/record/action';
import BigCalendar from '@/modules/record/big-calendar';
import ModalList from '@/modules/record/modal-list';
import { Record } from '@/modules/record/types';
import { useCallback, useEffect, useState } from 'react';

export default function Home() {
	const [date, setDate] = useState<Date | undefined>(new Date());
	const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
	const [records, setRecords] = useState<Record[]>([]);

	function dateClickHandle(selectedDate: Date | undefined) {
		if (selectedDate) {
			setDate(selectedDate);
		}
		setIsOpenModal(true);
	}

	const getRecords = useCallback(async () => {
		const { success, data } = await getRecordsByDate(date as Date);
		if (success) {
			setRecords(data);
		} else {
			setRecords([]);
		}
	}, [date]);

	useEffect(() => {
		getRecords();
	}, [getRecords]);

	return (
		<div className="container flex flex-col">
			<div className="flex justify-end my-4">
				<Button size="lg">Create</Button>
			</div>
			<BigCalendar date={date} onDateClick={dateClickHandle} />
			<ModalList
				open={isOpenModal}
				setOpen={setIsOpenModal}
				dataRecord={records}
			/>
		</div>
	);
}
