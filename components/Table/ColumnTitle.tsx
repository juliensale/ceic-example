import { BaseObject } from '.';
import mergeClasses from '../../utils/mergeClasses';
import Chevron from '../icons/Chevron';
import styles from './Table.module.css';

export type ColumnOrdering<T extends BaseObject> = {
	column: Extract<keyof T, string>;
	order: 'asc' | 'desc';
}


type ColumnTitleProps<T extends BaseObject> = {
	children: string;
	name: Extract<keyof T, string>;
	order: ColumnOrdering<T>;
	setOrder: (value: 'asc' | 'desc') => void;
}
const ColumnTitle = <T extends BaseObject>({ children, name, order, setOrder }: ColumnTitleProps<T>) => {
	return (
		<div
			className={mergeClasses(styles.cell, styles.darkCell, styles.firstRow, order.order === 'asc' ? styles.asc : undefined)}
			onClick={() => setOrder(name !== order.column ? 'desc' : order.order === 'desc' ? 'asc' : 'desc')}
		>
			{children}
			{name === order.column ? <Chevron /> : undefined}
		</div>
	)
}

export default ColumnTitle