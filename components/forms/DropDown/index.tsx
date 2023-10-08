import { FC, ReactNode } from 'react'
import Chevron from '../../icons/Chevron'
import styles from './DropDown.module.css'


const DropDownTitle: FC<{ text: string }> = ({ text }) => {
	return (
		<div className={styles.title}>
			<button>
				{text}
			</button>
			<Chevron />
		</div>
	)
}

const DropDownList: FC<{ children: ReactNode | ReactNode[] }> = ({ children }) => {
	return (
		<ul className={styles.list}>
			{children}
		</ul>
	)
}

export const DropDownItem: FC<{ children: string }> = ({ children }) => {
	return (
		<li className={styles.item}>
			{children}
		</li>
	)
}

type DropDownProps = {
	title: string;
	children: ReactNode | ReactNode[];
}
const DropDown: FC<DropDownProps> = ({ title, children }) => {
	return (
		<div className={styles.container}>
			<DropDownTitle text={title} />
			<DropDownList>
				{children}
			</DropDownList>
		</div>
	)
}

export default DropDown