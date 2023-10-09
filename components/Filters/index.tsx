import { FC } from 'react';
import IconButton from '../buttons/Icon';
import DropDown, { DropDownCheckbox, DropDownItem } from '../forms/DropDown';
import RefreshIcon from '../icons/Refresh';
import styles from './Filters.module.css';

type FiltersProps = {
	autoRefresh: number,
	setAutoRefresh: (value: number) => void;
	statusFilter: string[];
	setStatusFilter: (value: string[]) => void;
	refresh: () => void;
}
const Filters: FC<FiltersProps> = ({ autoRefresh, setAutoRefresh, statusFilter, setStatusFilter, refresh }) => {
	return (
		<div className={styles.container}>
			<DropDown title="Status" type="checkbox" value={statusFilter} setValue={(value) => setStatusFilter(value)}>
				<DropDownCheckbox value="0">Error</DropDownCheckbox>
				<DropDownCheckbox value="1">Updating</DropDownCheckbox>
				<DropDownCheckbox value="2">Up to date</DropDownCheckbox>
			</DropDown>
			<div className={styles.subContainer}>
				<IconButton onClick={refresh}><RefreshIcon /></IconButton>
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