import { FC } from 'react';
import CeicLogo from '../../icons/CeicLogo';
import NavLink from '../NavLink';
import styles from './Navbar.module.css';

const Navbar: FC = () => {
	return (
		<nav className={styles.container}>
			<ul className={styles.list}>
				<li>
					<NavLink href="/">Series</NavLink>
				</li>
				<li>
					<NavLink href="/search">Search</NavLink>
				</li>
				<li>
					<NavLink href="/connections">Connections</NavLink>
				</li>
				<li>
					<NavLink href="/settings">Settings</NavLink>
				</li>
				<li>
					<NavLink href="/help">Help</NavLink>
				</li>
			</ul>
			<CeicLogo />
		</nav>
	)
}

export default Navbar