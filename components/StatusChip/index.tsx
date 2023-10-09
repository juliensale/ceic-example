import { FC, useMemo } from 'react';
import mergeClasses from '../../utils/mergeClasses';
import styles from './StatusChip.module.css';

export type Status = 0 | 1 | 2;

const StatusChip: FC<{ status: Status }> = ({ status }) => {
	const className = useMemo(() => {
		switch (status) {
			case 0:
				return styles.error;
			case 1:
				return styles.updating;
			default:
				return styles.ok;
		}
	}, [status])
	const text = useMemo(() => {
		switch (status) {
			case 0:
				return "Error";
			case 1:
				return "Updating";
			default:
				return "Up to date";
		}
	}, [status])

	return (
		<div className={mergeClasses(styles.chip, className)}><div />{text}</div>
	)
}

export default StatusChip