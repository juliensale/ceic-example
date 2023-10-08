import { FC, useState } from 'react'
import DropDown, { DropDownItem } from '../forms/DropDown'

const Filters: FC = () => {
	// autorefresh in seconds
	const [autoRefresh, setAutoRefresh] = useState<number>(30)
	return (
		<div>
			<DropDown
				title={`${autoRefresh} sec`}
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
	)
}

export default Filters