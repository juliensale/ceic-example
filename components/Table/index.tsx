import { ReactNode } from 'react';
import styles from './Table.module.css';

type BaseObject = Record<string, ReactNode> & { id: number };

type Props<T extends BaseObject> = {
	data: T[];
	columns: (Extract<keyof T, string> | 'select')[];
};

const Table = <T extends BaseObject>({ data, columns }: Props<T>): ReactNode => {
	return (
		<div className={styles.table} style={{
			gridTemplateColumns: `repeat(${columns.length}, 1fr)`
		}}>
			{/* First line */}
			{columns.map(
				(col) => (
					<div
						key={col}
						className={styles.darkCell}
					>
						{col.charAt(0).toUpperCase() + col.slice(1)}
					</div>
				)
			)}
			{/* Rest */}
			{
				data.map((obj, idx) =>
					columns.map(
						col => (
							<div
								key={`${obj.id}-${col}`}
								className={idx % 2 === 1 ? styles.darkCell : undefined}
							>
								{col === 'select' ? 'sel' : obj[col]}
							</div>
						)
					))
			}
		</div>
	)
}

export default Table