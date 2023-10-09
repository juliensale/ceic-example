import { FC, useState } from 'react';
import DropDown, { DropDownCheckbox, DropDownItem } from '../forms/DropDown';
import styles from './Filters.module.css';

const Filters: FC = () => {
	// autorefresh in seconds
	const [autoRefresh, setAutoRefresh] = useState<number>(30)
	const [statusFilter, setStatusFilter] = useState<string[]>([]);
	return (
		<div className={styles.container}>
			<DropDown title="Status" type="checkbox" value={statusFilter} setValue={(value) => setStatusFilter(value)}>
				<DropDownCheckbox value="0">Error</DropDownCheckbox>
				<DropDownCheckbox value="1">Updating</DropDownCheckbox>
				<DropDownCheckbox value="2">Up to date</DropDownCheckbox>
			</DropDown>
			<div className={styles.subContainer}>
				<DropDown
					title={`${autoRefresh} sec`}
					type="select"
					label="Autorefresh"
					value={autoRefresh.toString()} setValue={(value) => {
						setAutoRefresh(parseInt(value));
					}}>
					<DropDownItem value="10">10 sec</DropDownItem>
					<DropDownItem value="20">20 sec</DropDownItem>
					<DropDownItem value="30">30 sec</DropDownItem>
					<DropDownItem value="45">45 sec</DropDownItem>
					<DropDownItem value="60">60 sec</DropDownItem>
				</DropDown>
			</div>
		</div>
	)
}

export default Filters