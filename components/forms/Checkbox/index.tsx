import { FC } from 'react';
import styles from './Checkbox.module.css';

type Props = {
	id: string;
	checked: boolean;
	onChange: React.ChangeEventHandler<HTMLInputElement>,
	checkTitle?: string;
	uncheckTitle?: string;

}

const Checkbox: FC<Props> = ({ id, checked, onChange, checkTitle, uncheckTitle }) => {
	return (
		<label htmlFor={id} className={styles.container} title={checked ? uncheckTitle : checkTitle}>
			<input type='checkbox' checked={checked} id={id} onChange={onChange} />
			<span className={styles.checkmark} />
		</label>
	)
}

export default Checkbox