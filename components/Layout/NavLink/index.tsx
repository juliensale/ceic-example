import NextLink, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import { FC, PropsWithChildren } from 'react';
import mergeClasses from '../../../utils/mergeClasses';
import styles from './NavLink.module.css';

const NavLink: FC<LinkProps & { className?: string } & PropsWithChildren> = ({ className, ...props }) => {
	const router = useRouter();
	return (
		<NextLink
			className={mergeClasses(
				className,
				styles.link,
				router.asPath === props.href ? styles.active : undefined
			)}
			{...props}
		/>
	)
}

export default NavLink