import { FC, HTMLProps, ReactNode } from 'react';
import styles from './IconButton.module.css';

const IconButton: FC<{ children: ReactNode } & HTMLProps<HTMLButtonElement>> = ({ children, ...props }) => {
	return (
		<button className={styles.button} {...{ ...props, type: "button" }}>
			{children}
		</button>
	)
}

export default IconButton