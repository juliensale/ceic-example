import { FC, PropsWithChildren } from 'react';
import CrossClose from '../icons/CrossClose';
import styles from './Layout.module.css';
import Navbar from './Navbar';

const Layout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<div className={styles.container}>
			<header className={styles.header}>
				<h1>CEIC Data Bridge</h1>
				<CrossClose />
			</header>
			<div className={styles.navContainer}>
				<Navbar />
				<div className={styles.content}>
					{children}
				</div>
			</div>
		</div>
	)
}

export default Layout