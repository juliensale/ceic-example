import { ReactNode } from 'react';
import Checkbox from '../forms/Checkbox';
import styles from './Table.module.css';

type BaseObject = Record<string, ReactNode> & { id: number };

type Props<T extends BaseObject> = {
	data: T[];
	columns: (Extract<keyof T, string> | 'select')[];
	selected?: number[];
	dispatch: React.Dispatch<{
		type: 'add' | 'remove' | 'selectAll' | 'removeAll';
		value?: number;
	}>
};

const Table = <T extends BaseObject>({ data, columns, selected, dispatch }: Props<T>): ReactNode => {
	if (columns.includes("select") && !selected) throw new Error("Select column requires `selected` object.")
	return (
		<div className={styles.table} style={{
			gridTemplateColumns: `repeat(${columns.length}, 1fr)`
		}}>

			{/* First line */}
			{columns.map(
				(col) => {
					const allSelected = selected!.length === data.length;

					return (<div
						key={col}
						className={styles.darkCell}
					>
						{
							col === "select"
								? <Checkbox
									id="select-all"
									checked={allSelected}
									onChange={() => dispatch({ type: (allSelected ? 'removeAll' : 'selectAll') })}
									checkTitle='Select all'
									uncheckTitle='Unselect all'
								/>
								: col.charAt(0).toUpperCase() + col.slice(1)
						}
					</div>)
				}
			)}
			{/* Rest */}
			{
				data.map((obj, idx) =>
					columns.map(
						col => {
							const checked = selected!.includes(obj.id);

							return (<div
								key={`${obj.id}-${col}`}
								className={idx % 2 === 1 ? styles.darkCell : undefined}
							>
								{
									col === "select"
										? <Checkbox
											id={`${obj.id}-${col}`}
											checked={checked}
											onChange={() => dispatch({ type: checked ? 'remove' : 'add', value: obj.id, })}
										/>
										: obj[col]
								}
							</div>)
						}
					))
			}
		</div>
	)
}

export default Table