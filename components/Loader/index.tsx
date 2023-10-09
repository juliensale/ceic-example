import { FC } from 'react';
import styles from './Loader.module.css';

const Loader: FC<{ size?: string }> = ({ size = '1rem' }) => {
	return (
		<div className={styles.loader} style={{ '--size': size } as React.CSSProperties} />
	)
}

export default Loader