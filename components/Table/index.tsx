import { ReactNode } from 'react';
import mergeClasses from '../../utils/mergeClasses';
import Loader from '../Loader';
import Checkbox from '../forms/Checkbox';
import ColumnTitle, { ColumnOrdering } from './ColumnTitle';
import styles from './Table.module.css';

export type BaseObject = Record<string, ReactNode> & { id: number };



type Props<T extends BaseObject> = {
	data: T[] | undefined;
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

const FirstLine = <T extends BaseObject>({ data, columns, order, setOrder, selected, dispatch }: Props<T> & { data: T[] }): ReactNode => {
	return (
		<>
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
		</>
	)
}

const Line = <T extends BaseObject>({ obj, idx, columns, selected, dispatch }: { obj: T, idx: number } & Pick<Props<T>, 'columns' | 'selected' | 'dispatch'>) => {
	return (
		<>
			{columns.map(
				col => {
					const checked = selected!.includes(obj.id);

					if (col.name === 'select') {
						return (
							<div
								key={`${obj.id}-${col.name}`}
								className={mergeClasses(styles.cell, idx % 2 === 1 ? styles.darkCell : undefined)}
							>
								<Checkbox
									id={`${obj.id}-${col.name}`}
									checked={checked}
									onChange={() => dispatch({ type: checked ? 'remove' : 'add', value: obj.id, })}
								/>

							</div>

						)
					}

					return (<div
						key={`${obj.id}-${col.name}`}
						className={mergeClasses(styles.cell, idx % 2 === 1 ? styles.darkCell : undefined)}
					>
						{obj[col.name]}
					</div>)
				}
			)
			}
		</>
	)
}

const Table = <T extends BaseObject>({ data, columns, order, setOrder, selected, dispatch }: Props<T>): ReactNode => {
	if (columns.some(col => col.name === "select") && !selected) throw new Error("Select column requires `selected` object.")

	if (!data) return <Loader size="1.5rem" />;

	return (
		<div className={styles.table} style={{
			gridTemplateColumns: columns.map(c => c.width || "auto").join(" ")
		}}>

			<FirstLine {...{ data, columns, order, setOrder, selected, dispatch }} />
			{
				data.map((obj, idx) => <Line key={`line-${obj.id}`} {...{ obj, idx, columns, selected, dispatch }} />)
			}
		</div>
	)
}

export default Table