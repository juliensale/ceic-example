import { FC, HTMLProps } from 'react';
import mergeClasses from '../../utils/mergeClasses';
import SearchIcon from '../icons/SearchIcon';
import styles from './SearchBar.module.css';

type SearchBarProps = {
	value?: string;
} & Omit<HTMLProps<HTMLInputElement>, "value">

const SearchBar: FC<SearchBarProps> = ({ value, onChange, className, ...props }) => {
	return (
		<div className={styles.container}>
			<SearchIcon />
			<input type="text" className={mergeClasses(styles.input, className)} placeholder='Search' {...{ ...props, value, onChange }} />
		</div>
	)
}

export default SearchBar