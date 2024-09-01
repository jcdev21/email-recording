import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Record } from '@/modules/record/types';

type ModalListProps = {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	dataRecord: Pick<Record, 'id' | 'email'>[];
};

export default function ModalList({
	open,
	setOpen,
	dataRecord,
}: ModalListProps) {
	return (
		<Dialog open={open} onOpenChange={(value) => setOpen(value)}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>List Email</DialogTitle>
					<DialogDescription></DialogDescription>
				</DialogHeader>
				<div className="h-full max-h-[80vh] flex flex-col overflow-y-auto overflow-x-hidden">
					<div className="relative h-fit">
						{dataRecord.length ? (
							dataRecord.map((data) => (
								<p
									key={data.id}
									className="px-3 py-2 mb-1 rounded-md bg-slate-200"
								>
									{data.email}
								</p>
							))
						) : (
							<p className="text-center">No Records</p>
						)}
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
