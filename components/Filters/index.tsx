import { FC } from 'react'
import DropDown, { DropDownItem } from '../forms/DropDown'

const Filters: FC = () => {
	return (
		<div>
			<DropDown title="Test drop down">
				<DropDownItem>Test item 1</DropDownItem>
				<DropDownItem>Test item 2</DropDownItem>
			</DropDown>
		</div>
	)
}

export default Filters