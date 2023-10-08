import { FC, ReactNode, useContext, useMemo, useState } from 'react'
import mergeClasses from '../../../utils/mergeClasses'
import Chevron from '../../icons/Chevron'
import styles from './DropDown.module.css'
import dropDownContext, { DropDownContext } from './DropDownContext'


const DropDownTitle: FC<{ text: string }> = ({ text }) => {
	const { open, setOpen } = useContext(dropDownContext);
	return (
		<div className={mergeClasses(styles.title, open ? styles.titleOpen : undefined)} onClick={() => setOpen(!open)}>
			<button>
				{text}
			</button>
			<Chevron />
		</div>
	)
}

const DropDownList: FC<{ children: ReactNode | ReactNode[] }> = ({ children }) => {
	const { open } = useContext(dropDownContext);
	return (
		<ul className={mergeClasses(styles.list, open ? styles.listOpen : undefined)}>
			{children}
		</ul>
	)
}

export const DropDownItem: FC<{ children: string, value: string }> = ({ children, value }) => {
	const { setOpen, setValue } = useContext(dropDownContext);
	return (
		<li className={styles.item} onClick={() => {
			setValue(value);
			setOpen(false);
		}}>
			{children}
		</li>
	)
}

const { Provider } = dropDownContext;

type DropDownProps = {
	title: string;
	children: ReactNode | ReactNode[];
	setValue: (value: string) => void;
	value: string;
}
const DropDown: FC<DropDownProps> = ({ title, children, value, setValue }) => {
	const [open, setOpen] = useState<boolean>(false);

	const contextValue: DropDownContext = useMemo(() => ({
		open,
		setOpen,
		setValue,
		value,
	}), [open, setValue, value])

	return (
		<Provider value={contextValue}>
			<div className={styles.container}>
				<DropDownTitle text={title} />
				<DropDownList>
					{children}
				</DropDownList>
			</div>
		</Provider>
	)
}

export default DropDown