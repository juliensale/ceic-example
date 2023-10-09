import { ReactNode } from 'react';
import mergeClasses from '../../utils/mergeClasses';
import Checkbox from '../forms/Checkbox';
import ColumnTitle, { ColumnOrdering } from './ColumnTitle';
import styles from './Table.module.css';

export type BaseObject = Record<string, ReactNode> & { id: number };

type Props<T extends BaseObject> = {
	data: T[];
	columns: { name: (Extract<keyof T, string> | 'select'), label?: string, width?: string }[];
	order: {
		column: Extract<keyof T, string>;
		order: 'asc' | 'desc';
	}
	setOrder: (value: ColumnOrdering<T>) => void;
	selected?: number[];
	dispatch: React.Dispatch<{
		type: 'add' | 'remove' | 'selectAll' | 'removeAll';
		value?: number;
	}>
};

const Table = <T extends BaseObject>({ data, columns, order, setOrder, selected, dispatch }: Props<T>): ReactNode => {
	if (columns.some(col => col.name === "select") && !selected) throw new Error("Select column requires `selected` object.")
	return (
		<div className={styles.table} style={{
			gridTemplateColumns: columns.map(c => c.width || "auto").join(" ")
		}}>

			{/* First line */}
			{columns.map(
				(col) => {
					const allSelected = selected!.length === data.length;
					if (col.name === 'select') {
						return (
							<div
								key={col.name}
								className={mergeClasses(styles.cell, styles.darkCell)}
							>
								<Checkbox
									id="select-all"
									checked={allSelected}
									onChange={() => dispatch({ type: (allSelected ? 'removeAll' : 'selectAll') })}
									checkTitle='Select all'
									uncheckTitle='Unselect all'
								/>
							</div>)
					}

					return (
						<ColumnTitle
							key={col.name}
							name={col.name}
							order={order}
							setOrder={(value) => setOrder({ column: col.name as Extract<keyof T, string>, order: value })
							}>
							{col.label || col.name.charAt(0).toUpperCase() + col.name.slice(1).replaceAll("_", " ")}
						</ColumnTitle>
					)

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
								className={mergeClasses(styles.cell, idx % 2 === 1 ? styles.darkCell : undefined)}
							>
								{
									col.name === "select"
										? <Checkbox
											id={`${obj.id}-${col}`}
											checked={checked}
											onChange={() => dispatch({ type: checked ? 'remove' : 'add', value: obj.id, })}
										/>
										: obj[col.name]
								}
							</div>)
						}
					))
			}
		</div>
	)
}

export default Table