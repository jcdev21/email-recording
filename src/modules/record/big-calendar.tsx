import { Calendar } from '@/components/ui/calendar';

type BigCalendarProps = {
	date: Date | undefined;
	onDateClick: (selectedDate: Date | undefined) => void;
};

export default function BigCalendar({ date, onDateClick }: BigCalendarProps) {
	return (
		<div className="flex justify-center mt-4">
			<Calendar
				mode="single"
				selected={date}
				onSelect={onDateClick}
				large
			/>
		</div>
	);
}
